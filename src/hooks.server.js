import PocketBase from 'pocketbase';

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(import.meta.env.VITE_PB_URL);

  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection('users').authRefresh();
    }
  } catch {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  // Local CMS preview: in dev, allow embedding from non-standard parent origins
  // (eg. chrome-extension://...) by removing frame-ancestors restrictions.
  // Keep this dev-only to avoid relaxing production framing defaults.
  if (import.meta.env.DEV) {
    // Remove frame denial header if any upstream/tool sets it.
    response.headers.delete('x-frame-options');

    const existingCsp = response.headers.get('content-security-policy');
    if (existingCsp && /frame-ancestors/i.test(existingCsp)) {
      const withoutFrameAncestors = existingCsp
        .replace(/(?:^|;)\s*frame-ancestors[^;]*/gi, '')
        .replace(/^\s*;\s*|\s*;\s*$/g, '')
        .replace(/\s*;\s*;\s*/g, '; ')
        .trim();

      if (withoutFrameAncestors) {
        response.headers.set('content-security-policy', withoutFrameAncestors);
      } else {
        response.headers.delete('content-security-policy');
      }
    }
  }

  response.headers.append(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ httpOnly: true, sameSite: 'Strict' })
  );

  return response;
}
