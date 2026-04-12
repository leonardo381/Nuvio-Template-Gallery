<script>
  import Gallery from '$lib/components/marktingUI/gallery.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const galleryDefault = blocks['gallery.galleryDefault']?.props;
  const galleryMasonry = blocks['gallery.galleryMasonry']?.props;
  const galleryFeatured = blocks['gallery.galleryFeatured']?.props;
</script>

{#if galleryDefault}
  <Gallery variant="galleryDefault" data={galleryDefault} />
{/if}
{#if galleryMasonry}
  <Gallery variant="galleryMasonry" data={galleryMasonry} />
{/if}
{#if galleryFeatured}
  <Gallery variant="galleryFeatured" data={galleryFeatured} />
{/if}