<script>
  import { browser } from '$app/environment';
  import { tick } from 'svelte';
  import { dev } from '$app/environment';
  import SiteBlockRenderer from '$lib/components/site/SiteBlockRenderer.svelte';

  export let blocks = [];
  export let focusBlock = '';

  let lastFocusedBlock = '';

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

  function getNormalizedFocusBlock() {
    return toSafeString(focusBlock);
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
  {@const blockId = getRenderableBlockId(block, index)}
  <div
    id={getBlockMarkerId(blockId)}
    data-nuvio-block-id={blockId}
    class="site-page-block"
    class:site-page-block-focused={normalizedFocusBlock && normalizedFocusBlock === blockId}
  >
    <SiteBlockRenderer {block} showFallback={false} showDevDetails={dev} />
  </div>
{/each}

<style>
  .site-page-block {
    position: relative;
    scroll-margin-top: 16px;
    transition: box-shadow 0.2s ease, outline-color 0.2s ease, background-color 0.2s ease;
  }

  .site-page-block-focused {
    outline: 3px solid rgba(37, 99, 235, 0.9);
    outline-offset: 2px;
    border-radius: 10px;
    box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.18);
    background: linear-gradient(0deg, rgba(37, 99, 235, 0.08), rgba(37, 99, 235, 0.08));
  }
</style>
