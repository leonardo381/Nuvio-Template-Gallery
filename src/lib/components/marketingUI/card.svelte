<script lang="ts">
  import { onMount } from 'svelte';
  import { sanitizeRichTextHtml } from '$lib/utils/sanitizeHtml';

  export let variant: string = '';
  export let data: Record<string, any> = {};

  const safeRichText = (value: unknown) => sanitizeRichTextHtml(value);

  onMount(async () => {
    const { initFlowbite } = await import('flowbite');
    initFlowbite();
  });
</script>

{#snippet cardDefault(p)}
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  {#if p.image?.src}
    <a href={p.image?.href || '#'}>
      <img
        class="rounded-t-lg"
        src={p.image.src}
        alt={p.image?.alt || ''}
      />
    </a>
  {/if}

  <div class="p-5">
    <a href={p.titleHref || '#'}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {p.title}
      </h5>
    </a>

    <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {@html safeRichText(p.description)}
    </div>

    <a
      href={p.cta?.href || '#'}
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {p.cta?.label}

      {#if p.cta?.iconSvg}
        {@html p.cta.iconSvg}
      {/if}
    </a>
  </div>
</div>
{/snippet}

{#snippet cardLink(p)}
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    {@html p.iconSvg}
    <a href={p.titleHref ?? '#'}>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{p.title}</h5>
    </a>
    <div class="mb-3 font-normal text-gray-500 dark:text-gray-400">{@html safeRichText(p.description)}</div>
    <a href={p.cta.href} class="inline-flex font-medium items-center text-blue-600 hover:underline">
        {p.cta.label}
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
{/snippet}

{#snippet cardHorizontal(p)}
<a href={p.href ?? '#'} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={p.image.src} alt={p.image.alt ?? ''}>
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p.title}</h5>
        <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">{@html safeRichText(p.description)}</div>
    </div>
</a>
{/snippet}

{#snippet cardNavTabs(p)}
<div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
        {#each p.tabs as tab, i}
        <li class="me-2">
            <button id={"nav-tab-btn-" + i} data-tabs-target={"#nav-tab-panel-" + i} type="button" role="tab" aria-controls={"nav-tab-panel-" + i} aria-selected={i === 0 ? "true" : "false"} class={i === 0 ? "inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500" : "inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"}>{tab.label}</button>
        </li>
        {/each}
    </ul>
    <div id="defaultTabContent">
        {#each p.tabs as tab, i}
        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id={"nav-tab-panel-" + i} role="tabpanel" aria-labelledby={"nav-tab-btn-" + i}>
            {@html safeRichText(tab.contentHtml)}
        </div>
        {/each}
    </div>
</div>
{/snippet}

{#snippet cardFullTabs(p)}
<div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select tab</label>
        <select id="tabs" class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {#each p.tabs as tab}<option>{tab.label}</option>{/each}
        </select>
    </div>
    <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
        {#each p.tabs as tab, i}
        <li class="w-full">
            <button id={"full-tab-btn-" + i} data-tabs-target={"#full-tab-panel-" + i} type="button" role="tab" aria-controls={"full-tab-panel-" + i} aria-selected={i === 0 ? "true" : "false"} class={i === 0 ? "inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600" : i === p.tabs.length - 1 ? "inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600" : "inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"}>{tab.label}</button>
        </li>
        {/each}
    </ul>
    <div id="fullWidthTabContent" class="border-t border-gray-200 dark:border-gray-600">
        {#each p.tabs as tab, i}
        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id={"full-tab-panel-" + i} role="tabpanel" aria-labelledby={"full-tab-btn-" + i}>
            {@html safeRichText(tab.contentHtml)}
        </div>
        {/each}
    </div>
</div>
{/snippet}

<!-- render only the requested snippet -->

<div class="mr-24 ml-24 p-12 flex justify-start">
  {#if variant === 'cardDefault'}
    {@render cardDefault(data)}
  {:else if variant === 'cardLink'}
    {@render cardLink(data)}
  {:else if variant === 'cardHorizontal'}
    {@render cardHorizontal(data)}
  {:else if variant === 'cardNavTabs'}
    {@render cardNavTabs(data)}
  {:else if variant === 'cardFullTabs'}
    {@render cardFullTabs(data)}
  {/if}
</div>
