<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet socialProofDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl py-8 lg:py-16 px-4 mx-auto lg:px-6">
    <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">{p.title}</h2>
    <p class="max-w-2xl font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    <dl class="grid gap-8 mt-8 text-gray-900 sm:grid-cols-2 lg:gap-20 lg:mt-14 lg:grid-cols-4 dark:text-white">
      {#each p.stats as stat}
      <div class="flex flex-col">
        <dt class="mb-2 text-3xl md:text-4xl font-extrabold tracking-tight">{stat.value}</dt>
        <dd class="font-light text-gray-500 dark:text-gray-400">{stat.label}</dd>
      </div>
      {/each}
    </dl>
  </div>
</section>
{/snippet}

{#snippet socialProofCards(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="px-4 py-8 mx-auto max-w-screen-xl sm:py-16 lg:px-6 xl:px-0">
    <div class="mx-auto mb-8 max-w-screen-md text-center md:mb-16">
      <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl dark:text-white">{p.title}</h2>
    </div>
    <div class="mb-4 space-y-4 md:grid md:grid-cols-3 md:gap-4 xl:gap-16 md:space-y-0 md:mb-8">
      {#each p.cards as card}
      <div class="flex justify-center items-center p-6 text-center bg-gray-100 rounded xl:p-12 dark:bg-gray-800">
        <div class="text-gray-900 dark:text-white">
          <p class="mb-2 text-4xl font-extrabold md:text-5xl">{card.value}</p>
          <h3 class="mb-2 text-xl font-semibold">{card.title}</h3>
          <p class="font-light text-gray-500 dark:text-gray-400">{@html card.description}</p>
        </div>
      </div>
      {/each}
    </div>
    <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">{@html p.footnote}</p>
  </div>
</section>
{/snippet}

{#snippet socialProofIlustration(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 xl:gap-16 lg:py-16 lg:px-6">
    <div class="text-gray-500 sm:text-lg">
      <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl dark:text-white">{p.title}</h2>
      <p class="mb-8 font-light lg:text-xl dark:text-gray-400">{p.description}</p>
      <div class="grid gap-6 lg:grid-cols-1 dark:border-gray-700 sm:grid-cols-2">
        {#each p.stats as stat}
        <div class="flex">
          <div class="mr-4 shrink-0">
            {@html stat.iconSvg}
          </div>
          <div>
            <p class="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{stat.value}</p>
            <p class="font-light text-gray-500 dark:text-gray-400">{stat.description}</p>
          </div>
        </div>
        {/each}
      </div>
    </div>
    <img class="hidden mx-auto mb-4 sm:flex" src={p.image.src} alt={p.image.alt ?? ''}>
  </div>
</section>
{/snippet}

{#snippet socialProofCarousel(p)}
<section class="bg-white dark:bg-gray-900 lg:py-16 py-8">
  <div class="px-4 mx-auto mb-8 max-w-screen-md text-center md:mb-16 lg:px-0">
    <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl dark:text-white">{p.title}</h2>
    <div>
      <a href={p.link.href} class="inline-flex justify-center items-center text-base font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
        {p.link.label}
        <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
  </div>
  <div class="mx-auto max-w-screen-xl">
    <div id="animation-carousel" class="relative px-16 sm:px-24" data-carousel="slide">
      <div class="overflow-hidden relative h-48 rounded-lg sm:h-64 xl:h-80 2xl:h-80">
        {#each p.slides as slide}
        <div class="grid hidden absolute inset-0 gap-8 transition-all duration-700 ease-linear transform lg:grid-cols-2" data-carousel-item="">
          <img src={slide.src} class="block w-full h-full rounded-lg" alt={slide.alt ?? ''}>
          <img src={slide.srcDesktop} class="hidden w-full h-full rounded-lg lg:block" alt={slide.altDesktop ?? ''}>
        </div>
        {/each}
      </div>
      <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev="">
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 dark:group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span class="hidden">Previous</span>
        </span>
      </button>
      <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next="">
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 dark:group-focus:ring-white group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span class="hidden">Next</span>
        </span>
      </button>
    </div>
  </div>
  <dl class="grid grid-cols-2 gap-8 mx-auto mt-8 max-w-screen-xl text-gray-900 lg:mt-14 sm:grid-cols-3 xl:grid-cols-6 dark:text-white">
    {#each p.stats as stat}
    <div class="flex flex-col justify-center items-center">
      <dt class="mb-2 text-3xl font-extrabold md:text-4xl">{stat.value}</dt>
      <dd class="font-light text-gray-500 dark:text-gray-400">{stat.label}</dd>
    </div>
    {/each}
  </dl>
</section>
{/snippet}

{#snippet socialProofCTA(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-16 lg:px-6">
    <div class="col-span-2 mb-8">
      <p class="text-lg font-medium text-primary-600 dark:text-primary-500">{p.badge}</p>
      <h2 class="mt-3 mb-4 text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl dark:text-white">{p.title}</h2>
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      <div class="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
        {#each p.links as link}
        <div>
          <a href={link.href} class="inline-flex items-center text-base font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
            {link.label}
            <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>
        </div>
        {/each}
      </div>
    </div>
    <div class="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
      {#each p.features as feature}
      <div>
        {@html feature.iconSvg}
        <h3 class="mb-2 text-2xl font-bold dark:text-white">{feature.title}</h3>
        <p class="font-light text-gray-500 dark:text-gray-400">{feature.description}</p>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'socialProofDefault'}
  {@render socialProofDefault(data)}
{:else if variant === 'socialProofCards'}
  {@render socialProofCards(data)}
{:else if variant === 'socialProofIlustration'}
  {@render socialProofIlustration(data)}
{:else if variant === 'socialProofCarousel'}
  {@render socialProofCarousel(data)}
{:else if variant === 'socialProofCTA'}
  {@render socialProofCTA(data)}
{/if}
