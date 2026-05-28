const PUBLIC_CONTENT_ENDPOINT = '/api/nuvio/public/content';
const PUBLIC_SITEMAP_DATA_ENDPOINT = '/api/nuvio/public/sitemap-data';

const websiteSlugByIdCache = new Map();
const pageLookupByIdCache = new Map();

function createPublicContentNotFoundError(message = 'Not found') {
  const error = new Error(message);
  error.status = 404;
  return error;
}

async function fetchPublicContentDto(pb, websiteSlug, pageSlug = '', options = {}) {
  const normalizedWebsiteSlug = asString(websiteSlug);
  if (!normalizedWebsiteSlug) {
    throw createPublicContentNotFoundError('Website not found');
  }

  const normalizedPageSlug = asString(pageSlug);
  const query = { websiteSlug: normalizedWebsiteSlug };
  if (normalizedPageSlug) {
    query.pageSlug = normalizedPageSlug;
  }

  if (options?.cmsPreview === true) {
    query.cmsPreview = '1';
  }

  const previewToken = asString(options?.cacheBustToken);
  if (previewToken) {
    query._cmsPreview = previewToken;
  }

  return await pb.send(PUBLIC_CONTENT_ENDPOINT, {
    method: 'GET',
    query
  });
}

function normalizePublicContentPayload(pb, payload = {}) {
  const website = payload?.website && typeof payload.website === 'object' && !Array.isArray(payload.website)
    ? payload.website
    : null;
  const page = payload?.page && typeof payload.page === 'object' && !Array.isArray(payload.page)
    ? payload.page
    : null;
  const blocks = Array.isArray(payload?.blocks)
    ? payload.blocks.map((block) => normalizeBlock(pb, block))
    : [];

  return { website, page, blocks };
}

function cachePublicContentPayload(payload) {
  const websiteId = asString(payload?.website?.id);
  const websiteSlug = asString(payload?.website?.slug);
  const pageId = asString(payload?.page?.id);
  const pageSlug = asString(payload?.page?.slug);

  if (websiteId && websiteSlug) {
    websiteSlugByIdCache.set(websiteId, websiteSlug);
  }

  if (websiteSlug && pageSlug && payload.page) {
    if (pageId) {
      pageLookupByIdCache.set(pageId, {
        websiteSlug,
        pageSlug
      });
    }
  }
}

export async function fetchPublicSitemapData(pb) {
  const payload = await pb.send(PUBLIC_SITEMAP_DATA_ENDPOINT, {
    method: 'GET'
  });

  return {
    websites: Array.isArray(payload?.websites) ? payload.websites : [],
    pages: Array.isArray(payload?.pages) ? payload.pages : []
  };
}

export async function getWebsiteBySlug(pb, websiteSlug, options = {}) {
  const normalizedWebsiteSlug = asString(websiteSlug);
  if (!normalizedWebsiteSlug) {
    throw createPublicContentNotFoundError('Website not found');
  }

  const payload = normalizePublicContentPayload(
    pb,
    await fetchPublicContentDto(pb, normalizedWebsiteSlug, '', options)
  );

  if (!payload.website) {
    throw createPublicContentNotFoundError('Website not found');
  }

  cachePublicContentPayload(payload);

  return payload.website;
}

export async function getPageBySlug(pb, websiteId, pageSlug, options = {}) {
  const normalizedWebsiteId = asString(websiteId);
  const normalizedPageSlug = asString(pageSlug);

  if (!normalizedWebsiteId || !normalizedPageSlug) {
    throw createPublicContentNotFoundError('Page not found');
  }

  const websiteSlug = asString(options?.websiteSlug) || asString(websiteSlugByIdCache.get(normalizedWebsiteId));
  if (!websiteSlug) {
    throw createPublicContentNotFoundError('Website not found');
  }

  const payload = normalizePublicContentPayload(
    pb,
    await fetchPublicContentDto(pb, websiteSlug, normalizedPageSlug, options)
  );

  if (!payload.page) {
    throw createPublicContentNotFoundError('Page not found');
  }

  cachePublicContentPayload(payload);

  return payload.page;
}

export async function getBlocksByPageId(pb, pageId, options = {}) {
  const normalizedPageId = asString(pageId);
  if (!normalizedPageId) {
    return [];
  }

  const optionWebsiteSlug = asString(options?.websiteSlug);
  const optionPageSlug = asString(options?.pageSlug);

  const lookup = (
    optionWebsiteSlug && optionPageSlug
      ? { websiteSlug: optionWebsiteSlug, pageSlug: optionPageSlug }
      : pageLookupByIdCache.get(normalizedPageId)
  );

  if (!lookup?.websiteSlug || !lookup?.pageSlug) {
    return [];
  }

  const payload = normalizePublicContentPayload(
    pb,
    await fetchPublicContentDto(pb, lookup.websiteSlug, lookup.pageSlug, options)
  );

  cachePublicContentPayload(payload);

  return Array.isArray(payload.blocks) ? payload.blocks : [];
}

