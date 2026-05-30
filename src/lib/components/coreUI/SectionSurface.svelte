<script lang="ts">
  import { sanitizeCssUrl } from '$lib/utils/sanitizeHtml';

  let { variant = '', image = '', children } = $props<{
    variant?: string;
    image?: string;
    children?: () => unknown;
  }>();

  const toBackgroundImageStyle = (value: unknown) => {
    const safeCssUrl = sanitizeCssUrl(value);
    return safeCssUrl ? `background-image: ${safeCssUrl}` : undefined;
  };
</script>

{#snippet bgDarkBase()}
<!-- Best for:
  - neutral dark sections
  - generic content blocks
  - simple dark pages
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-60
    [background-image:linear-gradient(to_right,rgba(17,24,39,0.06)_1px,transparent_1px)]
    dark:opacity-20
    dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)]
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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-60
    [background-image:linear-gradient(to_right,rgba(17,24,39,0.06)_1px,transparent_1px)]
    dark:opacity-15
    dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)]
    [background-size:96px_100%]"
  ></div>

  <div
    class="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem]
    -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl"
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
<section class="relative overflow-hidden bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
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
<section class="relative overflow-hidden bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-70
    [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px)]
    dark:opacity-20
    dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)]
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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="absolute inset-x-0 bottom-0 h-px bg-gray-200 dark:bg-white/10"></div>

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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div
    class="pointer-events-none absolute left-0 top-1/2 h-[32rem] w-[32rem]
    -translate-y-1/2 rounded-full bg-cyan-500/12 dark:bg-cyan-500/10 blur-3xl"
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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.08)_60%,rgba(15,23,42,0.16)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.18)_60%,rgba(2,6,23,0.45)_100%)]"></div>

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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
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
<section class="relative overflow-hidden text-gray-900 dark:text-white">
  {#if image}
    <div
      class="absolute inset-0 bg-cover bg-center"
      style={toBackgroundImageStyle(image)}
    ></div>
  {/if}

  <div class="absolute inset-0 bg-white/75 dark:bg-slate-950/75"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-white/70 to-white/90 dark:from-slate-950/20 dark:via-slate-950/70 dark:to-slate-950/90"></div>

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
<section class="relative overflow-hidden text-gray-900 dark:text-white">
  {#if image}
    <div
      class="absolute inset-0 bg-cover bg-center"
      style={toBackgroundImageStyle(image)}
    ></div>
  {/if}

  <div class="absolute inset-0 bg-white/75 dark:bg-slate-950/75"></div>

  <div
    class="pointer-events-none absolute inset-0 opacity-60
    [background-image:linear-gradient(to_right,rgba(17,24,39,0.06)_1px,transparent_1px)]
    dark:opacity-20
    dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)]
    [background-size:96px_100%]"
  ></div>

  <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-white/70 to-white/90 dark:from-slate-950/20 dark:via-slate-950/70 dark:to-slate-950/90"></div>

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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="absolute inset-y-0 right-0 w-1/2 bg-gray-100 dark:bg-gray-800"></div>

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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-100 dark:bg-gray-800"></div>

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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/12 dark:bg-blue-500/10 blur-3xl"></div>
  <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/12 dark:bg-cyan-400/10 blur-3xl"></div>

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
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-500/12 to-transparent dark:from-blue-500/15 blur-2xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgClinicClean()}
<!-- Best for:
  - clinics and healthcare pages
  - trust-first service sections
  - clean professional hero/content blocks
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-white dark:from-slate-900 dark:via-gray-900 dark:to-gray-900"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-sky-200/70 dark:bg-sky-400/20"></div>
  <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-200/40 dark:bg-cyan-500/10 blur-3xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgClinicGrid()}
<!-- Best for:
  - appointment, services, and FAQ sections
  - information-heavy clinic layouts
  - structured light/dark enterprise pages
-->
<section class="relative overflow-hidden bg-slate-50 text-gray-900 dark:bg-gray-900 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-60
    [background-image:linear-gradient(to_right,rgba(14,116,144,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,116,144,0.08)_1px,transparent_1px)]
    [background-size:56px_56px]
    dark:opacity-20
    dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
  ></div>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 to-transparent dark:from-slate-900/40 dark:to-transparent"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgClinicLayers()}
