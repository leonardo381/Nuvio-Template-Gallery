<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet cookieBanner(p)}
<div id="banner" tabindex="-1" aria-hidden="false" class="overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0 h-modal md:h-full">
  <div class="relative w-full h-full md:h-auto">
    <div class="relative bg-white shadow dark:bg-gray-800">
      <div class="justify-between items-center p-5 lg:flex">
        <div class="mb-4 text-sm text-gray-500 dark:text-white lg:mb-0">
          {@html p.contentHtml ?? ""}
        </div>

        <div class="items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex lg:pl-10 shrink-0">
          {#if p.manageSettings}
            <a href={p.manageSettings.href ?? "#"} class="text-sm text-primary-600 dark:text-primary-500 hover:underline">
              {p.manageSettings.label}
            </a>
          {/if}

          {#if p.blockAllLabel}
            <button type="button" class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {p.blockAllLabel}
            </button>
          {/if}

          {#if p.acceptAllLabel}
            <button type="button" class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {p.acceptAllLabel}
            </button>
          {/if}

          <button type="button" class="hidden md:flex text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{/snippet}

{#snippet cookiePopup(p)}
<!--fixed top-0 right-0 left-0-->
<div id="cookies-corner-modal" aria-hidden="false" tabindex="-1" class="overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0 h-modal md:h-full">
  <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
      <div class="p-5 text-sm font-light text-gray-500 dark:text-gray-400">
        {@html p.contentHtml ?? ""}
      </div>

      <div class="justify-between items-center p-6 pt-0 space-y-4 sm:flex sm:space-y-0">
        {#if p.personalizeLabel}
          <button type="button" class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {p.personalizeLabel}
          </button>
        {/if}

        <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
          {#if p.rejectAllLabel}
            <button type="button" class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              {p.rejectAllLabel}
            </button>
          {/if}

          {#if p.acceptAllLabel}
            <button type="button" class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {p.acceptAllLabel}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
{/snippet}

{#snippet cookieModal(p)}
<!--fixed top-0 right-0 left-0-->
<div id="cookies-modal" tabindex="-1" aria-hidden="false" class="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
  <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
      <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-700">
        {#if p.brand}
          <a href={p.brand.href ?? "#"} class="flex items-center mb-2 text-xl font-semibold text-gray-900 dark:text-white sm:mb-0">
            {#if p.brand.logoSvg}
              {@html p.brand.logoSvg}
            {/if}
            {p.brand.label}
          </a>
        {/if}

        <div class="flex items-center space-x-3">
          {#each p.headerLinks ?? [] as link}
            <a href={link.href ?? "#"} class="text-gray-800 hover:text-primary-600 dark:text-white dark:hover:text-primary-500">
              {@html link.iconSvg}
            </a>
          {/each}
        </div>
      </div>

      <div class="p-6 font-light text-gray-500 dark:text-gray-400">
        {@html p.contentHtml ?? ""}
      </div>

      <div class="justify-between items-center p-6 pt-0 space-y-4 sm:flex sm:space-y-0">
        <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
          {#if p.acceptLabel}
            <button type="button" class="text-white w-full sm:w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {p.acceptLabel}
            </button>
          {/if}

          {#if p.blockLabel}
            <button type="button" class="text-gray-500 w-full sm:w-auto bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              {p.blockLabel}
            </button>
          {/if}
        </div>

        {#if p.footerLinks?.length}
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {#each p.footerLinks as link, i}
              <a href={link.href ?? "#"} class="hover:underline">{link.label}</a>
              {#if i < p.footerLinks.length - 1}
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
{/snippet}

{#snippet cookieGDPRnotice(p)}
<div id="cookies-gdpr-modal" tabindex="-1" aria-hidden="false" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full p-4">
    <div class="overflow-y-auto relative p-4 w-full max-w-2xl h-[48rem] bg-white rounded-lg shadow md:p-6 dark:bg-gray-800">
        {#if p.brand}
            <a href={p.brand.href ?? "#"} class="flex justify-center items-center mb-8 text-xl font-semibold text-gray-900 dark:text-white">
                {#if p.brand.logoSvg}
                    {@html p.brand.logoSvg}
                {/if}
                {p.brand.label}
            </a>
        {/if}

        <div class="space-y-4 font-light text-gray-500 divide-y divide-gray-200 dark:text-gray-400 dark:divide-gray-700">
            <div>
                <p class="mb-4 text-2xl font-bold leading-tight text-gray-900 dark:text-white">{p.title}</p>
                {#if p.description}
                    <p class="mb-2">{@html p.description}</p>
                {/if}
                {#if p.learnMore}
                    <a href={p.learnMore.href ?? "#"} class="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">
                        {p.learnMore.label}
                        <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                {/if}
            </div>

            {#each p.categories ?? [] as category, i}
                <div class="pt-4">
                    <div class="flex items-start justify-between">
                        <div>
                            <p class="mb-2 text-lg font-semibold leading-tight text-gray-900 dark:text-white">{category.title}</p>
                            {#if category.description}
                                <p class="mb-2">{@html category.description}</p>
                            {/if}
                            {#if category.cookies?.length}
                                <a href="#" data-collapse-toggle={"cookies-info-" + i} class="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    {p.viewCookiesLabel ?? "View Cookies"}
                                    <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            {/if}
                        </div>
                        {#if category.toggleable}
                            <label for={"category-toggle-" + i} class="inline-flex relative items-center cursor-pointer ml-4 shrink-0">
                                <input type="checkbox" value="" id={"category-toggle-" + i} class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span class="sr-only">Toggle {category.title}</span>
                            </label>
                        {/if}
                    </div>
                    {#if category.cookies?.length}
                        <div id={"cookies-info-" + i} class="hidden overflow-x-auto relative mt-4 bg-gray-100 sm:rounded-lg">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="py-3 px-6">Name</th>
                                        <th scope="col" class="py-3 px-6">Provider</th>
                                        <th scope="col" class="py-3 px-6">Expiration</th>
                                        <th scope="col" class="py-3 px-6">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each category.cookies as cookie}
                                        <tr class="bg-gray-100 dark:bg-gray-800">
                                            <th scope="row" class="py-4 px-6 font-light text-gray-500 whitespace-nowrap dark:text-gray-400">{cookie.name}</th>
                                            <td class="py-4 px-6">{cookie.provider}</td>
                                            <td class="py-4 px-6">{cookie.expiration}</td>
                                            <td class="py-4 px-6">{cookie.purpose}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="justify-between items-center mt-5 space-y-4 sm:flex sm:space-y-0">
            {#if p.customizeLabel}
                <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                    <button type="button" class="text-gray-500 w-full sm:w-auto bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{p.customizeLabel}</button>
                </div>
            {/if}
            <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <button type="button" class="text-white w-full sm:w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{p.acceptAllLabel}</button>
                <button type="button" class="text-white w-full sm:w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{p.rejectAllLabel}</button>
            </div>
        </div>
    </div>
</div>
{/snippet}

{#if variant === 'cookieBanner'}
  {@render cookieBanner(data)}
{:else if variant === 'cookiePopup'}
  {@render cookiePopup(data)}
{:else if variant === 'cookieModal'}
  {@render cookieModal(data)}
{:else if variant === 'cookieGDPRnotice'}
  {@render cookieGDPRnotice(data)}
{/if}