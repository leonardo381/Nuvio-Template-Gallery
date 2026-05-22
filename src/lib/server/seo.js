const DEFAULT_TITLE_SEPARATOR = '|';
const CANONICAL_HOST_BLOCKLIST = new Set(['test']);
const FAQ_ITEM_LIMIT = 20;
const FAQ_KEYWORD_HINT = /(faq|accordion)/i;
const FAQ_STRICT_ARRAY_KEYS = new Set([
  'faqs',
  'faq',
  'questions',
  'accordionitems',
  'accordion_items',
  'faqitems',
  'faq_items'
]);
const FAQ_GENERIC_ARRAY_KEYS = new Set(['items']);
const FAQ_QUESTION_KEYS = ['question', 'title', 'heading', 'label'];
const FAQ_ANSWER_KEYS = ['answer', 'content', 'body', 'text', 'description'];

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeLanguageCode(value) {
  const normalized = asString(value).toLowerCase();
  if (!normalized) {
    return '';
  }

  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(normalized)) {
    return '';
  }

  return normalized;
}

function asBool(value) {
  return value === true;
}

function hasProtocol(value) {
  return /^https?:\/\//i.test(value);
}

function looksLikeDomainOrDomainPath(value) {
  return /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(value);
}

function decodeBasicHtmlEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

