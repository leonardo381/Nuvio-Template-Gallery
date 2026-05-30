function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeBaseUrl(value) {
  return asString(value).replace(/\/+$/, '');
}

function getBookingApiBaseUrl() {
  const configured =
    normalizeBaseUrl(import.meta.env.VITE_NUVIO_BACKEND_URL) ||
    normalizeBaseUrl(import.meta.env.VITE_PB_URL);

  return configured || '';
}

function buildBookingUrl(pathname, query = {}) {
  const base = getBookingApiBaseUrl();
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const url = new URL(`${base}${normalizedPath}`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');

  Object.entries(query || {}).forEach(([key, value]) => {
    const normalized = asString(value);
    if (normalized) {
      url.searchParams.set(key, normalized);
    }
  });

  return url.toString();
}

async function readSafeResponse(response) {
  const contentType = asString(response.headers.get('content-type')).toLowerCase();
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (_) {
      return {};
    }
  }

  try {
    const text = asString(await response.text());
    return text ? { message: text } : {};
  } catch (_) {
    return {};
  }
}

function normalizeSlots(rawSlots) {
  if (!Array.isArray(rawSlots)) {
    return [];
  }

  return rawSlots
    .map((slot) => asString(slot))
    .filter(Boolean);
}

export async function fetchBookingServices({ websiteId, websiteSlug }) {
  let response;
  try {
    response = await fetch(
      buildBookingUrl('/api/nuvio/booking/services', {
        websiteId,
        websiteSlug
      }),
      { method: 'GET' }
    );
  } catch (_) {
    return { ok: false, status: 0, body: {} };
  }
  const body = await readSafeResponse(response);

  if (!response.ok) {
    return { ok: false, status: response.status, body };
  }

  const services = Array.isArray(body?.services) ? body.services : [];
  return {
    ok: true,
    status: response.status,
    services: services
      .map((service) => ({
        id: asString(service?.id),
        name: asString(service?.name),
        durationMinutes: Number.isFinite(Number(service?.durationMinutes))
          ? Number(service.durationMinutes)
          : 0
      }))
      .filter((service) => service.id && service.name && service.durationMinutes > 0)
  };
}

export async function fetchBookingSlots({ websiteId, websiteSlug, serviceId, date }) {
  let response;
  try {
    response = await fetch(
      buildBookingUrl('/api/nuvio/booking/slots', {
        websiteId,
        websiteSlug,
        serviceId,
        date
      }),
      { method: 'GET' }
    );
  } catch (_) {
    return { ok: false, status: 0, body: {} };
  }
  const body = await readSafeResponse(response);

  if (!response.ok) {
    return { ok: false, status: response.status, body };
  }

  return {
    ok: true,
    status: response.status,
    slots: normalizeSlots(body?.slots)
  };
}

export async function createBookingAppointment(payload) {
  const normalizedPayload = {
    websiteId: asString(payload?.websiteId),
    websiteSlug: asString(payload?.websiteSlug),
    serviceId: asString(payload?.serviceId || payload?.service),
    date: asString(payload?.date),
    time: asString(payload?.time),
    name: asString(payload?.name),
    email: asString(payload?.email),
    phone: asString(payload?.phone),
    notes: asString(payload?.notes),
    source: asString(payload?.source),
    page: asString(payload?.page)
  };

  let response;
  try {
    response = await fetch(
      buildBookingUrl('/api/nuvio/booking/appointments'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(normalizedPayload)
      }
    );
  } catch (_) {
    return { ok: false, status: 0, body: {} };
  }

  const body = await readSafeResponse(response);

  if (!response.ok) {
    return { ok: false, status: response.status, body };
  }

  return {
    ok: true,
    status: response.status,
    body
  };
}
