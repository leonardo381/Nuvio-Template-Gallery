import {
  getWebsiteBySlug,
  getPageBySlug,
  getBlocksByPageId,
  mapBlocksBySlot
} from '$lib/server/content';

export async function load({ locals }) {
  const website = await getWebsiteBySlug(locals.pb, 'demo-site');
  const page = await getPageBySlug(locals.pb, website.id, 'card');
  const blocks = await getBlocksByPageId(locals.pb, page.id);

  return {
    blocksBySlot: mapBlocksBySlot(blocks)
  };
}