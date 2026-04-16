<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
  let selectedDay = 0;
</script>

{#snippet eventScheduleDefault(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <div class="mt-4">
        <a href={p.cta.href}
          class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
          {p.cta.label}
          <svg aria-hidden="true" class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>

    <div class="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
      <div class="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
        {#each p.items as item}
        <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
          <p class="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
            {item.time}
          </p>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <a href={item.href} class="hover:underline">{item.title}</a>
          </h3>
        </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet eventScheduleGrid2col(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-3xl mx-auto space-y-4 text-center">
      <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
        {p.heading}
      </h2>
      <p class="text-xl font-medium leading-tight text-gray-500 dark:text-gray-400">
        {p.date}
      </p>
      <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
        <svg aria-hidden="true" class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        {p.timezone}
      </span>
    </div>

    <div class="grid grid-cols-1 mt-12 lg:mt-16 lg:grid-cols-2 gap-y-12 gap-x-16">
      {#each p.columns as col}
      <div class="space-y-8">
        <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {col.title}
        </h3>
        <div>
          {#each col.items as item}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <p class="w-auto text-sm font-medium text-gray-500 sm:text-right sm:w-32 dark:text-gray-400 shrink-0">
              {item.time}
            </p>
            <div class="hidden w-px bg-gray-200 sm:shrink-0 dark:bg-gray-700 sm:block"></div>
            {#if item.type === 'break'}
            <div class="flex-1 pb-8 sm:pb-12">
              <div class="p-4 space-y-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                  <a href={item.href} class="hover:underline">{item.title}</a>
                </h4>
                {#if item.sponsors && item.sponsors.length > 0}
                <div>
                  <p class="text-base font-medium text-gray-500 dark:text-gray-400">Sponsors:</p>
                  <div class="flex flex-wrap items-center mt-2 gap-x-6 gap-y-4">
                    {#each item.sponsors as sponsor}
                    <img class="object-contain w-auto h-7" src={sponsor.logo.src} alt={sponsor.logo.alt}>
                    {/each}
                  </div>
                </div>
                {/if}
              </div>
            </div>
            {:else}
            <div class="flex-1 pb-8 space-y-4 sm:pb-12">
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                <a href={item.href} class="hover:underline">{item.title}</a>
              </h4>
              {#if item.description}
              <p class="text-gray-500 dark:text-gray-400 text-base font-normal">{item.description}</p>
              {/if}
              {#each item.speakers as speaker}
              <div class="flex items-center gap-3">
                <img class="object-cover w-12 h-12 rounded-full shrink-0" src={speaker.avatar.src} alt={speaker.avatar.alt}>
                <div>
                  <p class="text-lg font-medium leading-tight text-gray-900 dark:text-white">{speaker.name}</p>
                  <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{speaker.role}</p>
                </div>
              </div>
              {/each}
            </div>
            {/if}
          </div>
          {/each}
        </div>
      </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet eventScheduleGrid3col(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-3xl mx-auto space-y-4 text-center">
      <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
        {p.title}
      </h2>
      <p class="text-xl font-medium leading-tight text-gray-500 dark:text-gray-400">
        {p.subtitle}
      </p>
      <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
        <svg aria-hidden="true" class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        {p.timezone}
      </span>
    </div>

    <div class="grid grid-cols-1 mt-12 -mx-8 lg:mt-16 lg:grid-cols-3 gap-y-12">
      {#each p.days as day, i}
        <div class="px-8 space-y-12{i === 1 ? ' border-l border-r border-gray-200 dark:border-gray-700' : ''}">
          <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {day.heading}
          </h3>
          {#each day.sessions as session}
            <div class="{session.isBreak ? 'p-4 space-y-4 bg-gray-100 rounded-lg dark:bg-gray-800' : 'space-y-4'}">
              <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                <svg aria-hidden="true" class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                {session.time}
              </span>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                <a href={session.href} class="hover:underline">{session.title}</a>
              </h4>
              {#if session.isBreak}
                <div>
                  <p class="text-base font-medium text-gray-500 dark:text-gray-400">Sponsors:</p>
                  <div class="flex flex-wrap items-center mt-2 gap-x-6 gap-y-4">
                    {#each session.sponsors as sponsor}
                      <img class="object-contain w-auto h-5" src={sponsor.src} alt={sponsor.alt}>
                    {/each}
                  </div>
                </div>
              {:else}
                {#each session.speakers as speaker}
                  <div class="flex items-center gap-3">
                    <img class="object-cover w-12 h-12 rounded-full shrink-0" src={speaker.avatar} alt="">
                    <div>
                      <p class="text-lg font-medium leading-tight text-gray-900 dark:text-white">{speaker.name}</p>
                      <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{speaker.role}</p>
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet eventScheduleTabs(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
        {p.title}
      </h2>
    </div>

    <div class="mt-8 lg:mt-12">
      <ul class="flex-wrap justify-center flex text-center text-gray-500 dark:text-gray-400" id="myTab" role="tablist">
        {#each p.days as day, i}
          <li class="mr-3 mb-3 lg:mb-0" role="presentation">
            <button onclick={() => selectedDay = i} class="cursor-pointer inline-block px-4 py-3 text-base font-normal rounded-full{selectedDay === i ? ' text-white bg-primary-700 dark:bg-primary-600' : ' hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}" id="day{i+1}-tab" type="button" role="tab" aria-controls="day{i+1}" aria-selected="{selectedDay === i}">
              <span class="font-semibold">Day {i+1}:</span> {day.label}
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div id="myTabContent" class="mt-8 lg:mt-12">
      {#each p.days as day, i}
        <div class="{selectedDay !== i ? 'hidden' : ''}" id="day{i+1}" role="tabpanel" aria-labelledby="day{i+1}-tab">
          <div class="grid max-w-5xl grid-cols-1 p-5 mx-auto border border-gray-100 rounded-lg bg-gray-50 sm:grid-cols-2 dark:bg-gray-800 dark:border-gray-700">
            {#each day.sessions as session, j}
              {@const isRight = j % 2 === 1}
              {@const isNotFirstRow = j >= 2}
              {@const cellClass = !isRight && !isNotFirstRow
                ? 'pb-5 space-y-4 sm:pr-5'
                : isRight && !isNotFirstRow
                  ? 'pb-5 space-y-4 border-gray-200 sm:pl-5 sm:border-l dark:border-gray-700'
                  : !isRight && isNotFirstRow
                    ? 'pt-5 pb-5 space-y-4 border-gray-200 sm:pr-5 sm:border-t dark:border-gray-700'
                    : 'pt-5 pb-5 space-y-4 border-gray-200 sm:pl-5 sm:border-l sm:border-t dark:border-gray-700'}
              <div class={cellClass}>
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                  <svg aria-hidden="true" class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  {session.time}
                </span>
                <h4 class="text-xl font-bold text-gray-900 sm:text-xl dark:text-white">
                  <a href={session.href} class="hover:underline">{session.title}</a>
                </h4>
                {#if session.isBreak}
                  <div>
                    <p class="text-base font-medium text-gray-500 dark:text-gray-400">Sponsors:</p>
                    <div class="flex flex-wrap items-center mt-2 gap-x-6 gap-y-4 max-w-xs">
                      {#each session.sponsors as sponsor}
                        <img class="object-contain w-auto h-5" src={sponsor.src} alt={sponsor.alt}>
                      {/each}
                    </div>
                  </div>
                {:else}
                  {#each session.speakers as speaker}
                    <div class="flex items-center gap-3">
                      <img class="object-cover w-12 h-12 rounded-full shrink-0" src={speaker.avatar} alt="">
                      <div>
                        <p class="text-lg font-medium leading-tight text-gray-900 dark:text-white">{speaker.name}</p>
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{speaker.role}</p>
                      </div>
                    </div>
                  {/each}
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-8 text-center">
      <a href={p.ctaHref} title=""
        class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
        {p.ctaLabel}
        <svg aria-hidden="true" class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>
{/snippet}

{#if variant === 'eventScheduleDefault'}
  {@render eventScheduleDefault(data)}
{:else if variant === 'eventScheduleGrid2col'}
  {@render eventScheduleGrid2col(data)}
{:else if variant === 'eventScheduleGrid3col'}
  {@render eventScheduleGrid3col(data)}
{:else if variant === 'eventScheduleTabs'}
  {@render eventScheduleTabs(data)}
{/if}
