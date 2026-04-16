<script>
  import Carousel from '$lib/components/marketingUI/carousel.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const carouselDefault = blocks['carousel.carouselDefault']?.props;

</script>

{#if carouselDefault}
  <Carousel variant="carouselDefault" data={carouselDefault} />
{/if}