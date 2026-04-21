import { createContactRecord } from '$lib/server/contacts';

const DEFAULT_CONFIRMATION_MESSAGE = 'Your message has been sent successfully.';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isTrue(value) {
  return value === true;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getContactFormSettings(websiteSettings = {}) {
  return websiteSettings.contactForm ?? {};
}

function getFeatureFlags(websiteSettings = {}) {
  return websiteSettings.featureFlags ?? {};
}

function getConfirmationMessage(websiteSettings = {}) {
  const configuredMessage = asString(getContactFormSettings(websiteSettings).confirmationMessage);
  return configuredMessage || DEFAULT_CONFIRMATION_MESSAGE;
}

function normalizeContactValues(formData) {
  return {
    name: asString(formData.get('name')),
    email: asString(formData.get('email')),
    phone: asString(formData.get('phone')),
    message: asString(formData.get('message'))
  };
}

function validateContactValues(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required.';
  }

  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Email is invalid.';
  }

  if (!values.message) {
    errors.message = 'Message is required.';
  }

  return errors;
}

export function isContactFormEnabled(websiteSettings = {}) {
  return (
    getFeatureFlags(websiteSettings).contactForm !== false &&
    isTrue(getContactFormSettings(websiteSettings).enabled)
  );
}

export function shouldRenderContactPhoneField(websiteSettings = {}) {
  return isTrue(getContactFormSettings(websiteSettings).fields?.phone);
}

export async function handleContactFormSubmission({ website, formData }) {
  const websiteSettings = website?.settings ?? {};

  if (!isContactFormEnabled(websiteSettings)) {
    return {
      status: 403,
      body: {
        contactForm: {
          ok: false,
          error: 'Contact form is currently unavailable.',
          values: {}
        }
      }
    };
  }

  const values = normalizeContactValues(formData);
  const errors = validateContactValues(values);

  if (Object.keys(errors).length > 0) {
    return {
      status: 400,
      body: {
        contactForm: {
          ok: false,
          errors,
          values
        }
      }
    };
  }

  const result = await createContactRecord({
    website: asString(website?.id),
    name: values.name,
    email: values.email,
    phone: shouldRenderContactPhoneField(websiteSettings) ? values.phone : '',
    message: values.message
  });

  if (!result.ok) {
    return {
      status: 500,
      body: {
        contactForm: {
          ok: false,
          error: 'Unable to send your message right now. Please try again.',
          values
        }
      }
    };
  }

  return {
    status: 200,
    body: {
      contactForm: {
        ok: true,
        message: getConfirmationMessage(websiteSettings)
      }
    }
  };
}
