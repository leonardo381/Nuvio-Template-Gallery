import { resolveCanonicalBaseForWebsite } from '$lib/server/seo';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function resolveSingleWebsiteCanonicalBase(locals, url) {
  try {
    const websites = await locals.pb.collection('websites').getList(1, 2, {
      fields: 'id,seo_canonical_domain,domain,public_url,publicUrl,url,site_url,website_url'
    });

    if (websites?.totalItems !== 1) {
      return '';
    }

    return resolveCanonicalBaseForWebsite({
      website: websites.items?.[0] ?? {},
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

  const singleWebsiteBase = await resolveSingleWebsiteCanonicalBase(locals, url);
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
