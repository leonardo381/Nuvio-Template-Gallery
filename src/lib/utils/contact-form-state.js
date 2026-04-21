const DEFAULT_CONFIRMATION_MESSAGE = 'Your message has been sent successfully.';

function isTrue(value) {
  return value === true;
}

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function getContactFormSettings(websiteSettings = {}) {
  return websiteSettings.contactForm ?? {};
}

export function isContactFormFeatureEnabled(websiteSettings = {}) {
  const featureFlagEnabled = websiteSettings.featureFlags?.contactForm;
  return isTrue(getContactFormSettings(websiteSettings).enabled) && featureFlagEnabled !== false;
}

export function shouldRenderContactPhoneField(websiteSettings = {}) {
  return isTrue(getContactFormSettings(websiteSettings).fields?.phone);
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
