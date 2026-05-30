<script lang="ts">
  import { sanitizeRichTextHtml } from '$lib/utils/sanitizeHtml';

  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet accordionDefault(p)}
<div id="accordion-collapse" class="w-full" data-accordion="collapse">
  {#each p.items as item, i}
    <h2 id="accordion-collapse-heading-{i + 1}">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-3 border border-b-0 border-gray-200 p-5 font-medium text-gray-500 rtl:text-right hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800 {i === 0 ? 'rounded-t-xl' : ''}"
        data-accordion-target="#accordion-collapse-body-{i + 1}"
        aria-expanded="{i === 0 ? 'true' : 'false'}"
        aria-controls="accordion-collapse-body-{i + 1}"
      >
        <span class="flex-1 text-left">{item.question}</span>
        <svg
          data-accordion-icon
          class="h-3 w-3 shrink-0 rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>

    <div
      id="accordion-collapse-body-{i + 1}"
      class="hidden"
      aria-labelledby="accordion-collapse-heading-{i + 1}"
    >
      <div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
        <div class="mb-2 text-gray-500 dark:text-gray-400">{@html sanitizeRichTextHtml(item.answer)}</div>
      </div>
    </div>
  {/each}
</div>
{/snippet}

{#snippet accordionFlush(p)}
<div
  id="accordion-flush"
  class="w-full"
  data-accordion="collapse"
  data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  data-inactive-classes="text-gray-500 dark:text-gray-400"
>
  {#each p.items as item, i}
    <h2 id="accordion-flush-heading-{i + 1}">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-3 border-b border-gray-200 py-5 font-medium text-gray-500 rtl:text-right dark:border-gray-700 dark:text-gray-400"
        data-accordion-target="#accordion-flush-body-{i + 1}"
        aria-expanded="{i === 0 ? 'true' : 'false'}"
        aria-controls="accordion-flush-body-{i + 1}"
      >
        <span class="flex-1 text-left">{item.question}</span>
        <svg
          data-accordion-icon
          class="h-3 w-3 shrink-0 rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>

    <div
      id="accordion-flush-body-{i + 1}"
      class="hidden"
      aria-labelledby="accordion-flush-heading-{i + 1}"
    >
      <div class="border-b border-gray-200 py-5 dark:border-gray-700">
        <div class="mb-2 text-gray-500 dark:text-gray-400">{@html sanitizeRichTextHtml(item.answer)}</div>
      </div>
    </div>
  {/each}
</div>
{/snippet}

<div class="mr-12 ml-12 p-12 flex justify-center">
  {#if variant === 'accordionDefault'}
    {@render accordionDefault(data)}
  {:else if variant === 'accordionFlush'}
    {@render accordionFlush(data)}
  {/if}
</div>
