<script lang="ts">
  import { page } from '$app/stores';
  import { registerWhatsAppInteraction } from '$lib/utils/interactions';
  import {
    sanitizeWhatsAppPhone,
    resolveWhatsAppMessage,
    buildWhatsAppLink
  } from '$lib/utils/whatsapp';

  export let variant: string = '';
  export let data: Record<string, any> = {};

  function isTrue(value: unknown) {
    return value === true;
  }

  function getWebsiteSettings() {
    return ($page.data?.websiteSettings ?? {}) as Record<string, any>;
  }

  function getWhatsAppSettings() {
    return getWebsiteSettings().whatsapp ?? {};
  }

  function isWhatsAppFeatureEnabled() {
    const settings = getWebsiteSettings();
    const featureFlagEnabled = settings.featureFlags?.whatsapp;
    return isTrue(getWhatsAppSettings().enabled) && featureFlagEnabled !== false;
  }

  function isWhatsAppButtonVisible() {
    return isTrue(getWhatsAppSettings().showFloatingButton);
  }

  function getResolvedWhatsAppPhone(localData: Record<string, any>) {
    const globalPhone = getWhatsAppSettings().phone ?? '';
    return sanitizeWhatsAppPhone(localData.whatsappPhone ?? localData.phone ?? globalPhone);
  }

  function getResolvedWhatsAppMessage(localData: Record<string, any>) {
    const localMessage = localData.whatsappMessage ?? localData.message ?? '';
    const globalMessage = getWhatsAppSettings().defaultMessage ?? '';
    return resolveWhatsAppMessage(localMessage, globalMessage);
  }

  function getResolvedWhatsAppLink(localData: Record<string, any>) {
    return buildWhatsAppLink(
      getResolvedWhatsAppPhone(localData),
      getResolvedWhatsAppMessage(localData)
    );
  }

  function shouldShowWhatsAppButton(localData: Record<string, any>) {
    return (
      isWhatsAppFeatureEnabled() &&
      isWhatsAppButtonVisible() &&
      !!getResolvedWhatsAppLink(localData)
    );
  }

  function onWhatsAppClick(event: MouseEvent, localData: Record<string, any>) {
    const link = getResolvedWhatsAppLink(localData);

    event.preventDefault();

    if (!shouldShowWhatsAppButton(localData) || !link) {
      return;
    }

    const websiteId = $page.data?.website?.id ?? '';
    const currentPath = $page.url?.pathname ?? '/features';
    const trackingPayload = {
      website: websiteId,
      source: localData.source ?? 'feature_whatsapp',
      page: currentPath
    };

    const popup = window.open(link, '_blank', 'noopener,noreferrer');

    if (popup) {
      popup.opener = null;
    }
    
    registerWhatsAppInteraction(trackingPayload);
  }

  function getContactFormSettings() {
    return getWebsiteSettings().contactForm ?? {};
  }

  function isContactFormFeatureEnabled() {
    const settings = getWebsiteSettings();
    const featureFlagEnabled = settings.featureFlags?.contactForm;
    return isTrue(getContactFormSettings().enabled) && featureFlagEnabled !== false;
  }

  function shouldRenderContactPhoneField() {
    return isTrue(getContactFormSettings().fields?.phone);
  }

  function getContactFormState() {
    return ($page.form?.contactForm ?? {}) as Record<string, any>;
  }

  function getContactFieldValue(fieldName: string) {
    const values = getContactFormState().values ?? {};
    const value = values[fieldName];
    return typeof value === 'string' ? value : '';
  }

  function getContactFieldError(fieldName: string) {
    const errors = getContactFormState().errors ?? {};
    const error = errors[fieldName];
    return typeof error === 'string' ? error : '';
  }

  function getContactGeneralError() {
    const error = getContactFormState().error;
    return typeof error === 'string' ? error : '';
  }

  function isContactFormSuccess() {
    return getContactFormState().ok === true;
  }

  function getContactConfirmationMessage() {
    const stateMessage = getContactFormState().message;
    if (typeof stateMessage === 'string' && stateMessage.trim()) {
      return stateMessage;
    }

    const settingsMessage = getContactFormSettings().confirmationMessage;
    if (typeof settingsMessage === 'string' && settingsMessage.trim()) {
      return settingsMessage;
    }

    return 'Your message has been sent successfully.';
  }
</script>

{#snippet featureWhatsApp(p)}
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">{p.heading ?? "Start your free trial today"}</h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">{p.description ?? "Try Flowbite Platform for 30 days. No credit card required."}</p>
            {#if shouldShowWhatsAppButton(p)}
              <a
                href={getResolvedWhatsAppLink(p)}
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

{#snippet featureContact(p)}
{#if isContactFormFeatureEnabled()}
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
        {#if isContactFormSuccess()}
          <div class="mb-6 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 dark:text-green-200">
            {getContactConfirmationMessage()}
          </div>
        {/if}

        {#if getContactGeneralError()}
          <div class="mb-6 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-200">
            {getContactGeneralError()}
          </div>
        {/if}

        <form method="POST" action="?/contact" class="space-y-6">
          <div>
            <label for="contact-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={getContactFieldValue('name')}
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
            {#if getContactFieldError('name')}
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{getContactFieldError('name')}</p>
            {/if}
          </div>

          <div>
            <label for="contact-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={getContactFieldValue('email')}
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
            {#if getContactFieldError('email')}
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{getContactFieldError('email')}</p>
            {/if}
          </div>

          {#if shouldRenderContactPhoneField()}
            <div>
              <label for="contact-phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={getContactFieldValue('phone')}
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
            >{getContactFieldValue('message')}</textarea>
            {#if getContactFieldError('message')}
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{getContactFieldError('message')}</p>
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
