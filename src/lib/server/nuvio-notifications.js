import { env } from '$env/dynamic/private';

const LOG_PREFIX = '[nuvio-backend]';
const DEBUG_NOTIFICATIONS = env.NUVIO_WEBSITE_DEBUG === 'true';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeBaseUrl(value) {
  return asString(value).replace(/\/+$/, '');
}

function getNuvioBackendBaseUrl() {
  const candidates = [
    ['NUVIO_BACKEND_URL', env.NUVIO_BACKEND_URL],
    ['PB_URL', env.PB_URL],
    ['VITE_PB_URL', env.VITE_PB_URL]
  ];

  for (const [source, value] of candidates) {
    const baseUrl = normalizeBaseUrl(value);
    if (baseUrl) {
      return { baseUrl, source };
    }
  }

  return { baseUrl: '', source: '' };
}

function getResponseReason(responseBody, responseText = '') {
  const reason = asString(responseBody?.reason);
  if (reason) {
    return reason;
  }

  const message = asString(responseBody?.message);
  if (message) {
    return message;
  }

  if (responseText) {
    return responseText;
  }

  return 'request_failed';
}

function getPayloadContext(payload = {}) {
  const normalizedPayload =
    payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : {};

  return {
    payloadKeys: Object.keys(normalizedPayload).sort(),
    websiteId: asString(normalizedPayload.websiteId ?? normalizedPayload.website),
    websiteSlug: asString(normalizedPayload.websiteSlug ?? normalizedPayload.slug)
  };
}

function logDebug(message, data = {}) {
  if (!DEBUG_NOTIFICATIONS) {
    return;
  }

  console.info(`${LOG_PREFIX} ${message}`, data);
}

async function postToPath(pathname, payload) {
  const { baseUrl, source: baseUrlSource } = getNuvioBackendBaseUrl();
  const payloadContext = getPayloadContext(payload);

  if (!baseUrl) {
    console.error(`${LOG_PREFIX} Missing backend URL configuration`, {
      urlSourcePriority: ['NUVIO_BACKEND_URL', 'PB_URL', 'VITE_PB_URL'],
      payloadKeys: payloadContext.payloadKeys,
      websiteId: payloadContext.websiteId,
      websiteSlug: payloadContext.websiteSlug
    });

    return {
      ok: false,
      status: 0,
      reason: 'backend_url_not_configured'
    };
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const endpoint = `${baseUrl}${normalizedPath}`;

  logDebug('Dispatching POST request', {
    baseUrl,
    baseUrlSource,
    endpoint,
    payloadKeys: payloadContext.payloadKeys,
    websiteId: payloadContext.websiteId,
    websiteSlug: payloadContext.websiteSlug
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    let responseBody = null;
    let responseText = '';
    const contentType = asString(response.headers.get('content-type')).toLowerCase();

    if (contentType.includes('application/json')) {
      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }
    } else {
      try {
        responseText = asString(await response.text());
      } catch {
        responseText = '';
      }
    }

    const bodyOk = typeof responseBody?.ok === 'boolean' ? responseBody.ok : null;
    const responseReason = getResponseReason(responseBody, responseText);

    if (!response.ok || bodyOk === false) {
      console.error(`${LOG_PREFIX} POST request failed`, {
        endpoint,
        status: response.status,
        reason: responseReason,
        message: asString(responseBody?.message),
        payloadKeys: payloadContext.payloadKeys,
        websiteId: payloadContext.websiteId,
        websiteSlug: payloadContext.websiteSlug
      });

      return {
        ok: false,
        status: response.status,
        reason: responseReason
      };
    }

    logDebug('POST request succeeded', {
      endpoint,
      status: response.status,
      reason: responseReason
    });

    return {
      ok: true,
      status: response.status,
      body: responseBody
    };
  } catch (error) {
    console.error(`${LOG_PREFIX} Network request failed`, {
      endpoint,
      payloadKeys: payloadContext.payloadKeys,
      websiteId: payloadContext.websiteId,
      websiteSlug: payloadContext.websiteSlug,
      message: error?.message
    });

    return {
      ok: false,
      status: 0,
      reason: 'network_error'
    };
  }
}

async function postNuvioNotification(pathnames, payload) {
  const candidates = Array.isArray(pathnames) ? pathnames : [pathnames];
  let lastResult = {
    ok: false,
    status: 0,
    reason: 'request_failed'
  };

  for (const pathname of candidates) {
    const result = await postToPath(pathname, payload);

    if (result.ok) {
      return result;
    }

    lastResult = result;

    // Fallback to compatibility route only for "not found" style failures.
    if (result.status !== 404 && result.status !== 405) {
      return result;
    }

    logDebug('Trying fallback endpoint after not-found style response', {
      pathname,
      status: result.status,
      reason: result.reason
    });
  }

  return lastResult;
}

export async function submitContactLead(payload) {
  return postNuvioNotification(
    ['/api/nuvio/contact/submit', '/api/nuvio/leads/contact/submit'],
    payload
  );
}

export async function submitWhatsAppInteraction(payload) {
  return postNuvioNotification(
    ['/api/nuvio/whatsapp/interactions', '/api/nuvio/leads/whatsapp/interaction'],
    payload
  );
}
