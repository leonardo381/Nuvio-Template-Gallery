<script>
  import PricingTable from '$lib/components/marktingUI/pricingTable.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const pricingTableDefault = blocks['pricingTable.pricingTableDefault']?.props;
  const pricingTableTabSelector = blocks['pricingTable.pricingTableTabSelector']?.props;
  const pricingTableCard = blocks['pricingTable.pricingTableCard']?.props;
  const pricingTableFeature = blocks['pricingTable.pricingTableFeature']?.props;
  const pricingTableComparison = blocks['pricingTable.pricingTableComparison']?.props;
  const pricingTableHighlighted = blocks['pricingTable.pricingTableHighlighted']?.props;
  const pricingTableSimple = blocks['pricingTable.pricingTableSimple']?.props;
</script>

{#if pricingTableDefault}
  <PricingTable variant="pricingTableDefault" data={pricingTableDefault} />
{/if}
{#if pricingTableTabSelector}
  <PricingTable variant="pricingTableTabSelector" data={pricingTableTabSelector} />
{/if}
{#if pricingTableCard}
  <PricingTable variant="pricingTableCard" data={pricingTableCard} />
{/if}
{#if pricingTableFeature}
  <PricingTable variant="pricingTableFeature" data={pricingTableFeature} />
{/if}
{#if pricingTableComparison}
  <PricingTable variant="pricingTableComparison" data={pricingTableComparison} />
{/if}
{#if pricingTableHighlighted}
  <PricingTable variant="pricingTableHighlighted" data={pricingTableHighlighted} />
{/if}
{#if pricingTableSimple}
  <PricingTable variant="pricingTableSimple" data={pricingTableSimple} />
{/if}