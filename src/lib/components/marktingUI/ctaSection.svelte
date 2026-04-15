<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet ctaSectionDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="max-w-screen-md">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <p class="mb-8 text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <a href={p.primaryCtaHref} class="inline-flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2.5 text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
          {p.primaryCtaLabel}
        </a>
        <a href={p.secondaryCtaHref} class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
          {p.secondaryCtaLabel}
        </a>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet ctaSectionImage(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto grid max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid-cols-2 xl:gap-16 lg:px-6">
    <img class="w-full dark:hidden" src={p.imageLight} alt={p.imageAlt}>
    <img class="hidden w-full dark:block" src={p.imageDark} alt={p.imageAlt}>
    <div class="mt-4 md:mt-0">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        {p.description}
      </p>
      <a href={p.ctaHref} class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
        {p.ctaLabel}
        <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
  </div>
</section>
{/snippet}

{#snippet ctaSectionHeading(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-sm text-center">
      <h2 class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        {p.description}
      </p>
      <a href={p.ctaHref} class="mb-2 mr-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        {p.ctaLabel}
      </a>
    </div>
  </div>
</section>
{/snippet}

{#snippet ctaSectionQRcode(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-sm text-center">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <p class="mb-6 text-gray-500 md:text-lg lg:mb-8 dark:text-gray-400">
        {p.description}
      </p>
      <img src={p.qrImageLight} class="mx-auto w-56 dark:hidden" alt={p.qrImageAlt} />
      <img src={p.qrImageDark} class="mx-auto hidden w-56 dark:block" alt={p.qrImageAlt} />
    </div>
  </div>
</section>
{/snippet}

{#snippet ctaSectionEmail(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        {p.description}
      </p>
      <form action="#" class="mx-auto max-w-screen-sm">
        <div class="mb-3 flex items-center">
          <div class="relative mr-3 w-full">
            <label for="member_email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </div>
            <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder={p.emailPlaceholder} type="email" name="member[email]" id="member_email" required>
          </div>
          <div>
            <input type="submit" value={p.submitLabel} class="cursor-pointer rounded-lg bg-primary-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" name="member_submit" id="member_submit">
          </div>
        </div>
        <div class="text-left text-sm font-medium text-gray-500 dark:text-gray-300">
          {p.disclaimerPrefix}
          <a href={p.termsHref} class="text-primary-600 hover:underline dark:text-primary-500">{p.termsLabel}</a>
          and
          <a href={p.privacyHref} class="text-primary-600 hover:underline dark:text-primary-500">{p.privacyLabel}</a>.
        </div>
      </form>
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'ctaSectionDefault'}
  {@render ctaSectionDefault(data)}
{:else if variant === 'ctaSectionImage'}
  {@render ctaSectionImage(data)}
{:else if variant === 'ctaSectionHeading'}
  {@render ctaSectionHeading(data)}
{:else if variant === 'ctaSectionQRcode'}
  {@render ctaSectionQRcode(data)}
{:else if variant === 'ctaSectionEmail'}
  {@render ctaSectionEmail(data)}
{/if}
