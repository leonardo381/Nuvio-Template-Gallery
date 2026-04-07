<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet testimonialBlockquote(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
    <figure class="max-w-screen-md mx-auto">
      <svg class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
      </svg>
      <blockquote>
        <p class="text-2xl font-medium text-gray-900 dark:text-white">"{p.quote}"</p>
      </blockquote>
      <figcaption class="flex items-center justify-center mt-6 space-x-3">
        <img class="w-6 h-6 rounded-full" src={p.avatar.src} alt={p.avatar.alt}>
        <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <div class="pr-3 font-medium text-gray-900 dark:text-white">{p.name}</div>
          <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{p.role}</div>
        </div>
      </figcaption>
    </figure>
  </div>
</section>
{/snippet}

{#snippet testimonialCards(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-sm">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">{p.subheading}</p>
    </div>
    <div class="grid mb-8 lg:mb-12 lg:grid-cols-2">
      {#each p.cards as card}
      <figure class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
        <blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
          <div class="my-4">{@html card.body}</div>
        </blockquote>
        <figcaption class="flex justify-center items-center space-x-3">
          <img class="w-9 h-9 rounded-full" src={card.avatar.src} alt={card.avatar.alt}>
          <div class="space-y-0.5 font-medium dark:text-white text-left">
            <div>{card.name}</div>
            <div class="text-sm font-light text-gray-500 dark:text-gray-400">{card.role}</div>
          </div>
        </figcaption>
      </figure>
      {/each}
    </div>
    <div class="text-center">
      <a href={p.showMoreHref} class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{p.showMoreLabel}</a>
    </div>
  </div>
</section>
{/snippet}

{#snippet testimonialTabs(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="gap-16 py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-3 lg:py-16 lg:px-6">
    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
      <ul class="block mb-3 space-y-4 sm:flex sm:space-y-0 lg:space-y-4 lg:block" id="testimonialTab" role="tablist">
        {#each p.tabs as tab, i}
        <li class="md:mr-2 lg:mr-0" role="presentation">
          <button class="p-4 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" id="testimonial-{i+1}-tab" type="button" role="tab" aria-controls="testimonial-{i+1}" aria-selected={i === 0 ? 'true' : 'false'}>
            <figcaption class="space-y-2">
              <div class="flex space-x-2.5">
                <img class="w-6 h-6 rounded-full" src={tab.avatar.src} alt={tab.avatar.alt}>
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{tab.name}</div>
              </div>
              <div class="text-sm font-light text-left text-gray-500 dark:text-gray-400">{tab.role}</div>
            </figcaption>
          </button>
        </li>
        {/each}
      </ul>
      <a class="inline-flex items-center pl-4 text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700" href={p.viewMoreHref}>
        {p.viewMoreLabel}
        <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
    <div class="col-span-2 mt-4 divide-y divide-gray-200 dark:divide-gray-700 lg:mt-0">
      <div id="testimonialTabContent">
        {#each p.tabs as tab, i}
        <div class="{i === 0 ? '' : 'hidden'} p-4 rounded-lg" id="testimonial-{i+1}" role="tabpanel" aria-labelledby="testimonial-{i+1}-tab">
          <svg class="mb-3 h-8 text-gray-500 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg>
          <h3 class="mb-3 text-2xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">{tab.title}</h3>
          <div class="text-lg font-light leading-relaxed text-gray-500 dark:text-gray-400">{@html tab.body}</div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet testimonialCarousel(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-sm mb-8 lg:mb-16">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.subheading}</p>
    </div>
    <div id="testimonial-carousel" class="relative" data-carousel="slide">
      <div class="overflow-x-hidden overflow-y-visible relative mx-auto max-w-screen-md h-52 rounded-lg sm:h-48">
        {#each p.items as item}
        <figure class="hidden mx-auto w-full max-w-screen-md" data-carousel-item>
          <blockquote>
            <p class="text-lg font-medium text-gray-900 sm:text-2xl dark:text-white">"{item.quote}"</p>
          </blockquote>
          <figcaption class="flex justify-center items-center mt-6 space-x-3">
            <img class="w-6 h-6 rounded-full" src={item.avatar.src} alt={item.avatar.alt}>
            <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div class="pr-3 font-medium text-gray-900 dark:text-white">{item.name}</div>
              <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{item.role}</div>
            </div>
          </figcaption>
        </figure>
        {/each}
      </div>
      <div class="flex justify-center items-center">
        <button type="button" class="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
          <span class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
            <span class="hidden">Previous</span>
          </span>
        </button>
        <button type="button" class="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
          <span class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="hidden">Next</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet testimonialGrid(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 font-light text-gray-500 lg:mb-16 dark:text-gray-400 sm:text-xl">{p.subheading}</p>
    </div>
    <div class="grid gap-8 lg:grid-cols-3">
      {#each p.items as item}
      <figure class="p-6 bg-gray-50 rounded dark:bg-gray-800">
        <blockquote class="text-sm text-gray-500 dark:text-gray-400">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
          <p class="my-4">{item.body}</p>
        </blockquote>
        <figcaption class="flex items-center space-x-3">
          <img class="w-9 h-9 rounded-full" src={item.avatar.src} alt={item.avatar.alt}>
          <div class="space-y-0.5 font-medium dark:text-white">
            <div>{item.name}</div>
            <div class="text-sm font-light text-gray-500 dark:text-gray-400">{item.role}</div>
          </div>
        </figcaption>
      </figure>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'testimonialBlockquote'}
  {@render testimonialBlockquote(data)}
{:else if variant === 'testimonialCards'}
  {@render testimonialCards(data)}
{:else if variant === 'testimonialTabs'}
  {@render testimonialTabs(data)}
{:else if variant === 'testimonialCarousel'}
  {@render testimonialCarousel(data)}
{:else if variant === 'testimonialGrid'}
  {@render testimonialGrid(data)}
{/if}