export function stripHtmlToPlainText(value) {
  const input = asString(value);
  if (!input) {
    return '';
  }

  const noTags = input
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  return decodeBasicHtmlEntities(noTags).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getFirstString(source, keys = []) {
  for (const key of keys) {
    const candidate = asString(source?.[key]);
    if (candidate) {
      return candidate;
    }
  }

  return '';
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function toRecordObject(value) {
  if (isPlainObject(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const raw = asString(value);
    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw);
      return isPlainObject(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return {};
}

function isBlockedCanonicalHost(hostname) {
  const host = asString(hostname).toLowerCase();
  if (!host) {
    return true;
  }

  if (CANONICAL_HOST_BLOCKLIST.has(host)) {
    return true;
  }

  return host.endsWith('.test');
}

function normalizeAbsoluteUrl(value, baseOrigin = '') {
  const raw = asString(value);
  if (!raw) {
    return '';
  }

  try {
    let parsed;

    if (hasProtocol(raw)) {
      parsed = new URL(raw);
    } else if (raw.startsWith('/') && baseOrigin) {
      parsed = new URL(raw, baseOrigin);
    } else if (looksLikeDomainOrDomainPath(raw)) {
      parsed = new URL(`https://${raw}`);
    } else {
      return '';
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }

    if (isBlockedCanonicalHost(parsed.hostname)) {
      return '';
    }

    return parsed.toString();
  } catch {
    return '';
  }
}

function normalizeCanonicalBase(value) {
  const normalized = normalizeAbsoluteUrl(value);
  if (!normalized) {
    return '';
  }

  return new URL(normalized).origin;
}

function resolveSeoImageUrl(pb, record, value, fallbackBaseOrigin = '') {
  if (Array.isArray(value)) {
    for (const entry of value) {
      const resolved = resolveSeoImageUrl(pb, record, entry, fallbackBaseOrigin);
      if (resolved) {
        return resolved;
      }
    }
    return '';
  }

  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    const raw = asString(value);
    if (!raw) {
      return '';
    }

    const absoluteCandidate = normalizeAbsoluteUrl(raw, fallbackBaseOrigin);
    if (absoluteCandidate) {
      return absoluteCandidate;
    }

    if (pb?.files?.getURL && !raw.includes('/')) {
      try {
        const built = pb.files.getURL(record, raw);
        return normalizeAbsoluteUrl(built, fallbackBaseOrigin);
      } catch {
        return '';
      }
    }

    return '';
  }

  if (typeof value === 'object') {
    const rawUrl = getFirstString(value, ['url', 'href', 'src']);
    if (rawUrl) {
      return normalizeAbsoluteUrl(rawUrl, fallbackBaseOrigin);
    }

    const recordId = asString(value.recordId);
    const filename = asString(value.filename);
    const collection = asString(value.collection);

    if (recordId && filename && collection && pb?.files?.getURL) {
      try {
        const built = pb.files.getURL(
          {
            id: recordId,
            collectionId: collection,
            collectionName: collection
          },
          filename
        );

        return normalizeAbsoluteUrl(built, fallbackBaseOrigin);
      } catch {
        return '';
      }
    }
  }

  return '';
}

function normalizeAbsoluteHttpUrl(value) {
  const raw = asString(value);
  if (!raw || !hasProtocol(raw)) {
    return '';
  }

  try {
    const parsed = new URL(raw);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }

    if (isBlockedCanonicalHost(parsed.hostname)) {
      return '';
    }

    return parsed.toString();
  } catch {
    return '';
  }
}

function normalizeStructuredDataUrl(value, baseOrigin = '') {
  const normalized = normalizeAbsoluteUrl(value, baseOrigin);
  if (!normalized) {
    return '';
  }

  try {
    const parsed = new URL(normalized);
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return '';
  }
}

function humanizeSlug(value) {
  return asString(value).replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function textFromAny(value) {
  if (typeof value === 'string') {
    return stripHtmlToPlainText(value);
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return `${value}`.trim();
  }

  return '';
}

function getFirstPlainText(source, keys = []) {
  for (const key of keys) {
    const candidate = textFromAny(source?.[key]);
    if (candidate) {
      return candidate;
    }
  }

  return '';
}

function uniqueStrings(values = []) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const normalized = asString(value);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parseStringList(value, splitPattern = /[\n,;]+/) {
  if (Array.isArray(value)) {
    const fromArray = value
      .filter((entry) => typeof entry === 'string')
      .map((entry) => asString(entry))
      .filter(Boolean);

    return uniqueStrings(fromArray);
  }

  if (typeof value === 'string') {
    const raw = asString(value);
    if (!raw) {
      return [];
    }

    const parsed = parseJson(raw);
    if (parsed !== null) {
      if (Array.isArray(parsed)) {
        return parseStringList(parsed, splitPattern);
      }
      if (typeof parsed === 'string') {
        const parsedString = asString(parsed);
        return parsedString ? [parsedString] : [];
      }
    }

    const splitValues = raw
      .split(splitPattern)
      .map((entry) => asString(entry))
      .filter(Boolean);

    return uniqueStrings(splitValues.length ? splitValues : [raw]);
  }

  return [];
}

const OPENING_HOURS_HINT =
  /(\b(?:mo|tu|we|th|fr|sa|su|mon|tue|wed|thu|fri|sat|sun|closed|24\/7)\b|\b\d{1,2}:\d{2}\b|\b\d{1,2}\s?(?:am|pm)\b)/i;

function resolveOpeningHours(value) {
  const candidates = parseStringList(value);
  const openingHours = candidates.filter((entry) => OPENING_HOURS_HINT.test(entry));
  return uniqueStrings(openingHours);
}

function resolveSocialProfiles(value) {
  const candidates = parseStringList(value);
  const profiles = candidates
    .map((entry) => normalizeAbsoluteHttpUrl(entry))
    .filter(Boolean);

  return uniqueStrings(profiles);
}

function resolveAreaServed(value) {
  const areas = parseStringList(value);
  if (!areas.length) {
    return null;
  }

  return areas.length === 1 ? areas[0] : areas;
}

function resolveBusinessSchemaType(value) {
  const raw = asString(value);
  if (!raw) {
    return 'LocalBusiness';
  }

  const schemaTypeMatch = raw.match(/^https?:\/\/schema\.org\/([A-Za-z][A-Za-z0-9]+)$/i);
  if (schemaTypeMatch?.[1]) {
    return schemaTypeMatch[1];
  }

  if (/^[A-Za-z][A-Za-z0-9]+$/.test(raw)) {
    return raw;
  }

  return 'LocalBusiness';
}

function stringifyJsonLd(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function buildBusinessStructuredData({
  pb,
  website = {},
  page = {},
  websiteSlug = '',
  pageSlug = '',
  canonicalUrl = '',
  fallbackBase = ''
}) {
  const businessName = getFirstString(website, ['business_name']);
  const websiteName = getFirstString(website, ['name', 'title', 'seoTitle', 'seo_title']);
  const name = businessName || websiteName;

  if (!name) {
    return null;
  }

  const phone = getFirstString(website, ['business_phone']);
  const email = getFirstString(website, ['business_email']);
  const streetAddress = getFirstString(website, ['business_address']);
  const addressLocality = getFirstString(website, ['business_city']);
  const postalCode = getFirstString(website, ['business_postal_code']);
  const addressCountry = getFirstString(website, ['business_country']);
  const googlePlaceId = getFirstString(website, ['business_google_place_id']);
  const priceRange = getFirstString(website, ['business_price_range']);
  const sameAs = resolveSocialProfiles(website?.business_social_profiles);
  const areaServed = resolveAreaServed(website?.business_service_area);
  const openingHours = resolveOpeningHours(website?.business_opening_hours);

  const hasAddressSignal = Boolean(streetAddress || addressLocality || addressCountry);
  const hasSocialSignal = sameAs.length > 0;
  const hasContactSignal = Boolean(phone || email || hasAddressSignal || googlePlaceId || hasSocialSignal);

  if (!hasContactSignal) {
    return null;
  }

  const resolvedPageUrl =
    normalizeAbsoluteUrl(canonicalUrl) ||
    buildCanonicalSitePageUrl({ website, websiteSlug, pageSlug, url: { origin: fallbackBase } });

  const image =
    resolveSeoImageUrl(pb, page, page?.seo_social_image, fallbackBase) ||
    resolveSeoImageUrl(pb, website, website?.seoImage ?? website?.seo_image, fallbackBase);
  const logo = resolveSeoImageUrl(pb, website, website?.logo, fallbackBase);

  const address = {};
  if (streetAddress) {
    address.streetAddress = streetAddress;
  }
  if (addressLocality) {
    address.addressLocality = addressLocality;
  }
  if (postalCode) {
    address.postalCode = postalCode;
  }
  if (addressCountry) {
    address.addressCountry = addressCountry;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': resolveBusinessSchemaType(getFirstString(website, ['business_type'])),
    name,
    url: resolvedPageUrl || undefined,
    telephone: phone || undefined,
    email: email || undefined,
    image: image || undefined,
    logo: logo || undefined,
    priceRange: priceRange || undefined,
    address: Object.keys(address).length
      ? {
          '@type': 'PostalAddress',
          ...address
        }
      : undefined,
    areaServed: areaServed || undefined,
    sameAs: hasSocialSignal ? sameAs : undefined,
    openingHours: openingHours.length ? openingHours : undefined,
    identifier: googlePlaceId
      ? {
          '@type': 'PropertyValue',
          propertyID: 'googlePlaceId',
          value: googlePlaceId
        }
      : undefined
  };

  const compact = Object.fromEntries(
    Object.entries(structuredData).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

  return Object.keys(compact).length ? compact : null;
}

function hasFaqBlockHint(block = {}) {
  const component = block?.expand?.component ?? {};
  const hints = [
    block?.slot,
    block?.component,
    component?.name,
    component?.slug,
    component?.key,
    component?.id
  ];

  return hints.some((value) => FAQ_KEYWORD_HINT.test(asString(value)));
}

function collectFaqArrays(value, hasHint, result = []) {
  if (!value) {
    return result;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      collectFaqArrays(entry, hasHint, result);
    }
    return result;
  }

  if (!isPlainObject(value)) {
    return result;
  }

  for (const [key, entry] of Object.entries(value)) {
    const keyName = asString(key).toLowerCase();

    if (Array.isArray(entry)) {
      const isStrictFaqArray = FAQ_STRICT_ARRAY_KEYS.has(keyName);
      const isGenericFaqArray = hasHint && FAQ_GENERIC_ARRAY_KEYS.has(keyName);
      if (isStrictFaqArray || isGenericFaqArray) {
        result.push(entry);
      }

      for (const nestedEntry of entry) {
        collectFaqArrays(nestedEntry, hasHint, result);
      }
      continue;
    }

    if (isPlainObject(entry)) {
      collectFaqArrays(entry, hasHint, result);
    }
  }

  return result;
}

function extractFaqPairFromItem(item) {
  if (!isPlainObject(item)) {
    return null;
  }

  const question = getFirstPlainText(item, FAQ_QUESTION_KEYS);
  const answer = getFirstPlainText(item, FAQ_ANSWER_KEYS);

  if (!question || !answer) {
    return null;
  }

  return { question, answer };
}

function buildFaqStructuredData({ blocks = [] }) {
  if (!Array.isArray(blocks) || !blocks.length) {
    return null;
  }

  const pairs = [];
  const seenQuestions = new Set();

  for (const block of blocks) {
    const blockHint = hasFaqBlockHint(block);
    const arrays = collectFaqArrays(block?.props, blockHint);

    for (const items of arrays) {
      for (const item of items) {
        const pair = extractFaqPairFromItem(item);
        if (!pair) {
          continue;
        }

        const questionKey = pair.question.toLowerCase();
        if (seenQuestions.has(questionKey)) {
          continue;
        }

        seenQuestions.add(questionKey);
        pairs.push(pair);

        if (pairs.length >= FAQ_ITEM_LIMIT) {
          break;
        }
      }

      if (pairs.length >= FAQ_ITEM_LIMIT) {
        break;
      }
    }

    if (pairs.length >= FAQ_ITEM_LIMIT) {
      break;
    }
  }

  if (pairs.length < 2) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((pair) => ({
      '@type': 'Question',
      name: pair.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: pair.answer
      }
    }))
  };
}

function buildBreadcrumbStructuredData({
  website = {},
  page = {},
  websiteSlug = '',
  pageSlug = '',
  canonicalUrl = '',
  url = null
}) {
  const websiteSlugValue = asString(websiteSlug);
  const pageSlugValue = asString(pageSlug);

  const websiteName = stripHtmlToPlainText(
    getFirstString(website, ['name', 'title', 'seoTitle', 'seo_title'])
  );
  const pageName = stripHtmlToPlainText(getFirstString(page, ['seo_title', 'title', 'name']));
  const websiteFallbackName = humanizeSlug(websiteSlugValue);
  const pageFallbackName = humanizeSlug(pageSlugValue);
  const homeName = websiteName || 'Home';
  const currentPageName = pageName || pageFallbackName;

  if (!(websiteName || websiteFallbackName)) {
    return null;
  }

  if (!currentPageName) {
    return null;
  }

  const canonicalPageUrl = normalizeStructuredDataUrl(canonicalUrl);
  if (!canonicalPageUrl) {
    return null;
  }

  const baseOrigin = resolveCanonicalBaseForWebsite({ website, url });
  if (!baseOrigin || !websiteSlugValue) {
    return null;
  }

  const resolvedHomeUrl = normalizeStructuredDataUrl(`/site/${websiteSlugValue}`, baseOrigin);
  if (!resolvedHomeUrl) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeName,
        item: resolvedHomeUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentPageName,
        item: canonicalPageUrl
      }
    ]
  };
}

