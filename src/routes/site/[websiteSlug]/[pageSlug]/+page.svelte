<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { initConversionClickTracking } from '$lib/analytics/events';
  import { initScrollDepthTracking } from '$lib/analytics/scrollDepth';
  import SitePageRenderer from '$lib/components/site/SitePageRenderer.svelte';
  import { getReportsAnalyticsSettings } from '$lib/utils/website-settings';

  export let data;

  $: focusBlock = `${$page.url.searchParams.get('focusBlock') ?? ''}`.trim();
  $: cmsPreview = `${$page.url.searchParams.get('cmsPreview') ?? ''}`.trim() === '1';

  $: seo = data.seo ?? {};
  $: reportsAnalytics = getReportsAnalyticsSettings(data?.website?.settings ?? {});
  $: shouldInjectUmamiScript = (
    cmsPreview !== true &&
    reportsAnalytics.provider === 'umami' &&
    reportsAnalytics.enabled === true &&
    reportsAnalytics.scriptEnabled === true &&
    !!reportsAnalytics.siteId &&
    !!reportsAnalytics.scriptUrl
  );

  function asString(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function normalizeLanguageCode(value) {
    const normalized = asString(value).toLowerCase();
    if (!normalized) {
      return '';
    }

    if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})?$/i.test(normalized)) {
      return '';
    }

    return normalized;
  }

  function buildLanguageHref(languageCode) {
    const currentUrl = $page.url;
    const params = new URLSearchParams(currentUrl.searchParams);
    const normalizedDefault = normalizeLanguageCode(defaultLanguageCode);
    const normalizedTargetLanguage = normalizeLanguageCode(languageCode);

    if (!normalizedTargetLanguage || normalizedTargetLanguage === normalizedDefault) {
      params.delete('lang');
    } else {
      params.set('lang', normalizedTargetLanguage);
    }

    const queryString = params.toString();
    return `${currentUrl.pathname}${queryString ? `?${queryString}` : ''}${currentUrl.hash || ''}`;
  }

  function toLanguageLabel(language) {
    const explicitLabel = asString(language?.label);
    if (explicitLabel) {
      return explicitLabel;
    }

    const code = normalizeLanguageCode(language?.code);
    return code ? code.toUpperCase() : '';
  }

  $: languageOptions = Array.isArray(data?.availableLanguages)
    ? data.availableLanguages
      .map((entry) => ({
        code: normalizeLanguageCode(entry?.code),
        label: toLanguageLabel(entry)
      }))
      .filter((entry) => !!entry.code)
    : [];
  $: defaultLanguageCode = normalizeLanguageCode(data?.defaultLanguage) || languageOptions[0]?.code || '';
  $: activeLanguageCode = normalizeLanguageCode(data?.activeLanguage) || defaultLanguageCode;
  $: showLanguageSwitcher = languageOptions.length > 1;

  let analyticsTrackingReady = false;
  let analyticsPageViewKey = '';
  let activeAnalyticsPageViewKey = '';
  let stopClickTracking = null;
  let stopScrollDepthTracking = null;

  function getAnalyticsContext() {
    return {
      websiteSettings: data?.website?.settings ?? {},
      cmsPreview,
      websiteSlug: asString(data?.website?.slug),
      pageSlug: asString(data?.page?.slug),
      pageType: 'site_page',
      language: activeLanguageCode
    };
  }

  function cleanupAnalyticsTrackers() {
    try {
      stopClickTracking?.();
    } catch (_) {
      // no-op
    }

    try {
      stopScrollDepthTracking?.();
    } catch (_) {
      // no-op
    }

    stopClickTracking = null;
    stopScrollDepthTracking = null;
  }

  function startAnalyticsTrackers() {
    const getContext = () => getAnalyticsContext();

    stopClickTracking = initConversionClickTracking({
      getContext
    });

    stopScrollDepthTracking = initScrollDepthTracking({
      getContext
    });
  }

  function resetAnalyticsTrackers(nextPageViewKey) {
    if (!browser || analyticsTrackingReady !== true) {
      return;
    }

    const normalizedKey = asString(nextPageViewKey);
    if (!normalizedKey || normalizedKey === activeAnalyticsPageViewKey) {
      return;
    }

    cleanupAnalyticsTrackers();
    activeAnalyticsPageViewKey = normalizedKey;
    startAnalyticsTrackers();
  }

  $: {
    const currentPathname = asString($page.url?.pathname);
    const currentLangQuery = normalizeLanguageCode($page.url?.searchParams?.get('lang'));
    const websiteSlug = asString(data?.website?.slug);
    const pageSlug = asString(data?.page?.slug);
    const normalizedActiveLanguage = normalizeLanguageCode(activeLanguageCode);
    analyticsPageViewKey = [
      currentPathname,
      currentLangQuery,
      websiteSlug,
      pageSlug,
      normalizedActiveLanguage
    ].join('|');
  }

  $: if (browser && analyticsTrackingReady) {
    resetAnalyticsTrackers(analyticsPageViewKey);
  }

  onMount(() => {
    analyticsTrackingReady = true;
    resetAnalyticsTrackers(analyticsPageViewKey);

    return () => {
      analyticsTrackingReady = false;
      activeAnalyticsPageViewKey = '';
      cleanupAnalyticsTrackers();
    };
  });
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

  {#if Array.isArray(seo.hreflangAlternates) && seo.hreflangAlternates.length}
    {#each seo.hreflangAlternates as alternate}
      {#if alternate?.hreflang && alternate?.href}
        <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
      {/if}
    {/each}
  {/if}

  <meta name="robots" content={seo.robots ?? 'index,follow'} />

  {#if Array.isArray(seo.structuredDataJsonLdList) && seo.structuredDataJsonLdList.length}
    {#each seo.structuredDataJsonLdList as jsonLd}
      <script type="application/ld+json">{jsonLd}</script>
    {/each}
  {:else if seo.structuredDataJsonLd}
    <script type="application/ld+json">{seo.structuredDataJsonLd}</script>
  {/if}

  {#if shouldInjectUmamiScript}
    <script defer data-website-id={reportsAnalytics.siteId} src={reportsAnalytics.scriptUrl}></script>
  {/if}
</svelte:head>

{#if showLanguageSwitcher}
  <nav class="public-language-switcher" aria-label="Content language">
    <div class="public-language-switcher__group">
      {#each languageOptions as language}
        <a
          href={buildLanguageHref(language.code)}
          class="public-language-switcher__item"
          class:is-active={language.code === activeLanguageCode}
          aria-current={language.code === activeLanguageCode ? 'page' : undefined}
        >
          {language.label}
        </a>
      {/each}
    </div>
  </nav>
{/if}

<SitePageRenderer blocks={data.blocks ?? []} website={data.website ?? null} {focusBlock} {cmsPreview} />

<style>
  .public-language-switcher {
    display: flex;
    justify-content: flex-end;
    padding: 12px 16px 0;
  }

  .public-language-switcher__group {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    border: 1px solid rgba(15, 23, 42, 0.16);
    border-radius: 999px;
    padding: 4px;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(4px);
  }

  .public-language-switcher__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(15, 23, 42, 0.78);
    text-decoration: none;
    transition: background-color 0.18s ease, color 0.18s ease;
  }

  .public-language-switcher__item:hover {
    background: rgba(15, 23, 42, 0.08);
    color: rgba(15, 23, 42, 0.92);
  }

  .public-language-switcher__item:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.45);
    outline-offset: 2px;
  }

  .public-language-switcher__item.is-active {
    background: rgba(15, 23, 42, 0.82);
    color: #fff;
  }

  @media (max-width: 640px) {
    .public-language-switcher {
      padding: 10px 12px 0;
    }

    .public-language-switcher__item {
      min-height: 26px;
      padding: 0 10px;
      font-size: 11px;
    }
  }
</style>
