function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asBool(value) {
  return value === true;
}

function asObject(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }

  return {};
}

function asStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => asString(entry))
    .filter(Boolean);
}

function normalizeEmailNotifications(value) {
  const notifications = asObject(value);

  return {
    enabled: asBool(notifications.enabled),
    to: asStringArray(notifications.to),
    cc: asStringArray(notifications.cc)
  };
}

export function normalizeWebsiteSettings(value = {}) {
  const settings = asObject(value);
  const featureFlags = asObject(settings.featureFlags);
  const contactForm = asObject(settings.contactForm);
  const contactFields = asObject(contactForm.fields);
  const whatsapp = asObject(settings.whatsapp);

  return {
    featureFlags: {
      contactForm: featureFlags.contactForm !== false,
      whatsapp: featureFlags.whatsapp !== false
    },
    contactForm: {
      enabled: asBool(contactForm.enabled),
      fields: {
        phone: asBool(contactFields.phone)
      },
      confirmationMessage: asString(contactForm.confirmationMessage),
      emailNotifications: normalizeEmailNotifications(contactForm.emailNotifications)
    },
    whatsapp: {
      enabled: asBool(whatsapp.enabled),
      phone: asString(whatsapp.phone),
      defaultMessage: asString(whatsapp.defaultMessage),
      showFloatingButton: asBool(whatsapp.showFloatingButton),
      emailNotifications: normalizeEmailNotifications(whatsapp.emailNotifications)
    }
  };
}