function resolveLocalizedSeoTranslation(page = {}, activeLanguage = '') {
  const normalizedLanguage = normalizeLanguageCode(activeLanguage);
  if (!normalizedLanguage) {
    return null;
  }

  const translationsRoot = toRecordObject(page?.seo_translations ?? page?.seoTranslations);
  if (!Object.keys(translationsRoot).length) {
    return null;
  }

  let localizedEntry = translationsRoot[normalizedLanguage];
  if (typeof localizedEntry === 'undefined') {
    for (const [languageKey, value] of Object.entries(translationsRoot)) {
      if (normalizeLanguageCode(languageKey) === normalizedLanguage) {
        localizedEntry = value;
        break;
      }
    }
  }

  const translation = toRecordObject(localizedEntry);
  if (!Object.keys(translation).length) {
    return null;
  }

  return {
    title: asString(translation?.title),
    description: asString(translation?.description)
  };
}

function resolveSeoTitle({ website = {}, page = {}, websiteSlug = '', pageSlug = '', activeLanguage = '' }) {
  const localizedSeo = resolveLocalizedSeoTranslation(page, activeLanguage);
  const localizedTitle = asString(localizedSeo?.title);
  if (localizedTitle) {
    return localizedTitle;
  }

  const explicitPageTitle = getFirstString(page, ['seo_title']);
  if (explicitPageTitle) {
    return explicitPageTitle;
  }

  const pageTitle = getFirstString(page, ['title', 'name']) || asString(pageSlug);
  const siteTitle =
    getFirstString(website, ['seoTitle', 'seo_title', 'name', 'title']) || asString(websiteSlug);
  const titleTemplate = getFirstString(website, ['seo_title_template']);
  const separator = getFirstString(website, ['seo_title_separator']) || DEFAULT_TITLE_SEPARATOR;

  if (titleTemplate && (titleTemplate.includes('{page}') || titleTemplate.includes('{site}'))) {
    const rendered = titleTemplate
      .replace(/\{page\}/g, pageTitle)
      .replace(/\{site\}/g, siteTitle)
      .replace(/\s+/g, ' ')
      .trim();

    if (rendered) {
      return rendered;
    }
  }

  if (pageTitle && siteTitle && pageTitle !== siteTitle) {
    return `${pageTitle} ${separator} ${siteTitle}`;
  }

  return pageTitle || siteTitle || asString(websiteSlug) || asString(pageSlug);
}

