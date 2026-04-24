import { normalizeWebsiteSettings } from '$lib/utils/website-settings';
const DEFAULT_CONFIRMATION_MESSAGE = 'Your message has been sent successfully.';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function getContactFormSettings(websiteSettings = {}) {
  return normalizeWebsiteSettings(websiteSettings).contactForm;
}

export function isContactFormFeatureEnabled(websiteSettings = {}) {
  const normalized = normalizeWebsiteSettings(websiteSettings);
  return normalized.featureFlags.contactForm && normalized.contactForm.enabled;
}

export function shouldRenderContactPhoneField(websiteSettings = {}) {
  return getContactFormSettings(websiteSettings).fields.phone;
}

export function getContactFormState(pageForm = {}) {
  return pageForm.contactForm ?? {};
}

export function getContactFieldValue(contactFormState = {}, fieldName = '') {
  const value = contactFormState.values?.[fieldName];
  return typeof value === 'string' ? value : '';
}

export function getContactFieldError(contactFormState = {}, fieldName = '') {
  const error = contactFormState.errors?.[fieldName];
  return typeof error === 'string' ? error : '';
}

export function getContactGeneralError(contactFormState = {}) {
  const error = contactFormState.error;
  return typeof error === 'string' ? error : '';
}

export function isContactFormSuccess(contactFormState = {}) {
  return contactFormState.ok === true;
}

export function getContactConfirmationMessage(contactFormState = {}, websiteSettings = {}) {
  const stateMessage = asString(contactFormState.message);
  if (stateMessage) {
    return stateMessage;
  }

  const settingsMessage = asString(getContactFormSettings(websiteSettings).confirmationMessage);
  return settingsMessage || DEFAULT_CONFIRMATION_MESSAGE;
}
