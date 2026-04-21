import {
  getWebsiteBySlug,
  getPageBySlug,
  getBlocksByPageId,
  mapBlocksBySlot
} from '$lib/server/content';
import { handleContactFormSubmission } from '$lib/server/contact-form';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
  const website = await getWebsiteBySlug(locals.pb, 'demo-site');
  const page = await getPageBySlug(locals.pb, website.id, 'features');
  const blocks = await getBlocksByPageId(locals.pb, page.id);

  return {
    blocksBySlot: mapBlocksBySlot(blocks),
    website: {
      id: website.id,
      slug: website.slug
    },
    websiteSettings: website.settings ?? {}
  };
}

export const actions = {
  contact: async ({ locals, request }) => {
    const website = await getWebsiteBySlug(locals.pb, 'demo-site');
    const formData = await request.formData();
    const submission = await handleContactFormSubmission({ website, formData });

    if (submission.status >= 400) {
      return fail(submission.status, submission.body);
    }

    return submission.body;
  }
};
