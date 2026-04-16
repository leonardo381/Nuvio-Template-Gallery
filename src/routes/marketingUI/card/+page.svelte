<script>
  import Card from '$lib/components/marketingUI/card.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const cardDefault = blocks['card.cardDefault']?.props;
  const cardLink = blocks['card.cardLink']?.props;
  const cardHorizontal = blocks['card.cardHorizontal']?.props;
  const cardNavTabs = blocks['card.cardNavTabs']?.props;
  const cardFullTabs = blocks['card.cardFullTabs']?.props;
</script>

<div>
  {#if cardDefault}
    <Card variant="cardDefault" data={cardDefault} />
  {/if}
  {#if cardLink}
    <Card variant="cardLink" data={cardLink} />
  {/if}
  {#if cardHorizontal}
    <Card variant="cardHorizontal" data={cardHorizontal} />
  {/if}
  {#if cardNavTabs}
    <Card variant="cardNavTabs" data={cardNavTabs} />
  {/if}
  {#if cardFullTabs}
    <Card variant="cardFullTabs" data={cardFullTabs} />
  {/if}
</div>