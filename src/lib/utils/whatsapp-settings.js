import {
  sanitizeWhatsAppPhone,
  resolveWhatsAppMessage,
  buildWhatsAppLink
} from '$lib/utils/whatsapp';

function isTrue(value) {
  return value === true;
}

export function getWhatsAppSettings(websiteSettings = {}) {
  return websiteSettings.whatsapp ?? {};
}

export function isWhatsAppFeatureEnabled(websiteSettings = {}) {
  const featureFlagEnabled = websiteSettings.featureFlags?.whatsapp;
  return isTrue(getWhatsAppSettings(websiteSettings).enabled) && featureFlagEnabled !== false;
}

export function isWhatsAppButtonVisible(websiteSettings = {}) {
  return isTrue(getWhatsAppSettings(websiteSettings).showFloatingButton);
}

export function getResolvedWhatsAppPhone(localData = {}, websiteSettings = {}) {
  const globalPhone = getWhatsAppSettings(websiteSettings).phone ?? '';
  return sanitizeWhatsAppPhone(localData.whatsappPhone ?? localData.phone ?? globalPhone);
}

export function getResolvedWhatsAppMessage(localData = {}, websiteSettings = {}) {
  const localMessage = localData.whatsappMessage ?? localData.message ?? '';
  const globalMessage = getWhatsAppSettings(websiteSettings).defaultMessage ?? '';
  return resolveWhatsAppMessage(localMessage, globalMessage);
}

export function getResolvedWhatsAppLink(localData = {}, websiteSettings = {}) {
  return buildWhatsAppLink(
    getResolvedWhatsAppPhone(localData, websiteSettings),
    getResolvedWhatsAppMessage(localData, websiteSettings)
  );
}

export function shouldShowWhatsAppButton(localData = {}, websiteSettings = {}) {
  return (
    isWhatsAppFeatureEnabled(websiteSettings) &&
    isWhatsAppButtonVisible(websiteSettings) &&
    !!getResolvedWhatsAppLink(localData, websiteSettings)
  );
}
