<script>
  import ContentSection from '$lib/components/marktingUI/contentSection.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const contentSectionHeadingDescr = blocks['contentSection.contentSectionHeadingDescr']?.props;
  const contentSectionHeadingImageDescr = blocks['contentSection.contentSectionHeadingImageDescr']?.props;
  const contentSectionVideo = blocks['contentSection.contentSectionVideo']?.props;
  const contentSectionImageGallery = blocks['contentSection.contentSectionImageGallery']?.props;
  const contentSectionHeadingDescr2col = blocks['contentSection.contentSectionHeadingDescr2col']?.props;
  const contentSectionSocialProof = blocks['contentSection.contentSectionSocialProof']?.props;
  const contentSectionCardImages = blocks['contentSection.contentSectionCardImages']?.props;
  const contentSectionTableContents = blocks['contentSection.contentSectionTableContents']?.props;
  const contentSectionAll = blocks['contentSection.contentSectionAll']?.props;
</script>

{#if contentSectionHeadingDescr}
  <ContentSection variant="contentSectionHeadingDescr" data={contentSectionHeadingDescr} />
{/if}
{#if contentSectionHeadingImageDescr}
  <ContentSection variant="contentSectionHeadingImageDescr" data={contentSectionHeadingImageDescr} />
{/if}
{#if contentSectionVideo}
  <ContentSection variant="contentSectionVideo" data={contentSectionVideo} />
{/if}
{#if contentSectionImageGallery}
  <ContentSection variant="contentSectionImageGallery" data={contentSectionImageGallery} />
{/if}
{#if contentSectionHeadingDescr2col}
  <ContentSection variant="contentSectionHeadingDescr2col" data={contentSectionHeadingDescr2col} />
{/if}
{#if contentSectionSocialProof}
  <ContentSection variant="contentSectionSocialProof" data={contentSectionSocialProof} />
{/if}
{#if contentSectionCardImages}
  <ContentSection variant="contentSectionCardImages" data={contentSectionCardImages} />
{/if}
{#if contentSectionTableContents}
  <ContentSection variant="contentSectionTableContents" data={contentSectionTableContents} />
{/if}
{#if contentSectionAll}
  <ContentSection variant="contentSectionAll" data={contentSectionAll} />
{/if}