<script>
  import { page } from '$app/stores';
  import SitePageRenderer from '$lib/components/site/SitePageRenderer.svelte';

  export let data;

  $: focusBlock = `${$page.url.searchParams.get('focusBlock') ?? ''}`.trim();
  $: cmsPreview = `${$page.url.searchParams.get('cmsPreview') ?? ''}`.trim() === '1';
</script>

<SitePageRenderer blocks={data.blocks ?? []} {focusBlock} {cmsPreview} />
