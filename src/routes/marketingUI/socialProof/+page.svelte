<script>
  import SocialProof from '$lib/components/marktingUI/socialProof.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const socialProofDefault =
    blocks['socialProof.socialProofDefault']?.props;

  const socialProofCards =
    blocks['socialProof.socialProofCards']?.props;

  const socialProofIlustration =
    blocks['socialProof.socialProofIlustration']?.props;

  const socialProofCarousel =
    blocks['socialProof.socialProofCarousel']?.props;

  const socialProofCTA =
    blocks['socialProof.socialProofCTA']?.props;
</script>

{#if socialProofDefault}
  <SocialProof variant="socialProofDefault" data={socialProofDefault} />
{/if}
{#if socialProofCards}
  <SocialProof variant="socialProofCards" data={socialProofCards} />
{/if}
{#if socialProofIlustration}
  <SocialProof variant="socialProofIlustration" data={socialProofIlustration} />
{/if}
{#if socialProofCarousel}
  <SocialProof variant="socialProofCarousel" data={socialProofCarousel} />
{/if}
{#if socialProofCTA}
  <SocialProof variant="socialProofCTA" data={socialProofCTA} />
{/if}