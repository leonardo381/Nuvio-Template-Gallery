import { resolveCanonicalBaseForWebsite } from '$lib/server/seo';
import { fetchPublicSitemapData } from '$lib/server/content';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function resolveSingleWebsiteCanonicalBase(websites = [], url) {
  try {
    if (!Array.isArray(websites) || websites.length !== 1) {
      return '';
    }

    return resolveCanonicalBaseForWebsite({
      website: websites[0] ?? {},
      url
    });
  } catch {
    return '';
  }
}

async function resolveRobotsBaseOrigin(locals, url) {
  const requestOrigin = asString(url?.origin);
  const envValue = asString(import.meta.env.VITE_PUBLIC_SITE_BASE_URL);
  if (envValue) {
    const envBase = resolveCanonicalBaseForWebsite({
      website: { seo_canonical_domain: envValue },
      url: null
    });
    if (envBase) {
      return envBase;
    }
  }

  const sitemapData = await fetchPublicSitemapData(locals.pb).catch(() => ({
    websites: []
  }));
  const singleWebsiteBase = resolveSingleWebsiteCanonicalBase(sitemapData.websites, url);
  if (singleWebsiteBase) {
    return singleWebsiteBase;
  }

  return resolveCanonicalBaseForWebsite({ website: {}, url }) || requestOrigin;
}

function buildRobotsTxt(sitemapUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
}

export async function GET({ locals, url }) {
  const baseOrigin = await resolveRobotsBaseOrigin(locals, url);
  const sitemapUrl = new URL('/sitemap.xml', baseOrigin).toString();
  const body = buildRobotsTxt(sitemapUrl);

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8'
    }
  });
}
