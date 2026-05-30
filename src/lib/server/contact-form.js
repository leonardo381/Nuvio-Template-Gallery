import { submitContactLead } from '$lib/server/nuvio-notifications';
import { normalizeWebsiteSettings } from '$lib/utils/website-settings';

const DEFAULT_CONFIRMATION_MESSAGE = 'Your message has been sent successfully.';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getConfirmationMessage(websiteSettings = {}, backendResponse = null) {
  const backendMessage = asString(
    backendResponse?.confirmationMessage ?? backendResponse?.message
  );
  if (backendMessage) {
    return backendMessage;
  }

  const settingsMessage = asString(websiteSettings.contactForm?.confirmationMessage);
  return settingsMessage || DEFAULT_CONFIRMATION_MESSAGE;
}

function normalizeContactValues(formData) {
  return {
    name: asString(formData.get('name')),
    email: asString(formData.get('email')),
    phone: asString(formData.get('phone')),
    subject: asString(formData.get('subject')),
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
  const normalized = normalizeWebsiteSettings(websiteSettings);
  return normalized.featureFlags.contactForm && normalized.contactForm.enabled;
}

export function shouldRenderContactPhoneField(websiteSettings = {}) {
  const normalized = normalizeWebsiteSettings(websiteSettings);
  return normalized.contactForm.fields.phone;
}

export async function handleContactFormSubmission({
  website,
  formData,
  source = 'contact_form',
  page = ''
}) {
  const websiteSettings = normalizeWebsiteSettings(website?.settings ?? {});
  const showPhoneField = websiteSettings.contactForm.fields.phone;
  const websiteId = asString(website?.id);
  const websiteSlug = asString(website?.slug);

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

  const result = await submitContactLead({
    websiteId,
    websiteSlug,
    name: values.name,
    email: values.email,
    phone: showPhoneField ? values.phone : '',
    subject: values.subject,
    message: values.message,
    source: asString(source),
    page: asString(page)
  });

  if (!result.ok) {
    console.error('[contact-form] Backend contact submit failed', {
      websiteId,
      websiteSlug,
      status: result.status,
      reason: result.reason
    });

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
        message: getConfirmationMessage(websiteSettings, result.body)
      }
    }
  };
}
