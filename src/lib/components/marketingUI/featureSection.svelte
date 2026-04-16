<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet featureSectionFeatureList(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mb-8 max-w-screen-md lg:mb-16">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
      {#each p.items ?? [] as item}
        <div>
          <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <svg class="h-5 w-5 text-primary-600 lg:h-6 lg:w-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
          <p class="text-gray-500 dark:text-gray-400">{item.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionFeatureListImageCTAs(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto grid max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 lg:grid-cols-2 lg:px-6 xl:gap-16">
    <img class="mb-4 w-full rounded-lg lg:mb-0" src={p.image} alt={p.imageAlt}>
    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 lg:text-xl">{p.description}</p>
      <div class="mb-6 border-y border-gray-200 py-8 dark:border-gray-700">
        {#each p.items ?? [] as item}
          <div class="flex {item !== (p.items ?? [])[0] ? 'pt-8' : ''}">
            <div class="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
              <svg class="h-5 w-5 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p class="mb-2 text-gray-500 dark:text-gray-400">{item.description}</p>
              <a href={item.link} class="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-400">
                {item.linkLabel}
                <svg class="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        {/each}
      </div>
      <p class="text-sm">{p.footnote}</p>
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionFeatureListCTAs(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center sm:py-16 lg:px-6">
    <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
    <p class="text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    <div class="mt-8 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:mt-12 lg:grid-cols-3">
      {#each p.items ?? [] as item}
        <div>
          <svg class="mx-auto mb-4 h-12 w-12 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
          <p class="mb-4 text-gray-500 dark:text-gray-400">{item.description}</p>
          <a href={item.link} class="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400">
            {item.linkLabel}
            <svg class="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionFeatureListSubList(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mb-8 max-w-screen-md lg:mb-16">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 lg:grid-cols-3 xl:gap-12">
      {#each p.categories ?? [] as category}
        <div>
          <div class="mb-4 flex h-10 w-10 items-center justify-center rounded bg-primary-100 lg:h-16 lg:w-16 dark:bg-primary-900">
            <svg class="h-5 w-5 text-primary-600 lg:h-8 lg:w-8 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
          {#if category.description}
            <p class="mb-4 text-gray-500 dark:text-gray-400">{category.description}</p>
          {/if}
          <ul role="list" class="space-y-3">
            {#each category.points ?? [] as point}
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-base text-gray-700 dark:text-gray-300">{point.label}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionFeatureListIconsCTA(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto grid max-w-screen-xl gap-8 px-4 py-8 sm:py-16 lg:grid-cols-2 lg:px-6 xl:gap-16">
    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 font-light lg:text-xl">{p.description}</p>
      <ul role="list" class="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
        {#each p.points ?? [] as point}
          <li class="flex gap-3">
            <svg class="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">{point.label}</span>
          </li>
        {/each}
      </ul>
      <a href={p.link} class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        {p.ctaLabel}
        <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>
    </div>
    <img class="hidden w-full rounded-lg lg:flex" src={p.image} alt={p.imageAlt}>
  </div>
</section>
{/snippet}

{#snippet featureSectionFeatureListDescrIcons(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">{p.heading}</h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      {#each p.items ?? [] as item}
        <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
            <svg class="h-6 w-6 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
          <p class="text-gray-500 dark:text-gray-400">{item.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionFeatureListCards(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">{p.heading}</h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
      {#each p.cards ?? [] as card}
        <article class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {#if card.image}
            <img class="h-44 w-full object-cover" src={card.image} alt={card.imageAlt} />
          {/if}
          <div class="space-y-3 p-6">
            {#if card.badge}
              <span class="inline-flex rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">{card.badge}</span>
            {/if}
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{card.title}</h3>
            <p class="text-gray-500 dark:text-gray-400">{card.description}</p>
            <a href={card.link} class="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400">
              {card.linkLabel}
              <svg class="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionAlternateImage(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">{p.heading}</h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>

    <div class="mt-12 space-y-12 lg:mt-16">
      {#each p.items ?? [] as item}
        <div class={`grid items-center gap-8 xl:gap-16 lg:grid-cols-2 ${item.reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>img]:order-1' : ''}`}>
          <div class="text-gray-500 sm:text-lg dark:text-gray-400">
            <h3 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{item.title}</h3>
            <p class="mb-6 lg:text-xl">{item.description}</p>
            <ul role="list" class="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
              {#each item.points ?? [] as point}
                <li class="flex gap-3">
                  <svg class="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">{point.label}</span>
                </li>
              {/each}
            </ul>
            <a href={item.link} class="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-400">
              {item.linkLabel}
              <svg class="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
          <img class="w-full rounded-lg" src={item.image} alt={item.imageAlt}>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionCTAcards(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="grid space-y-8 lg:grid-cols-2 lg:gap-12 lg:space-y-0">
      <div>
        <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
        <p class="mb-4 text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
        <a href={p.link} class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 sm:text-lg font-medium">
          {p.linkLabel}
          <svg class="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
        </a>
      </div>
      <div>
        {#each p.cards ?? [] as card}
          <a href={card.link} class="mb-6 flex items-center justify-between rounded-lg border-l-8 border-primary-600 bg-white p-4 shadow hover:bg-gray-50 dark:border-primary-500 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div>
              <span class="mb-1 block text-xs font-medium uppercase text-gray-500 dark:text-gray-400">{card.eyebrow}</span>
              <span class="text-xl font-semibold text-primary-600 dark:text-primary-500">{card.title}</span>
            </div>
            <svg class="h-6 w-6 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet featureSectionRoundedIcons(p)}
<section class="bg-white antialiased dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">{p.heading}</h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>

    <div class="mt-8 rounded-lg bg-gray-50 p-4 sm:p-12 lg:mt-16 dark:bg-gray-800">
      <div class="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
        {#each p.items ?? [] as item}
          <div class="flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 lg:h-24 lg:w-24 dark:bg-gray-700">
              <svg class="h-10 w-10 text-primary-600 lg:h-12 lg:w-12 dark:text-primary-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2 2 2m-2-2V6m-7 8a9 9 0 1118 0 9 9 0 01-18 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">{item.title}</h3>
              <p class="mt-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">{item.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-8 text-center lg:mt-16">
      <a href={p.link} class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button">
        {p.ctaLabel}
        <svg aria-hidden="true" class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'featureSectionFeatureList'}
  {@render featureSectionFeatureList(data)}
{:else if variant === 'featureSectionFeatureListImageCTAs'}
  {@render featureSectionFeatureListImageCTAs(data)}
{:else if variant === 'featureSectionFeatureListCTAs'}
  {@render featureSectionFeatureListCTAs(data)}
{:else if variant === 'featureSectionFeatureListSubList'}
  {@render featureSectionFeatureListSubList(data)}
{:else if variant === 'featureSectionFeatureListIconsCTA'}
  {@render featureSectionFeatureListIconsCTA(data)}
{:else if variant === 'featureSectionFeatureListDescrIcons'}
  {@render featureSectionFeatureListDescrIcons(data)}
{:else if variant === 'featureSectionFeatureListCards'}
  {@render featureSectionFeatureListCards(data)}
{:else if variant === 'featureSectionAlternateImage'}
  {@render featureSectionAlternateImage(data)}
{:else if variant === 'featureSectionCTAcards'}
  {@render featureSectionCTAcards(data)}
{:else if variant === 'featureSectionRoundedIcons'}
  {@render featureSectionRoundedIcons(data)}
{/if}
