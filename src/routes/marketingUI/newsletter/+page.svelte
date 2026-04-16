<script>
  import Newsletter from '$lib/components/marketingUI/newsletter.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const newsletterDefault = blocks['newsletter.newsletterDefault']?.props;
  const newsletterCard = blocks['newsletter.newsletterCard']?.props;
  const newsletterBanner = blocks['newsletter.newsletterBanner']?.props;
  const newsletterPopup = blocks['newsletter.newsletterPopup']?.props;
  const newsletterModal = blocks['newsletter.newsletterModal']?.props;
</script>

{#if newsletterDefault}
  <Newsletter variant="newsletterDefault" data={newsletterDefault} />
{/if}
{#if newsletterCard}
  <Newsletter variant="newsletterCard" data={newsletterCard} />
{/if}
{#if newsletterBanner}
  <Newsletter variant="newsletterBanner" data={newsletterBanner} />
{/if}
{#if newsletterPopup}
  <Newsletter variant="newsletterPopup" data={newsletterPopup} />
{/if}
{#if newsletterModal}
  <Newsletter variant="newsletterModal" data={newsletterModal} />
{/if}