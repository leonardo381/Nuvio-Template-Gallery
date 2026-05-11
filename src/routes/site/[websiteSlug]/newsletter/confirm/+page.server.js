import { error } from '@sveltejs/kit';
import { getWebsiteBySlug } from '$lib/server/content';
import { fetchNewsletterLifecycleState } from '$lib/server/newsletter-lifecycle';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isNotFoundError(err) {
  return err?.status === 404 || err?.response?.code === 404;
}

function resolveWebsiteDisplayName(website, websiteSlug) {
  const fromName = asString(website?.name);
  if (fromName) {
    return fromName;
  }

  return websiteSlug;
}

function getConfirmViewModel(state, websiteName) {
  switch (state) {
    case 'confirmed':
      return {
        title: 'Subscription confirmed',
        message: `Your ${websiteName} newsletter subscription is now active.`
      };
    case 'expired':
      return {
        title: 'Confirmation link expired',
        message: 'This confirmation link has expired. Please subscribe again to receive a new link.'
      };
    case 'invalid':
      return {
        title: 'Invalid confirmation link',
        message: 'This confirmation link is invalid. Please subscribe again to receive a new link.'
      };
    default:
      return {
        title: 'Unable to confirm subscription',
        message: 'We could not confirm your subscription right now. Please try again later.'
      };
  }
}

export async function load({ locals, params, url }) {
  const websiteSlug = asString(params?.websiteSlug);
  if (!websiteSlug) {
    throw error(404, 'Website not found');
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

  const token = asString(url.searchParams.get('token'));
  const lifecycleResult = await fetchNewsletterLifecycleState({
    type: 'confirm',
    token
  });

  const lifecycleState = lifecycleResult.ok ? 'confirmed' : lifecycleResult.state;
  const websiteName = resolveWebsiteDisplayName(website, websiteSlug);
  const copy = getConfirmViewModel(lifecycleState, websiteName);

  return {
    website: {
      slug: websiteSlug,
      name: websiteName
    },
    lifecycle: {
      type: 'confirm',
      state: lifecycleState,
      title: copy.title,
      message: copy.message
    }
  };
}
