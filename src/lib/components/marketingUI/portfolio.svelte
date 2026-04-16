<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet portfolioDefault(p)}
<section class="bg-white antialiased dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-x-20 gap-y-12 text-center sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      {#each p.items ?? [] as item}
        <div class="space-y-4">
          {#if item.badge}
            <span class="inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-300">
              {item.badge}
            </span>
          {/if}
          <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <p class="text-lg text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
          <a
            href={item.ctaHref}
            class="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            role="button"
          >
            {item.ctaLabel}
            <svg aria-hidden="true" class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet portfolioAlternateSections(p)}
<section class="bg-white antialiased dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
    </div>

    <div class="mt-12 space-y-16 sm:mt-16">
      {#each p.items ?? [] as item}
        <div class={`flex flex-col gap-y-8 sm:gap-y-12 lg:items-center lg:gap-x-16 xl:gap-x-24 ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          <div class="w-full">
            <img class="w-full rounded-lg object-cover shadow-lg dark:hidden" src={item.imageLight} alt={item.imageAlt} />
            <img class="hidden w-full rounded-lg object-cover shadow-lg dark:block" src={item.imageDark} alt={item.imageAlt} />
          </div>

          <div class="w-full shrink-0 space-y-6 lg:max-w-lg xl:max-w-2xl">
            <div class="space-y-3">
              <h3 class="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white">
                {item.title}
              </h3>
              {#if item.websiteHref && item.websiteLabel}
                <a href={item.websiteHref} class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
                  {item.websiteLabel}
                  <svg aria-hidden="true" class="ml-2.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              {/if}
              <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                {item.description}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              {#each item.techItems ?? [] as tech}
                <img class="h-8 w-auto rounded-lg object-contain p-1 hover:bg-gray-50 dark:hover:bg-gray-800" src={tech.logo} alt={tech.name} title={tech.name} />
              {/each}
            </div>

            <a
              href={item.ctaHref}
              class="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              role="button"
            >
              {item.ctaLabel}
              <svg aria-hidden="true" class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet portfolioGridImageCTA(p)}
<section class="bg-white antialiased dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      {#each p.items ?? [] as item}
        <article class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <img class="h-56 w-full object-cover dark:hidden" src={item.imageLight} alt={item.imageAlt} />
          <img class="hidden h-56 w-full object-cover dark:block" src={item.imageDark} alt={item.imageAlt} />
          <div class="space-y-4 p-6">
            <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">{item.title}</h3>
            <p class="text-base text-gray-500 dark:text-gray-400">{item.description}</p>
            <a
              href={item.ctaHref}
              class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              {item.ctaLabel}
              <svg aria-hidden="true" class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet portfolioCarousel(p)}
<section class="bg-white antialiased dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
    </div>

    <div class="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:mt-16">
      {#each p.items ?? [] as item}
        <article class="min-w-[300px] flex-1 snap-start overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <img class="h-56 w-full object-cover dark:hidden" src={item.imageLight} alt={item.imageAlt} />
          <img class="hidden h-56 w-full object-cover dark:block" src={item.imageDark} alt={item.imageAlt} />
          <div class="space-y-3 p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
            <p class="text-base text-gray-500 dark:text-gray-400">{item.description}</p>
            {#if item.linkHref && item.linkLabel}
              <a href={item.linkHref} class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                {item.linkLabel}
                <svg aria-hidden="true" class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet portfolioFeatureFull(p)}
<section class="bg-white antialiased dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
      <p class="mt-4 text-base text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
    </div>

    <div class="mt-12 space-y-12 sm:mt-16">
      {#each p.items ?? [] as item}
        <div class="space-y-8 lg:space-y-12">
          <img class="h-auto w-full rounded-lg object-cover object-top shadow-lg dark:hidden" src={item.imageLight} alt={item.imageAlt} />
          <img class="hidden h-auto w-full rounded-lg object-cover object-top shadow-lg dark:block" src={item.imageDark} alt={item.imageAlt} />

          <div class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white">
                {item.title}
              </h3>
              {#if item.linkHref && item.linkLabel}
                <a href={item.linkHref} class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
                  {item.linkLabel}
                  <svg aria-hidden="true" class="ml-2.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              {/if}
              {#each item.paragraphs ?? [] as paragraph}
                <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  {paragraph.content}
                </p>
              {/each}
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              {#each item.techItems ?? [] as tech}
                <img class="h-8 w-auto rounded-lg object-contain p-1 hover:bg-gray-50 dark:hover:bg-gray-800" src={tech.logo} alt={tech.name} title={tech.name} />
              {/each}
            </div>

            <a
              href={item.ctaHref}
              class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              role="button"
            >
              {item.ctaLabel}
              <svg aria-hidden="true" class="ml-2 h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'portfolioDefault'}
  {@render portfolioDefault(data)}
{:else if variant === 'portfolioAlternateSections'}
  {@render portfolioAlternateSections(data)}
{:else if variant === 'portfolioGridImageCTA'}
  {@render portfolioGridImageCTA(data)}
{:else if variant === 'portfolioCarousel'}
  {@render portfolioCarousel(data)}
{:else if variant === 'portfolioFeatureFull'}
  {@render portfolioFeatureFull(data)}
{/if}
