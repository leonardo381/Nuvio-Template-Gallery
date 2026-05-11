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

function getUnsubscribeViewModel(state, websiteName) {
  switch (state) {
    case 'already_unsubscribed':
      return {
        title: 'Already unsubscribed',
        message: `This email is already unsubscribed from ${websiteName} newsletter updates.`
      };
    case 'unsubscribed':
      return {
        title: 'You are unsubscribed',
        message: `You will no longer receive ${websiteName} newsletter emails.`
      };
    case 'invalid':
      return {
        title: 'Invalid unsubscribe link',
        message: 'This unsubscribe link is invalid.'
      };
    default:
      return {
        title: 'Unable to unsubscribe',
        message: 'We could not complete your unsubscribe request right now. Please try again later.'
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
    type: 'unsubscribe',
    token
  });

  const lifecycleState = lifecycleResult.ok
    ? lifecycleResult.state === 'already_unsubscribed'
      ? 'already_unsubscribed'
      : 'unsubscribed'
    : lifecycleResult.state;

  const websiteName = resolveWebsiteDisplayName(website, websiteSlug);
  const copy = getUnsubscribeViewModel(lifecycleState, websiteName);

  return {
    website: {
      slug: websiteSlug,
      name: websiteName
    },
    lifecycle: {
      type: 'unsubscribe',
      state: lifecycleState,
      title: copy.title,
      message: copy.message
    }
  };
}
