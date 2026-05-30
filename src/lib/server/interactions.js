import { submitWhatsAppInteraction } from '$lib/server/nuvio-notifications';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildInteractionPayload({ websiteId, websiteSlug, source, page }) {
  const normalizedWebsiteId = asString(websiteId);
  const normalizedWebsiteSlug = asString(websiteSlug);

  return {
    websiteId: normalizedWebsiteId,
    websiteSlug: normalizedWebsiteSlug,
    source: asString(source),
    page: asString(page)
  };
}

export async function registerWhatsAppInteraction({
  websiteId = '',
  websiteSlug = '',
  source = '',
  page = ''
}) {
  const payload = buildInteractionPayload({ websiteId, websiteSlug, source, page });
  const result = await submitWhatsAppInteraction(payload);

  if (!result.ok) {
    return {
      ok: false,
      reason: result.reason,
      status: result.status
    };
  }

  return {
    ok: true,
    status: result.status
  };
}
