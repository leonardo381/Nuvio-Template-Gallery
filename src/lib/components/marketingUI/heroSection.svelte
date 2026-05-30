<script lang="ts">
  import { sanitizeCssUrl, sanitizeEmbedUrl, sanitizeHref, sanitizeImageUrl } from '$lib/utils/sanitizeHtml';

  export let variant: string = '';
  export let data: Record<string, any> = {};

  const safeHref = (value: unknown, fallback: string | undefined = undefined) =>
    sanitizeHref(value) || fallback;

  const safeImage = (value: unknown) => sanitizeImageUrl(value) || undefined;

  const safeEmbed = (value: unknown) => sanitizeEmbedUrl(value) || undefined;

  const safeFormAction = (value: unknown) => sanitizeHref(value) || '#';

  const toBackgroundImageStyle = (value: unknown) => {
    const safeCssUrl = sanitizeCssUrl(value);
    return safeCssUrl ? `background-image: ${safeCssUrl}` : undefined;
  };
</script>

{#snippet heroSectionDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

    {#if p.alert}
      <a href={safeHref(p.alert.href)} class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
        {#if p.alert.badge}
          <span class="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">{p.alert.badge}</span>
        {/if}
        {#if p.alert.text}
          <span class="text-sm font-medium">{p.alert.text}</span>
        {/if}
        {#if p.alert.iconSvg}
          {@html p.alert.iconSvg}
        {/if}
      </a>
    {/if}

    {#if p.title}
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {p.title}
      </h1>
    {/if}

    {#if p.description}
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {p.description}
      </p>
    {/if}

    {#if p.primary || p.secondary}
      <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        {#if p.primary}
          <a href={safeHref(p.primary.href)} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            {#if p.primary.label}{p.primary.label}{/if}
            {#if p.primary.iconSvg}{@html p.primary.iconSvg}{/if}
          </a>
        {/if}
        {#if p.secondary}
          <a href={safeHref(p.secondary.href)} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            {#if p.secondary.iconSvg}{@html p.secondary.iconSvg}{/if}
            {#if p.secondary.label}{p.secondary.label}{/if}
          </a>
        {/if}
      </div>
    {/if}

    {#if p.featuredTitle || (p.featured && p.featured.length)}
      <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
        {#if p.featuredTitle}
          <span class="font-semibold text-gray-400 uppercase">{p.featuredTitle}</span>
        {/if}

        {#if p.featured && p.featured.length}
          <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            {#each p.featured as f}
              {#if f.svg}
                <a href={safeHref(f.href)} class={f.class ?? 'mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400'}>
                  {@html f.svg}
                </a>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/if}

  </div>
</section>
{/snippet}

{#snippet heroSectionImageHeading(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">

    <div class="mr-auto place-self-center lg:col-span-7">
      {#if p.title}
        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          {p.title}
        </h1>
      {/if}

      {#if p.description}
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {p.description}
        </p>
      {/if}

      <div class="flex flex-wrap items-center">
        {#if p.primary}
          <a
            href={safeHref(p.primary.href)}
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            {p.primary.label}
            {#if p.primary.iconSvg}
              {@html p.primary.iconSvg}
            {/if}
          </a>
        {/if}

        {#if p.secondary}
          <a
            href={safeHref(p.secondary.href)}
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {p.secondary.label}
          </a>
        {/if}
      </div>
    </div>

    {#if p.image}
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img src={safeImage(p.image.src)} alt={p.image.alt} />
      </div>
    {/if}

  </div>
</section>
{/snippet}

{#snippet heroSectionVideo(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
    <div class="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
      <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
        {#if p.title}
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-6xl dark:text-white">
            {p.title}
          </h1>
        {/if}

        {#if p.description}
          <p class="mx-auto mb-6 max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
            {p.description}
          </p>
        {/if}

        {#if p.form}
          <form action={safeFormAction(p.form.action)}>
            <div class="justify-center items-center mx-auto mb-3 space-y-4 sm:flex lg:justify-start sm:space-y-0 sm:space-x-4">
              {#if p.form.email}
                <div class="relative">
                  {#if p.form.email.label}
                    <label
                      for={p.form.email.id}
                      class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >{p.form.email.label}</label>
                  {/if}

                  {#if p.form.email.iconSvg}
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      {@html p.form.email.iconSvg}
                    </div>
                  {/if}

                  <input
                    id={p.form.email.id}
                    type="email"
                    required
                    placeholder={p.form.email.placeholder}
                    class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:w-80 xl:w-96 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              {/if}

              {#if p.form.submit}
                <button
                  type="submit"
                  class="w-full sm:w-auto justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {p.form.submit.label}
                  {#if p.form.submit.iconSvg}{@html p.form.submit.iconSvg}{/if}
                </button>
              {/if}
            </div>

            {#if p.form.meta}
              <div class="flex justify-center items-center divide-x divide-gray-200 lg:justify-start">
                {#if p.form.meta.left}
                  <div class="flex items-center pr-5 text-sm font-light text-gray-500 dark:text-gray-400">
                    {#if p.form.meta.left.iconSvg}{@html p.form.meta.left.iconSvg}{/if}
                    {#if p.form.meta.left.count}
                      <span class="mr-2 font-normal text-gray-900 dark:text-white">{p.form.meta.left.count}</span>
                    {/if}
                    {#if p.form.meta.left.label}{p.form.meta.left.label}{/if}
                  </div>
                {/if}

                {#if p.form.meta.right}
                  <div class="flex items-center pl-5 text-sm text-gray-900 dark:text-white">
                    {#if p.form.meta.right.iconSvg}{@html p.form.meta.right.iconSvg}{/if}
                    {#if p.form.meta.right.label}{p.form.meta.right.label}{/if}
                  </div>
                {/if}
              </div>
            {/if}
          </form>
        {/if}
      </div>

      {#if p.video && safeEmbed(p.video.src)}
        <div class="col-span-6">
          <iframe
            class="mx-auto w-full max-w-xl h-64 rounded-lg sm:h-96"
            src={safeEmbed(p.video.src)}
            title={p.video.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      {/if}
    </div>

    {#if p.logos?.length}
      <div class="grid grid-cols-2 gap-8 mx-auto max-w-screen-xl text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
        {#each p.logos as f}
          <a href={safeHref(f.href)} class={f.class ?? 'flex justify-center'}>
            {#if f.svg}{@html f.svg}{/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet heroSectionCoverImageCTAs(p)}
<section class="overflow-hidden relative bg-white dark:bg-gray-900">
  <div class="gap-8 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 xl:grid xl:grid-cols-12">
    <div class="col-span-8">
      {#if p.title}
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {p.title}
        </h1>
      {/if}

      {#if p.description}
        <p class="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {p.description}
        </p>
      {/if}

      {#if p.features?.length}
        <div class="gap-16 items-center sm:flex">
          {#each p.features as f, i}
            <div class="mb-8 text-gray-500 sm:mb-0 dark:text-gray-400">
              {#if f.iconSvg}
                <div class="mb-3 w-7 h-7" aria-hidden="true">{@html f.iconSvg}</div>
              {/if}
              {#if f.heading}
                <h2 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{f.heading}</h2>
              {/if}
              {#if f.text}
                <p class="mb-4 font-light">{f.text}</p>
              {/if}
              {#if f.cta}
                <a
                  href={safeHref(f.cta.href)}
                  class={f.cta.variant === "primary"
                    ? "text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center"}
                >
                  {#if f.cta.leftIconSvg}{@html f.cta.leftIconSvg}{/if}
                  {f.cta.label}
                  {#if f.cta.rightIconSvg}{@html f.cta.rightIconSvg}{/if}
                </a>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>

    {#if p.sideImage}
      <div class="hidden absolute top-0 right-0 w-1/3 h-full xl:block">
        <img
          class="object-cover w-full h-full"
          src={safeImage(p.sideImage.src)}
          alt={p.sideImage.alt}
          loading="lazy"
        />
      </div>
    {/if}
  </div>
</section>
{/snippet}


{#snippet heroSectionCTAapp(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div class="mr-auto place-self-center lg:col-span-7">
      {#if p.title}
        <h1 class="max-w-2xl mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-6xl dark:text-white">{@html p.title}</h1>
      {/if}

      {#if p.description}
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-10 md:text-lg lg:text-xl dark:text-gray-400">
          {p.description}
        </p>
      {/if}

      {#if p.downloadInfo}
        <div class="items-center justify-between p-4 mb-4 space-y-4 bg-gray-100 rounded dark:bg-gray-700 sm:flex sm:space-y-0">
          {#each p.downloadInfo as d}
            <div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{d.label}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{d.sub}</div>
            </div>
          {/each}

          {#if p.downloadButton}
            <a
              href={safeHref(p.downloadButton.href)}
              class="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-center text-white rounded-lg sm:w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              {@html p.downloadButton.iconSvg}
              {p.downloadButton.label}
            </a>
          {/if}
        </div>
      {/if}

      {#if p.licenseNote}
        <div class="text-sm text-gray-500">
          {@html p.licenseNote}
        </div>
      {/if}
    </div>

    {#if p.image}
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          class="rounded-lg shadow-lg"
          src={safeImage(p.image.src)}
          alt={p.image.alt}
        />
      </div>
    {/if}
  </div>

  {#if p.logos?.length}
    <div class="grid max-w-screen-xl grid-cols-2 gap-8 px-4 pb-8 mx-auto text-gray-500 lg:pb-16 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
      {#each p.logos as logo}
        <a href={safeHref(logo.href ?? "#", "#")} class="flex justify-center">
          {@html logo.svg}
        </a>
      {/each}
    </div>
  {/if}
</section>
{/snippet}

{#snippet heroSectionSearchBar(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
    <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">

      <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">

        {#if p.badge}
          <a href={safeHref(p.badge.href)} class="inline-flex items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600">{p.badge.label}</span>
            <span class="text-sm font-medium">{p.badge.text}</span>
            {@html p.badge.iconSvg}
          </a>
        {/if}

        {#if p.title}
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">
            {@html p.title}
          </h1>
        {/if}

        {#if p.description}
          <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
            {p.description}
          </p>
        {/if}

        {#if p.search}
          <form class="max-w-lg mx-auto lg:ml-0" action={safeFormAction(p.search.action)}>
            <label for="hero-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Search
            </label>
            <div class="relative">
              <input
                type="search"
                id="hero-search"
                placeholder={p.search.placeholder}
                required
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                       focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600
                       dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />

              <button
                type="submit"
                class="text-white inline-flex items-center absolute right-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800
                       focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2
                       dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                {@html p.search.iconSvg}
                {p.search.buttonLabel}
              </button>
            </div>
          </form>
        {/if}

      </div>

      {#if p.image}
        <div class="col-span-6">
          <img src={safeImage(p.image.src)} alt={p.image.alt ?? ''} />
        </div>
      {/if}

    </div>

    {#if p.features?.length}
      <div class="grid gap-8 sm:gap-12 md:grid-cols-3">
        {#each p.features as f}
          <div class="flex justify-center">
            {@html f.iconSvg}
            <div>
              <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">{f.title}</h3>
              <p class="font-light text-gray-500 dark:text-gray-400">{f.text}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet heroSectionCTASplit(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 pt-8 mx-auto text-center lg:pt-16 lg:px-12">
    {#if p.title}
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {@html p.title}
      </h1>
    {/if}

    {#if p.description}
      <p class="mb-8 font-light text-gray-500 md:text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {p.description}
      </p>
    {/if}

    {#if p.ctas?.length}
      <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        {#each p.ctas as c}
          <a href={safeHref(c.href)} class={c.variant === 'outline'
              ? "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              : "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"}>
            {#if c.iconSvg && c.iconPosition === 'left'} {@html c.iconSvg}{/if}
            {c.label}
            {#if c.iconSvg && (!c.iconPosition || c.iconPosition === 'right')} {@html c.iconSvg}{/if}
          </a>
        {/each}
      </div>
    {/if}

    {#if p.image}
      <img
        src={safeImage(p.image.src)}
        alt={p.image.alt ?? ""}
        class="mx-auto mb-5 lg:mb-8 border border-gray-200 rounded-lg shadow-xl dark:border-gray-600 z-1" />
    {/if}
  </div>

  {#if p.brands?.length}
    <div class="pt-48 lg:pb-16 pb-8 -mt-48 bg-gray-50 sm:pt-80 sm:-mt-80 dark:bg-gray-800 z-2">
      <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
        <div class="flex flex-wrap items-center justify-center mt-8 text-gray-500 sm:justify-between">
          {#each p.brands as b}
            <a href={safeHref(b.href)} class="mb-5 mr-5 lg:mb-0 hover:text-gray-900 dark:hover:text-gray-400">
              {@html b.svg}
            </a>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</section>
{/snippet}

{#snippet heroSectionImageBackgroundCTAs(p)}
<section
  class="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply"
  style={toBackgroundImageStyle(p.background?.url)}
>
  <div class="relative py-8 px-4 mx-auto max-w-screen-xl text-white lg:py-16 z-1">
    <div class="mb-6 max-w-screen-lg lg:mb-0">
      {#if p.title}
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
          {@html p.title}
        </h1>
      {/if}

      {#if p.description}
        <p class="mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">
          {p.description}
        </p>
      {/if}

      {#if p.cta}
        <a
          href={safeHref(p.cta.href)}
          class="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {p.cta.label}
          {#if p.cta.iconSvg}
            {@html p.cta.iconSvg}
          {/if}
        </a>
      {/if}
    </div>

    {#if p.cards?.length}
      <div
        class="grid gap-8 pt-8 lg:pt-12 mt-8 lg:mt-12 border-t border-gray-600 sm:grid-cols-2 lg:grid-cols-4"
      >
        {#each p.cards as c}
          <div>
            {#if c.title}
              <h2 class="mb-1 text-lg font-bold">{c.title}</h2>
            {/if}
            {#if c.text}
              <p class="mb-1 text-sm text-gray-400">{c.text}</p>
            {/if}
            {#if c.link}
              <a
                href={safeHref(c.link.href)}
                class="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline"
              >
                {c.link.label}
                {#if c.link.iconSvg}
                  {@html c.link.iconSvg}
                {/if}
              </a>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet heroSectionImageCards(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    <div class="grid grid-cols-2 gap-2">
      {#each p.cards as c, i}
        <a
          href={safeHref(c.href)}
          class={`p-8 text-left h-96 bg-no-repeat bg-cover bg-center bg-gray-500 bg-blend-multiply hover:bg-blend-normal ${
            i === 0 ? "col-span-2" : "col-span-2 md:col-span-1"
          }`}
          style={toBackgroundImageStyle(c.imageUrl)}
        >
          <h2
            class={`mb-5 max-w-xl font-extrabold tracking-tight leading-tight text-white ${
              i === 0 ? "text-5xl" : "text-4xl"
            }`}
          >
            {@html c.title}
          </h2>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2.5 font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700"
          >
            {c.buttonLabel}
          </button>
        </a>
      {/each}
    </div>
  </div>
</section>
{/snippet}

{#snippet heroSectionCarousel(p)}
<section class="bg-white dark:bg-gray-900 antialiased">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
    <div class="flex flex-col gap-8 lg:items-center lg:gap-16 lg:flex-row">
      <div class="lg:max-w-xl xl:shrink-0">
        <div>
          {#if p.title}
            <h2
              class="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            >
              {@html p.title}
            </h2>
          {/if}
          {#if p.description}
            <p
              class="mt-5 text-base font-normal text-gray-500 dark:text-gray-400 md:max-w-3xl sm:text-xl"
            >
              {p.description}
            </p>
          {/if}
        </div>

        {#if p.ctas?.length}
          <div class="flex flex-col gap-4 mt-8 sm:flex-row">
            {#each p.ctas as c}
              <a
                href={safeHref(c.href)}
                class={c.variant === "outline"
                  ? "sm:w-[182px] inline-flex w-full justify-center items-center px-5 py-3 text-base font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg shrink-0 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  : "sm:w-[182px] px-5 py-3 w-full text-base font-medium text-center text-white bg-primary-700 rounded-lg shrink-0 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
              >
                {#if c.iconSvg && c.iconPosition === "left"} {@html c.iconSvg} {/if}
                {c.label}
                {#if c.iconSvg && (!c.iconPosition || c.iconPosition === "right")} {@html c.iconSvg} {/if}
              </a>
            {/each}
          </div>
        {/if}

        {#if p.partners?.length}
          <div class="mt-4 sm:border-t sm:border-gray-100 sm:mt-8 sm:pt-8 dark:border-gray-700">
            <p class="hidden text-base font-medium text-gray-500 sm:block">
              {p.partnersLabel ?? "Partners and backers:"}
            </p>
            <div class="flex items-center mt-3 max-w-md flex-wrap">
              {#each p.partners as partner}
                <img
                  class="w-auto h-8 md:h-12 mr-4 dark:invert"
                  src={safeImage(partner.src)}
                  alt={partner.alt ?? ""}
                />
              {/each}
            </div>
          </div>
        {/if}
      </div>

      {#if p.carousel?.images?.length}
        <div id={p.carousel.id ?? "carousel"} class="relative w-full" data-carousel="slide">
          <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
            {#each p.carousel.images as img, i}
              <div
                class="hidden duration-700 ease-in-out rounded-lg"
                data-carousel-item
              >
                <img
                  src={safeImage(img.src)}
                  alt={img.alt ?? ""}
                  class="absolute rounded-lg block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </div>
            {/each}
          </div>

          <!-- Indicators -->
          <div
            class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
          >
            {#each p.carousel.images as _, i}
              <button
                type="button"
                class="w-3 h-3 rounded-full"
                aria-current={i === 0}
                aria-label={`Slide ${i + 1}`}
                data-carousel-slide-to={i}
              ></button>
            {/each}
          </div>

          <!-- Controls -->
          <button
            type="button"
            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span class="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span class="sr-only">Next</span>
            </span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</section>
{/snippet}

<!-- render only the requested snippet -->
{#if variant === 'heroSectionDefault'}
  {@render heroSectionDefault(data)}
{:else if variant === 'heroSectionImageHeading'}
  {@render heroSectionImageHeading(data)}
{:else if variant === 'heroSectionVideo'}
  {@render heroSectionVideo(data)}
{:else if variant === 'heroSectionCoverImageCTAs'}
  {@render heroSectionCoverImageCTAs(data)}
{:else if variant === 'heroSectionCTAapp'}
  {@render heroSectionCTAapp(data)}
{:else if variant === 'heroSectionSearchBar'}
  {@render heroSectionSearchBar(data)}
{:else if variant === 'heroSectionCTASplit'}
  {@render heroSectionCTASplit(data)}
{:else if variant === 'heroSectionImageBackgroundCTAs'}
  {@render heroSectionImageBackgroundCTAs(data)}
{:else if variant === 'heroSectionImageCards'}
  {@render heroSectionImageCards(data)}
{:else if variant === 'heroSectionCarousel'}
  {@render heroSectionCarousel(data)}
{/if}
