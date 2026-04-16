<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet customerLogosDefault(p)}
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <h2 class="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">{p.heading}</h2>
        <div class="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
            {#each p.items as item}
            <a href={item.href} class="flex justify-center items-center">
                <img src={item.logo.src} alt={item.logo.alt} class="h-9 object-contain hover:opacity-75">
            </a>
            {/each}
        </div>
    </div>
</section>
{/snippet}

{#snippet customerLogosCards(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl">
    <h2 class="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 md:mb-8 lg:mb-16 dark:text-white md:text-4xl">
      {p.heading}
    </h2>
    <div class="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 xl:gap-8 sm:space-y-0 md:mb-8 md:mt-12">
      {#each p.items as item}
      <a href={item.href} class="block py-12 px-8 text-center bg-gray-50 rounded dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
        <img src={item.logo.src} alt={item.logo.alt} class="mx-auto h-9 object-contain">
        <p class="font-light text-gray-500 mt-3.5 mb-4">{item.since}</p>
        <span class="flex justify-center items-center text-base font-medium text-primary-600 dark:text-primary-500">
          Visit website
          <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
        </span>
      </a>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet customerLogosGrid(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="grid gap-8 py-8 px-4 mx-auto max-w-screen-xl sm:gap-16 lg:gap-20 md:grid-cols-2 lg:py-16 md:px-6">
      <div class="text-gray-500 sm:text-lg dark:text-gray-400 mb-8">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">{p.heading}</h2>
          <p class="font-light lg:text-xl">{p.description}</p>
      </div>
      <div class="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 dark:text-gray-400">
          {#each p.items as item}
          <a href={item.href} class="flex justify-center items-center">
              <img src={item.logo.src} alt={item.logo.alt} class="h-9 object-contain hover:opacity-75">
          </a>
          {/each}
      </div>
  </div>
</section>
{/snippet}

{#snippet customerLogosCardCTA(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl">
      <h2 class="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">{p.heading}</h2>
      <p class="mb-4 text-base font-light text-center text-gray-500 md:text-xl sm:px-14 md:px-24 lg:px-56 xl:px-72">{p.description}</p>
      <div class="justify-center space-y-2 space-x-0 sm:space-y-0 sm:space-x-6 sm:flex">
          {#each p.links as link}
          <a href={link.href} class="flex justify-center items-center text-base font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              {link.label}
              <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>
          {/each}
      </div>
      <div class="mt-6 space-y-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 xl:gap-8 md:space-y-0 md:mb-8 md:mt-12">
          {#each p.items as item}
          <a href={item.href} class="flex justify-center items-center p-8 text-center bg-gray-50 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800">
              <img src={item.logo.src} alt={item.logo.alt} class="h-9 object-contain">
          </a>
          {/each}
      </div>
  </div>
</section>
{/snippet}

{#snippet customerLogosGridCTA(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {p.heading}
      </h2>
      <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>
      <div class="mt-4">
        <a href={p.cta.href} class="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500">
          {p.cta.label}
          <svg aria-hidden="true" class="w-5 h-5 ml-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>

    <div class="grid grid-cols-2 mt-8 text-center gap-y-8 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 sm:gap-8 lg:mt-16">
      {#each p.items as item}
      <div>
        <div>
          <img class="object-contain w-auto h-12 mx-auto" src={item.logo.src} alt={item.logo.alt}>
          <p class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 mt-2.5">
            {item.since}
          </p>
        </div>
        <div class="mt-5">
          <a href={item.href}
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            role="button">
            <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Visit website
          </a>
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'customerLogosDefault'}
  {@render customerLogosDefault(data)}
{:else if variant === 'customerLogosCards'}
  {@render customerLogosCards(data)}
{:else if variant === 'customerLogosGrid'}
  {@render customerLogosGrid(data)}
{:else if variant === 'customerLogosCardCTA'}
  {@render customerLogosCardCTA(data)}
{:else if variant === 'customerLogosGridCTA'}
  {@render customerLogosGridCTA(data)}
{/if}
