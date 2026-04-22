import { createContactRecord } from '$lib/server/contacts';
import { sendTransactionalEmail } from '$lib/server/email';

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

function getContactEmailDestination(websiteSettings = {}) {
  return asString(getContactFormSettings(websiteSettings).emailDestination);
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toHtmlWithLineBreaks(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

function buildContactNotificationEmail({ website, values, showPhoneField, destination }) {
  const websiteLabel = asString(website?.slug) || asString(website?.id) || 'unknown-website';
  const phoneValue = showPhoneField ? (asString(values.phone) || 'Not provided') : 'Not enabled';
  const escapedMessage = toHtmlWithLineBreaks(values.message);

  return {
    to: destination,
    subject: `New contact form submission (${websiteLabel})`,
    text: [
      `Website: ${websiteLabel}`,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${phoneValue}`,
      '',
      'Message:',
      values.message
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">',
      '<h2 style="margin:0 0 12px;">New contact form submission</h2>',
      `<p style="margin:0 0 8px;"><strong>Website:</strong> ${escapeHtml(websiteLabel)}</p>`,
      `<p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(values.name)}</p>`,
      `<p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(values.email)}</p>`,
      `<p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phoneValue)}</p>`,
      `<p style="margin:12px 0 4px;"><strong>Message:</strong></p>`,
      `<p style="margin:0;">${escapedMessage}</p>`,
      '</div>'
    ].join(''),
    replyTo: values.email
  };
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
  const showPhoneField = shouldRenderContactPhoneField(websiteSettings);

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
    phone: showPhoneField ? values.phone : '',
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

  const emailDestination = getContactEmailDestination(websiteSettings);

  if (emailDestination) {
    const notification = buildContactNotificationEmail({
      website,
      values,
      showPhoneField,
      destination: emailDestination
    });
    const emailResult = await sendTransactionalEmail(notification);

    if (!emailResult.ok) {
      console.error('[contact-form] Notification email failed', {
        website: asString(website?.id),
        destination: emailDestination,
        reason: emailResult.reason
      });
    }
  } else {
    console.warn('[contact-form] Notification email skipped: destination not configured', {
      website: asString(website?.id)
    });
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