<!-- Best for:
  - premium healthcare landing pages
  - sections that need depth without noise
  - professional brand storytelling
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-50/70 via-white to-white dark:from-slate-900 dark:via-gray-900 dark:to-gray-900"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-100/55 to-transparent dark:from-cyan-500/10 dark:to-transparent"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100/55 to-transparent dark:from-black/20 dark:to-transparent"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgExecutivePearl()}
<!-- Best for:
  - law firms, consulting, finance, B2B pages
  - premium but neutral professional sections
  - polished corporate messaging
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-slate-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"></div>
  <div class="pointer-events-none absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-slate-100/70 to-transparent dark:from-slate-800/40 dark:to-transparent"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200/80 dark:bg-white/10"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgExecutiveSlate()}
<!-- Best for:
  - legal and executive dark themes
  - formal service pages
  - restrained premium sections
-->
<section class="relative overflow-hidden bg-slate-100 text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-200/40 to-slate-100/0 dark:from-slate-900 dark:to-slate-950"></div>
  <div class="pointer-events-none absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-slate-300/35 to-transparent dark:from-slate-800/50 dark:to-transparent"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-300/70 dark:bg-white/10"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgPremiumLayers()}
<!-- Best for:
  - premium product and enterprise narratives
  - sophisticated content sections
  - layered brand storytelling
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/65 via-white to-white dark:from-indigo-500/8 dark:via-gray-900 dark:to-gray-900"></div>
  <div class="pointer-events-none absolute -top-20 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-blue-200/35 dark:bg-blue-500/10 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-cyan-200/35 dark:bg-cyan-500/10 blur-3xl"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-indigo-200/60 dark:bg-indigo-300/20"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgLegalFineLine()}
<!-- Best for:
  - legal/compliance pages
  - high-trust institutional sections
  - formal premium CTA blocks
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50/35 via-white to-white dark:from-amber-500/5 dark:via-gray-900 dark:to-gray-900"></div>
  <div class="pointer-events-none absolute inset-y-0 left-0 w-1 bg-amber-400/70 dark:bg-amber-300/60"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-amber-200/70 dark:bg-amber-300/20"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgElectricAurora()}
<!-- Best for:
  - premium modern hero sections
  - launch pages and feature intros
  - bold but still clean enterprise visuals
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-50/70 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950"></div>
  <div class="pointer-events-none absolute -left-28 top-[-6rem] h-80 w-80 rounded-full bg-cyan-300/45 dark:bg-cyan-500/18 blur-3xl"></div>
  <div class="pointer-events-none absolute right-[-5rem] top-1/3 h-72 w-72 rounded-full bg-blue-300/40 dark:bg-blue-500/16 blur-3xl"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-teal-100/60 to-transparent dark:from-teal-500/12 dark:to-transparent"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgElectricGridGlow()}
<!-- Best for:
  - technical feature grids
  - product architecture sections
  - data-heavy content with a premium electric mood
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-60
    [background-image:linear-gradient(to_right,rgba(14,165,233,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.10)_1px,transparent_1px)]
    [background-size:52px_52px]
    dark:opacity-25
    dark:[background-image:linear-gradient(to_right,rgba(56,189,248,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.16)_1px,transparent_1px)]"
  ></div>
  <div class="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/25 dark:bg-cyan-500/12 blur-3xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgNeonFrame()}
<!-- Best for:
  - premium callout sections
  - pricing intros
  - high-contrast sections that need visual punch
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-blue-500/0 dark:from-cyan-400/0 dark:via-cyan-300/95 dark:to-blue-400/0"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-400/85 to-cyan-400/0 dark:from-blue-500/0 dark:via-blue-300/90 dark:to-cyan-400/0"></div>
  <div class="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/70 to-cyan-400/0 dark:from-cyan-300/0 dark:via-cyan-300/75 dark:to-cyan-300/0"></div>
  <div class="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-blue-400/0 via-blue-400/70 to-blue-400/0 dark:from-blue-300/0 dark:via-blue-300/75 dark:to-blue-300/0"></div>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-50/35 via-white to-white dark:from-cyan-500/6 dark:via-slate-950 dark:to-slate-950"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgPlasmaBands()}
<!-- Best for:
  - bold marketing sections
  - section transitions
  - modern product storytelling
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-50/55 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950"></div>
  <div class="pointer-events-none absolute inset-x-0 top-10 h-24 bg-gradient-to-r from-cyan-300/30 via-blue-300/20 to-teal-300/30 dark:from-cyan-500/14 dark:via-blue-500/10 dark:to-teal-500/14 blur-2xl"></div>
  <div class="pointer-events-none absolute inset-x-0 top-1/2 h-20 -translate-y-1/2 bg-gradient-to-r from-blue-300/20 via-cyan-300/35 to-blue-300/20 dark:from-blue-500/10 dark:via-cyan-500/16 dark:to-blue-500/10 blur-2xl"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-10 h-24 bg-gradient-to-r from-teal-300/25 via-cyan-300/20 to-blue-300/25 dark:from-teal-500/12 dark:via-cyan-500/10 dark:to-blue-500/12 blur-2xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgHoloMesh()}
