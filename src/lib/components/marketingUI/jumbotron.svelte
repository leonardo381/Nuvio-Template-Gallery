<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet jumbotronDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
    {#if p.title}
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        {@html p.title}
      </h1>
    {/if}

    {#if p.description}
      <p
        class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
      >
        {p.description}
      </p>
    {/if}

    {#if p.ctas?.length}
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
      >
        {#each p.ctas as c, i}
          <a
            href={c.href}
            class={c.variant === "outline"
              ? "py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              : "inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"}
          >
            {#if c.iconSvg && c.iconPosition === "left"} {@html c.iconSvg} {/if}
            {c.label}
            {#if c.iconSvg && (!c.iconPosition || c.iconPosition === "right")} {@html c.iconSvg} {/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet jumbotronBackgroundImage(p)}
<section
  class="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
  style={p.backgroundImage ? `background-image: url('${p.backgroundImage}')` : undefined}
>
  <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
    {#if p.title}
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
      >
        {@html p.title}
      </h1>
    {/if}

    {#if p.description}
      <p
        class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
      >
        {p.description}
      </p>
    {/if}

    {#if p.ctas?.length}
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
      >
        {#each p.ctas as c}
          <a
            href={c.href}
            class={c.variant === "outline"
              ? "inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
              : "inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"}
          >
            {#if c.iconSvg && c.iconPosition === "left"} {@html c.iconSvg} {/if}
            {c.label}
            {#if c.iconSvg && (!c.iconPosition || c.iconPosition === "right")} {@html c.iconSvg} {/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

{#snippet jumbotronVideo(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
    <div class="flex flex-col justify-center">
      {#if p.title}
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {@html p.title}
        </h1>
      {/if}

      {#if p.description}
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          {p.description}
        </p>
      {/if}

      {#if p.ctas?.length}
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
          {#each p.ctas as c, i}
            <a
              href={c.href}
              class={c.variant === "outline"
                ? "py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                : "inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"}
            >
              {#if c.iconSvg && c.iconPosition === "left"} {@html c.iconSvg} {/if}
              {c.label}
              {#if c.iconSvg && (!c.iconPosition || c.iconPosition === "right")} {@html c.iconSvg} {/if}
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <div>
      {#if p.videoUrl}
        <iframe
          class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
          src={p.videoUrl}
          title={p.videoTitle || "YouTube video player"}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      {/if}
    </div>
  </div>
</section>
{/snippet}

{#snippet jumbotronAutForm(p)}
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
    <div class="flex flex-col justify-center">
      {#if p.title}
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {@html p.title}
        </h1>
      {/if}

      {#if p.description}
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          {p.description}
        </p>
      {/if}

      {#if p.link}
        <a href={p.link.href} class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
          {p.link.label}
          {#if p.link.iconSvg} {@html p.link.iconSvg} {/if}
        </a>
      {/if}
    </div>

    <div>
      <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        {#if p.formTitle}
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{p.formTitle}</h2>
        {/if}

        <form class="mt-8 space-y-6" action={p.formAction ?? "#"}>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {p.emailLabel ?? "Your email"}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={p.emailPlaceholder ?? "name@company.com"}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {p.passwordLabel ?? "Your password"}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder={p.passwordPlaceholder ?? "••••••••"}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div class="ms-3 text-sm">
              <label for="remember" class="font-medium text-gray-500 dark:text-gray-400">
                {p.rememberLabel ?? "Remember this device"}
              </label>
            </div>
            {#if p.lostPassword}
              <a href={p.lostPassword.href} class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                {p.lostPassword.label}
              </a>
            {/if}
          </div>

          {#if p.submit}
            <button
              type="submit"
              class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {p.submit.label}
            </button>
          {/if}

          {#if p.footer}
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              {@html p.footer}
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet jumbotronGradientBackground(p)}
<section
  class={`bg-white dark:bg-gray-900 relative ${p.sectionClass ?? ""} ${p.bgLight ?? "bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]"} ${p.bgDark ?? "dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]"}`}>
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">

    {#if p.announcement}
      <a href={p.announcement.href ?? "#"}
         class="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
        {#if p.announcement.badge}
          <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">{p.announcement.badge}</span>
        {/if}
        <span class="text-sm font-medium">{p.announcement.text}</span>
        {#if p.announcement.iconSvg}
          {@html p.announcement.iconSvg}
        {/if}
      </a>
    {/if}

    {#if p.title}
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {@html p.title}
      </h1>
    {/if}

    {#if p.description}
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
        {p.description}
      </p>
    {/if}

    {#if p.form}
      <form class="w-full max-w-md mx-auto" action={p.form.action ?? "#"} method={p.form.method ?? "post"}>
        <label for="hero-email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          {p.form.label ?? "Email sign-up"}
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {#if p.form.iconSvg}
              {@html p.form.iconSvg}
            {:else}
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
              </svg>
            {/if}
          </div>
          <input
            type="email"
            id="hero-email"
            name={p.form.name ?? "email"}
            placeholder={p.form.placeholder ?? "Enter your email here..."}
            required
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {p.form.buttonLabel ?? "Sign up"}
          </button>
        </div>
      </form>
    {/if}
  </div>

  {#if p.overlay !== false}
    <div class={`bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0 ${p.overlayClass ?? ""}`}></div>
  {/if}
</section>
{/snippet}

{#snippet jumbotronCards(p)}
{@const data = p ?? {}}
<section class={`bg-white dark:bg-gray-900 ${p.sectionClass ?? ""}`}>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
    <!-- Featured -->
    {#if p.featured}
      <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
        {#if p.featured.badge}
          <a href={p.featured.badge.href ?? "#"}
             class={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2
                     ${p.featured.badge.class ??
                      "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400"}`}>
            {#if p.featured.badge.iconSvg}{@html p.featured.badge.iconSvg}{/if}
            {p.featured.badge.label}
          </a>
        {/if}

        {#if p.featured.title}
          <h1 class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
            {p.featured.title}
          </h1>
        {/if}

        {#if p.featured.text}
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {p.featured.text}
          </p>
        {/if}

        {#if p.featured.cta}
          <a href={p.featured.cta.href ?? "#"}
             class={`inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg
                     bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900`}>
            {p.featured.cta.label ?? "Read more"}
            {#if p.featured.cta.iconSvg}{@html p.featured.cta.iconSvg}{/if}
          </a>
        {/if}
      </div>
    {/if}

    <!-- Grid cards -->
    {#if p.cards && p.cards.length}
      <div class="grid md:grid-cols-2 gap-8">
        {#each p.cards as card}
          <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            {#if card.badge}
              <a href={card.badge.href ?? "#"}
                 class={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2
                         ${card.badge.class ??
                          "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400"}`}>
                {#if card.badge.iconSvg}{@html card.badge.iconSvg}{/if}
                {card.badge.label}
              </a>
            {/if}

            {#if card.title}
              <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                {card.title}
              </h2>
            {/if}

            {#if card.text}
              <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                {card.text}
              </p>
            {/if}

            {#if card.link}
              <a href={card.link.href ?? "#"} class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
                {card.link.label ?? "Read more"}
                {#if card.link.iconSvg}{@html card.link.iconSvg}{/if}
              </a>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
{/snippet}

<!-- render only the requested snippet -->
{#if variant === 'jumbotronDefault'}
  {@render jumbotronDefault(data)}
{:else if variant === 'jumbotronBackgroundImage'}
  {@render jumbotronBackgroundImage(data)}
{:else if variant === 'jumbotronVideo'}
  {@render jumbotronVideo(data)}
{:else if variant === 'jumbotronAutForm'}
  {@render jumbotronAutForm(data)}
{:else if variant === 'jumbotronGradientBackground'}
  {@render jumbotronGradientBackground(data)}
{:else if variant === 'jumbotronCards'}
  {@render jumbotronCards(data)}
{/if}
