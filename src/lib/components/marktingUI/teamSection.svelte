<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet teamSectionDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
    <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
      {#each p.members as member}
      <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
        <a href={member.image.href ?? '#'}>
          <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={member.image.src} alt={member.image.alt ?? ''}>
        </a>
        <div class="p-5">
          <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href={member.nameHref ?? '#'}>{member.name}</a>
          </h3>
          <span class="text-gray-500 dark:text-gray-400">{member.role}</span>
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{member.bio}</p>
          <ul class="flex space-x-4 sm:mt-0">
            {#each member.social as link}
            <li>
              <a href={link.href} class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {@html link.iconSvg}
              </a>
            </li>
            {/each}
          </ul>
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionClean(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
    <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each p.members as member}
      <div class="text-center text-gray-500 dark:text-gray-400">
        <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={member.image.src} alt={member.image.alt ?? ''}>
        <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href={member.nameHref ?? '#'}>{member.name}</a>
        </h3>
        <p>{member.role}</p>
        <ul class="flex justify-center mt-4 space-x-4">
          {#each member.social as link}
          <li>
            <a href={link.href} class="hover:text-gray-900 dark:hover:text-white">
              {@html link.iconSvg}
            </a>
          </li>
          {/each}
        </ul>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionDescription(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="grid gap-16 py-8 px-4 mx-auto max-w-screen-xl lg:grid-cols-2 lg:py-16 lg:px-6">
    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      <p class="mb-2 md:text-lg">{p.description1}</p>
      <p class="font-light md:text-lg">{p.description2}</p>
    </div>
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      {#each p.members as member}
      <div class="flex flex-col items-center py-8 sm:flex-row">
        <img class="mx-auto mb-4 w-36 h-36 rounded-full sm:ml-0 sm:mr-6" src={member.image.src} alt={member.image.alt ?? ''}>
        <div class="text-center sm:text-left">
          <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href={member.nameHref ?? '#'}>{member.name}</a>
          </h3>
          <span class="text-gray-500 dark:text-gray-400">{member.role}</span>
          <p class="mt-3 mb-4 max-w-sm font-light text-gray-500 dark:text-gray-400">{member.bio}</p>
          <ul class="flex justify-center space-x-4 sm:justify-start">
            {#each member.social as link}
            <li>
              <a href={link.href} class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {@html link.iconSvg}
              </a>
            </li>
            {/each}
          </ul>
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionCarousel(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
    <div class="mx-auto mb-8 lg:mb-16 max-w-screen-sm md:mb-24">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="grid gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each p.members as member}
      <div class="text-center text-gray-500">
        <img class="mx-auto mb-4 w-36 h-36 rounded-lg" src={member.image.src} alt={member.image.alt ?? ''}>
        <a href={member.nameHref ?? '#'}>
          <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{member.name}</h5>
        </a>
        <span>{member.role}</span>
        <div class="flex justify-center mt-4 space-x-4">
          {#each member.social as link}
          <a href={link.href} class="hover:text-gray-900 dark:hover:text-white">
            {@html link.iconSvg}
          </a>
          {/each}
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionCard(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each p.members as member}
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href={member.image.href ?? '#'}>
          <img class="p-4 w-full rounded-lg" src={member.image.src} alt={member.image.alt ?? ''}>
        </a>
        <div class="px-5 pb-5">
          <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href={member.nameHref ?? '#'}>{member.name}</a>
          </h3>
          <span class="text-gray-500">{member.role}</span>
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{member.bio}</p>
          <ul class="flex space-x-4 sm:mt-0">
            {#each member.social as link}
            <li>
              <a href={link.href} class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {@html link.iconSvg}
              </a>
            </li>
            {/each}
          </ul>
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionOverlay(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="flex flex-col gap-8 sm:gap-12 xl:gap-16 xl:flex-row xl:items-start">
      <div>
        <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">{p.title}</h2>
        <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">{p.description1}</p>
        <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">{p.description2}</p>
        <div class="mt-4">
          <a href={p.cta.href} class="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button">
            {p.cta.label}
            <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div class="grid w-full grid-cols-1 gap-4 xl:max-w-3xl shrink-0 sm:grid-cols-2 md:grid-cols-3">
        {#each p.members as member}
        <div class="relative overflow-hidden rounded-lg group">
          <img class="object-cover w-full h-[320px] lg:h-auto scale-100 ease-in duration-300 group-hover:scale-125" src={member.image.src} alt={member.image.alt ?? ''}>
          <div class="absolute inset-0 grid items-end justify-center p-4 bg-gradient-to-b from-transparent to-black/60">
            <div class="text-center">
              <p class="text-xl font-bold text-white">{member.name}</p>
              <p class="text-base font-medium text-gray-300">{member.role}</p>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionCTA(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">{p.title}</h2>
      <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-8 lg:mt-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {#each p.members as member}
      <div class="relative overflow-hidden rounded-lg group">
        <img class="object-cover w-full h-[320px] lg:h-auto scale-100 ease-in duration-300 group-hover:scale-125" src={member.image.src} alt={member.image.alt ?? ''}>
        <div class="absolute inset-0 grid items-end justify-center p-4 bg-gradient-to-b from-transparent to-black/60">
          <div class="text-center">
            <p class="text-xl font-bold text-white">{member.name}</p>
            <p class="text-base font-medium text-gray-300">{member.role}</p>
          </div>
        </div>
      </div>
      {/each}
    </div>
    <div class="max-w-3xl p-4 mx-auto mt-8 rounded-md lg:mt-16 bg-gray-50 dark:bg-gray-800">
      <div class="flex flex-col justify-between gap-3 md:gap-6 md:items-center md:flex-row">
        <div class="flex items-center gap-1.5">
          <svg aria-hidden="true" class="hidden w-5 h-5 text-gray-800 dark:text-gray-400 md:block shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span class="text-base font-normal text-gray-700 dark:text-gray-400">
            <span class="font-semibold">{p.ctaBox.heading}</span> {p.ctaBox.subtext}
          </span>
        </div>
        <a href={p.ctaBox.link.href} class="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500">
          {p.ctaBox.link.label}
          <svg aria-hidden="true" class="w-5 h-5 ml-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet teamSectionOverlayCTA(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-5xl">
      <h2 class="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl dark:text-white">{p.title}</h2>
      <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      <div class="mt-4">
        <a href={p.cta.href} class="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button">
          {p.cta.label}
          <svg class="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="grid grid-cols-1 mt-12 gap-y-12 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {#each p.members as member}
      <div>
        <img class="object-cover object-top w-full h-64 lg:h-48 rounded-lg" src={member.image.src} alt={member.image.alt ?? ''}>
        <div class="mt-4 space-y-2">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
            <p class="text-base font-medium text-gray-500 dark:text-gray-400">{member.role}</p>
          </div>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">{member.bio}</p>
          <ul class="flex items-center gap-3">
            {#each member.social as link}
            <li>
              <a href={link.href} title="" class="">
                {@html link.iconSvg}
              </a>
            </li>
            {/each}
          </ul>
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'teamSectionDefault'}
  {@render teamSectionDefault(data)}
{:else if variant === 'teamSectionClean'}
  {@render teamSectionClean(data)}
{:else if variant === 'teamSectionDescription'}
  {@render teamSectionDescription(data)}
{:else if variant === 'teamSectionCarousel'}
  {@render teamSectionCarousel(data)}
{:else if variant === 'teamSectionCard'}
  {@render teamSectionCard(data)}
{:else if variant === 'teamSectionOverlay'}
  {@render teamSectionOverlay(data)}
{:else if variant === 'teamSectionCTA'}
  {@render teamSectionCTA(data)}
{:else if variant === 'teamSectionOverlayCTA'}
  {@render teamSectionOverlayCTA(data)}
{/if}