<!-- Best for:
  - futuristic enterprise pages
  - innovation storytelling
  - polished tech branding sections
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-55
    [background-image:linear-gradient(45deg,rgba(6,182,212,0.09)_1px,transparent_1px),linear-gradient(-45deg,rgba(59,130,246,0.08)_1px,transparent_1px)]
    [background-size:46px_46px]
    dark:opacity-25
    dark:[background-image:linear-gradient(45deg,rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(-45deg,rgba(96,165,250,0.12)_1px,transparent_1px)]"
  ></div>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/75 via-transparent to-white/60 dark:from-slate-950/65 dark:via-transparent dark:to-slate-950/75"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgCyberDots()}
<!-- Best for:
  - product feature sections
  - trust + innovation blend
  - pages that need subtle futuristic texture
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-70
    [background-image:radial-gradient(rgba(14,165,233,0.18)_1.2px,transparent_1.2px)]
    [background-size:22px_22px]
    dark:opacity-25
    dark:[background-image:radial-gradient(rgba(34,211,238,0.28)_1.2px,transparent_1.2px)]"
  ></div>
  <div class="pointer-events-none absolute -right-20 top-16 h-64 w-64 rounded-full bg-cyan-300/30 dark:bg-cyan-500/12 blur-3xl"></div>
  <div class="pointer-events-none absolute -left-16 bottom-8 h-56 w-56 rounded-full bg-blue-300/25 dark:bg-blue-500/10 blur-3xl"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgSignalSweep()}
<!-- Best for:
  - hero and launch moments
  - premium CTA areas
  - sections that need dramatic directional energy
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute inset-0 [background-image:conic-gradient(from_215deg_at_50%_50%,rgba(14,165,233,0.16),transparent_30%,rgba(59,130,246,0.14)_52%,transparent_75%)] dark:[background-image:conic-gradient(from_215deg_at_50%_50%,rgba(34,211,238,0.18),transparent_30%,rgba(59,130,246,0.18)_52%,transparent_75%)]"></div>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/40 to-white/85 dark:from-slate-950/70 dark:via-slate-950/35 dark:to-slate-950/75"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-300/70 dark:bg-cyan-300/35"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgVoltageBeam()}
<!-- Best for:
  - spotlighting a central section
  - feature announcements
  - futuristic but minimal premium layouts
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 bg-gradient-to-b from-cyan-300/22 via-blue-300/14 to-transparent dark:from-cyan-500/22 dark:via-blue-500/14 dark:to-transparent blur-2xl"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-200/35 to-transparent dark:from-cyan-500/12 dark:to-transparent"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/80 to-cyan-300/0 dark:from-cyan-300/0 dark:via-cyan-300/55 dark:to-cyan-300/0"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgClinicalSterile()}
<!-- Best for:
  - clinical services and doctors pages
  - treatment detail sections
  - high-trust and low-noise layouts
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/75 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-sky-200/70 dark:bg-sky-300/20"></div>
  <div class="pointer-events-none absolute inset-y-0 right-0 w-1 bg-sky-200/65 dark:bg-sky-400/25"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgLegalPaper()}
<!-- Best for:
  - legal firms and compliance pages
  - professional about and policy sections
  - premium editorial style blocks
-->
<section class="relative overflow-hidden bg-stone-50 text-gray-900 dark:bg-slate-950 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50/45 via-stone-50 to-stone-100/65 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"></div>
  <div class="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_bottom,rgba(120,113,108,0.08)_1px,transparent_1px)] [background-size:100%_34px] dark:opacity-0"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-amber-300/65 dark:bg-amber-300/25"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgConstructionConcrete()}
<!-- Best for:
  - construction and industrial businesses
  - capability and project pages
  - robust neutral sections
-->
<section class="relative overflow-hidden bg-zinc-100 text-gray-900 dark:bg-zinc-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50/75 via-zinc-100 to-zinc-200/65 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950"></div>
  <div class="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(45deg,rgba(113,113,122,0.08)_25%,transparent_25%,transparent_50%,rgba(113,113,122,0.08)_50%,rgba(113,113,122,0.08)_75%,transparent_75%,transparent)] [background-size:24px_24px] dark:opacity-15 dark:[background-image:linear-gradient(45deg,rgba(244,244,245,0.08)_25%,transparent_25%,transparent_50%,rgba(244,244,245,0.08)_50%,rgba(244,244,245,0.08)_75%,transparent_75%,transparent)]"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-amber-400/85 dark:bg-amber-400/70"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgBlueprintGrid()}
