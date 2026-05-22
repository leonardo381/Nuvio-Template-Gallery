import { browser } from '$app/environment';
import { trackNuvioConversionEvent } from '$lib/analytics/events';
import { getReportsAnalyticsSettings } from '$lib/utils/website-settings';

const DEFAULT_SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 90];

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

function normalizeThresholds(thresholds) {
  const source = Array.isArray(thresholds) ? thresholds : DEFAULT_SCROLL_DEPTH_THRESHOLDS;
  const unique = new Set();

  for (const threshold of source) {
    const numeric = typeof threshold === 'number' ? threshold : Number(threshold);
    if (!Number.isFinite(numeric)) {
      continue;
    }

    const rounded = Math.round(numeric);
    if (rounded < 1 || rounded > 100) {
      continue;
    }

    unique.add(rounded);
  }

  return Array.from(unique).sort((a, b) => a - b);
}

function resolveScrollDepth() {
  const docEl = document.documentElement;
  const body = document.body;

  if (!docEl || !body) {
    return 0;
  }

  const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop || 0;
  const scrollHeight = Math.max(docEl.scrollHeight || 0, body.scrollHeight || 0);
  const viewportHeight = window.innerHeight || docEl.clientHeight || 0;
  const scrollableHeight = scrollHeight - viewportHeight;

  if (scrollableHeight <= 0) {
    return 0;
  }

  const depth = Math.round((scrollTop / scrollableHeight) * 100);
  if (!Number.isFinite(depth)) {
    return 0;
  }

  if (depth < 0) {
    return 0;
  }

  if (depth > 100) {
    return 100;
  }

  return depth;
}

function isScrollDepthTrackingEnabled({ websiteSettings = {}, cmsPreview = false } = {}) {
  if (!browser || cmsPreview === true) {
    return false;
  }

  const analytics = getReportsAnalyticsSettings(websiteSettings);
  return (
    analytics.provider === 'umami' &&
    analytics.enabled === true &&
    analytics.scriptEnabled === true &&
    analytics.events?.scrollDepth === true
  );
}

function resolveTrackingOptions(baseOptions = {}) {
  const contextResolver = typeof baseOptions.getContext === 'function'
    ? baseOptions.getContext
    : null;
  const context = contextResolver ? (contextResolver() ?? {}) : {};

  return {
    ...baseOptions,
    ...context,
    websiteSettings: context.websiteSettings ?? baseOptions.websiteSettings,
    cmsPreview: context.cmsPreview ?? baseOptions.cmsPreview
  };
}

function resolveEventContext(trackingOptions = {}) {
  return {
    pageSlug: asString(trackingOptions.pageSlug),
    pageType: asString(trackingOptions.pageType),
    websiteSlug: asString(trackingOptions.websiteSlug),
    language: normalizeLanguage(trackingOptions.language)
  };
}

export function initScrollDepthTracking(options = {}) {
  if (!browser || typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const thresholds = normalizeThresholds(options.thresholds);
  if (!thresholds.length) {
    return () => {};
  }

  let rafId = 0;
  const firedThresholds = new Set();

  const evaluateDepth = () => {
    rafId = 0;

    try {
      const trackingOptions = resolveTrackingOptions(options);
      if (!isScrollDepthTrackingEnabled(trackingOptions)) {
        return;
      }

      const depth = resolveScrollDepth();
      if (depth <= 0) {
        return;
      }

      const eventContext = resolveEventContext(trackingOptions);

      for (const threshold of thresholds) {
        if (depth < threshold || firedThresholds.has(threshold)) {
          continue;
        }

        firedThresholds.add(threshold);
        trackNuvioConversionEvent(
          'scroll_depth_reached',
          {
            depth: threshold,
            ...eventContext
          },
          trackingOptions
        );
      }
    } catch (_) {
      // no-op: never block scroll behavior
    }
  };

  const scheduleDepthCheck = () => {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(evaluateDepth);
  };

  const onScroll = () => {
    scheduleDepthCheck();
  };

  const onResize = () => {
    scheduleDepthCheck();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  scheduleDepthCheck();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}
