<script>
  import CustomerLogos from '$lib/components/marktingUI/customerLogos.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const customerLogosDefault = blocks['customerLogos.customerLogosDefault']?.props;
  const customerLogosCards = blocks['customerLogos.customerLogosCards']?.props;
  const customerLogosGrid = blocks['customerLogos.customerLogosGrid']?.props;
  const customerLogosCardCTA = blocks['customerLogos.customerLogosCardCTA']?.props;
  const customerLogosGridCTA = blocks['customerLogos.customerLogosGridCTA']?.props;

</script>

{#if customerLogosDefault}
  <CustomerLogos variant="customerLogosDefault" data={customerLogosDefault} />
{/if}
{#if customerLogosCards}
  <CustomerLogos variant="customerLogosCards" data={customerLogosCards} />
{/if}
{#if customerLogosGrid}
  <CustomerLogos variant="customerLogosGrid" data={customerLogosGrid} />
{/if}
{#if customerLogosCardCTA}
  <CustomerLogos variant="customerLogosCardCTA" data={customerLogosCardCTA} />
{/if}
{#if customerLogosGridCTA}
  <CustomerLogos variant="customerLogosGridCTA" data={customerLogosGridCTA} />
{/if}