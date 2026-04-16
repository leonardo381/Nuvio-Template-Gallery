<script>
  import CTAsection from '$lib/components/marketingUI/ctaSection.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const ctaSectionDefault = blocks['ctaSection.ctaSectionDefault']?.props;
  const ctaSectionImage = blocks['ctaSection.ctaSectionImage']?.props;
  const ctaSectionHeading = blocks['ctaSection.ctaSectionHeading']?.props;
  const ctaSectionQRcode = blocks['ctaSection.ctaSectionQRcode']?.props;
  const ctaSectionEmail = blocks['ctaSection.ctaSectionEmail']?.props;
</script>

{#if ctaSectionDefault}
  <CTAsection variant="ctaSectionDefault" data={ctaSectionDefault} />
{/if}
{#if ctaSectionImage}
  <CTAsection variant="ctaSectionImage" data={ctaSectionImage} />
{/if}
{#if ctaSectionHeading}
  <CTAsection variant="ctaSectionHeading" data={ctaSectionHeading} />
{/if}
{#if ctaSectionQRcode}
  <CTAsection variant="ctaSectionQRcode" data={ctaSectionQRcode} />
{/if}
{#if ctaSectionEmail}
  <CTAsection variant="ctaSectionEmail" data={ctaSectionEmail} />
{/if}