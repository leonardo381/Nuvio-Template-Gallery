<script>
  import { dev } from '$app/environment';
  import { resolveSiteComponent } from '$lib/components/site/componentRegistry';

  export let blocks = [];

  function toSafeString(value) {
    return `${value ?? ''}`.trim();
  }

  function getExpandedComponent(block) {
    const expanded = block?.expand?.component;
    if (Array.isArray(expanded)) {
      return expanded[0] ?? null;
    }
    return expanded ?? null;
  }

  function getBlockSlot(block) {
    return toSafeString(block?.slot);
  }

  function getBlockVariant(block) {
    const explicitVariant = toSafeString(
      block?.variant ?? block?.component_variant ?? block?.componentVariant
    );
    if (explicitVariant) {
      return explicitVariant;
    }

    const slot = getBlockSlot(block);
    const dotIndex = slot.indexOf('.');
    if (dotIndex === -1) {
      return '';
    }

    return slot.slice(dotIndex + 1);
  }

  function getComponentCandidates(block) {
    const expanded = getExpandedComponent(block);
    const slot = getBlockSlot(block);
    const slotPrefix = slot.includes('.') ? slot.split('.')[0] : slot;

    return [
      toSafeString(expanded?.key),
      toSafeString(expanded?.component_key),
      toSafeString(expanded?.name),
      toSafeString(block?.component_key),
      toSafeString(block?.componentKey),
      toSafeString(slotPrefix)
    ].filter(Boolean);
  }

  function getResolvedComponent(block) {
    const candidates = getComponentCandidates(block);
    for (const key of candidates) {
      const component = resolveSiteComponent(key);
      if (component) {
        return { component, key };
      }
    }
    return { component: null, key: candidates[0] ?? '' };
  }

  function getBlockProps(block) {
    const props = block?.props;
    return props && typeof props === 'object' ? props : {};
  }
</script>

{#each blocks as block (block.id)}
  {@const resolved = getResolvedComponent(block)}
  {@const Component = resolved.component}
  {@const variant = getBlockVariant(block)}

  {#if Component}
    <svelte:component this={Component} variant={variant} data={getBlockProps(block)} />
  {:else if dev}
    <section style="border:1px dashed #f59e0b;padding:12px;margin:12px 0;border-radius:8px;background:#fffbeb;color:#92400e;">
      <strong>Unmapped component:</strong> {resolved.key || 'unknown'}
      {#if getBlockSlot(block)}
        <div style="margin-top:4px;font-size:12px;">slot: {getBlockSlot(block)}</div>
      {/if}
    </section>
  {/if}
{/each}

