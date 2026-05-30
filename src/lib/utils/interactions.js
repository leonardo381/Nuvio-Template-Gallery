function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildWhatsAppTrackingPayload(payload = {}) {
  const normalizedPayload =
    payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : {};

  return {
    websiteId: asString(normalizedPayload.websiteId ?? normalizedPayload.website),
    websiteSlug: asString(normalizedPayload.websiteSlug ?? normalizedPayload.slug),
    source: asString(normalizedPayload.source),
    page: asString(normalizedPayload.page)
  };
}

export async function registerWhatsAppInteraction(payload) {
  const requestPayload = buildWhatsAppTrackingPayload(payload);

  try {
    const response = await fetch('/api/interactions/whatsapp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestPayload),
      keepalive: true
    });

    if (!response.ok) {
      return { ok: false };
    }

    return await response.json();
  } catch {
    return { ok: false };
  }
}
