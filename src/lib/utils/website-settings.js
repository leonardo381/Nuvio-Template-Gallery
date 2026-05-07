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

  if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (_) {
      return {};
    }
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

function isSafePlausibleSiteId(value) {
  const siteId = asString(value);
  if (!siteId) {
    return false;
  }

  if (siteId.length > 255) {
    return false;
  }

  if (/[<>"'`\s]/.test(siteId)) {
    return false;
  }

  return /^(localhost|[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*)(?::\d{1,5})?$/i.test(siteId);
}

export function normalizeReportsAnalyticsSettings(value = {}) {
  const analytics = asObject(value);
  const providerRaw = asString(analytics.provider).toLowerCase();
  const provider = !providerRaw ? 'plausible' : (providerRaw === 'plausible' ? 'plausible' : '');
  const enabled = asBool(analytics.enabled);
  const scriptEnabled = asBool(analytics.scriptEnabled);
  const siteId = asString(analytics.siteId);

  return {
    provider,
    enabled,
    siteId: isSafePlausibleSiteId(siteId) ? siteId : '',
    scriptEnabled
  };
}

export function getReportsAnalyticsSettings(websiteSettings = {}) {
  const settings = asObject(websiteSettings);
  const reports = asObject(settings.reports);
  return normalizeReportsAnalyticsSettings(reports.analytics);
}

export function normalizeWebsiteSettings(value = {}) {
  const settings = asObject(value);
  const featureFlags = asObject(settings.featureFlags);
  const contactForm = asObject(settings.contactForm);
  const contactFields = asObject(contactForm.fields);
  const whatsapp = asObject(settings.whatsapp);
  const reports = asObject(settings.reports);

  return {
    featureFlags: {
      contactForm: featureFlags.contactForm !== false,
      whatsapp: featureFlags.whatsapp !== false,
      reports: featureFlags.reports !== false
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
    },
    reports: {
      analytics: normalizeReportsAnalyticsSettings(reports.analytics)
    }
  };
}
