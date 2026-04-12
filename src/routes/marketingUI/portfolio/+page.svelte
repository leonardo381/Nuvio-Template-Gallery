<script>
  import Portfolio from '$lib/components/marktingUI/portfolio.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const portfolioDefault = blocks['portfolio.portfolioDefault']?.props;
  const portfolioAlternateSections = blocks['portfolio.portfolioAlternateSections']?.props;
  const portfolioGridImageCTA = blocks['portfolio.portfolioGridImageCTA']?.props;
  const portfolioCarousel = blocks['portfolio.portfolioCarousel']?.props;
  const portfolioFeatureFull = blocks['portfolio.portfolioFeatureFull']?.props;
</script>

{#if portfolioDefault}
  <Portfolio variant="portfolioDefault" data={portfolioDefault} />
{/if}
{#if portfolioAlternateSections}
  <Portfolio variant="portfolioAlternateSections" data={portfolioAlternateSections} />
{/if}
{#if portfolioGridImageCTA}
  <Portfolio variant="portfolioGridImageCTA" data={portfolioGridImageCTA} />
{/if}
{#if portfolioCarousel}
  <Portfolio variant="portfolioCarousel" data={portfolioCarousel} />
{/if}
{#if portfolioFeatureFull}
  <Portfolio variant="portfolioFeatureFull" data={portfolioFeatureFull} />
{/if}