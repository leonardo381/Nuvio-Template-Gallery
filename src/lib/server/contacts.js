import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function getServicePocketBase() {
  const baseUrl = asString(env.PB_URL || env.VITE_PB_URL);
  const serviceEmail = asString(env.PB_SERVICE_EMAIL);
  const servicePassword = asString(env.PB_SERVICE_PASSWORD);

  if (!baseUrl || !serviceEmail || !servicePassword) {
    return null;
  }

  const pb = new PocketBase(baseUrl);

  try {
    await pb.collection('users').authWithPassword(serviceEmail, servicePassword);
    return pb;
  } catch (error) {
    console.error('[contact-form] Service authentication failed', {
      message: error?.message
    });
    return null;
  }
}

export async function createContactRecord({
  website = '',
  name = '',
  email = '',
  phone = '',
  message = ''
}) {
  const servicePb = await getServicePocketBase();

  if (!servicePb) {
    return {
      ok: false,
      reason: 'service_auth_unavailable'
    };
  }

  try {
    await servicePb.collection('contacts').create({
      website: asString(website),
      channel: 'form',
      name: asString(name),
      email: asString(email),
      phone: asString(phone),
      message: asString(message),
      status: 'new'
    });

    return { ok: true };
  } catch (error) {
    console.error('[contact-form] Record create failed', {
      message: error?.message,
      status: error?.status,
      response: error?.response?.message
    });

    return {
      ok: false,
      reason: 'create_failed'
    };
  }
}