export function getPublicContentLanguageContext(websiteSettings = {}, requestedLanguage = '') {
  const settings = asObject(websiteSettings);
  const i18nSettings = asObject(settings.i18n);
  const i18nEnabled = i18nSettings.enabled === true;

  const configuredLanguages = normalizeConfiguredLanguages(i18nSettings.languages);
  const availableLanguages = i18nEnabled ? configuredLanguages : [];
  const defaultLanguage = availableLanguages[0]?.code || 'pt';
  const normalizedRequestedLanguage = normalizeLanguageCode(requestedLanguage);
  const availableLanguageCodes = new Set(availableLanguages.map((entry) => entry.code));

  const activeLanguage = (
    i18nEnabled &&
    normalizedRequestedLanguage &&
    availableLanguageCodes.has(normalizedRequestedLanguage)
  ) ? normalizedRequestedLanguage : null;

  return {
    activeLanguage,
    availableLanguages,
    defaultLanguage
  };
}

export function resolveBlocksForLanguage(pb, blocks = [], options = {}) {
  const activeLanguage = normalizeLanguageCode(options?.activeLanguage);
  if (!activeLanguage || !Array.isArray(blocks) || !blocks.length) {
    return Array.isArray(blocks) ? blocks : [];
  }

  return blocks.map((block) => {
    const resolvedProps = resolveBlockPropsForLanguage(pb, block, activeLanguage);
    return {
      ...block,
      resolvedProps
    };
  });
}

export function mapBlocksBySlot(blocks) {
  return Object.fromEntries(
    blocks.map((block) => [block.slot, block])
  );
}

function normalizeBlock(pb, block) {
  return {
    ...block,
    props: resolveAssetRefs(pb, block.props)
  };
}

function resolveBlockPropsForLanguage(pb, block, activeLanguage) {
  const defaultProps = isPlainObject(block?.props) ? block.props : {};
  const translationOverrides = resolveTranslationOverrides(pb, block?.translations, activeLanguage);

  if (!isPlainObject(translationOverrides) || !Object.keys(translationOverrides).length) {
    return defaultProps;
  }

  return deepMergeTranslatedProps(defaultProps, translationOverrides);
}

function resolveTranslationOverrides(pb, translationsValue, activeLanguage) {
  const translations = asObject(translationsValue);
  if (!isPlainObject(translations) || !Object.keys(translations).length) {
    return {};
  }

  let languageEntry = translations[activeLanguage];
  if (typeof languageEntry === 'undefined') {
    for (const [languageKey, value] of Object.entries(translations)) {
      if (normalizeLanguageCode(languageKey) === activeLanguage) {
        languageEntry = value;
        break;
      }
    }
  }

  const translationObject = asObject(languageEntry);
  if (!isPlainObject(translationObject) || !Object.keys(translationObject).length) {
    return {};
  }

  return resolveAssetRefs(pb, translationObject);
}

function deepMergeTranslatedProps(defaultValue, translatedValue) {
  if (translatedValue === null || typeof translatedValue === 'undefined') {
    return cloneValue(defaultValue);
  }

  if (Array.isArray(translatedValue)) {
    return cloneValue(translatedValue);
  }

  if (isPlainObject(translatedValue)) {
    const baseObject = isPlainObject(defaultValue) ? defaultValue : {};
    const merged = cloneValue(baseObject);

    for (const [key, value] of Object.entries(translatedValue)) {
      if (value === null || typeof value === 'undefined') {
        continue;
      }

      if (Array.isArray(value)) {
        merged[key] = cloneValue(value);
        continue;
      }

      if (isPlainObject(value)) {
        merged[key] = deepMergeTranslatedProps(baseObject[key], value);
        continue;
      }

      merged[key] = value;
    }

    return merged;
  }

  return translatedValue;
}

function resolveAssetRefs(pb, value) {
  if (Array.isArray(value)) {
    return value.map((v) => resolveAssetRefs(pb, v));
  }

  if (value && typeof value === 'object') {
    if (isAssetRef(value)) {
      return buildAssetUrl(pb, value);
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, resolveAssetRefs(pb, val)])
    );
  }

  return value;
}

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asObject(value) {
  if (isPlainObject(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw);
      return isPlainObject(parsed) ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  return {};
}

function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizeLanguageCode(value) {
  const normalized = asString(value).toLowerCase();
  if (!normalized) {
    return '';
  }

  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})?$/.test(normalized)) {
    return '';
  }

  return normalized;
}

function normalizeConfiguredLanguages(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const languages = [];
  const seen = new Set();

  for (const entry of value) {
    let code = '';
    let label = '';

    if (isPlainObject(entry)) {
      code = normalizeLanguageCode(entry.code);
      label = asString(entry.label);
    } else if (typeof entry === 'string') {
      code = normalizeLanguageCode(entry);
    }

    if (!code || seen.has(code)) {
      continue;
    }

    seen.add(code);
    languages.push({
      code,
      label: label || code
    });
  }

  return languages;
}

function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneValue(entry));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, cloneValue(entry)])
    );
  }

  return value;
}

function isAssetRef(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.recordId === 'string' &&
    typeof value.filename === 'string' &&
    typeof value.collection === 'string'
  );
}

function buildAssetUrl(pb, fileRef) {
  return pb.files.getURL(
    {
      id: fileRef.recordId,
      collectionId: fileRef.collection,
      collectionName: fileRef.collection
    },
    fileRef.filename
  );
}
