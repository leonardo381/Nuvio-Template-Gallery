import { json } from '@sveltejs/kit';
import { registerWhatsAppInteraction } from '$lib/server/interactions';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeWebsite(value) {
  const website = asString(value);
  if (!website) {
    return '';
  }

  if (/^[a-zA-Z0-9_-]{1,80}$/.test(website)) {
    return website;
  }

  return '';
}

function normalizeSource(value) {
  const source = asString(value).toLowerCase();
  if (!source) {
    return '';
  }

  if (/^[a-z0-9._-]{1,80}$/.test(source)) {
    return source;
  }

  return '';
}

function normalizePage(value) {
  const page = asString(value);
  if (!page) {
    return '';
  }

  const normalized = page.startsWith('/') ? page : `/${page}`;
  return normalized.slice(0, 200);
}

export async function POST({ request }) {
  let payload = {};

  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return json({ ok: false, reason: 'invalid_payload' }, { status: 400 });
  }

  const website = normalizeWebsite(payload.website);
  const source = normalizeSource(payload.source);
  const page = normalizePage(payload.page);

  if (!source || !page) {
    return json({ ok: false, reason: 'invalid_payload' }, { status: 400 });
  }

  const result = await registerWhatsAppInteraction({
    website,
    source,
    page
  });

  if (!result.ok) {
    console.error('[whatsapp-interaction] Failed to register interaction', {
      reason: result.reason,
      website,
      source,
      page
    });

    return json(
      {
        ok: false,
        reason: result.reason
      },
      { status: 202 }
    );
  }

  return json({
    ok: true,
    collection: result.collection
  });
}
