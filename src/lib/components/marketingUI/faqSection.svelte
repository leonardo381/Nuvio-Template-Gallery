<script lang="ts">
  import { sanitizeHref, sanitizeRichTextHtml } from '$lib/utils/sanitizeHtml';

  const FAQ_ICON_FALLBACK_SVG = `
    <svg class="h-5 w-5 text-primary-700 dark:text-primary-300" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 18.25h.01" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
      <path d="M9.75 9.75a2.25 2.25 0 1 1 3.9 1.5c-.9.9-1.65 1.35-1.65 2.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.8"></circle>
    </svg>
  `;

  function safeFaqHref(value: unknown, fallback = '#'): string {
    return sanitizeHref(value) || fallback;
  }

  function sanitizeFaqIconSvg(rawValue: unknown): string {
    const raw = typeof rawValue === 'string' ? rawValue.trim() : '';
    if (!raw) {
      return '';
    }

    const lower = raw.toLowerCase();
    if (!lower.startsWith('<svg') || !lower.includes('</svg>')) {
      return '';
    }

    if (
      lower.includes('<script')
      || lower.includes('<style')
      || lower.includes('<foreignobject')
      || lower.includes('<iframe')
      || lower.includes('<object')
      || lower.includes('<embed')
      || lower.includes('<form')
      || lower.includes('<input')
      || lower.includes('<button')
      || lower.includes('<math')
      || lower.includes('javascript:')
      || lower.includes('data:')
      || lower.includes('vbscript:')
      || lower.includes('file:')
      || lower.includes('blob:')
      || lower.includes('xlink:href')
      || lower.includes('href=')
      || lower.includes('onload=')
      || lower.includes('onerror=')
      || lower.includes('onclick=')
    ) {
      return '';
    }

    return raw;
  }

  function safeFaqCategoryIconSvg(rawValue: unknown): string {
    return sanitizeFaqIconSvg(rawValue) || FAQ_ICON_FALLBACK_SVG;
  }

  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet faqSectionDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <h2 class="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
    <div class="grid border-t border-gray-200 pt-8 text-left md:grid-cols-2 md:gap-16 dark:border-gray-700">
      {#each p.columns ?? [] as column}
        <div>
          {#each column.items ?? [] as item}
            <div class="mb-10">
              <h3 class="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  class="mr-2 h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-3a1 1 0 0 0-.867.5 1 1 0 1 1-1.731-1A3 3 0 0 1 13 8a3.001 3.001 0 0 1-2 2.83V11a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1 1 1 0 1 0 0-2Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {item.question}
              </h3>
              <div class="space-y-4 text-gray-500 dark:text-gray-400">
                {@html sanitizeRichTextHtml(item.answer)}
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet faqSectionSearch(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto mb-8 max-w-screen-md text-center lg:mb-16">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      <label for="faq-search-input" class="sr-only text-sm font-medium text-gray-900 dark:text-gray-300">
        Search
      </label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="faq-search-input"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-12 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder={p.searchPlaceholder}
        />
      </div>
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">{p.helperText}</p>
    </div>
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each p.categories ?? [] as category}
        <div>
          <h3 class="mb-4 text-xl font-bold dark:text-white">{category.title}</h3>
          <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
            {#each category.links ?? [] as link}
              <li>
                <a href={safeFaqHref(link.href)} class="hover:underline">{link.label}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet faqSectionAccordion(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <h2 class="mb-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 lg:mb-8 lg:text-4xl dark:text-white">
      {p.heading}
    </h2>
    <div class="mx-auto max-w-screen-md">
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        {#each p.items ?? [] as item, i}
          <h2 id={`accordion-flush-heading-${i + 1}`}>
            <button
              type="button"
              class="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
              data-accordion-target={`#accordion-flush-body-${i + 1}`}
              aria-expanded={i === 0 ? 'true' : 'false'}
              aria-controls={`accordion-flush-body-${i + 1}`}
            >
              <span>{item.question}</span>
              <svg data-accordion-icon class="h-6 w-6 shrink-0 {i === 0 ? 'rotate-180' : ''}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-flush-body-${i + 1}`}
            class={i === 0 ? '' : 'hidden'}
            aria-labelledby={`accordion-flush-heading-${i + 1}`}
          >
            <div class="border-b border-gray-200 py-5 dark:border-gray-700">
              <div class="space-y-3 text-gray-500 dark:text-gray-400">
                {@html sanitizeRichTextHtml(item.answer)}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet faqSection3col(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-lg text-center">
      <h2 class="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 text-gray-500 lg:text-lg dark:text-gray-400">{p.description}</p>
    </div>
    <div class="grid border-t border-gray-200 pt-8 text-left sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-16 dark:border-gray-700">
      {#each p.columns ?? [] as column}
        <div>
          {#each column.items ?? [] as item}
            <div class="mb-10">
              <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                {item.question}
              </h3>
              <div class="space-y-4 text-gray-500 dark:text-gray-400">
                {@html sanitizeRichTextHtml(item.answer)}
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet faqSectionHelpCenter(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
    <div class="mx-auto mb-8 max-w-screen-md text-center lg:mb-16">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{p.heading}</h2>
      <p class="mb-8 text-gray-500 sm:text-xl dark:text-gray-500">{p.description}</p>
      <label for="faq-help-search-input" class="sr-only text-sm font-medium text-gray-900 dark:text-gray-300">
        Search
      </label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2H9z"></path>
            <path fill-rule="evenodd" d="M4 5a2 2 0 0 1 2-2 3 3 0 0 0 3 3h2a3 3 0 0 0 3-3 2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm3 4a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2H7zm3 0a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2h-3zm-3 4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H7zm3 0a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          id="faq-help-search-input"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-12 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder={p.searchPlaceholder}
        />
      </div>
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">{p.helperText}</p>
    </div>
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each p.categories ?? [] as category}
        <div class="rounded p-4 shadow dark:bg-gray-800">
          {#if category.iconSvg}
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              {@html safeFaqCategoryIconSvg(category.iconSvg)}
            </div>
          {/if}
          <h3 class="mb-4 text-xl font-bold dark:text-white">{category.title}</h3>
          <ul role="list" class="mb-4 space-y-3 text-gray-500 dark:text-gray-400">
            {#each category.links ?? [] as link}
              <li>
                <a href={safeFaqHref(link.href)} class="hover:underline">{link.label}</a>
              </li>
            {/each}
          </ul>
          <a href={safeFaqHref(category.ctaHref)} class="font-medium text-primary-600 hover:underline dark:text-primary-500">
            {category.ctaLabel}
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'faqSectionDefault'}
  {@render faqSectionDefault(data)}
{:else if variant === 'faqSectionSearch'}
  {@render faqSectionSearch(data)}
{:else if variant === 'faqSectionAccordion'}
  {@render faqSectionAccordion(data)}
{:else if variant === 'faqSection3col'}
  {@render faqSection3col(data)}
{:else if variant === 'faqSectionHelpCenter'}
  {@render faqSectionHelpCenter(data)}
{/if}