function resolveSeoDescription({ website = {}, page = {}, activeLanguage = '' }) {
  const localizedSeo = resolveLocalizedSeoTranslation(page, activeLanguage);
  const localizedDescription = stripHtmlToPlainText(localizedSeo?.description ?? '');
  if (localizedDescription) {
    return localizedDescription;
  }

  const pageDescription = stripHtmlToPlainText(getFirstString(page, ['seo_description']));
  if (pageDescription) {
    return pageDescription;
  }

  return stripHtmlToPlainText(getFirstString(website, ['seoDescription', 'seo_description']));
}

function resolveAvailableLanguageCodes(availableLanguages = []) {
  if (!Array.isArray(availableLanguages)) {
    return [];
  }

  const seen = new Set();
  const result = [];

  for (const entry of availableLanguages) {
    const code = normalizeLanguageCode(typeof entry === 'string' ? entry : entry?.code);
    if (!code || seen.has(code)) {
      continue;
    }
    seen.add(code);
    result.push(code);
  }

  return result;
}

function buildLanguageAwareSitePagePath({
  websiteSlug = '',
  pageSlug = '',
  languageCode = '',
  defaultLanguageCode = ''
}) {
  const canonicalPath = `/site/${asString(websiteSlug)}/${asString(pageSlug)}`;
  const normalizedLanguage = normalizeLanguageCode(languageCode);
  const normalizedDefaultLanguage = normalizeLanguageCode(defaultLanguageCode);

  if (!normalizedLanguage || !normalizedDefaultLanguage || normalizedLanguage === normalizedDefaultLanguage) {
    return canonicalPath;
  }

  const params = new URLSearchParams();
  params.set('lang', normalizedLanguage);
  return `${canonicalPath}?${params.toString()}`;
}

