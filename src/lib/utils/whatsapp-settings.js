import {
  sanitizeWhatsAppPhone,
  resolveWhatsAppMessage,
  buildWhatsAppLink
} from '$lib/utils/whatsapp';
import { normalizeWebsiteSettings } from '$lib/utils/website-settings';

export function getWhatsAppSettings(websiteSettings = {}) {
  return normalizeWebsiteSettings(websiteSettings).whatsapp;
}

export function isWhatsAppFeatureEnabled(websiteSettings = {}) {
  const normalized = normalizeWebsiteSettings(websiteSettings);
  return normalized.featureFlags.whatsapp && normalized.whatsapp.enabled;
}

export function isWhatsAppButtonVisible(websiteSettings = {}) {
  return getWhatsAppSettings(websiteSettings).showFloatingButton;
}

export function getResolvedWhatsAppPhone(localData = {}, websiteSettings = {}) {
  const globalPhone = getWhatsAppSettings(websiteSettings).phone;
  return sanitizeWhatsAppPhone(globalPhone);
}

export function getResolvedWhatsAppMessage(localData = {}, websiteSettings = {}) {
  const localMessage = localData.whatsappMessage ?? localData.message ?? '';
  const globalMessage = getWhatsAppSettings(websiteSettings).defaultMessage;
  return resolveWhatsAppMessage(localMessage, globalMessage);
}

export function getResolvedWhatsAppLink(localData = {}, websiteSettings = {}) {
  return buildWhatsAppLink(
    getResolvedWhatsAppPhone(localData, websiteSettings),
    getResolvedWhatsAppMessage(localData, websiteSettings)
  );
}

export function shouldShowWhatsAppButton(localData = {}, websiteSettings = {}) {
  const hasConfiguredPhone = !!sanitizeWhatsAppPhone(getWhatsAppSettings(websiteSettings).phone);

  return (
    isWhatsAppFeatureEnabled(websiteSettings) &&
    isWhatsAppButtonVisible(websiteSettings) &&
    hasConfiguredPhone &&
    !!getResolvedWhatsAppLink(localData, websiteSettings)
  );
}
