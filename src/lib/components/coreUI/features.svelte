<script lang="ts">
  import { page } from '$app/stores';
  import { trackNuvioConversionEvent } from '$lib/analytics/events';
  import { registerWhatsAppInteraction } from '$lib/utils/interactions';
  import { normalizeWebsiteSettings } from '$lib/utils/website-settings';
  import {
    getResolvedWhatsAppLink,
    getResolvedWhatsAppPhone,
    getResolvedWhatsAppMessage,
    shouldShowWhatsAppButton
  } from '$lib/utils/whatsapp-settings';
  import {
    isContactFormFeatureEnabled,
    shouldRenderContactPhoneField,
    getContactFormState,
    getContactFieldValue,
    getContactFieldError,
    getContactGeneralError,
    isContactFormSuccess,
    getContactConfirmationMessage
  } from '$lib/utils/contact-form-state';

  export let variant: string = '';
  export let data: Record<string, any> = {};

  let websiteSettings: Record<string, any> = {};
  let contactFormState: Record<string, any> = {};
  let lastTrackedContactFormState: Record<string, any> | null = null;

  $: websiteSettings = normalizeWebsiteSettings(($page.data?.websiteSettings ?? {}) as Record<string, any>);
  $: contactFormState = getContactFormState(($page.form ?? {}) as Record<string, any>);
  $: if (isContactFormSuccess(contactFormState) && contactFormState !== lastTrackedContactFormState) {
    lastTrackedContactFormState = contactFormState;
    trackNuvioConversionEvent(
      'contact_form_submitted',
      {
        formType: 'contact',
        sourceBlock: variant || 'featureContact'
      },
      {
        websiteSettings,
        websiteSlug: asString($page.data?.website?.slug),
        pageType: 'features_page'
      }
    );
  }

  function asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  function onWhatsAppClick(event: MouseEvent, localData: Record<string, any>) {
    const link = getResolvedWhatsAppLink(localData, websiteSettings);

    event.preventDefault();

    if (!shouldShowWhatsAppButton(localData, websiteSettings) || !link) {
      return;
    }

    const websiteId = $page.data?.website?.id ?? '';
    const currentPath = $page.url?.pathname ?? '/features';
    const trackingPayload = {
      websiteId,
      website: websiteId,
      source: localData.source ?? 'floating_button',
      page: currentPath,
      phone: getResolvedWhatsAppPhone(localData, websiteSettings),
      message: getResolvedWhatsAppMessage(localData, websiteSettings)
    };

    trackNuvioConversionEvent(
      'whatsapp_click',
      {
        sourceBlock: asString(localData?.source) || variant || 'featureWhatsApp',
        ctaType: 'whatsapp'
      },
      {
        websiteSettings,
        websiteSlug: asString($page.data?.website?.slug),
        pageType: 'features_page'
      }
    );

    const trackingPromise = registerWhatsAppInteraction(trackingPayload);
    const popup = window.open(link, '_blank', 'noopener,noreferrer');

    if (popup) {
      popup.opener = null;
    }

    void trackingPromise;
  }
</script>

{#snippet featureWhatsApp(p: Record<string, any>)}
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">{p.heading ?? "Start your free trial today"}</h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">{p.description ?? "Try Flowbite Platform for 30 days. No credit card required."}</p>
            {#if shouldShowWhatsAppButton(p, websiteSettings)}
              <a
                href={getResolvedWhatsAppLink(p, websiteSettings)}
                target="_blank"
                rel="noopener noreferrer"
                on:click={(event) => onWhatsAppClick(event, p)}
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                {p.ctaLabel ?? p.buttonLabel ?? "Chat on WhatsApp"}
              </a>
            {/if}
        </div>
    </div>
</section>
{/snippet}

{#snippet featureContact(p: Record<string, any>)}
{#if isContactFormFeatureEnabled(websiteSettings)}
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="px-4 mx-auto max-w-screen-sm text-center lg:px-6 mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          {p.heading ?? p.title ?? 'Contact Us'}
        </h2>
        <p class="font-light text-gray-600 dark:text-gray-400 sm:text-xl">
          {p.subheading ?? p.description ?? 'Send us a message and our team will get back to you soon.'}
        </p>
      </div>

      <div class="mx-auto max-w-screen-md">
        {#if isContactFormSuccess(contactFormState)}
          <div class="mb-6 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 dark:text-green-200">
            {getContactConfirmationMessage(contactFormState, websiteSettings)}
          </div>
        {/if}

        {#if getContactGeneralError(contactFormState)}
          <div class="mb-6 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-200">
            {getContactGeneralError(contactFormState)}
          </div>
        {/if}

        <form method="POST" action="?/contact" class="space-y-6">
          <div>
            <label for="contact-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={getContactFieldValue(contactFormState, 'name')}
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
            {#if getContactFieldError(contactFormState, 'name')}
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{getContactFieldError(contactFormState, 'name')}</p>
            {/if}
          </div>

          <div>
            <label for="contact-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={getContactFieldValue(contactFormState, 'email')}
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
            {#if getContactFieldError(contactFormState, 'email')}
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{getContactFieldError(contactFormState, 'email')}</p>
            {/if}
          </div>

          {#if shouldRenderContactPhoneField(websiteSettings)}
            <div>
              <label for="contact-phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={getContactFieldValue(contactFormState, 'phone')}
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          {/if}

          <div>
            <label for="contact-message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            >{getContactFieldValue(contactFormState, 'message')}</textarea>
            {#if getContactFieldError(contactFormState, 'message')}
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{getContactFieldError(contactFormState, 'message')}</p>
            {/if}
          </div>

          <button
            type="submit"
            class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {p.submitLabel ?? p.buttonLabel ?? 'Send message'}
          </button>
        </form>
      </div>
    </div>
  </section>
{/if}
{/snippet}

{#if variant === 'featureWhatsApp'}
  {@render featureWhatsApp(data)}
{:else if variant === 'featureContact'}
  {@render featureContact(data)}
{/if}
