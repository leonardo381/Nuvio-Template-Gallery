import { buildCanonicalSitePageUrl } from '$lib/server/seo';

const XML_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const EXCLUDED_STATUSES = new Set(['draft', 'disabled', 'inactive', 'archived', 'private', 'unpublished']);

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asBool(value) {
  return value === true;
}

function escapeXml(value) {
  return `${value ?? ''}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function hasUsableSlug(value) {
  const slug = asString(value);
  if (!slug) {
    return false;
  }

  return !/[/?#\s]/.test(slug);
}

function getId(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return asString(value);
  }

  if (typeof value === 'object') {
    return asString(value.id);
  }

  return '';
}

function getWebsiteIdFromPage(page) {
  const relation = page?.website;

  if (Array.isArray(relation)) {
    for (const item of relation) {
      const id = getId(item);
      if (id) {
        return id;
      }
    }
    return '';
  }

  const relationId = getId(relation);
  if (relationId) {
    return relationId;
  }

  return getId(page?.websiteId ?? page?.website_id);
}

function isRecordIndexable(record = {}) {
  const booleanFlags = ['enabled', 'active', 'published', 'is_published', 'isPublished'];
  for (const key of booleanFlags) {
    if (typeof record?.[key] === 'boolean' && record[key] === false) {
      return false;
    }
  }

  const statusCandidates = ['status', 'publication_status', 'publishStatus'];
  for (const key of statusCandidates) {
    if (key in record) {
      const status = asString(record?.[key]).toLowerCase();
      if (status && EXCLUDED_STATUSES.has(status)) {
        return false;
      }
    }
  }

  return true;
}

function isSitemapExcludedPage(page = {}) {
  return asBool(page?.seo_noindex) || asBool(page?.seo_exclude_from_sitemap);
}

function resolveLastModified(page = {}) {
  const candidates = [
    page?.updated,
    page?.updatedAt,
    page?.updated_at,
    page?.modified,
    page?.lastModified,
    page?.last_modified
  ];

  for (const candidate of candidates) {
    const value = asString(candidate);
    if (!value) {
      continue;
    }

    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }

  return '';
}

function renderSitemapXml(urlEntries = []) {
  const items = urlEntries
    .map((entry) => {
      const loc = `<loc>${escapeXml(entry.loc)}</loc>`;
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
      return `<url>${loc}${lastmod}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="${XML_NS}">${items}</urlset>`;
}

export async function GET({ locals, url }) {
  let websites = [];
  let pages = [];

  try {
    websites = await locals.pb.collection('websites').getFullList();
    pages = await locals.pb.collection('pages').getFullList();
  } catch (err) {
    console.error('[sitemap] Failed to load sitemap data', {
      message: err?.message ?? 'unknown_error'
    });

    return new Response(renderSitemapXml([]), {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8'
      }
    });
  }

  const websiteById = new Map();
  for (const website of websites) {
    const websiteId = asString(website?.id);
    if (websiteId) {
      websiteById.set(websiteId, website);
    }
  }

  const entries = [];
  const seenLoc = new Set();

  for (const page of pages) {
    if (!isRecordIndexable(page) || isSitemapExcludedPage(page)) {
      continue;
    }

    const websiteId = getWebsiteIdFromPage(page);
    if (!websiteId) {
      continue;
    }

    const website = websiteById.get(websiteId);
    if (!website || !isRecordIndexable(website)) {
      continue;
    }

    const websiteSlug = asString(website?.slug);
    const pageSlug = asString(page?.slug);

    if (!hasUsableSlug(websiteSlug) || !hasUsableSlug(pageSlug)) {
      continue;
    }

    const loc = buildCanonicalSitePageUrl({
      website,
      websiteSlug,
      pageSlug,
      url
    });

    if (!loc) {
      continue;
    }

    if (seenLoc.has(loc)) {
      continue;
    }
    seenLoc.add(loc);

    entries.push({
      loc,
      lastmod: resolveLastModified(page)
    });
  }

  entries.sort((a, b) => a.loc.localeCompare(b.loc));

  return new Response(renderSitemapXml(entries), {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  });
}
