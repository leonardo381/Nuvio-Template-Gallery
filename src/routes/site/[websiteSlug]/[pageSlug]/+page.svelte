<script>
  import { page } from '$app/stores';
  import SitePageRenderer from '$lib/components/site/SitePageRenderer.svelte';

  export let data;

  $: focusBlock = `${$page.url.searchParams.get('focusBlock') ?? ''}`.trim();
</script>

<SitePageRenderer blocks={data.blocks ?? []} {focusBlock} />
