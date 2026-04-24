import { submitWhatsAppInteraction } from '$lib/server/nuvio-notifications';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildInteractionPayload({ websiteId, source, page, phone, message }) {
  const normalizedWebsiteId = asString(websiteId);

  return {
    websiteId: normalizedWebsiteId,
    website: normalizedWebsiteId,
    source: asString(source),
    page: asString(page),
    phone: asString(phone),
    message: asString(message)
  };
}

export async function registerWhatsAppInteraction({
  websiteId = '',
  source = '',
  page = '',
  phone = '',
  message = ''
}) {
  const payload = buildInteractionPayload({ websiteId, source, page, phone, message });
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
