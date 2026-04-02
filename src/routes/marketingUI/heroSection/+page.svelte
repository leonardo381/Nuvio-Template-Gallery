<script>
  import HeroSection from '$lib/components/marktingUI/heroSection.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const heroSectionDefault = blocks['heroSection.heroSectionDefault']?.props;
  const heroSectionImageHeading = blocks['heroSection.heroSectionImageHeading']?.props;
  const heroSectionVideo = blocks['heroSection.heroSectionVideo']?.props;
  const heroSectionCoverImageCTAs = blocks['heroSection.heroSectionCoverImageCTAs']?.props;
  const heroSectionCTAapp = blocks['heroSection.heroSectionCTAapp']?.props;
  const heroSectionSearchBar = blocks['heroSection.heroSectionSearchBar']?.props;
  const heroSectionCTASplit = blocks['heroSection.heroSectionCTASplit']?.props;
  const heroSectionImageBackgroundCTAs = blocks['heroSection.heroSectionImageBackgroundCTAs']?.props;
  const heroSectionImageCards = blocks['heroSection.heroSectionImageCards']?.props;
  const heroSectionCarousel = blocks['heroSection.heroSectionCarousel']?.props;
</script>

{#if heroSectionDefault}
  <HeroSection variant="heroSectionDefault" data={heroSectionDefault} />
{/if}

{#if heroSectionImageHeading}
  <HeroSection variant="heroSectionImageHeading" data={heroSectionImageHeading} />
{/if}

{#if heroSectionVideo}
  <HeroSection variant="heroSectionVideo" data={heroSectionVideo} />
{/if}

{#if heroSectionCoverImageCTAs}
  <HeroSection variant="heroSectionCoverImageCTAs" data={heroSectionCoverImageCTAs} />
{/if}

{#if heroSectionCTAapp}
  <HeroSection variant="heroSectionCTAapp" data={heroSectionCTAapp} />
{/if}

{#if heroSectionSearchBar}
  <HeroSection variant="heroSectionSearchBar" data={heroSectionSearchBar} />
{/if}

{#if heroSectionCTASplit}
  <HeroSection variant="heroSectionCTASplit" data={heroSectionCTASplit} />
{/if}

{#if heroSectionImageBackgroundCTAs}
  <HeroSection variant="heroSectionImageBackgroundCTAs" data={heroSectionImageBackgroundCTAs} />
{/if}

{#if heroSectionImageCards}
  <HeroSection variant="heroSectionImageCards" data={heroSectionImageCards} />
{/if}

{#if heroSectionCarousel}
  <HeroSection variant="heroSectionCarousel" data={heroSectionCarousel} />
{/if}
