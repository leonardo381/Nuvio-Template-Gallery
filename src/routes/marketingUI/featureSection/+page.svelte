<script>
  import FeatureSection from '$lib/components/marktingUI/featureSection.svelte';
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
  <FeatureSection variant="featureSectionFeatureList" data={featureSectionFeatureList} />
{/if}
{#if featureSectionFeatureListImageCTAs}
  <FeatureSection variant="featureSectionFeatureListImageCTAs" data={featureSectionFeatureListImageCTAs} />
{/if}
{#if featureSectionFeatureListCTAs}
  <FeatureSection variant="featureSectionFeatureListCTAs" data={featureSectionFeatureListCTAs} />
{/if}
{#if featureSectionFeatureListSubList}
  <FeatureSection variant="featureSectionFeatureListSubList" data={featureSectionFeatureListSubList} />
{/if}
{#if featureSectionFeatureListIconsCTA}
  <FeatureSection variant="featureSectionFeatureListIconsCTA" data={featureSectionFeatureListIconsCTA} />
{/if}
{#if featureSectionFeatureListDescrIcons}
  <FeatureSection variant="featureSectionFeatureListDescrIcons" data={featureSectionFeatureListDescrIcons} />
{/if}
{#if featureSectionFeatureListCards}
  <FeatureSection variant="featureSectionFeatureListCards" data={featureSectionFeatureListCards} />
{/if}
{#if featureSectionAlternateImage}
  <FeatureSection variant="featureSectionAlternateImage" data={featureSectionAlternateImage} />
{/if}
{#if featureSectionCTAcards}
  <FeatureSection variant="featureSectionCTAcards" data={featureSectionCTAcards} />
{/if}
{#if featureSectionRoundedIcons}
  <FeatureSection variant="featureSectionRoundedIcons" data={featureSectionRoundedIcons} />
{/if}