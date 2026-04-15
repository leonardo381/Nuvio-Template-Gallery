<script lang="ts">
  let { variant = '', image = '', children } = $props<{
    variant?: string;
    image?: string;
    children?: () => unknown;
  }>();
</script>

{#snippet bgDarkBase()}
<!-- Best for:
  - neutral dark sections
  - generic content blocks
  - simple dark pages
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgDarkGrid()}
<!-- Best for:
  - features
  - testimonials
  - stats
  - sections that need more structure
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-20
    [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)]
    [background-size:96px_100%]"
  ></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgDarkSpotlight()}
<!-- Best for:
  - hero sections
  - CTA sections
  - pricing intros
  - sections that need more visual focus
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-15
    [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)]
    [background-size:96px_100%]"
  ></div>

  <div
    class="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem]
    -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl"
  ></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgLightPanel()}
<!-- Best for:
  - clean contrast after dark sections
  - feature grids
  - FAQ
  - team / content sections
-->
<section class="relative overflow-hidden bg-slate-100 text-slate-900">
  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgLightGrid()}
<!-- Best for:
  - enterprise / editorial style sections
  - structured light backgrounds
  - comparison / info sections
-->
<section class="relative overflow-hidden bg-slate-50 text-slate-900">
  <div
    class="pointer-events-none absolute inset-0 opacity-50
    [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px)]
    [background-size:96px_100%]"
  ></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgDarkBottomBorder()}
<!-- Best for:
  - subtle separation between dark sections
  - low-risk wrapper with a bit more polish
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgDarkLeftGlow()}
<!-- Best for:
  - sections with text on the left
  - feature/image layouts
  - slightly more dynamic dark sections
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div
    class="pointer-events-none absolute left-0 top-1/2 h-[32rem] w-[32rem]
    -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
  ></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgDarkVignette()}
<!-- Best for:
  - immersive dark sections
  - calmer sections that still need depth
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.18)_60%,rgba(2,6,23,0.45)_100%)]"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgAccentBand()}
<!-- Best for:
  - CTA
  - newsletter
  - conversion sections
  - sections that need a brand accent
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="absolute inset-x-0 top-0 h-1 bg-blue-500"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgImageOverlay()}
<!-- Best for:
  - cinematic hero
  - event / promo sections
  - visual CTA sections
-->
<section class="relative overflow-hidden text-white">
  {#if image}
    <div
      class="absolute inset-0 bg-cover bg-center"
      style={`background-image: url('${image}')`}
    ></div>
  {/if}

  <div class="absolute inset-0 bg-slate-950/75"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950/90"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgImageGridOverlay()}
<!-- Best for:
  - stronger premium hero sections
  - image-led sections that still need structure
-->
<section class="relative overflow-hidden text-white">
  {#if image}
    <div
      class="absolute inset-0 bg-cover bg-center"
      style={`background-image: url('${image}')`}
    ></div>
  {/if}

  <div class="absolute inset-0 bg-slate-950/75"></div>

  <div
    class="pointer-events-none absolute inset-0 opacity-20
    [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)]
    [background-size:96px_100%]"
  ></div>

  <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950/90"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgSplitRight()}
<!-- Best for:
  - split layouts
  - image/content compositions
  - comparison sections
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="absolute inset-y-0 right-0 w-1/2 bg-slate-900"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgSplitLeft()}
<!-- Best for:
  - split layouts
  - image/content compositions
  - comparison sections
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="absolute inset-y-0 left-0 w-1/2 bg-slate-900"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgDarkOrbs()}
<!-- Best for:
  - modern marketing pages
  - slightly more playful / alive dark sections
  - SaaS-ish pages
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
  <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgTopGlow()}
<!-- Best for:
  - hero
  - CTA
  - pricing intro
-->
<section class="relative overflow-hidden bg-slate-950 text-white">
  <div class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-500/15 to-transparent blur-2xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#if variant === 'bgDarkBase'}
  {@render bgDarkBase()}
{:else if variant === 'bgDarkGrid'}
  {@render bgDarkGrid()}
{:else if variant === 'bgDarkSpotlight'}
  {@render bgDarkSpotlight()}
{:else if variant === 'bgLightPanel'}
  {@render bgLightPanel()}
{:else if variant === 'bgLightGrid'}
  {@render bgLightGrid()}
{:else if variant === 'bgDarkBottomBorder'}
  {@render bgDarkBottomBorder()}
{:else if variant === 'bgDarkLeftGlow'}
  {@render bgDarkLeftGlow()}
{:else if variant === 'bgDarkVignette'}
  {@render bgDarkVignette()}
{:else if variant === 'bgAccentBand'}
  {@render bgAccentBand()}
{:else if variant === 'bgImageOverlay'}
  {@render bgImageOverlay()}
{:else if variant === 'bgImageGridOverlay'}
  {@render bgImageGridOverlay()}
{:else if variant === 'bgSplitRight'}
  {@render bgSplitRight()}
{:else if variant === 'bgSplitLeft'}
  {@render bgSplitLeft()}
{:else if variant === 'bgDarkOrbs'}
  {@render bgDarkOrbs()}
{:else if variant === 'bgTopGlow'}
  {@render bgTopGlow()}
{/if}
