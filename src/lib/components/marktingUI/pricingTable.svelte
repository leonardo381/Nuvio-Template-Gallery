<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet pricingTableDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      {#if p.description}
        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      {/if}
    </div>
    <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
      {#each p.plans ?? [] as plan}
        <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="mb-4 text-2xl font-semibold">{plan.name}</h3>
          {#if plan.description}
            <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">{plan.description}</p>
          {/if}
          <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-5xl font-extrabold">{plan.price}</span>
            {#if plan.period}
              <span class="text-gray-500 dark:text-gray-400">{plan.period}</span>
            {/if}
          </div>
          {#if plan.features?.length}
            <ul role="list" class="mb-8 space-y-4 text-left">
              {#each plan.features as feature}
                <li class="flex items-center space-x-3">
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  <span>{feature.label}</span>
                </li>
              {/each}
            </ul>
          {/if}
          {#if plan.cta}
            <a href={plan.cta.href ?? "#"} class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">{plan.cta.label}</a>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet pricingTableTabSelector(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="bg-white rounded-lg divide-y divide-gray-200 shadow dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800">
      <div class="col-span-2 p-6 lg:p-8">
        {#if p.choosePlanLabel}
          <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">{p.choosePlanLabel}</h3>
        {/if}
        <ul class="grid grid-cols-2 text-sm font-medium text-center text-gray-500 shadow md:rounded-lg dark:divide-gray-600 dark:text-gray-400" style="grid-template-columns: repeat({(p.plans ?? []).length}, 1fr);" role="tablist">
          {#each p.plans ?? [] as plan, i}
            <li class="w-full" role="presentation">
              <button id="plan-tab-{i}" type="button" class="inline-block p-4 w-full border border-gray-200 dark:border-gray-500 {i === 0 ? 'md:rounded-l-lg' : ''} {i === (p.plans.length - 1) ? 'md:rounded-r-lg' : ''}">{plan.name}</button>
            </li>
          {/each}
        </ul>
        {#each p.plans ?? [] as plan, i}
          <div id="plan-content-{i}" class="hidden">
            {#if plan.detailsTitle}
              <div class="mt-6 mb-2 font-medium text-gray-900 dark:text-white">{plan.detailsTitle}</div>
            {/if}
            {#if plan.details}
              <p class="text-lg font-light text-gray-500 dark:text-gray-400">{plan.details}</p>
            {/if}
          </div>
        {/each}
      </div>
      <div class="flex p-6 lg:p-8">
        {#each p.plans ?? [] as plan, i}
          <div id="plan-panel-{i}" class="hidden self-center w-full">
            {#if plan.name}
              <div class="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">{plan.name}</div>
            {/if}
            {#if plan.startsAtLabel}
              <div class="font-light text-gray-500 dark:text-gray-400">{plan.startsAtLabel}</div>
            {/if}
            <div class="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">{plan.price}</div>
            {#if plan.buyCta}
              <a href={plan.buyCta.href ?? "#"} class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4">{plan.buyCta.label}</a>
            {/if}
            {#if plan.teamPricingCta}
              <a href={plan.teamPricingCta.href ?? "#"} class="flex items-center mb-4 font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500">
                {plan.teamPricingCta.label}
                <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
            {/if}
            {#if plan.footnote}
              <p class="text-sm text-gray-500 dark:text-gray-400">{plan.footnote}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet pricingTableCard(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="bg-white rounded-lg shadow lg:grid lg:grid-cols-3 dark:bg-gray-800">
      <div class="col-span-2 p-6 lg:p-8">
        <h2 class="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{p.title}</h2>
        {#if p.description}
          <p class="text-lg font-light text-gray-500 dark:text-gray-400">{p.description}</p>
        {/if}
        {#if p.features?.length}
          <div class="grid gap-4 mt-4 lg:mt-6 sm:grid-cols-2 md:grid-cols-3">
            <ul role="list" class="space-y-4 dark:text-white col-span-3">
              {#each p.features as feature}
                <li class="flex space-x-2.5">
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span class="leading-tight text-gray-500 dark:text-gray-400">{feature.label}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
      <div class="flex p-6 text-center bg-gray-50 lg:p-8 dark:bg-gray-700">
        <div class="self-center w-full">
          <div class="text-5xl font-extrabold text-gray-900 dark:text-white">{p.price}</div>
          {#if p.period}
            <div class="mt-1 mb-4 text-gray-500 text-light dark:text-gray-400">{p.period}</div>
          {/if}
          {#if p.buyCta}
            <a href={p.buyCta.href ?? "#"} class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{p.buyCta.label}</a>
          {/if}
          {#if p.teamPricingCta}
            <a href={p.teamPricingCta.href ?? "#"} class="flex justify-center items-center mt-4 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
              {p.teamPricingCta.label}
              <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet pricingTableFeature(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 xl:gap-16 lg:py-16 lg:px-6">
    <div class="text-gray-500 sm:text-lg">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      {#if p.description}
        <p class="mb-8 font-light lg:text-xl dark:text-gray-400">{p.description}</p>
      {/if}
      {#if p.featureItems?.length}
        <div class="grid gap-8 py-8 border-t border-gray-200 lg:grid-cols-1 dark:border-gray-700 sm:grid-cols-2">
          {#each p.featureItems as item}
            <div class="flex">
              {#if item.iconSvg}
                <div class="flex justify-center items-center mr-4 w-12 h-12 bg-white rounded shadow shrink-0 dark:bg-gray-700">
                  {@html item.iconSvg}
                </div>
              {/if}
              <div>
                <h3 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                {#if item.description}
                  <p class="font-light text-gray-500 dark:text-gray-400">{item.description}</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    {#if p.plan}
      <div class="flex flex-col p-6 bg-white rounded-lg shadow xl:p-8 dark:bg-gray-800">
        <div class="justify-between items-center md:flex">
          <div>
            <div class="flex justify-between mb-2">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{p.plan.name}</h3>
              <div class="flex items-center md:hidden">
                <div class="mr-1 text-xl font-extrabold text-gray-900 lg:text-5xl dark:text-white">{p.plan.price}</div>
                {#if p.plan.period}
                  <span class="text-gray-500 dark:text-gray-400">{p.plan.period}</span>
                {/if}
              </div>
            </div>
            {#if p.plan.description}
              <p class="text-lg font-light text-gray-500 dark:text-gray-400 md:mr-2">{p.plan.description}</p>
            {/if}
          </div>
          <div class="hidden md:block">
            <div class="text-2xl font-extrabold text-gray-900 lg:text-5xl dark:text-white">{p.plan.price}</div>
            {#if p.plan.period}
              <span class="text-gray-500 dark:text-gray-400">{p.plan.period}</span>
            {/if}
          </div>
        </div>
        {#if p.plan.cta}
          <a href={p.plan.cta.href ?? "#"} class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-5 lg:my-8 dark:focus:ring-primary-900">{p.plan.cta.label}</a>
        {/if}
        {#if p.plan.features?.length}
          <div class="justify-between space-y-4 sm:space-y-0 sm:flex">
            <ul role="list" class="space-y-4">
              {#each p.plan.features as feature}
                <li class="flex space-x-2.5">
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span class="font-light leading-tight text-gray-500 dark:text-gray-400">{feature.label}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet pricingTableComparison(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      {#if p.description}
        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      {/if}
    </div>
    <div class="grid gap-8 mb-8 xl:grid-cols-3">
      {#each p.plans ?? [] as plan}
        <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 xl:p-8 dark:text-white dark:bg-gray-800">
          <h3 class="mb-4 text-2xl font-semibold">{plan.name}</h3>
          {#if plan.description}
            <p class="text-gray-500 text-light sm:text-lg dark:text-gray-400">{plan.description}</p>
          {/if}
          <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-5xl font-extrabold">{plan.price}</span>
            {#if plan.period}
              <span class="text-gray-500">{plan.period}</span>
            {/if}
          </div>
          {#if plan.features?.length}
            <ul role="list" class="mb-8 space-y-4 text-left">
              {#each plan.features as feature}
                <li class="flex items-center space-x-3">
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  <span>{feature.label}</span>
                </li>
              {/each}
            </ul>
          {/if}
          {#if plan.cta}
            <a href={plan.cta.href ?? "#"} class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">{plan.cta.label}</a>
          {/if}
        </div>
      {/each}
    </div>
    {#if p.showComparisonLabel}
      <button type="button" class="flex justify-center items-center mx-auto font-medium text-primary-600 hover:text-primary-700" data-collapse-toggle="detailed-pricing">
        {p.showComparisonLabel}
        <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    {/if}
    {#if p.comparisonSections?.length}
      <div id="detailed-pricing" class="hidden overflow-x-auto mt-8 w-full">
        <div class="overflow-hidden min-w-max">
          {#each p.comparisonSections as section}
            <div class="grid gap-x-16 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white" style="grid-template-columns: 1fr repeat({(p.comparisonColumns ?? []).length}, 1fr);">
              <div class="flex items-center">{section.title}</div>
              {#each p.comparisonColumns ?? [] as col}
                <div>{col.name}</div>
              {/each}
            </div>
            {#each section.rows as row}
              <div class="grid gap-x-16 py-5 px-4 text-sm text-gray-700 border-b border-gray-200 dark:border-gray-700" style="grid-template-columns: 1fr repeat({(p.comparisonColumns ?? []).length}, 1fr);">
                <div class="text-gray-500 dark:text-gray-400">
                  {#if row.linkHref}
                    {row.label} (<a href={row.linkHref} class="text-primary-600 hover:underline">{row.linkLabel ?? row.linkHref}</a>)
                  {:else}
                    {row.label}
                  {/if}
                </div>
                {#each row.values ?? [] as val}
                  <div>
                    {#if val.included}
                      <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    {:else}
                      <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {/if}
                  </div>
                {/each}
              </div>
            {/each}
          {/each}
          <div class="grid gap-x-16 py-5 px-4 text-sm text-gray-700 border-b border-gray-200 dark:border-gray-700" style="grid-template-columns: 1fr repeat({(p.comparisonColumns ?? []).length}, 1fr);">
            <div></div>
            {#each p.comparisonColumns ?? [] as col}
              <div>
                {#if col.cta}
                  <a href={col.cta.href ?? "#"} class="text-white block w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">{col.cta.label}</a>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet pricingTableHighlighted(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      {#if p.description}
        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      {/if}
      {#if p.monthlyLabel || p.yearlyLabel}
        <div class="flex justify-center items-center">
          {#if p.monthlyLabel}
            <span class="text-base font-medium text-gray-900 dark:text-white">{p.monthlyLabel}</span>
          {/if}
          <div>
            <label for="toggle-highlighted" class="flex relative items-center mx-4 cursor-pointer">
              <input type="checkbox" id="toggle-highlighted" class="sr-only">
              <div class="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-700"></div>
            </label>
          </div>
          {#if p.yearlyLabel}
            <span class="text-base font-medium text-gray-500 dark:text-gray-400">{p.yearlyLabel}</span>
          {/if}
        </div>
      {/if}
    </div>
    <div class="grid gap-8 xl:grid-cols-3 xl:gap-10">
      {#each p.plans ?? [] as plan}
        <div class="flex flex-col p-6 mx-auto max-w-xl text-center bg-white rounded-lg border shadow xl:max-w-lg xl:p-8 {plan.badge ? 'border-primary-600' : 'border-gray-200 dark:border-gray-700'} dark:bg-gray-800">
          {#if plan.badge}
            <div class="mb-2">
              <span class="py-1 px-3 text-sm text-primary-800 bg-primary-100 rounded dark:bg-primary-200 dark:text-primary-800">{plan.badge}</span>
            </div>
          {/if}
          <h3 class="mb-4 text-2xl font-medium text-gray-900 dark:text-white">{plan.name}</h3>
          <span class="text-5xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
          {#if plan.annualNote}
            <p class="mt-4 mb-1 text-gray-500 text-light dark:text-gray-400">{plan.annualNote}</p>
          {/if}
          {#if plan.annualCta}
            <a href={plan.annualCta.href ?? "#"} class="inline-flex justify-center items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              {plan.annualCta.label}
              <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          {/if}
          {#if plan.cta}
            <a href={plan.cta.href ?? "#"} class="font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8 {plan.badge ? 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900' : 'text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600'}">{plan.cta.label}</a>
          {/if}
          {#if plan.features?.length}
            <ul role="list" class="space-y-4 text-left text-gray-900 dark:text-gray-400">
              {#each plan.features as feature}
                <li class="flex items-center space-x-3 {feature.included ? '' : 'text-gray-500'}">
                  <svg class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path></svg>
                  <span class="{feature.included ? '' : 'line-through'}">{feature.label}</span>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet pricingTableSimple(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="max-w-screen-md mb-8 lg:mb-16">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      {#if p.description}
        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.description}</p>
      {/if}
      {#if p.monthlyLabel || p.yearlyLabel}
        <div class="flex items-center">
          {#if p.monthlyLabel}
            <span class="text-base font-medium text-gray-900 dark:text-white">{p.monthlyLabel}</span>
          {/if}
          <div>
            <label for="toggle-simple" class="flex relative items-center mx-4 cursor-pointer">
              <input type="checkbox" id="toggle-simple" class="sr-only">
              <div class="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-700"></div>
            </label>
          </div>
          {#if p.yearlyLabel}
            <span class="text-base font-medium text-gray-500 dark:text-gray-400">{p.yearlyLabel}</span>
          {/if}
        </div>
      {/if}
    </div>
    <div class="mb-4 lg:mb-8 space-y-8 lg:grid lg:grid-cols-3 md:gap-12 xl:gap-16 lg:space-y-0">
      {#each p.plans ?? [] as plan}
        <div class="flex flex-col max-w-lg text-gray-900 dark:text-gray-400">
          <h3 class="font-semibold text-gray-500 uppercase dark:text-gray-400">{plan.name}</h3>
          <div class="flex items-baseline my-4">
            <span class="mr-2 text-5xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
            {#if plan.period}
              <span class="text-gray-500 dark:text-gray-400">{plan.period}</span>
            {/if}
          </div>
          {#if plan.description}
            <p class="font-light text-gray-500 sm:text-lg dark:text-gray-300">{plan.description}</p>
          {/if}
          {#if plan.features?.length}
            <ul role="list" class="my-8 space-y-4 text-left">
              {#each plan.features as feature}
                <li class="flex items-center space-x-3">
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span>{feature.label}</span>
                </li>
              {/each}
            </ul>
          {/if}
          {#if plan.cta}
            <a href={plan.cta.href ?? "#"} class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">{plan.cta.label}</a>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}


{#if variant === 'pricingTableDefault'}
  {@render pricingTableDefault(data)}
{:else if variant === 'pricingTableTabSelector'}
  {@render pricingTableTabSelector(data)}
{:else if variant === 'pricingTableCard'}
  {@render pricingTableCard(data)}
{:else if variant === 'pricingTableFeature'}
  {@render pricingTableFeature(data)}
{:else if variant === 'pricingTableComparison'}
  {@render pricingTableComparison(data)}
{:else if variant === 'pricingTableHighlighted'}
  {@render pricingTableHighlighted(data)}
{:else if variant === 'pricingTableSimple'}
  {@render pricingTableSimple(data)}
{/if}
