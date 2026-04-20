<script>
  import Features from '$lib/components/coreUI/features.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const featureWhatsApp = blocks['feature.featureWhatsApp']?.props;
  const featureContact = blocks['feature.Contact']?.props;

</script>

{#if featureWhatsApp}
  <Features variant="featureWhatsApp" data={featureWhatsApp} />
{/if}
{#if featureContact}
  <Features variant="featureContact" data={featureContact} />
{/if}