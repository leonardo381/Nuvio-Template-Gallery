import { env } from '$env/dynamic/private';

const NEWSLETTER_LOG_PREFIX = '[newsletter-lifecycle]';
const BACKEND_BASE_URL_ENV_KEYS = ['NUVIO_BACKEND_URL', 'PB_URL', 'VITE_PB_URL'];

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeBaseUrl(value) {
  return asString(value).replace(/\/+$/, '');
}

function getNewsletterBackendBaseUrl() {
  for (const key of BACKEND_BASE_URL_ENV_KEYS) {
    const baseUrl = normalizeBaseUrl(env[key]);
    if (baseUrl) {
      return baseUrl;
    }
  }

  return '';
}

function normalizeToken(value) {
  return asString(value);
}

function getResponseMessage(responseBody, responseText = '') {
  const message = asString(responseBody?.message);
  if (message) {
    return message;
  }

  const reason = asString(responseBody?.reason);
  if (reason) {
    return reason;
  }

  return asString(responseText);
}

function shouldUsePendingSuccessState(responseBody = {}) {
  const status = asString(responseBody?.status).toLowerCase();
  return status === 'pending' || responseBody?.doubleOptIn === true;
}

function shouldUseActiveSuccessState(responseBody = {}) {
  const status = asString(responseBody?.status).toLowerCase();
  return status === 'active';
}

function getLifecycleEndpoint(baseUrl, pathname, token = '') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalizedToken = normalizeToken(token);
  if (!normalizedToken) {
    return `${baseUrl}${normalizedPath}`;
  }

  return `${baseUrl}${normalizedPath}?token=${encodeURIComponent(normalizedToken)}`;
}

async function parseBackendResponse(response) {
  const contentType = asString(response.headers.get('content-type')).toLowerCase();

  if (contentType.includes('application/json')) {
    try {
      const body = await response.json();
      return {
        body,
        text: ''
      };
    } catch {
      return {
        body: null,
        text: ''
      };
    }
  }

  try {
    const text = asString(await response.text());
    return {
      body: null,
      text
    };
  } catch {
    return {
      body: null,
      text: ''
    };
  }
}

function getSafeLifecycleErrorState(message = '') {
  const normalized = asString(message).toLowerCase();
  if (!normalized) {
    return 'error';
  }

  if (normalized.includes('expired')) {
    return 'expired';
  }

  if (normalized.includes('invalid')) {
    return 'invalid';
  }

  return 'error';
}

function mapLifecycleSuccessMessage(type, responseBody) {
  const backendMessage = asString(responseBody?.message);
  if (backendMessage) {
    return backendMessage;
  }

  if (type === 'confirm') {
    return 'Your subscription is now confirmed.';
  }

  if (type === 'unsubscribe') {
    return 'You have been unsubscribed.';
  }

  return 'Completed successfully.';
}

export async function submitNewsletterSubscribeRequest({ websiteId, email, name = '' }) {
  const baseUrl = getNewsletterBackendBaseUrl();
  if (!baseUrl) {
    return {
      ok: false,
      status: 0,
      state: 'error',
      message: 'Newsletter service is unavailable right now.'
    };
  }

  const endpoint = getLifecycleEndpoint(baseUrl, '/api/nuvio/newsletter/subscribe');
  const payload = {
    websiteId: asString(websiteId),
    email: asString(email),
    name: asString(name)
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const { body, text } = await parseBackendResponse(response);
    const message = getResponseMessage(body, text);

    if (!response.ok || body?.ok === false) {
      return {
        ok: false,
        status: response.status,
        state: 'error',
        message
      };
    }

    const state = shouldUsePendingSuccessState(body)
      ? 'pending'
      : shouldUseActiveSuccessState(body)
        ? 'active'
        : 'active';

    return {
      ok: true,
      status: response.status,
      state,
      message: asString(body?.message)
    };
  } catch (error) {
    console.error(`${NEWSLETTER_LOG_PREFIX} subscribe request failed`, {
      websiteId: asString(websiteId),
      status: 0,
      message: error?.message
    });

    return {
      ok: false,
      status: 0,
      state: 'error',
      message: 'Newsletter service is unavailable right now.'
    };
  }
}

export async function fetchNewsletterLifecycleState({ type, token }) {
  const lifecycleType = asString(type).toLowerCase();
  const normalizedToken = normalizeToken(token);

  if (lifecycleType !== 'confirm' && lifecycleType !== 'unsubscribe') {
    return {
      ok: false,
      state: 'error',
      message: 'Invalid lifecycle request.'
    };
  }

  if (!normalizedToken) {
    return {
      ok: false,
      state: 'invalid',
      message: lifecycleType === 'confirm'
        ? 'Missing confirmation token.'
        : 'Missing unsubscribe token.'
    };
  }

  const baseUrl = getNewsletterBackendBaseUrl();
  if (!baseUrl) {
    return {
      ok: false,
      state: 'error',
      message: 'Newsletter service is unavailable right now.'
    };
  }

  const endpointPath = lifecycleType === 'confirm'
    ? '/api/nuvio/newsletter/confirm'
    : '/api/nuvio/newsletter/unsubscribe';

  const endpoint = getLifecycleEndpoint(baseUrl, endpointPath, normalizedToken);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    });

    const { body, text } = await parseBackendResponse(response);
    const message = getResponseMessage(body, text);

    if (!response.ok || body?.ok === false) {
      return {
        ok: false,
        state: getSafeLifecycleErrorState(message),
        message: message || 'Unable to complete your request right now.'
      };
    }

    if (lifecycleType === 'unsubscribe' && body?.alreadyUnsubscribed === true) {
      return {
        ok: true,
        state: 'already_unsubscribed',
        message: mapLifecycleSuccessMessage(lifecycleType, body)
      };
    }

    return {
      ok: true,
      state: lifecycleType === 'confirm' ? 'confirmed' : 'unsubscribed',
      message: mapLifecycleSuccessMessage(lifecycleType, body)
    };
  } catch (error) {
    console.error(`${NEWSLETTER_LOG_PREFIX} lifecycle request failed`, {
      type: lifecycleType,
      status: 0,
      message: error?.message
    });

    return {
      ok: false,
      state: 'error',
      message: 'Unable to complete your request right now.'
    };
  }
}
