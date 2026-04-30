import { error } from '@sveltejs/kit';
import {
  getWebsiteBySlug,
  getPageBySlug,
  getBlocksByPageId
} from '$lib/server/content';

function isNotFoundError(err) {
  return err?.status === 404 || err?.response?.code === 404;
}

export async function load({ locals, params }) {
  const websiteSlug = `${params.websiteSlug ?? ''}`.trim();
  const pageSlug = `${params.pageSlug ?? ''}`.trim();

  if (!websiteSlug || !pageSlug) {
    throw error(404, 'Page not found');
  }

  let website;
  try {
    website = await getWebsiteBySlug(locals.pb, websiteSlug);
  } catch (err) {
    if (isNotFoundError(err)) {
      throw error(404, 'Website not found');
    }
    throw error(500, 'Failed to load website');
  }

  let page;
  try {
    page = await getPageBySlug(locals.pb, website.id, pageSlug);
  } catch (err) {
    if (isNotFoundError(err)) {
      throw error(404, 'Page not found');
    }
    throw error(500, 'Failed to load page');
  }

  let blocks = [];
  try {
    blocks = await getBlocksByPageId(locals.pb, page.id);
  } catch {
    throw error(500, 'Failed to load page blocks');
  }

  return {
    website,
    page,
    blocks
  };
}

