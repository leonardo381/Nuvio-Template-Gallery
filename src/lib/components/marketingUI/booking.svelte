<script lang="ts">
  import { browser } from '$app/environment';
  import { getContext } from 'svelte';
  import { trackNuvioConversionEvent } from '$lib/analytics/events';
  import {
    createBookingAppointment,
    fetchBookingServices,
    fetchBookingSlots
  } from '$lib/utils/booking';

  export let variant: string = '';
  export let data: Record<string, any> = {};
  $: variant;

  const sitePageContext: Record<string, any> = getContext('nuvioSitePageContext') ?? {};

  function asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  function asObject(value: unknown): Record<string, any> {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, any>;
    }

    return {};
  }

  function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function getLocalDateForInput(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function resolveWebsiteId(): string {
    const fromData = asString(data?.websiteId);
    if (fromData) {
      return fromData;
    }

    const fromDataWebsite = asString(data?.website?.id);
    if (fromDataWebsite) {
      return fromDataWebsite;
    }

    const contextWebsite = asObject(sitePageContext?.website);
    return asString(contextWebsite?.id);
  }

  function resolveWebsiteSlug(): string {
    const fromData = asString(data?.websiteSlug);
    if (fromData) {
      return fromData;
    }

    const fromDataWebsite = asString(data?.website?.slug);
    if (fromDataWebsite) {
      return fromDataWebsite;
    }

    const contextWebsite = asObject(sitePageContext?.website);
    return asString(contextWebsite?.slug);
  }

  function resolveHeading(): string {
    return asString(data?.heading) || 'Book an appointment';
  }

  function resolveSubheading(): string {
    return asString(data?.subheading) || 'Choose a service and request a time.';
  }

  function resolveConfirmationMessage(): string {
    return asString(data?.confirmationMessage) || 'Your appointment request was received.';
  }

  type BookingService = {
    id: string;
    name: string;
    durationMinutes: number;
  };

  let websiteId = '';
  let websiteSlug = '';
  let cmsPreview = false;
  let heading = '';
  let subheading = '';
  let confirmationMessage = '';

  let services: BookingService[] = [];
  let slots: string[] = [];

  let selectedServiceId = '';
  let selectedDate = '';
  let selectedTime = '';

  let name = '';
  let email = '';
  let phone = '';
  let notes = '';

  let loadingServices = false;
  let loadingSlots = false;
  let submitting = false;

  let servicesError = '';
  let slotsError = '';
  let submitError = '';
  let submitWarning = '';
  let submitSuccess = '';
  let minSelectableDate = '';

  let lastLoadedWebsiteId = '';
  let lastSlotsRequestKey = '';

  $: websiteId = resolveWebsiteId();
  $: websiteSlug = resolveWebsiteSlug();
  $: cmsPreview = sitePageContext?.cmsPreview === true;
  $: heading = resolveHeading();
  $: subheading = resolveSubheading();
  $: confirmationMessage = resolveConfirmationMessage();
  $: minSelectableDate = getLocalDateForInput();

  $: if (browser && websiteId && websiteId !== lastLoadedWebsiteId) {
    lastLoadedWebsiteId = websiteId;
    resetBookingStateForWebsite();
    loadServices();
  }

  $: if (browser && !websiteId && lastLoadedWebsiteId) {
    lastLoadedWebsiteId = '';
    resetBookingStateForWebsite();
  }

  function resetBookingStateForWebsite() {
    services = [];
    slots = [];
    selectedServiceId = '';
    selectedDate = '';
    selectedTime = '';
    loadingServices = false;
    loadingSlots = false;
    servicesError = '';
    slotsError = '';
    submitError = '';
    submitWarning = '';
    submitSuccess = '';
    lastSlotsRequestKey = '';
  }

  async function loadServices() {
    if (!websiteId) {
      return;
    }

    loadingServices = true;
    servicesError = '';

    const result = await fetchBookingServices({ websiteId });
    if (!result.ok) {
      services = [];
      servicesError = 'Unable to load booking services right now.';
      loadingServices = false;
      return;
    }

    services = result.services;

    const hasSelectedService = services.some((service) => service.id === selectedServiceId);
    if (!hasSelectedService) {
      selectedServiceId = '';
      slots = [];
      selectedTime = '';
    }

    loadingServices = false;
  }

  async function loadSlots() {
    if (!websiteId || !selectedServiceId || !selectedDate) {
      slots = [];
      return;
    }

    const requestKey = `${websiteId}:${selectedServiceId}:${selectedDate}`;
    if (requestKey === lastSlotsRequestKey && slots.length) {
      return;
    }

    loadingSlots = true;
    slotsError = '';
    slots = [];
    selectedTime = '';

    const result = await fetchBookingSlots({
      websiteId,
      serviceId: selectedServiceId,
      date: selectedDate
    });

    if (!result.ok) {
      slotsError = 'Unable to load available times right now.';
      loadingSlots = false;
      return;
    }

    slots = Array.isArray(result.slots) ? result.slots : [];
    lastSlotsRequestKey = requestKey;
    loadingSlots = false;
  }

  function onSelectService(serviceId: string) {
    if (selectedServiceId === serviceId) {
      return;
    }

    selectedServiceId = serviceId;
    selectedTime = '';
    slots = [];
    slotsError = '';
    lastSlotsRequestKey = '';

    if (selectedDate) {
      loadSlots();
    }
  }

  function onDateChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement | null;
    selectedDate = asString(target?.value);
    selectedTime = '';
    slots = [];
    slotsError = '';
    lastSlotsRequestKey = '';

    if (selectedServiceId && selectedDate) {
      loadSlots();
    }
  }

  function onSelectTime(time: string) {
    selectedTime = asString(time);
    submitError = '';
    submitSuccess = '';
    submitWarning = '';
  }

  function getServiceButtonClass(serviceId: string): string {
    const base = 'w-full p-4 text-left rounded-lg border transition-colors';
    if (selectedServiceId === serviceId) {
      return `${base} border-primary-500 bg-primary-50 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200`;
    }

    return `${base} border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100`;
  }

  function getSlotButtonClass(slot: string): string {
    const base = 'px-3 py-2 text-sm font-medium rounded-lg border transition-colors';
    if (selectedTime === slot) {
      return `${base} border-primary-500 bg-primary-50 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200`;
    }

    return `${base} border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200`;
  }

  async function submitBookingRequest(event: Event) {
    event.preventDefault();

    submitError = '';
    submitSuccess = '';
    submitWarning = '';

    if (!websiteId) {
      submitError = 'Booking is unavailable right now.';
      return;
    }

    if (!selectedServiceId || !selectedDate || !selectedTime) {
      submitError = 'Please choose a service, date, and time.';
      return;
    }

    const normalizedName = asString(name);
    const normalizedEmail = asString(email);

    if (!normalizedName) {
      submitError = 'Name is required.';
      return;
    }

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      submitError = 'A valid email is required.';
      return;
    }

    submitting = true;

    const result = await createBookingAppointment({
      websiteId,
      serviceId: selectedServiceId,
      date: selectedDate,
      time: selectedTime,
      name: normalizedName,
      email: normalizedEmail,
      phone: asString(phone),
      notes: asString(notes)
    });

    if (!result.ok) {
      if (result.status === 409) {
        submitError = 'That time is no longer available. Please choose another time.';
      } else {
        submitError = 'Unable to submit your booking request right now. Please try again.';
      }

      submitting = false;

      if (selectedServiceId && selectedDate) {
        await loadSlots();
      }
      return;
    }

    trackNuvioConversionEvent(
      'booking_submitted',
      {
        formType: 'booking',
        sourceBlock: variant || 'booking',
        serviceType: asString(selectedService?.name) || asString(selectedService?.id) || asString(selectedServiceId)
      },
      {
        websiteSettings: asObject(sitePageContext?.website?.settings),
        cmsPreview,
        websiteSlug,
        pageType: 'site_page'
      }
    );

    submitSuccess = confirmationMessage;
    submitWarning = asString(result?.body?.warning);
    name = '';
    email = '';
    phone = '';
    notes = '';
    selectedTime = '';
    submitting = false;

    if (selectedServiceId && selectedDate) {
      await loadSlots();
    }
  }

  $: selectedService = services.find((service) => service.id === selectedServiceId) ?? null;
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="py-10 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-4xl">
      <div class="mb-8 text-center">
        <h2 class="mb-3 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
          {heading}
        </h2>
        <p class="mx-auto max-w-2xl text-gray-600 sm:text-lg dark:text-gray-400">
          {subheading}
        </p>
      </div>

      {#if !websiteId}
        <div class="p-5 text-sm text-amber-800 bg-amber-50 rounded-lg border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200">
          {#if cmsPreview}
            Booking preview requires a website context.
          {:else}
            Booking is unavailable right now.
          {/if}
        </div>
      {:else}
        <div class="space-y-6">
          <article class="p-5 bg-white rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Step 1 - Choose service</h3>

            {#if loadingServices}
              <p class="text-sm text-gray-500 dark:text-gray-400">Loading services...</p>
            {:else if servicesError}
              <p class="text-sm text-red-600 dark:text-red-400">{servicesError}</p>
            {:else if !services.length}
              <p class="text-sm text-gray-500 dark:text-gray-400">No booking services are available yet.</p>
            {:else}
              <div class="grid gap-3 sm:grid-cols-2">
                {#each services as service (service.id)}
                  <button
                    type="button"
                    class={getServiceButtonClass(service.id)}
                    on:click={() => onSelectService(service.id)}
                  >
                    <div class="font-semibold">{service.name}</div>
                    <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">{service.durationMinutes} minutes</div>
                  </button>
                {/each}
              </div>
            {/if}
          </article>

          <article class="p-5 bg-white rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Step 2 - Choose date and time</h3>

            <div class="mb-4 max-w-xs">
              <label for="booking-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
              <input
                id="booking-date"
                type="date"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedDate}
                min={minSelectableDate}
                on:change={onDateChange}
                disabled={!selectedServiceId || loadingServices || !services.length}
              />
            </div>

            {#if !selectedServiceId}
              <p class="text-sm text-gray-500 dark:text-gray-400">Select a service to view available times.</p>
            {:else if !selectedDate}
              <p class="text-sm text-gray-500 dark:text-gray-400">Choose a date to load available times.</p>
            {:else if loadingSlots}
              <p class="text-sm text-gray-500 dark:text-gray-400">Loading available times...</p>
            {:else if slotsError}
              <p class="text-sm text-red-600 dark:text-red-400">{slotsError}</p>
            {:else if !slots.length}
              <p class="text-sm text-gray-500 dark:text-gray-400">No available times for this date.</p>
            {:else}
              <div class="flex flex-wrap gap-2">
                {#each slots as slot}
                  <button
                    type="button"
                    class={getSlotButtonClass(slot)}
                    on:click={() => onSelectTime(slot)}
                  >
                    {slot}
                  </button>
                {/each}
              </div>
            {/if}
          </article>

          <article class="p-5 bg-white rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Step 3 - Your details</h3>

            {#if selectedService && selectedDate && selectedTime}
              <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Requesting: <strong>{selectedService.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
              </p>
            {:else}
              <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Complete Steps 1 and 2 before submitting your request.
              </p>
            {/if}

            {#if submitSuccess}
              <div class="p-4 mb-4 text-sm text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-200">
                {submitSuccess}
              </div>
            {/if}

            {#if submitWarning}
              <div class="p-4 mb-4 text-sm text-amber-800 bg-amber-50 rounded-lg border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200">
                {submitWarning}
              </div>
            {/if}

            {#if submitError}
              <div class="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                {submitError}
              </div>
            {/if}

            <form class="space-y-4" on:submit={submitBookingRequest}>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="booking-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                  <input
                    id="booking-name"
                    type="text"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    bind:value={name}
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label for="booking-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                  <input
                    id="booking-email"
                    type="email"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    bind:value={email}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label for="booking-phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone (optional)</label>
                <input
                  id="booking-phone"
                  type="text"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  bind:value={phone}
                  disabled={submitting}
                />
              </div>

              <div>
                <label for="booking-notes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Notes (optional)</label>
                <textarea
                  id="booking-notes"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  bind:value={notes}
                  disabled={submitting}
                ></textarea>
              </div>

              <button
                type="submit"
                class="py-2.5 px-5 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={submitting || !selectedServiceId || !selectedDate || !selectedTime}
              >
                {submitting ? 'Submitting...' : 'Request appointment'}
              </button>
            </form>
          </article>
        </div>
      {/if}
    </div>
  </div>
</section>
