<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet cardDefault(p)}
<div class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
    <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{p.title}</h5>
    {#if p.description}
      <p class="text-body mb-6">{p.description}</p>
    {/if}
    {#if p.cta}
      <a href={p.cta.href ?? "#"} class="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
          {p.cta.label}
          <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
      </a>
    {/if}
</div>
{/snippet}

{#snippet cardLink(p)}
<div class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
    {#if p.iconSvg}{@html p.iconSvg}{/if}
    <a href={p.titleHref ?? "#"}>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-heading">{p.title}</h5>
    </a>
    {#if p.description}
      <p class="mb-3 text-body">{p.description}</p>
    {/if}
    {#if p.cta}
      <a href={p.cta.href ?? "#"} class="inline-flex font-medium items-center text-fg-brand hover:underline">
          {p.cta.label}
          <svg class="w-4 h-4 ms-2 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/></svg>
      </a>
    {/if}
</div>
{/snippet}

{#snippet cardImage(p)}
<div class="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
    {#if p.image}
      <a href={p.image.href ?? "#"}>
          <img class="rounded-t-base" src={p.image.src} alt={p.image.alt ?? ''} />
      </a>
    {/if}
    <div class="p-6 text-center">
        {#if p.badge}
          <span class="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
              {#if p.badge.iconSvg}{@html p.badge.iconSvg}{/if}
              {p.badge.label}
          </span>
        {/if}
        <a href={p.titleHref ?? "#"}>
            <h5 class="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">{p.title}</h5>
        </a>
        {#if p.cta}
          <a href={p.cta.href ?? "#"} class="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
              {p.cta.label}
              <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
          </a>
        {/if}
    </div>
</div>
{/snippet}

{#snippet cardImageDescr(p)}
<div class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
    {#if p.image}
      <a href={p.image.href ?? "#"}>
          <img class="rounded-base" src={p.image.src} alt={p.image.alt ?? ''} />
      </a>
    {/if}
    <a href={p.titleHref ?? "#"}>
        <h5 class="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{p.title}</h5>
    </a>
    {#if p.description}
      <p class="mb-6 text-body">{p.description}</p>
    {/if}
    {#if p.cta}
      <a href={p.cta.href ?? "#"} class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
          {p.cta.label}
          <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
      </a>
    {/if}
</div>
{/snippet}

{#snippet cardHorizontal(p)}
<a href={p.href ?? "#"} class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl">
    {#if p.image}
      <img class="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0" src={p.image.src} alt={p.image.alt ?? ''}>
    {/if}
    <div class="flex flex-col justify-between md:p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-heading">{p.title}</h5>
        {#if p.description}
          <p class="mb-6 text-body">{p.description}</p>
        {/if}
        {#if p.cta}
          <div>
              <button type="button" class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                  {p.cta.label}
                  <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
              </button>
          </div>
        {/if}
    </div>
</a>
{/snippet}

{#snippet cardNavTabs(p)}
<div class="w-full bg-neutral-primary border border-default rounded-base shadow-xs">
    <ul class="flex flex-wrap text-sm font-medium text-center text-body bg-neutral-secondary-soft border-b border-default rounded-t-base" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
        <li class="me-2">
            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" class="inline-block p-4 text-fg-brand rounded-ss-base hover:bg-neutral-tertiary">{p.about.tabLabel}</button>
        </li>
        <li class="me-2">
            <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" class="inline-block p-4 hover:text-heading hover:bg-neutral-tertiary">{p.services.tabLabel}</button>
        </li>
        <li class="me-2">
            <button id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics" aria-selected="false" class="inline-block p-4 hover:text-heading hover:bg-neutral-tertiary">{p.statistics.tabLabel}</button>
        </li>
    </ul>
    <div id="defaultTabContent">
        <div class="hidden p-4 rounded-b-base md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
            <h2 class="mb-2 text-2xl font-semibold tracking-tight text-heading">{@html p.about.title}</h2>
            {#if p.about.description}
              <p class="mb-4 text-body">{p.about.description}</p>
            {/if}
            {#if p.about.link}
              <a href={p.about.link.href ?? "#"} class="inline-flex items-center font-medium text-fg-brand hover:underline">
                  {p.about.link.label}
                  <svg class="w-5 h-5 ms-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
              </a>
            {/if}
        </div>
        <div class="hidden p-4 rounded-b-base md:p-8" id="services" role="tabpanel" aria-labelledby="services-tab">
            <h2 class="mb-5 text-2xl font-semibold tracking-tight text-heading">{p.services.title}</h2>
            {#if p.services.items?.length}
              <ul role="list" class="space-y-4 text-body">
                  {#each p.services.items as item}
                    <li class="flex space-x-1.5 rtl:space-x-reverse items-center">
                        <svg class="w-4 h-4 text-fg-brand shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <span class="leading-tight">{item.label}</span>
                    </li>
                  {/each}
              </ul>
            {/if}
        </div>
        <div class="hidden p-4 rrounded-b-base md:p-8" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
            {#if p.statistics.stats?.length}
              <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-heading sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                  {#each p.statistics.stats as stat}
                    <div class="flex flex-col">
                        <dt class="mb-2 text-2xl font-semibold tracking-tight text-heading">{stat.value}</dt>
                        <dd class="text-body">{stat.label}</dd>
                    </div>
                  {/each}
              </dl>
            {/if}
        </div>
    </div>
</div>
{/snippet}

{#snippet cardFullTabs(p)}
<div class="w-full bg-neutral-primary border border-default rounded-base shadow-xs">
    <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select tab</label>
        <select id="tabs" class="bg-neutral-secondary-soft border-0 border-b border-default text-heading text-sm rounded-t-base focus:ring-brand block w-full p-2.5">
            <option>{p.statistics.tabLabel}</option>
            <option>{p.services.tabLabel}</option>
            <option>{p.faq.tabLabel}</option>
        </select>
    </div>
    <ul class="hidden text-sm font-medium text-center text-body divide-x divide-default rounded-base sm:flex rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
        <li class="w-full">
            <button id="stats-tab" data-tabs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="true" class="inline-block w-full p-4 rounded-ss-base bg-neutral-secondary-soft hover:bg-neutral-tertiary focus:outline-none focus:bg-neutral-tertiary">{p.statistics.tabLabel}</button>
        </li>
        <li class="w-full">
            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" class="inline-block w-full p-4 bg-neutral-secondary-soft hover:bg-neutral-tertiary focus:outline-none focus:bg-neutral-tertiary">{p.services.tabLabel}</button>
        </li>
        <li class="w-full">
            <button id="faq-tab" data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="false" class="inline-block w-full p-4 rounded-se-base bg-neutral-secondary-soft hover:bg-neutral-tertiary focus:outline-none focus:bg-neutral-tertiary">{p.faq.tabLabel}</button>
        </li>
    </ul>
    <div id="fullWidthTabContent" class="border-t border-default">
        <div class="hidden p-4 rounded-base md:p-8" id="stats" role="tabpanel" aria-labelledby="stats-tab">
            {#if p.statistics.stats?.length}
              <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-heading sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                  {#each p.statistics.stats as stat}
                    <div class="flex flex-col">
                        <dt class="mb-2 text-2xl font-semibold tracking-tight text-heading">{stat.value}</dt>
                        <dd class="text-body">{stat.label}</dd>
                    </div>
                  {/each}
              </dl>
            {/if}
        </div>
        <div class="hidden p-4 rounded-base md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
            <h2 class="mb-5 text-2xl font-semibold tracking-tight text-heading">{p.services.title}</h2>
            {#if p.services.items?.length}
              <ul role="list" class="space-y-4 text-body">
                  {#each p.services.items as item}
                    <li class="flex space-x-1.5 rtl:space-x-reverse items-center">
                        <svg class="w-4 h-4 text-fg-brand shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <span class="leading-tight">{item.label}</span>
                    </li>
                  {/each}
              </ul>
            {/if}
        </div>
        <div class="hidden p-4 rounded-base" id="faq" role="tabpanel" aria-labelledby="faq-tab">
            {#if p.faq.items?.length}
              <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-neutral-primary text-heading" data-inactive-classes="text-body">
                  {#each p.faq.items as item, i}
                    <h2 id={"accordion-flush-heading-" + i}>
                        <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-body border-b border-default gap-3" data-accordion-target={"#accordion-flush-body-" + i} aria-expanded="false" aria-controls={"accordion-flush-body-" + i}>
                            <span>{item.question}</span>
                            <svg data-accordion-icon class="w-5 h-5 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/></svg>
                        </button>
                    </h2>
                    <div id={"accordion-flush-body-" + i} class="hidden" aria-labelledby={"accordion-flush-heading-" + i}>
                        <div class="py-5 border-b border-default text-body">
                            {@html item.answerHtml}
                        </div>
                    </div>
                  {/each}
              </div>
            {/if}
        </div>
    </div>
</div>
{/snippet}

<!-- render only the requested snippet -->

<div class="mr-24 ml-24 p-12 flex justify-start">
  {#if variant === 'cardDefault'}
    {@render cardDefault(data)}
  {:else if variant === 'cardLink'}
    {@render cardLink(data)}
  {:else if variant === 'cardImage'}
    {@render cardImage(data)}
  {:else if variant === 'cardImageDescr'}
    {@render cardImageDescr(data)}
  {:else if variant === 'cardHorizontal'}
    {@render cardHorizontal(data)}
  {:else if variant === 'cardNavTabs'}
    {@render cardNavTabs(data)}
  {:else if variant === 'cardFullTabs'}
    {@render cardFullTabs(data)}
  {/if}
</div>
