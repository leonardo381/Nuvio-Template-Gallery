<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet timelineDefault(p)}
<ol class={`relative border-s border-gray-200 dark:border-gray-700 ${p.listClass ?? ""}`}>
  {#each p.items as item, i}
    <li class={`ms-4 ${i < p.items.length - 1 ? "mb-10" : ""}`}>
      <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.date}</time>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
      <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.body}</p>

      {#if item.cta && (item.cta.label || item.cta.href || item.cta.iconSvg)}
        <a href={item.cta.href || '#'}
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg
                  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100
                  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
                  dark:focus:ring-gray-700">
          {item.cta.label}
          {#if item.cta.iconSvg}{@html item.cta.iconSvg}{/if}
        </a>
      {/if}
    </li>
  {/each}
</ol>
{/snippet}

{#snippet timelineVertical(p)}
<ol class={`relative border-s border-gray-200 dark:border-gray-700 ${p.listClass ?? ""}`}>
  {#each p.items as item, i}
    <li class={`ms-6 ${i < p.items.length - 1 ? "mb-10" : ""}`}>
      <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        {@html item.iconSvg ?? ""}
      </span>

      <h3 class={`mb-1 text-lg font-semibold text-gray-900 dark:text-white ${item.latest ? "flex items-center" : ""}`}>
        {item.title}
        {#if item.latest}
          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
            Latest
          </span>
        {/if}
      </h3>

      <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {item.date}
      </time>

      <p class={`text-base font-normal text-gray-500 dark:text-gray-400 ${item.cta ? "mb-4" : ""}`}>
        {item.description}
      </p>

      {#if item.cta && (item.cta.label || item.cta.href || item.cta.iconSvg)}
        <a href={item.cta.href || '#'}
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg
                  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100
                  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
                  dark:focus:ring-gray-700">
          {#if item.cta.iconSvg}{@html item.cta.iconSvg}{/if}
          {item.cta.label}
        </a>
      {/if}
    </li>
  {/each}
</ol>
{/snippet}

{#snippet timelineHorizontal(p)}
<ol class={`items-center sm:flex ${p.listClass ?? ""}`}>
  {#each p.items as item, i}
    <li class="relative mb-6 sm:mb-0">
      <div class="flex items-center">
        <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          {@html item.iconSvg ?? ""}
        </div>
        {#if i < p.items.length - 1}
          <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        {/if}
      </div>

      <div class="mt-3 sm:pe-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h3>

        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {item.date}
        </time>

        <p class={`text-base font-normal text-gray-500 dark:text-gray-400 ${item.cta && (item.cta.label || item.cta.href || item.cta.iconSvg) ? "mb-4" : ""}`}>
          {item.description}
        </p>

        {#if item.cta && (item.cta.label || item.cta.href || item.cta.iconSvg)}
          <a
            href={item.cta.href || "#"}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg
                   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100
                   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
                   dark:focus:ring-gray-700"
          >
            {item.cta.label}
            {#if item.cta.iconSvg}
              {@html item.cta.iconSvg}
            {/if}
          </a>
        {/if}
      </div>
    </li>
  {/each}
</ol>
{/snippet}

<!-- render only the requested snippet -->

<div class="mr-24 ml-24 p-12 flex justify-start">
  {#if variant === 'timelineDefault'}
    {@render timelineDefault(data)}
  {:else if variant === 'timelineVertical'}
    {@render timelineVertical(data)}
  {:else if variant === 'timelineHorizontal'}
    {@render timelineHorizontal(data)}
  {/if}
</div>
