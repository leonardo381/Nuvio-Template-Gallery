<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet galleryDefault(p)}
<div class={`grid grid-cols-2 md:grid-cols-3 gap-4 ${p.class ?? ""}`}>
  {#each p.images as img}
    <div>
      <img
        class="h-auto max-w-full rounded-lg"
        src={img.src}
        alt={img.alt ?? ''}
      />
    </div>
  {/each}
</div>
{/snippet}

{#snippet galleryMasonry(p)}
<div class={`grid grid-cols-2 md:grid-cols-4 gap-4 ${p.class ?? ""}`}>
  {#each p.columns as column}
    <div class="grid gap-4">
      {#each column.images as img}
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src={img.src}
            alt={img.alt ?? ''}
          />
        </div>
      {/each}
    </div>
  {/each}
</div>
{/snippet}

{#snippet galleryFeatured(p)}
<div class={`grid gap-4 ${p.class ?? ""}`}>
  <!-- Featured image -->
  <div>
    <img
      class="h-auto max-w-full rounded-lg"
      src={p.featured.src}
      alt={p.featured.alt ?? ''}
    />
  </div>

  <!-- Thumbnail grid -->
  <div class="grid grid-cols-5 gap-4">
    {#each p.thumbnails as img}
      <div>
        <img
          class="h-auto max-w-full rounded-lg"
          src={img.src}
          alt={img.alt ?? ''}
        />
      </div>
    {/each}
  </div>
</div>
{/snippet}

<!-- render only the requested snippet -->

<div class="mr-24 ml-24 p-12 flex justify-center">
  {#if variant === 'galleryDefault'}
    {@render galleryDefault(data)}
  {:else if variant === 'galleryMasonry'}
    {@render galleryMasonry(data)}
  {:else if variant === 'galleryFeatured'}
    {@render galleryFeatured(data)}
  {/if}
</div>
