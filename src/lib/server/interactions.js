import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asBool(value) {
  return asString(value).toLowerCase() === 'true';
}

function getWhatsAppInteractionsCollection() {
  return asString(env.PB_WHATSAPP_INTERACTIONS_COLLECTION);
}

function allowSuperuserFallback() {
  return asBool(env.PB_WHATSAPP_ALLOW_SUPERUSER_FALLBACK);
}

let hasLoggedWhatsAppConfig = false;

function logWhatsAppConfigOnce() {
  if (hasLoggedWhatsAppConfig) {
    return;
  }

  hasLoggedWhatsAppConfig = true;

  const interactionsCollection = getWhatsAppInteractionsCollection();
  const baseUrl = asString(env.PB_URL || env.VITE_PB_URL);
  const serviceEmail = asString(env.PB_SERVICE_EMAIL);
  const servicePassword = asString(env.PB_SERVICE_PASSWORD);
  const superuserEmail = asString(env.PB_SUPERUSER_EMAIL);
  const superuserPassword = asString(env.PB_SUPERUSER_PASSWORD);

  const missing = [];
  if (!interactionsCollection) {
    missing.push('PB_WHATSAPP_INTERACTIONS_COLLECTION');
  }
  if (!baseUrl) {
    missing.push('PB_URL/VITE_PB_URL');
  }
  if (!serviceEmail || !servicePassword) {
    missing.push('PB_SERVICE_EMAIL/PB_SERVICE_PASSWORD');
  }

  console.info('[whatsapp-interaction] Config check', {
    collectionConfigured: !!interactionsCollection,
    hasBaseUrl: !!baseUrl,
    hasServiceCredentials: !!serviceEmail && !!servicePassword,
    superuserFallbackEnabled: allowSuperuserFallback(),
    hasSuperuserCredentials: !!superuserEmail && !!superuserPassword
  });

  if (missing.length) {
    console.warn('[whatsapp-interaction] Missing required config', {
      missing
    });
  }
}

function buildInteractionPayload({ website, source, page }) {
  return {
    website: asString(website),
    source: asString(source),
    page: asString(page)
  };
}

async function getServicePocketBase() {
  const baseUrl = asString(env.PB_URL || env.VITE_PB_URL);
  const serviceEmail = asString(env.PB_SERVICE_EMAIL);
  const servicePassword = asString(env.PB_SERVICE_PASSWORD);
  const superuserEmail = asString(env.PB_SUPERUSER_EMAIL);
  const superuserPassword = asString(env.PB_SUPERUSER_PASSWORD);

  if (!baseUrl) {
    return { pb: null, authContext: '', reason: 'base_url_not_configured' };
  }

  const pb = new PocketBase(baseUrl);

  try {
    if (serviceEmail && servicePassword) {
      await pb.collection('users').authWithPassword(serviceEmail, servicePassword);
      return { pb, authContext: 'service_user', reason: '' };
    }
  } catch (error) {
    console.error('[whatsapp-interaction] Service user authentication failed', {
      message: error?.message
    });
  }

  if (
    allowSuperuserFallback() &&
    superuserEmail &&
    superuserPassword
  ) {
    try {
      await pb.collection('_superusers').authWithPassword(superuserEmail, superuserPassword);
      return { pb, authContext: 'superuser', reason: '' };
    } catch (error) {
      console.error('[whatsapp-interaction] Superuser authentication failed', {
        message: error?.message
      });
    }
  }

  return {
    pb: null,
    authContext: '',
    reason: 'service_auth_unavailable'
  };
}

export async function registerWhatsAppInteraction({
  website = '',
  source = '',
  page = ''
}) {
  logWhatsAppConfigOnce();

  const interactionsCollection = getWhatsAppInteractionsCollection();

  if (!interactionsCollection) {
    return {
      ok: false,
      reason: 'collection_not_configured'
    };
  }

  const payload = buildInteractionPayload({ website, source, page });
  const clientState = await getServicePocketBase();
  const servicePb = clientState.pb;

  if (!servicePb) {
    return {
      ok: false,
      reason: clientState.reason || 'client_not_available'
    };
  }

  try {
    await servicePb.collection(interactionsCollection).create(payload);
    return {
      ok: true,
      collection: interactionsCollection,
      authContext: clientState.authContext
    };
  } catch (error) {
    const responseMessage = String(error?.response?.message ?? '');

    console.error('[whatsapp-interaction] Record create failed', {
      collection: interactionsCollection,
      authContext: clientState.authContext,
      message: error?.message,
      status: error?.status,
      response: responseMessage
    });

    if (error?.status === 403 && responseMessage.includes('Only superusers')) {
      return {
        ok: false,
        reason: 'superuser_required'
      };
    }

    return {
      ok: false,
      reason: 'create_failed'
    };
  }
}
