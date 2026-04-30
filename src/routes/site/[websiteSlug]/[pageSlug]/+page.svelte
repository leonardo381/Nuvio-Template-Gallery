<script>
  import SitePageRenderer from '$lib/components/site/SitePageRenderer.svelte';

  export let data;
</script>

<SitePageRenderer blocks={data.blocks ?? []} />

