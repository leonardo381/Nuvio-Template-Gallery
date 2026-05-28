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

function isLikelyRawPayloadMessage(value) {
  const normalized = asString(value);
  return normalized.startsWith('{') || normalized.startsWith('[');
}

function resolveVisitorLifecycleMessage(defaultMessage, lifecycleResult) {
  if (lifecycleResult?.ok) {
    return defaultMessage;
  }

  const fromBackend = asString(lifecycleResult?.message);
  if (!fromBackend || isLikelyRawPayloadMessage(fromBackend)) {
    return defaultMessage;
  }

  return fromBackend;
}

function getConfirmViewModel(state) {
  const invalidOrExpiredMessage = 'This confirmation link is invalid, expired, or was already used. You can subscribe again from the website.';

  switch (state) {
    case 'confirmed':
      return {
        title: 'Newsletter subscription confirmed',
        message: 'Thank you - your subscription has been confirmed.'
      };
    case 'expired':
      return {
        title: 'Confirmation link expired',
        message: invalidOrExpiredMessage
      };
    case 'invalid':
      return {
        title: 'Confirmation link expired',
        message: invalidOrExpiredMessage
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
  const copy = getConfirmViewModel(lifecycleState);
  const message = resolveVisitorLifecycleMessage(copy.message, lifecycleResult);

  return {
    website: {
      slug: websiteSlug,
      name: websiteName
    },
    lifecycle: {
      type: 'confirm',
      state: lifecycleState,
      title: copy.title,
      message
    }
  };
}
