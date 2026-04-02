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

  response.headers.append(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ httpOnly: true, sameSite: 'Strict' })
  );

  return response;
}