function resolveCanonicalMetadata({
  website = {},
  page = {},
  websiteSlug = '',
  pageSlug = '',
  url = null,
  activeLanguage = '',
  availableLanguages = [],
  defaultLanguage = ''
}) {
  const baseOrigin = resolveCanonicalBaseForWebsite({ website, url });

  const explicitCanonical = normalizeAbsoluteUrl(getFirstString(page, ['seo_canonical_url']), baseOrigin);
  if (explicitCanonical) {
    return {
      canonicalUrl: explicitCanonical,
      baseOrigin,
      hasExplicitCanonicalOverride: true,
      availableLanguageCodes: resolveAvailableLanguageCodes(availableLanguages),
      defaultLanguageCode: normalizeLanguageCode(defaultLanguage)
    };
  }

  if (!baseOrigin) {
    return {
      canonicalUrl: '',
      baseOrigin: '',
      hasExplicitCanonicalOverride: false,
      availableLanguageCodes: resolveAvailableLanguageCodes(availableLanguages),
      defaultLanguageCode: normalizeLanguageCode(defaultLanguage)
    };
  }

  const availableLanguageCodes = resolveAvailableLanguageCodes(availableLanguages);
  const availableLanguageSet = new Set(availableLanguageCodes);
  const normalizedDefaultLanguage =
    normalizeLanguageCode(defaultLanguage) || availableLanguageCodes[0] || '';
  const normalizedActiveLanguage = normalizeLanguageCode(activeLanguage);
  const shouldUseLanguageCanonical = (
    availableLanguageCodes.length > 1 &&
    normalizedDefaultLanguage &&
    normalizedActiveLanguage &&
    availableLanguageSet.has(normalizedActiveLanguage) &&
    normalizedActiveLanguage !== normalizedDefaultLanguage
  );

  const canonicalPath = buildLanguageAwareSitePagePath({
    websiteSlug,
    pageSlug,
    languageCode: shouldUseLanguageCanonical ? normalizedActiveLanguage : '',
    defaultLanguageCode: normalizedDefaultLanguage
  });

  return {
    canonicalUrl: normalizeAbsoluteUrl(canonicalPath, baseOrigin),
    baseOrigin,
    hasExplicitCanonicalOverride: false,
    availableLanguageCodes,
    defaultLanguageCode: normalizedDefaultLanguage
  };
}

