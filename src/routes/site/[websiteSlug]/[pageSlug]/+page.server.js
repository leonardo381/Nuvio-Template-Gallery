import { error, fail } from '@sveltejs/kit';
import {
  getWebsiteBySlug,
  getPageBySlug,
  getBlocksByPageId
} from '$lib/server/content';
import { buildPageSeoMetadata } from '$lib/server/seo';
import { submitNewsletterSubscribeRequest } from '$lib/server/newsletter-lifecycle';

function isNotFoundError(err) {
  return err?.status === 404 || err?.response?.code === 404;
}

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildNewsletterErrorMessage(rawMessage = '') {
  const normalized = asString(rawMessage).toLowerCase();
  if (!normalized) {
    return 'Unable to subscribe right now. Please try again.';
  }

  if (normalized.includes('unavailable')) {
    return 'Newsletter is currently unavailable.';
  }

  if (normalized.includes('valid email')) {
    return 'Please enter a valid email address.';
  }

  if (normalized.includes('website')) {
    return 'Unable to subscribe right now. Please refresh and try again.';
  }

  return 'Unable to subscribe right now. Please try again.';
}

async function loadWebsiteFromSlug(locals, websiteSlug) {
  try {
    return await getWebsiteBySlug(locals.pb, websiteSlug);
  } catch (err) {
    if (isNotFoundError(err)) {
      throw error(404, 'Website not found');
    }

    throw error(500, 'Failed to load website');
  }
}

export async function load({ locals, params, url }) {
  const websiteSlug = `${params.websiteSlug ?? ''}`.trim();
  const pageSlug = `${params.pageSlug ?? ''}`.trim();

  if (!websiteSlug || !pageSlug) {
    throw error(404, 'Page not found');
  }

  const website = await loadWebsiteFromSlug(locals, websiteSlug);

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
    blocks,
    seo: buildPageSeoMetadata({
      pb: locals.pb,
      website,
      page,
      blocks,
      websiteSlug,
      pageSlug,
      url
    })
  };
}

export const actions = {
  newsletterSubscribe: async ({ locals, params, request }) => {
    const websiteSlug = asString(params?.websiteSlug);
    if (!websiteSlug) {
      throw error(404, 'Website not found');
    }

    const website = await loadWebsiteFromSlug(locals, websiteSlug);
    const formData = await request.formData();

    const values = {
      email: asString(formData.get('email')),
      name: asString(formData.get('name')),
      variant: asString(formData.get('newsletterVariant'))
    };

    if (!values.email) {
      return fail(400, {
        newsletter: {
          ok: false,
          state: 'error',
          message: 'Email is required.',
          errors: {
            email: 'Email is required.'
          },
          values,
          variant: values.variant
        }
      });
    }

    if (!isValidEmail(values.email)) {
      return fail(400, {
        newsletter: {
          ok: false,
          state: 'error',
          message: 'Please enter a valid email address.',
          errors: {
            email: 'Please enter a valid email address.'
          },
          values,
          variant: values.variant
        }
      });
    }

    const result = await submitNewsletterSubscribeRequest({
      websiteId: asString(website?.id),
      email: values.email,
      name: values.name
    });

    if (!result.ok) {
      return fail(result.status >= 400 ? result.status : 500, {
        newsletter: {
          ok: false,
          state: 'error',
          message: buildNewsletterErrorMessage(result.message),
          values,
          variant: values.variant
        }
      });
    }

    const successState = result.state === 'pending' ? 'pending' : 'active';

    return {
      newsletter: {
        ok: true,
        state: successState,
        message:
          successState === 'pending'
            ? 'Please check your email to confirm your subscription.'
            : 'Thanks for subscribing.',
        values: {
          email: '',
          name: ''
        },
        variant: values.variant
      }
    };
  }
};
