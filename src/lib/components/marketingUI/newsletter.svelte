<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};

</script>

{#snippet newsletterDefault(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md sm:text-center">
      <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
        {p.title}
      </h2>
      <p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
        {p.description}
      </p>

      <form action={p.formAction ?? '#'}>
        <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
          <div class="relative w-full">
            <label for={p.input.id} class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {p.input.label}
            </label>
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              {@html p.input.iconSvg}
            </div>
            <input
              id={p.input.id}
              type="email"
              required
              placeholder={p.input.placeholder}
              class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                     sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          <div>
            <button type="submit"
              class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer
                     bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800
                     focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700
                     dark:focus:ring-primary-800">
              {p.buttonText}
            </button>
          </div>
        </div>

        <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
          {p.footer.text}
          <a href={p.footer.href} class="font-medium text-primary-600 dark:text-primary-500 hover:underline">
            {p.footer.linkText}
          </a>.
        </div>
      </form>
    </div>
  </div>
</section>
{/snippet}


{#snippet newsletterCard(p)}
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="gap-16 justify-between items-center p-6 text-white bg-gray-900 rounded-lg dark:bg-gray-800 lg:flex lg:gap-24 md:p-12">
      <div class="w-full">
        <h2 class="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl">{p.title}</h2>
        <p class="font-light text-gray-400 sm:text-xl">{p.description}</p>
      </div>

      <div class="mt-6 w-full lg:mt-0">
        <form action={p.formAction ?? '#'}>
          <div class="items-center mb-3 space-y-4 sm:flex sm:space-y-0">
            <div class="relative w-full">
              <label for={p.input.id} class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {p.input.label}
              </label>
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                {@html p.input.iconSvg}
              </div>
              <input
                id={p.input.id}
                class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                       sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={p.input.placeholder}
                type="email"
                required
              />
            </div>
            <div>
              <button type="submit"
                class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer
                       bg-primary-600 border-primary-600 hover:border-primary-700 sm:rounded-none sm:rounded-r-lg
                       hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600
                       dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                {p.buttonText}
              </button>
            </div>
          </div>
          <div class="text-sm text-left text-gray-400 dark:text-gray-300">
            {p.footer.text} <a href={p.footer.href} class="font-medium text-white hover:underline">{p.footer.linkText}</a>.
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
{/snippet}

{#snippet newsletterBanner(p)}
<!-- -->
<div
  id="banner"
  tabindex="-1"
  class="fixed z-50 flex items-start w-full px-4 py-3 border border-b border-gray-200 sm:justify-between bg-white dark:border-gray-700 dark:bg-gray-800"
>
  <div class="items-center justify-center w-full sm:flex">
    <p class="mb-4 font-medium text-gray-500 sm:mb-0 dark:text-white md:mb-0">
      {p.text}
    </p>

    <form action={p.formAction ?? '#'} class="sm:pl-10">
      <div class="flex items-center md:mx-auto sm:space-y-0">
        <div class="relative w-full mr-3">
          <label
            for={p.input.id}
            class="block mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >{p.input.label}</label
          >
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {@html p.input.iconSvg}
          </div>
          <input
            id={p.input.id}
            placeholder={p.input.placeholder}
            type="email"
            required
            class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:w-64 lg:w-96 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {p.buttonText}
          </button>
        </div>
      </div>
    </form>
  </div>

  <button
    data-collapse-toggle="banner"
    type="button"
    class="absolute top-1 right-1 sm:relative inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
  >
    {@html p.closeIcon}
  </button>
</div>
{/snippet}

{#snippet newsletterPopup(p)}
<div
  id="sign-up-pop-up"
  tabindex="-1"
  class="fixed right-0 z-50 max-w-md p-4 mx-4 bg-white border border-gray-200 rounded-lg shadow bottom-4 md:mx-0 md:right-6 sm:bottom-6 dark:bg-gray-800 md:p-6 dark:border-gray-700"
>
  <button
    type="button"
    id="close-modal"
    data-collapse-toggle="sign-up-pop-up"
    class="text-gray-400 absolute top-3 right-3 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  >
    {@html p.closeIcon}
  </button>

  <div>
    <h3 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
      {p.title}
    </h3>
    <p class="mb-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
      {p.description}
    </p>

    <form action={p.formAction ?? '#'}>
      <div class="items-center max-w-screen-sm mx-auto space-y-4 sm:flex sm:space-y-0">
        <div class="relative w-full mr-3">
          <label
            for={p.input.id}
            class="hidden mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            {p.input.label}
          </label>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {@html p.input.iconSvg}
          </div>
          <input
            id={p.input.id}
            placeholder={p.input.placeholder}
            type="email"
            required
            class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {p.buttonText}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
{/snippet}

{#snippet newsletterModal(p)}
<!--  z-50 class="hidden fixed -->

<div id="newsletter-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full">
  <div class="relative p-4 w-full max-w-2xl h-full rounded-lg md:h-auto">
      <!-- Modal content -->
      <div class="flex relative items-center bg-white rounded-lg shadow dark:bg-gray-800">
          <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/newsletter/people-at-office.png" class="hidden rounded-l-lg md:flex h-64" alt="office">
          <div>
              <button type="button" class="text-gray-400 absolute top-3 right-3 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" id="close-modal">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
              </button>
              <!-- Modal body -->
              <div class="p-6 pt-4">
                  <h3 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Join our Newsletter
                  </h3>
                  <p class="mb-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Get started with our monthly newsletter for helpful tips on how to run your business smoothly.
                  </p>
                  <form action="#">
                      <div class="items-center mx-auto space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                          <div class="relative mr-3 w-full">
                              <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Email address</label>
                              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                              </div>
                              <input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your email" type="email" id="email" required>
                          </div>
                          <div>
                              <button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</div>
{/snippet}

<!-- render only the requested snippet -->

<!-- <div class="mr-24 ml-24 p-12 flex justify-center"> -->
<div>
  {#if variant === 'newsletterDefault'}
    {@render newsletterDefault(data)}
  {:else if variant === 'newsletterCard'}
    {@render newsletterCard(data)}
  {:else if variant === 'newsletterBanner'}
    {@render newsletterBanner(data)}
  {:else if variant === 'newsletterPopup'}
    {@render newsletterPopup(data)}
  {:else if variant === 'newsletterModal'}
    {@render newsletterModal(data)}
  {/if}
</div>
