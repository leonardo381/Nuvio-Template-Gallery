<script>
  import Carousel from '$lib/components/marketingUI/accordion.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const accordionDefault = blocks['accordion.accordionDefault']?.props;
  const accordionFlush = blocks['accordion.accordionFlush']?.props;

</script>

{#if accordionDefault}
  <Carousel variant="accordionDefault" data={accordionDefault} />
{/if}
{#if accordionFlush}
  <Carousel variant="accordionFlush" data={accordionFlush} />
{/if}