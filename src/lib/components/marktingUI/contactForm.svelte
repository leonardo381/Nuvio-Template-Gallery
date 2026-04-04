<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet contactSection(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">{p.title}</h2>
    {#if p.description}
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">{p.description}</p>
    {/if}
    <form action={p.formAction ?? "#"} class="space-y-8">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.emailLabel}</label>
        <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.emailPlaceholder ?? ""} required>
      </div>
      <div>
        <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.subjectLabel}</label>
        <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.subjectPlaceholder ?? ""} required>
      </div>
      <div class="sm:col-span-2">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{p.messageLabel}</label>
        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={p.messagePlaceholder ?? ""}></textarea>
      </div>
      <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{p.submitLabel}</button>
    </form>
  </div>
</section>
{/snippet}

{#snippet contactHelpCenter(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div class="max-w-screen-md">
      <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl lg:mb-8 dark:text-white">{p.title}</h2>
      <label for="search-faq" class="block mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="search-faq" class="block p-4 pl-12 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={p.searchPlaceholder ?? ""}>
      </div>
    </div>
    {#if p.categories?.length}
      <div class="grid gap-8 my-8 xl:gap-16 sm:grid-cols-2 md:grid-cols-3">
        {#each p.categories as category}
          <div class="p-4 rounded-lg border border-gray-200 shadow lg:p-8 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-4 text-xl font-extrabold dark:text-white">{category.title}</h3>
            {#if category.links?.length}
              <ul role="list" class="mb-4 space-y-3 text-primary-600 dark:text-primary-500">
                {#each category.links as link}
                  <li>
                    <a href={link.href ?? "#"} class="hover:underline">{link.label}</a>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
    {#if p.ctaBannerTitle || p.ctaBannerCta}
      <div class="justify-between items-center mb-8 sm:mb-24 sm:flex">
        <div class="mb-4 sm:mb-0">
          {#if p.ctaBannerTitle}
            <h3 class="mb-2 text-2xl font-extrabold text-gray-900 dark:text-white">{p.ctaBannerTitle}</h3>
          {/if}
          {#if p.ctaBannerDescription}
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">{p.ctaBannerDescription}</p>
          {/if}
        </div>
        {#if p.ctaBannerCta}
          <a href={p.ctaBannerCta.href ?? "#"} class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            {p.ctaBannerCta.label}
          </a>
        {/if}
      </div>
    {/if}
    <div class="grid gap-16 lg:grid-cols-3">
      <div class="hidden lg:block">
        {#if p.contactSectionTitle}
          <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{p.contactSectionTitle}</h3>
        {/if}
        {#each p.contactPoints ?? [] as point}
          <h4 class="mb-1 font-medium text-gray-900 dark:text-white">{point.label}</h4>
          <p class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{@html point.value}</p>
        {/each}
        {#if p.officesTitle}
          <h3 class="mt-5 mb-4 text-lg font-semibold text-gray-900 dark:text-white">{p.officesTitle}</h3>
        {/if}
        {#each p.offices ?? [] as office}
          <h4 class="mt-4 mb-1 font-medium text-gray-900 dark:text-white">{office.label}</h4>
          <address class="text-sm font-normal text-gray-500 non-italic">{@html office.address}</address>
        {/each}
      </div>
      <div class="col-span-2">
        {#if p.formTitle}
          <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 lg:mb-8 md:text-4xl dark:text-white">{p.formTitle}</h2>
        {/if}
        <form action={p.formAction ?? "#"} class="space-y-8">
          <div>
            <label for="help-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.emailLabel}</label>
            <input type="email" id="help-email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.emailPlaceholder ?? ""} required>
          </div>
          {#if p.topicOptions?.length}
            <div>
              <label for="topic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{p.topicLabel}</label>
              <select id="topic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {#if p.topicDefaultOption}
                  <option selected>{p.topicDefaultOption}</option>
                {/if}
                {#each p.topicOptions as opt}
                  <option value={opt.value}>{opt.label}</option>
                {/each}
              </select>
            </div>
          {/if}
          <div>
            <label for="help-subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.subjectLabel}</label>
            <input type="text" id="help-subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.subjectPlaceholder ?? ""} required>
          </div>
          <div class="sm:col-span-2">
            <label for="help-message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{p.messageLabel}</label>
            <textarea id="help-message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={p.messagePlaceholder ?? ""}></textarea>
            {#if p.termsHtml}
              <div class="flex mt-4">
                <input id="terms-checkbox" type="checkbox" value="" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="terms-checkbox" class="ml-2 text-sm font-light text-gray-500 dark:text-gray-400">{@html p.termsHtml}</label>
              </div>
            {/if}
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{p.submitLabel}</button>
        </form>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet contactSectionSideInfo(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div class="px-4 mx-auto max-w-screen-sm text-center lg:px-6 mb-8 lg:mb-16">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{p.title}</h2>
      {#if p.description}
        <p class="font-light text-gray-600 dark:text-gray-400 sm:text-xl">{p.description}</p>
      {/if}
    </div>
    <div class="grid grid-cols-1 lg:gap-8 lg:grid-cols-3">
      <div class="col-span-2 mb-8 lg:mb-0">
        <form action={p.formAction ?? "#"} class="grid grid-cols-1 gap-8 mx-auto max-w-screen-md sm:grid-cols-2">
          <div>
            <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.firstNameLabel}</label>
            <input type="text" id="first-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.firstNamePlaceholder ?? ""} required>
          </div>
          <div>
            <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.lastNameLabel}</label>
            <input type="text" id="last-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.lastNamePlaceholder ?? ""} required>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.emailLabel}</label>
            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.emailPlaceholder ?? ""} required>
          </div>
          <div>
            <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.phoneLabel}</label>
            <input type="number" id="phone-number" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.phonePlaceholder ?? ""} required>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{p.messageLabel}</label>
            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={p.messagePlaceholder ?? ""}></textarea>
            {#if p.termsHtml}
              <p class="mt-4 text-sm text-gray-500">{@html p.termsHtml}</p>
            {/if}
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{p.submitLabel}</button>
        </form>
      </div>
      {#if p.infoCards?.length}
        <div class="grid grid-cols-1 col-span-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-1">
          {#each p.infoCards as card}
            <div>
              <div class="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 lg:h-16 lg:w-16">
                {#if card.iconSvg}{@html card.iconSvg}{/if}
              </div>
              <p class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{card.title}</p>
              {#if card.description}
                <p class="text-gray-500 dark:text-gray-400">{card.description}</p>
              {/if}
              {#if card.content}
                <p class="font-semibold text-primary-600 dark:text-primary-500">{@html card.content}</p>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
{/snippet}

{#snippet contactSectionImage(p)}
<section class="bg-white dark:bg-gray-900">
  <div style="background-image: url('{p.backgroundImage}')" class="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
    <div class="px-4 lg:pt-24 pt-8 pb-72 lg:pb-80 mx-auto max-w-screen-sm text-center lg:px-6">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white">{p.title}</h2>
      {#if p.description}
        <p class="mb-16 font-light text-gray-400 sm:text-xl">{p.description}</p>
      {/if}
    </div>
  </div>
  <div class="py-16 px-4 mx-auto -mt-96 max-w-screen-xl sm:py-24 lg:px-6">
    <form action={p.formAction ?? "#"} class="grid grid-cols-1 gap-8 p-6 mx-auto mb-16 max-w-screen-md bg-white rounded-lg border border-gray-200 shadow-sm lg:mb-28 dark:bg-gray-800 dark:border-gray-700 sm:grid-cols-2">
      <div>
        <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.firstNameLabel}</label>
        <input type="text" id="first-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.firstNamePlaceholder ?? ""} required>
      </div>
      <div>
        <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.lastNameLabel}</label>
        <input type="text" id="last-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.lastNamePlaceholder ?? ""} required>
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.emailLabel}</label>
        <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.emailPlaceholder ?? ""} required>
      </div>
      <div>
        <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{p.phoneLabel}</label>
        <input type="number" id="phone-number" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder={p.phonePlaceholder ?? ""} required>
      </div>
      <div class="sm:col-span-2">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{p.messageLabel}</label>
        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={p.messagePlaceholder ?? ""}></textarea>
        {#if p.termsHtml}
          <p class="mt-4 text-sm text-gray-500">{@html p.termsHtml}</p>
        {/if}
      </div>
      <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{p.submitLabel}</button>
    </form>
    {#if p.infoCards?.length}
      <div class="space-y-8 text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        {#each p.infoCards as card}
          <div>
            <div class="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 lg:h-16 lg:w-16">
              {#if card.iconSvg}{@html card.iconSvg}{/if}
            </div>
            <p class="mb-2 text-xl font-bold dark:text-white">{card.title}</p>
            {#if card.description}
              <p class="mb-3 text-gray-500 dark:text-gray-400">{card.description}</p>
            {/if}
            {#if card.content}
              {@html card.content}
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

<div>
  {#if variant === 'contactSection'}
    {@render contactSection(data)}
  {:else if variant === 'contactHelpCenter'}
    {@render contactHelpCenter(data)}
  {:else if variant === 'contactSectionSideInfo'}
    {@render contactSectionSideInfo(data)}
  {:else if variant === 'contactSectionImage'}
    {@render contactSectionImage(data)}
  {/if}
</div>