function resolveCanonicalUrl(options = {}) {
  return resolveCanonicalMetadata(options).canonicalUrl;
}

function buildHreflangAlternates({
  baseOrigin = '',
  websiteSlug = '',
  pageSlug = '',
  availableLanguageCodes = [],
  defaultLanguageCode = ''
}) {
  if (!baseOrigin || !Array.isArray(availableLanguageCodes) || availableLanguageCodes.length <= 1) {
    return [];
  }

  const normalizedDefaultLanguage = (
    normalizeLanguageCode(defaultLanguageCode) || availableLanguageCodes[0] || ''
  );
  if (!normalizedDefaultLanguage) {
    return [];
  }

  const alternates = [];
  for (const code of availableLanguageCodes) {
    const path = buildLanguageAwareSitePagePath({
      websiteSlug,
      pageSlug,
      languageCode: code,
      defaultLanguageCode: normalizedDefaultLanguage
    });
    const href = normalizeAbsoluteUrl(path, baseOrigin);
    if (!href) {
      continue;
    }

    alternates.push({
      hreflang: code,
      href
    });
  }

  const defaultPath = buildLanguageAwareSitePagePath({
    websiteSlug,
    pageSlug,
    languageCode: normalizedDefaultLanguage,
    defaultLanguageCode: normalizedDefaultLanguage
  });
  const xDefaultHref = normalizeAbsoluteUrl(defaultPath, baseOrigin);
  if (xDefaultHref) {
    alternates.push({
      hreflang: 'x-default',
      href: xDefaultHref
    });
  }

  return alternates;
}

