<script>
  import { page } from '$app/stores';
  import SitePageRenderer from '$lib/components/site/SitePageRenderer.svelte';
  import { getReportsAnalyticsSettings } from '$lib/utils/website-settings';

  export let data;

  const PLAUSIBLE_SCRIPT_SRC = 'https://plausible.io/js/script.js';

  $: focusBlock = `${$page.url.searchParams.get('focusBlock') ?? ''}`.trim();
  $: cmsPreview = `${$page.url.searchParams.get('cmsPreview') ?? ''}`.trim() === '1';

  $: seo = data.seo ?? {};
  $: reportsAnalytics = getReportsAnalyticsSettings(data?.website?.settings ?? {});
  $: shouldInjectPlausibleScript = (
    cmsPreview !== true &&
    reportsAnalytics.provider === 'plausible' &&
    reportsAnalytics.enabled === true &&
    reportsAnalytics.scriptEnabled === true &&
    !!reportsAnalytics.siteId
  );
</script>

<svelte:head>
  {#if seo.title}
    <title>{seo.title}</title>
    <meta property="og:title" content={seo.title} />
    <meta name="twitter:title" content={seo.title} />
  {/if}

  {#if seo.description}
    <meta name="description" content={seo.description} />
    <meta property="og:description" content={seo.description} />
    <meta name="twitter:description" content={seo.description} />
  {/if}

  <meta property="og:type" content={seo.og?.type ?? 'website'} />

  {#if seo.og?.url}
    <meta property="og:url" content={seo.og.url} />
  {/if}

  {#if seo.og?.image}
    <meta property="og:image" content={seo.og.image} />
  {/if}

  <meta name="twitter:card" content={seo.twitter?.card ?? 'summary'} />

  {#if seo.twitter?.image}
    <meta name="twitter:image" content={seo.twitter.image} />
  {/if}

  {#if seo.canonicalUrl}
    <link rel="canonical" href={seo.canonicalUrl} />
  {/if}

  <meta name="robots" content={seo.robots ?? 'index,follow'} />

  {#if Array.isArray(seo.structuredDataJsonLdList) && seo.structuredDataJsonLdList.length}
    {#each seo.structuredDataJsonLdList as jsonLd}
      <script type="application/ld+json">{jsonLd}</script>
    {/each}
  {:else if seo.structuredDataJsonLd}
    <script type="application/ld+json">{seo.structuredDataJsonLd}</script>
  {/if}

  {#if shouldInjectPlausibleScript}
    <script defer data-domain={reportsAnalytics.siteId} src={PLAUSIBLE_SCRIPT_SRC}></script>
  {/if}
</svelte:head>

<SitePageRenderer blocks={data.blocks ?? []} website={data.website ?? null} {focusBlock} {cmsPreview} />