<!-- Best for:
  - process and methodology sections
  - architecture and engineering pages
  - technical explanations and specs
-->
<section class="relative overflow-hidden bg-sky-50 text-gray-900 dark:bg-slate-950 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-60
    [background-image:linear-gradient(to_right,rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.08)_1px,transparent_1px)]
    [background-size:40px_40px]
    dark:opacity-28
    dark:[background-image:linear-gradient(to_right,rgba(56,189,248,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.16)_1px,transparent_1px)]"
  ></div>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-sky-300/70 dark:bg-sky-300/35"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgTrustRibbon()}
<!-- Best for:
  - certifications and accreditations strips
  - credibility-focused callouts
  - small trust-building transitions between sections
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-50/55 via-white to-sky-50/50 dark:from-emerald-500/8 dark:via-gray-900 dark:to-sky-500/8"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400/85 via-sky-400/75 to-blue-400/85 dark:from-emerald-400/70 dark:via-sky-400/65 dark:to-blue-400/70"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gray-200 dark:bg-white/10"></div>

  <div class="relative z-10 [&>section]:bg-transparent [&>section]:dark:bg-transparent">
    {@render children?.()}
  </div>
</section>
{/snippet}

{#snippet bgMapContour()}
<!-- Best for:
  - service area and location sections
  - regional coverage pages
  - contact and offices blocks
-->
<section class="relative overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
  <div
    class="pointer-events-none absolute inset-0 opacity-45
    [background-image:repeating-radial-gradient(circle_at_20%_30%,rgba(2,132,199,0.10)_0px,rgba(2,132,199,0.10)_1px,transparent_1px,transparent_18px),repeating-radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.08)_0px,rgba(14,165,233,0.08)_1px,transparent_1px,transparent_20px)]
    dark:opacity-20
    dark:[background-image:repeating-radial-gradient(circle_at_20%_30%,rgba(125,211,252,0.16)_0px,rgba(125,211,252,0.16)_1px,transparent_1px,transparent_18px),repeating-radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.14)_0px,rgba(56,189,248,0.14)_1px,transparent_1px,transparent_20px)]"
  ></div>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/35 via-white to-white dark:from-slate-900/30 dark:via-slate-950 dark:to-slate-950"></div>
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-sky-200/70 dark:bg-sky-300/25"></div>

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
{:else if variant === 'bgClinicClean'}
  {@render bgClinicClean()}
{:else if variant === 'bgClinicGrid'}
  {@render bgClinicGrid()}
{:else if variant === 'bgClinicLayers'}
  {@render bgClinicLayers()}
{:else if variant === 'bgExecutivePearl'}
  {@render bgExecutivePearl()}
{:else if variant === 'bgExecutiveSlate'}
  {@render bgExecutiveSlate()}
{:else if variant === 'bgPremiumLayers'}
  {@render bgPremiumLayers()}
{:else if variant === 'bgLegalFineLine'}
  {@render bgLegalFineLine()}
{:else if variant === 'bgElectricAurora'}
  {@render bgElectricAurora()}
{:else if variant === 'bgElectricGridGlow'}
  {@render bgElectricGridGlow()}
{:else if variant === 'bgNeonFrame'}
  {@render bgNeonFrame()}
{:else if variant === 'bgPlasmaBands'}
  {@render bgPlasmaBands()}
{:else if variant === 'bgHoloMesh'}
  {@render bgHoloMesh()}
{:else if variant === 'bgCyberDots'}
  {@render bgCyberDots()}
{:else if variant === 'bgSignalSweep'}
  {@render bgSignalSweep()}
{:else if variant === 'bgVoltageBeam'}
  {@render bgVoltageBeam()}
{:else if variant === 'bgClinicalSterile'}
  {@render bgClinicalSterile()}
{:else if variant === 'bgLegalPaper'}
  {@render bgLegalPaper()}
{:else if variant === 'bgConstructionConcrete'}
  {@render bgConstructionConcrete()}
{:else if variant === 'bgBlueprintGrid'}
  {@render bgBlueprintGrid()}
{:else if variant === 'bgTrustRibbon'}
  {@render bgTrustRibbon()}
{:else if variant === 'bgMapContour'}
  {@render bgMapContour()}
{/if}
