<script>
  import FeatureSection from '$lib/components/marktingUI/featureSection.svelte';
  import SectionSurface from '$lib/components/coreUI/SectionSurface.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const featureSectionFeatureList = blocks['featureSection.featureSectionFeatureList']?.props;
  const featureSectionFeatureListImageCTAs = blocks['featureSection.featureSectionFeatureListImageCTAs']?.props;
  const featureSectionFeatureListCTAs = blocks['featureSection.featureSectionFeatureListCTAs']?.props;
  const featureSectionFeatureListSubList = blocks['featureSection.featureSectionFeatureListSubList']?.props;
  const featureSectionFeatureListIconsCTA = blocks['featureSection.featureSectionFeatureListIconsCTA']?.props;
  const featureSectionFeatureListDescrIcons = blocks['featureSection.featureSectionFeatureListDescrIcons']?.props;
  const featureSectionFeatureListCards = blocks['featureSection.featureSectionFeatureListCards']?.props;
  const featureSectionAlternateImage = blocks['featureSection.featureSectionAlternateImage']?.props;
  const featureSectionCTAcards = blocks['featureSection.featureSectionCTAcards']?.props;
  const featureSectionRoundedIcons = blocks['featureSection.featureSectionRoundedIcons']?.props;
</script>

{#if featureSectionFeatureList}
  <SectionSurface variant="bgDarkGrid">
    <FeatureSection variant="featureSectionFeatureList" data={featureSectionFeatureList} />
  </SectionSurface>
{/if}
{#if featureSectionFeatureListImageCTAs}
  <SectionSurface variant="bgImageGridOverlay" image={featureSectionFeatureListImageCTAs.image}>
    <FeatureSection variant="featureSectionFeatureListImageCTAs" data={featureSectionFeatureListImageCTAs} />
  </SectionSurface>
{/if}
{#if featureSectionFeatureListCTAs}
  <SectionSurface variant="bgLightGrid">
    <FeatureSection variant="featureSectionFeatureListCTAs" data={featureSectionFeatureListCTAs} />
  </SectionSurface>
{/if}
{#if featureSectionFeatureListSubList}
  <SectionSurface variant="bgDarkBottomBorder">
    <FeatureSection variant="featureSectionFeatureListSubList" data={featureSectionFeatureListSubList} />
  </SectionSurface>
{/if}
{#if featureSectionFeatureListIconsCTA}
  <SectionSurface variant="bgDarkSpotlight">
    <FeatureSection variant="featureSectionFeatureListIconsCTA" data={featureSectionFeatureListIconsCTA} />
  </SectionSurface>
{/if}
{#if featureSectionFeatureListDescrIcons}
  <SectionSurface variant="bgLightPanel">
    <FeatureSection variant="featureSectionFeatureListDescrIcons" data={featureSectionFeatureListDescrIcons} />
  </SectionSurface>
{/if}
{#if featureSectionFeatureListCards}
  <SectionSurface variant="bgDarkOrbs">
    <FeatureSection variant="featureSectionFeatureListCards" data={featureSectionFeatureListCards} />
  </SectionSurface>
{/if}
{#if featureSectionAlternateImage}
  <SectionSurface variant="bgSplitRight">
    <FeatureSection variant="featureSectionAlternateImage" data={featureSectionAlternateImage} />
  </SectionSurface>
{/if}
{#if featureSectionCTAcards}
  <SectionSurface variant="bgAccentBand">
    <FeatureSection variant="featureSectionCTAcards" data={featureSectionCTAcards} />
  </SectionSurface>
{/if}
{#if featureSectionRoundedIcons}
  <SectionSurface variant="bgTopGlow">
    <FeatureSection variant="featureSectionRoundedIcons" data={featureSectionRoundedIcons} />
  </SectionSurface>
{/if}
