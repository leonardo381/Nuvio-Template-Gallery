import PocketBase from 'pocketbase';

function normalizeOrigin(value) {
  const raw = `${value ?? ''}`.trim();
  if (!raw) {
    return '';
  }

  try {
    const parsed = new URL(raw);
    if (!/^https?:$/i.test(parsed.protocol)) {
      return '';
    }
    return parsed.origin;
  } catch (_) {
    return '';
  }
}

function parsePreviewParentOrigins(value) {
  const uniqueOrigins = new Set();
  const raw = `${value ?? ''}`;
  if (!raw.trim()) {
    return [];
  }

  for (const candidate of raw.split(/[\s,]+/g)) {
    const origin = normalizeOrigin(candidate);
    if (origin) {
      uniqueOrigins.add(origin);
    }
  }

  return Array.from(uniqueOrigins);
}

function normalizeCsp(csp) {
  return `${csp ?? ''}`
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .join('; ');
}

function removeCspDirective(csp, directive) {
  const normalizedDirective = `${directive ?? ''}`.trim();
  if (!normalizedDirective) {
    return normalizeCsp(csp);
  }

  const pattern = new RegExp(`(?:^|;)\\s*${normalizedDirective}[^;]*`, 'gi');
  return normalizeCsp(`${csp ?? ''}`.replace(pattern, ''));
}

function setCspDirective(csp, directive, value) {
  const normalizedDirective = `${directive ?? ''}`.trim();
  const normalizedValue = `${value ?? ''}`.trim();
  if (!normalizedDirective || !normalizedValue) {
    return normalizeCsp(csp);
  }

  const nextDirective = `${normalizedDirective} ${normalizedValue}`.trim();
  const existing = normalizeCsp(csp);
  if (!existing) {
    return nextDirective;
  }

  const pattern = new RegExp(`(?:^|;)\\s*${normalizedDirective}[^;]*`, 'i');
  if (pattern.test(existing)) {
    return normalizeCsp(existing.replace(pattern, (match) => {
      const prefix = match.startsWith(';') ? '; ' : '';
      return `${prefix}${nextDirective}`;
    }));
  }

  return normalizeCsp(`${existing}; ${nextDirective}`);
}

function isHtmlResponse(response) {
  const contentType = `${response?.headers?.get('content-type') ?? ''}`.toLowerCase();
  return contentType.includes('text/html');
}

const configuredPreviewParentOrigins = parsePreviewParentOrigins(import.meta.env.VITE_CMS_PREVIEW_PARENT_ORIGIN);

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(import.meta.env.VITE_PB_URL);

  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection('users').authRefresh();
    }
  } catch {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  if (isHtmlResponse(response)) {
    // Local CMS preview: in dev, allow embedding from non-standard parent origins
    // (eg. chrome-extension://...) by removing frame-ancestors restrictions.
    if (import.meta.env.DEV) {
      // Remove frame denial header if any upstream/tool sets it.
      response.headers.delete('x-frame-options');

      const existingCsp = response.headers.get('content-security-policy');
      if (existingCsp) {
        const withoutFrameAncestors = removeCspDirective(existingCsp, 'frame-ancestors');
        if (withoutFrameAncestors) {
          response.headers.set('content-security-policy', withoutFrameAncestors);
        } else {
          response.headers.delete('content-security-policy');
        }
      }
    } else {
      const allowedAncestors = configuredPreviewParentOrigins.length
        ? `'self' ${configuredPreviewParentOrigins.join(' ')}`
        : `'self'`;
      const existingCsp = response.headers.get('content-security-policy');
      const hardenedCsp = setCspDirective(existingCsp, 'frame-ancestors', allowedAncestors);
      if (hardenedCsp) {
        response.headers.set('content-security-policy', hardenedCsp);
      }

      if (configuredPreviewParentOrigins.length) {
        // Allow configured cross-origin backoffice parents via CSP frame-ancestors.
        response.headers.delete('x-frame-options');
      } else {
        // No cross-origin preview parent configured; keep same-origin framing only.
        response.headers.set('x-frame-options', 'SAMEORIGIN');
      }
    }
  }

  response.headers.append(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ httpOnly: true, sameSite: 'Strict' })
  );

  return response;
}
