import { browser } from '$app/environment';
import { getReportsAnalyticsSettings } from '$lib/utils/website-settings';

const ALLOWED_EVENT_PROPERTY_KEYS = new Set([
  'depth',
  'pageSlug',
  'pageType',
  'sourceBlock',
  'ctaType',
  'formType',
  'serviceType',
  'websiteSlug',
  'language'
]);

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeLanguage(value) {
  const normalized = asString(value).toLowerCase();
  if (!normalized) {
    return '';
  }

  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})?$/i.test(normalized)) {
    return '';
  }

  return normalized;
}

function normalizeDepth(value) {
  let numeric = null;

  if (typeof value === 'number') {
    numeric = value;
  } else if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) {
      return null;
    }
    numeric = Number(raw);
  }

  if (!Number.isFinite(numeric)) {
    return null;
  }

  const rounded = Math.round(numeric);
  if (rounded < 0 || rounded > 100) {
    return null;
  }

  return rounded;
}

function parseSitePath(pathname) {
  const segments = asString(pathname)
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments[0] === 'site') {
    return {
      pageType: 'site_page',
      websiteSlug: asString(segments[1]),
      pageSlug: asString(segments[2])
    };
  }

  return {
    pageType: 'public_page',
    websiteSlug: '',
    pageSlug: asString(segments[segments.length - 1])
  };
}

function resolveBaseContext(explicitContext = {}) {
  const pathContext = browser
    ? parseSitePath(window.location.pathname)
    : { pageType: '', websiteSlug: '', pageSlug: '' };

  const languageFromQuery = browser
    ? normalizeLanguage(window.location.search ? new URLSearchParams(window.location.search).get('lang') : '')
    : '';

  return {
    pageType: asString(explicitContext.pageType) || pathContext.pageType,
    websiteSlug: asString(explicitContext.websiteSlug) || pathContext.websiteSlug,
    pageSlug: asString(explicitContext.pageSlug) || pathContext.pageSlug,
    language: normalizeLanguage(explicitContext.language) || languageFromQuery
  };
}

function sanitizeEventProperties(inputProperties = {}, explicitContext = {}) {
  const baseContext = resolveBaseContext(explicitContext);
  const merged = {
    ...baseContext,
    ...inputProperties
  };

  const sanitized = {};

  for (const key of ALLOWED_EVENT_PROPERTY_KEYS) {
    const value = merged[key];
    if (key === 'depth') {
      const normalizedDepth = normalizeDepth(value);
      if (normalizedDepth !== null) {
        sanitized[key] = normalizedDepth;
      }
      continue;
    }

    if (key === 'language') {
      const normalizedLanguage = normalizeLanguage(value);
      if (normalizedLanguage) {
        sanitized[key] = normalizedLanguage;
      }
      continue;
    }

    const normalized = asString(value);
    if (!normalized) {
      continue;
    }

    sanitized[key] = normalized.slice(0, 200);
  }

  return sanitized;
}

function isAnalyticsRuntimeEnabled({ websiteSettings = {}, cmsPreview = false } = {}) {
  if (!browser || cmsPreview === true) {
    return false;
  }

  const analytics = getReportsAnalyticsSettings(websiteSettings);

  return (
    analytics.provider === 'umami' &&
    analytics.enabled === true &&
    analytics.scriptEnabled === true
  );
}

function resolveUmamiTrackFunction() {
  if (!browser || typeof window === 'undefined' || !window.umami) {
    return null;
  }

  if (typeof window.umami.track === 'function') {
    return window.umami.track.bind(window.umami);
  }

  if (typeof window.umami === 'function') {
    return window.umami;
  }

  return null;
}

function resolveConversionClickEvent(href) {
  const normalized = asString(href).toLowerCase();
  if (!normalized || normalized === '#') {
    return null;
  }

  if (normalized.startsWith('tel:')) {
    return { name: 'phone_click', ctaType: 'phone' };
  }

  if (normalized.startsWith('mailto:')) {
    return { name: 'email_click', ctaType: 'email' };
  }

  let parsed;
  try {
    parsed = new URL(href, window.location.origin);
  } catch (_) {
    return null;
  }

  const urlValue = parsed.href.toLowerCase();
  const hostValue = parsed.hostname.toLowerCase();

  const isDirectionsUrl =
    hostValue.includes('google.com') && urlValue.includes('/maps') ||
    hostValue === 'maps.app.goo.gl' ||
    hostValue.includes('maps.apple.com') ||
    hostValue.includes('waze.com') ||
    parsed.searchParams.has('destination') ||
    parsed.searchParams.has('daddr') ||
    parsed.searchParams.has('dir_action');

  if (isDirectionsUrl) {
    return { name: 'directions_click', ctaType: 'directions' };
  }

  return null;
}

export function trackNuvioConversionEvent(eventName, eventProperties = {}, options = {}) {
  try {
    const normalizedName = asString(eventName);
    if (!normalizedName) {
      return false;
    }

    if (!isAnalyticsRuntimeEnabled(options)) {
      return false;
    }

    const track = resolveUmamiTrackFunction();
    if (!track) {
      return false;
    }

    const payload = sanitizeEventProperties(eventProperties, options);
    track(normalizedName, payload);
    return true;
  } catch (_) {
    return false;
  }
}

export function initConversionClickTracking(options = {}) {
  if (!browser || typeof document === 'undefined') {
    return () => {};
  }

  const onDocumentClick = (event) => {
    try {
      const target = event?.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href]');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');
      const conversion = resolveConversionClickEvent(href);
      if (!conversion) {
        return;
      }

      const contextResolver = typeof options.getContext === 'function'
        ? options.getContext
        : null;
      const context = contextResolver ? (contextResolver() ?? {}) : {};

      const sourceBlock =
        asString(anchor.closest('[data-nuvio-block-id]')?.getAttribute('data-nuvio-block-id')) ||
        asString(anchor.getAttribute('data-nuvio-source-block'));

      trackNuvioConversionEvent(
        conversion.name,
        {
          ctaType: conversion.ctaType,
          sourceBlock
        },
        {
          ...options,
          ...context,
          websiteSettings: context.websiteSettings ?? options.websiteSettings,
          cmsPreview: context.cmsPreview ?? options.cmsPreview
        }
      );
    } catch (_) {
      // no-op: never block default click behavior
    }
  };

  document.addEventListener('click', onDocumentClick, true);

  return () => {
    document.removeEventListener('click', onDocumentClick, true);
  };
}