export function resolveCanonicalBaseForWebsite({ website = {}, url = null }) {
  const requestBase = normalizeCanonicalBase(url?.origin ?? '');
  const canonicalDomainBase = normalizeCanonicalBase(getFirstString(website, ['seo_canonical_domain']));
  const websiteUrlBase = normalizeCanonicalBase(
    getFirstString(website, ['domain', 'public_url', 'publicUrl', 'url', 'site_url', 'website_url'])
  );
  const envBase = normalizeCanonicalBase(import.meta.env.VITE_PUBLIC_SITE_BASE_URL ?? '');

  return canonicalDomainBase || websiteUrlBase || envBase || requestBase;
}

export function buildCanonicalSitePageUrl({ website = {}, websiteSlug = '', pageSlug = '', url = null }) {
  const baseOrigin = resolveCanonicalBaseForWebsite({ website, url });
  if (!baseOrigin) {
    return '';
  }

  const canonicalPath = `/site/${asString(websiteSlug)}/${asString(pageSlug)}`;
  return normalizeAbsoluteUrl(canonicalPath, baseOrigin);
}

export function buildPageSeoMetadata({
  pb,
  website = {},
  page = {},
  blocks = [],
  websiteSlug = '',
  pageSlug = '',
  url = null,
  activeLanguage = '',
  availableLanguages = [],
  defaultLanguage = ''
}) {
  const title = resolveSeoTitle({ website, page, websiteSlug, pageSlug, activeLanguage });
  const description = resolveSeoDescription({ website, page, activeLanguage });
  const canonicalMetadata = resolveCanonicalMetadata({
    website,
    page,
    websiteSlug,
    pageSlug,
    url,
    activeLanguage,
    availableLanguages,
    defaultLanguage
  });
  const canonicalUrl = canonicalMetadata.canonicalUrl;
  const hreflangAlternates = canonicalMetadata.hasExplicitCanonicalOverride
    ? []
    : buildHreflangAlternates({
        baseOrigin: canonicalMetadata.baseOrigin,
        websiteSlug,
        pageSlug,
        availableLanguageCodes: canonicalMetadata.availableLanguageCodes,
        defaultLanguageCode: canonicalMetadata.defaultLanguageCode
      });
  const fallbackBase = canonicalUrl ? new URL(canonicalUrl).origin : normalizeCanonicalBase(url?.origin ?? '');
  const noindex = asBool(page?.seo_noindex);
  const robots = noindex ? 'noindex,nofollow' : 'index,follow';

  const pageImage = resolveSeoImageUrl(pb, page, page?.seo_social_image, fallbackBase);
  const websiteImage = resolveSeoImageUrl(
    pb,
    website,
    website?.seoImage ?? website?.seo_image,
    fallbackBase
  );
  const image = pageImage || websiteImage;
  const structuredData = buildBusinessStructuredData({
    pb,
    website,
    page,
    websiteSlug,
    pageSlug,
    canonicalUrl,
    fallbackBase
  });
  const breadcrumbStructuredData = buildBreadcrumbStructuredData({
    website,
    page,
    websiteSlug,
    pageSlug,
    canonicalUrl,
    url
  });
  const faqStructuredData = buildFaqStructuredData({ blocks });
  const structuredDataJsonLdList = [structuredData, breadcrumbStructuredData, faqStructuredData]
    .filter(Boolean)
    .map((entry) => stringifyJsonLd(entry));

  return {
    title,
    description,
    canonicalUrl,
    hreflangAlternates,
    robots,
    noindex,
    og: {
      type: 'website',
      title,
      description,
      url: canonicalUrl,
      image
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      image
    },
    structuredData,
    breadcrumbStructuredData,
    faqStructuredData,
    structuredDataJsonLd: structuredData ? stringifyJsonLd(structuredData) : '',
    structuredDataJsonLdList
  };
}
