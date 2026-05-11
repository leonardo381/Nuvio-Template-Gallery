<script>
  export let data;

  $: lifecycle = data?.lifecycle ?? {};
  $: isSuccess = lifecycle?.state === 'unsubscribed' || lifecycle?.state === 'already_unsubscribed';
</script>

<section class="min-h-screen bg-gray-50 py-16 px-4 dark:bg-gray-900">
  <div class="mx-auto max-w-2xl">
    <article class="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700" class:border-emerald-200={isSuccess} class:border-red-200={!isSuccess}>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{lifecycle.title}</h1>
      <p class="mt-3 text-gray-600 dark:text-gray-300">{lifecycle.message}</p>
      {#if isSuccess}
        <p class="mt-4 text-sm text-emerald-700 dark:text-emerald-300">You can close this page at any time.</p>
      {:else}
        <p class="mt-4 text-sm text-red-700 dark:text-red-300">Please verify the full link and try again.</p>
      {/if}
    </article>
  </div>
</section>
