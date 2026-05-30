<script lang="ts">
  import { sanitizeEmbedUrl, sanitizeHref, sanitizeImageUrl } from '$lib/utils/sanitizeHtml';

  export let variant: string = '';
  export let data: Record<string, any> = {};

  const safeHref = (value: unknown, fallback: string | undefined = undefined) =>
    sanitizeHref(value) || fallback;

  const safeImage = (value: unknown) => sanitizeImageUrl(value) || undefined;

  const safeEmbed = (value: unknown) => sanitizeEmbedUrl(value) || undefined;
</script>

{#snippet contentSectionHeadingDescr(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
    <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-4 font-light">{p.description}</p>
      <p class="mb-4 font-medium">{p.highlightText}</p>
      <a href={safeHref(p.link)} class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
        {p.linkLabel}
        <svg class="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
  </div>
</section>
{/snippet}

{#snippet contentSectionHeadingImageDescr(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto grid max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid-cols-2 lg:px-6 lg:py-16">
    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-4">{p.descriptionOne}</p>
      <p>{p.descriptionTwo}</p>
    </div>
    <div class="mt-8 grid grid-cols-2 gap-4">
      <img class="w-full rounded-lg" src={safeImage(p.imageOne)} alt={p.imageOneAlt}>
      <img class="mt-4 w-full rounded-lg lg:mt-10" src={safeImage(p.imageTwo)} alt={p.imageTwoAlt}>
    </div>
  </div>
</section>
{/snippet}

{#snippet contentSectionVideo(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
    <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
    <p class="text-gray-500 sm:text-lg md:px-20 lg:px-38 xl:px-48 dark:text-gray-400">{p.description}</p>
    {#if safeEmbed(p.video)}
      <iframe class="mx-auto mt-8 h-64 w-full max-w-2xl rounded-lg sm:h-96 lg:mt-12" src={safeEmbed(p.video)} title={p.videoTitle} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    {/if}
  </div>
</section>
{/snippet}

{#snippet contentSectionImageGallery(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
    <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
    <p class="text-gray-500 sm:text-lg md:px-20 lg:px-38 xl:px-48 dark:text-gray-400">{p.description}</p>
    <div class="mt-8 gap-4 sm:mt-12 sm:grid sm:grid-cols-4">
      {#each p.images ?? [] as item, i}
        <img
          class={`rounded-lg ${
            i === 0 ? 'col-span-2 mb-4 sm:mb-0' :
            i === 4 ? 'col-span-2' :
            'hidden col-span-1 sm:block'
          }`}
          src={safeImage(item.image)}
          alt={item.imageAlt}
        >
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet contentSectionHeadingDescr2col(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto grid max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid-cols-2 lg:px-6 lg:py-16">
    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-4">{p.leftDescription}</p>
      <a href={safeHref(p.link)} class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
        {p.linkLabel}
        <svg class="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
    <div class="mt-4 text-gray-500 sm:text-lg lg:mt-0 dark:text-gray-400">
      <p class="mb-4">{p.rightDescriptionOne}</p>
      <p>{p.rightDescriptionTwo}</p>
    </div>
  </div>
</section>
{/snippet}

{#snippet contentSectionSocialProof(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-6 lg:py-16">
    <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl dark:text-white">{p.heading}</h2>
    <p class="text-gray-500 sm:px-8 sm:text-lg lg:px-32 xl:px-64 dark:text-gray-400">{p.description}</p>
    <dl class="mx-auto mt-8 grid max-w-screen-md grid-cols-2 gap-8 text-gray-900 sm:grid-cols-3 lg:mt-14 dark:text-white">
      {#each p.stats ?? [] as stat}
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-4xl font-extrabold">{stat.value}</dt>
          <dd class="text-xl font-normal text-gray-500 dark:text-gray-400">{stat.label}</dd>
        </div>
      {/each}
    </dl>
  </div>
</section>
{/snippet}

{#snippet contentSectionCardImages(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
    <div class="text-center text-gray-900">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl dark:text-white">{p.heading}</h2>
      <a href={safeHref(p.link)} class="inline-flex items-center text-lg font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
        {p.linkLabel}
        <svg class="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14 lg:gap-12">
      {#each p.cards ?? [] as card}
        <div class="mb-2 flex md:mb-0 md:flex-col">
          <img class="mr-4 h-36 w-auto rounded-lg md:h-auto md:w-full" src={safeImage(card.image)} alt={card.imageAlt} />
          <div>
            <h3 class="mb-2.5 text-xl font-bold text-gray-900 md:mt-4 dark:text-white">{card.title}</h3>
            <p class="text-gray-500 dark:text-gray-400">{card.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet contentSectionTableContents(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 sm:py-16 lg:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
    </div>

    <div class="mx-auto mt-8 max-w-3xl space-y-5 rounded-lg border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
      {#each p.items ?? [] as item, i}
        <div class={i !== (p.items?.length ?? 0) - 1 ? 'border-b border-gray-200 pb-5 dark:border-gray-700' : ''}>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
          <p class="mt-1 text-base text-gray-500 dark:text-gray-400">{item.description}</p>
        </div>
      {/each}
    </div>

    <div class="mt-8 text-center">
      <a href={safeHref(p.link)} class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
        {p.linkLabel}
        <svg aria-hidden="true" class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>
{/snippet}

{#snippet contentSectionAll(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 sm:py-16 lg:py-24">
    <div class="text-center">
      <img class="mx-auto w-auto object-contain" src={safeImage(p.logo)} alt={p.logoAlt}>

      <div class="mt-4 flex flex-col items-center justify-center gap-4 sm:mt-5 sm:flex-row sm:gap-8">
        <a href={safeHref(p.linkOne)} class="inline-flex items-center text-base font-semibold leading-tight text-primary-600 hover:underline dark:text-primary-500">
          {p.linkOneLabel}
          <svg aria-hidden="true" class="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>

        <a href={safeHref(p.linkTwo)} class="inline-flex items-center text-base font-semibold leading-tight text-primary-600 hover:underline dark:text-primary-500">
          {p.linkTwoLabel}
          <svg aria-hidden="true" class="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </a>
      </div>
    </div>

    <div class="mx-auto mt-8 max-w-5xl lg:mt-16">
      <img class="w-full rounded-lg shadow-lg" src={safeImage(p.mainImage)} alt={p.mainImageAlt}>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div>
          <h3 class="text-2xl font-extrabold text-gray-900 dark:text-white">{p.overviewTitle}</h3>
          <p class="mt-2 text-lg text-gray-500 dark:text-gray-400">{p.overviewDescription}</p>
        </div>

        <ul class="mt-8 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {#each p.features ?? [] as feature}
            <li class="flex items-center gap-2.5">
              <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-base text-gray-500 dark:text-gray-400">{feature.label}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="space-y-8">
        {#each p.sections ?? [] as section}
          <div>
            <h3 class="text-2xl font-extrabold text-gray-900 dark:text-white">{section.title}</h3>
            <p class="mt-2 text-lg text-gray-500 dark:text-gray-400">{section.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'contentSectionHeadingDescr'}
  {@render contentSectionHeadingDescr(data)}
{:else if variant === 'contentSectionHeadingImageDescr'}
  {@render contentSectionHeadingImageDescr(data)}
{:else if variant === 'contentSectionVideo'}
  {@render contentSectionVideo(data)}
{:else if variant === 'contentSectionImageGallery'}
  {@render contentSectionImageGallery(data)}
{:else if variant === 'contentSectionHeadingDescr2col'}
  {@render contentSectionHeadingDescr2col(data)}
{:else if variant === 'contentSectionSocialProof'}
  {@render contentSectionSocialProof(data)}
{:else if variant === 'contentSectionCardImages'}
  {@render contentSectionCardImages(data)}
{:else if variant === 'contentSectionTableContents'}
  {@render contentSectionTableContents(data)}
{:else if variant === 'contentSectionAll'}
  {@render contentSectionAll(data)}
{/if}
