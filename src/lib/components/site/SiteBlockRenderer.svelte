<script>
  import { resolveSiteComponent } from '$lib/components/site/componentRegistry';

  export let block = null;
  export let showFallback = false;
  export let showDevDetails = false;

  function toSafeString(value) {
    return `${value ?? ''}`.trim();
  }

  function getExpandedComponent(inputBlock) {
    const expanded = inputBlock?.expand?.component;
    if (Array.isArray(expanded)) {
      return expanded[0] ?? null;
    }
    return expanded ?? null;
  }

  function getBlockSlot(inputBlock) {
    return toSafeString(inputBlock?.slot);
  }

  function getBlockVariant(inputBlock) {
    const explicitVariant = toSafeString(
      inputBlock?.variant ?? inputBlock?.component_variant ?? inputBlock?.componentVariant
    );
    if (explicitVariant) {
      return explicitVariant;
    }

    const slot = getBlockSlot(inputBlock);
    const dotIndex = slot.indexOf('.');
    if (dotIndex === -1) {
      return '';
    }

    return slot.slice(dotIndex + 1);
  }

  function getComponentCandidates(inputBlock) {
    const expanded = getExpandedComponent(inputBlock);
    const slot = getBlockSlot(inputBlock);
    const slotPrefix = slot.includes('.') ? slot.split('.')[0] : slot;

    return [
      toSafeString(expanded?.key),
      toSafeString(expanded?.component_key),
      toSafeString(expanded?.name),
      toSafeString(inputBlock?.component_key),
      toSafeString(inputBlock?.componentKey),
      toSafeString(slotPrefix)
    ].filter(Boolean);
  }

  function getResolvedComponent(inputBlock) {
    const candidates = getComponentCandidates(inputBlock);
    for (const key of candidates) {
      const component = resolveSiteComponent(key);
      if (component) {
        return { component, key };
      }
    }
    return { component: null, key: candidates[0] ?? '' };
  }

  function getBlockProps(inputBlock) {
    const props = (
      inputBlock?.resolvedProps &&
      typeof inputBlock.resolvedProps === 'object' &&
      !Array.isArray(inputBlock.resolvedProps)
    )
      ? inputBlock.resolvedProps
      : inputBlock?.props;
    return props && typeof props === 'object' ? props : {};
  }
</script>

{#if block}
  {@const resolved = getResolvedComponent(block)}
  {@const Component = resolved.component}
  {@const variant = getBlockVariant(block)}

  {#if Component}
    <svelte:component this={Component} {variant} data={getBlockProps(block)} />
  {:else if showFallback}
    <section class="site-block-preview-fallback">
      Preview unavailable
    </section>
  {:else if showDevDetails}
    <section class="site-block-dev-fallback">
      <strong>Unmapped component:</strong> {resolved.key || 'unknown'}
      {#if getBlockSlot(block)}
        <div class="slot-line">slot: {getBlockSlot(block)}</div>
      {/if}
    </section>
  {/if}
{/if}

<style>
  .site-block-preview-fallback {
    border: 1px dashed #94a3b8;
    border-radius: 8px;
    padding: 14px;
    text-align: center;
    color: #64748b;
    background: #f8fafc;
    font-size: 0.9rem;
  }

  .site-block-dev-fallback {
    border: 1px dashed #f59e0b;
    padding: 12px;
    margin: 12px 0;
    border-radius: 8px;
    background: #fffbeb;
    color: #92400e;
  }

  .slot-line {
    margin-top: 4px;
    font-size: 12px;
  }
</style>
