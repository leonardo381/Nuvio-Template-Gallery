<script>
  import { browser, dev } from '$app/environment';
  import { tick } from 'svelte';
  import SiteBlockRenderer from '$lib/components/site/SiteBlockRenderer.svelte';

  export let blocks = [];
  export let focusBlock = '';
  export let cmsPreview = false;

  let lastFocusedBlock = '';
  const configuredCmsPreviewParentOrigin = `${import.meta.env.VITE_CMS_PREVIEW_PARENT_ORIGIN ?? ''}`.trim();

  function toSafeString(value) {
    return `${value ?? ''}`.trim();
  }

  function getBlockId(block) {
    return toSafeString(block?.id);
  }

  function getBlockMarkerId(blockId) {
    return `nuvio-block-${blockId}`;
  }

  function getRenderableBlockId(block, index) {
    const blockId = getBlockId(block);
    return blockId || `missing-${index}`;
  }

  function isCmsPreviewEnabled() {
    return cmsPreview === true;
  }

  function getNormalizedFocusBlock() {
    return toSafeString(focusBlock);
  }

  function getPostMessageTargetOrigin() {
    if (configuredCmsPreviewParentOrigin) {
      return configuredCmsPreviewParentOrigin;
    }

    if (dev) {
      return '*';
    }

    if (browser) {
      return window.location.origin;
    }

    return '*';
  }

  function postEditBlockMessage(blockId) {
    if (!browser || !blockId) {
      return;
    }

    window.parent?.postMessage(
      {
        source: 'nuvio-preview',
        type: 'edit-block',
        blockId
      },
      getPostMessageTargetOrigin()
    );
  }

  function onEditBlockClick(event, blockId) {
    event.preventDefault();
    event.stopPropagation();

    postEditBlockMessage(blockId);
  }

  async function focusSelectedBlock() {
    const targetBlockId = getNormalizedFocusBlock();
    if (!browser || !targetBlockId || targetBlockId === lastFocusedBlock) {
      return;
    }

    await tick();

    const markerId = getBlockMarkerId(targetBlockId);
    const escapedBlockId =
      typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(targetBlockId)
        : targetBlockId;
    const target =
      document.getElementById(markerId) ??
      document.querySelector(`[data-nuvio-block-id="${escapedBlockId}"]`);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });

    lastFocusedBlock = targetBlockId;
  }

  $: normalizedFocusBlock = getNormalizedFocusBlock();
  $: if (!normalizedFocusBlock) {
    lastFocusedBlock = '';
  }
  $: if (normalizedFocusBlock) {
    focusSelectedBlock();
  }
</script>

{#each blocks as block, index (block.id ?? index)}
  {@const persistedBlockId = getBlockId(block)}
  {@const blockId = getRenderableBlockId(block, index)}
  <div
    id={getBlockMarkerId(blockId)}
    data-nuvio-block-id={blockId}
    class="site-page-block"
    class:site-page-block-cms-preview={isCmsPreviewEnabled()}
    class:site-page-block-focused={normalizedFocusBlock && normalizedFocusBlock === blockId}
  >
    {#if isCmsPreviewEnabled() && persistedBlockId}
      <button
        type="button"
        class="site-page-block-edit-button"
        on:click={(event) => onEditBlockClick(event, persistedBlockId)}
      >
        Edit section
      </button>
    {/if}

    <div class="site-page-block-content" class:site-page-block-content-noninteractive={isCmsPreviewEnabled()}>
      <SiteBlockRenderer {block} showFallback={false} showDevDetails={dev} />
    </div>
  </div>
{/each}

<style>
  .site-page-block {
    position: relative;
    scroll-margin-top: 16px;
    transition: box-shadow 0.2s ease, outline-color 0.2s ease;
  }

  .site-page-block-focused {
    outline: 2px solid rgba(37, 99, 235, 0.55);
    outline-offset: 1px;
    border-radius: 8px;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
  }

  .site-page-block-cms-preview {
    min-height: 24px;
  }

  .site-page-block-edit-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    border: 1px solid rgba(15, 23, 42, 0.18);
    background: rgba(255, 255, 255, 0.95);
    color: #0f172a;
    border-radius: 999px;
    font-size: 12px;
    line-height: 1;
    padding: 7px 11px;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.12);
    pointer-events: auto;
  }

  .site-page-block-edit-button:hover {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.3);
  }

  .site-page-block-edit-button:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.45);
    outline-offset: 2px;
  }

  .site-page-block-content-noninteractive {
    pointer-events: none;
  }

  .site-page-block-content-noninteractive :global(*) {
    pointer-events: none !important;
  }
</style>
