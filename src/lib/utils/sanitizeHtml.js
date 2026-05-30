import sanitizeHtml from "sanitize-html";

const ALLOWED_RICH_TEXT_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "a",
  "h2",
  "h3",
  "h4"
];

const ALLOWED_RICH_TEXT_ATTRIBUTES = {
  a: ["href", "title", "target", "rel"]
};

const ALLOWED_RICH_TEXT_SCHEMES = ["http", "https", "mailto", "tel"];

const RICH_TEXT_SANITIZE_OPTIONS = {
  allowedTags: ALLOWED_RICH_TEXT_TAGS,
  allowedAttributes: ALLOWED_RICH_TEXT_ATTRIBUTES,
  allowedSchemes: ALLOWED_RICH_TEXT_SCHEMES,
  allowedSchemesByTag: {
    a: ALLOWED_RICH_TEXT_SCHEMES
  },
  allowedSchemesAppliedToAttributes: ["href"],
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  transformTags: {
    a: (_tagName, attribs) => {
      const nextAttribs = { ...attribs };
      if (nextAttribs.target === "_blank") {
        const relTokens = new Set(
          String(nextAttribs.rel || "")
            .split(/\s+/)
            .filter(Boolean)
        );
        relTokens.add("noopener");
        relTokens.add("noreferrer");
        nextAttribs.rel = Array.from(relTokens).join(" ");
      }
      return {
        tagName: "a",
        attribs: nextAttribs
      };
    }
  }
};

export function sanitizeRichTextHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const html = typeof value === "string" ? value : String(value);
  if (!html) {
    return "";
  }

  return sanitizeHtml(html, RICH_TEXT_SANITIZE_OPTIONS);
}

const BLOCKED_SCHEMES = new Set(["javascript", "data", "vbscript", "file", "blob"]);
const HREF_ALLOWED_SCHEMES = new Set(["http", "https", "mailto", "tel"]);
const RESOURCE_ALLOWED_SCHEMES = new Set(["http", "https"]);

function normalizeUrlCandidate(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const raw = typeof value === "string" ? value : String(value);
  if (!raw) {
    return "";
  }

  return raw.trim().replace(/[\u0000-\u001F\u007F]+/g, "");
}

function getScheme(value) {
  const match = value.match(/^([a-zA-Z][a-zA-Z\d+\-.]*):/);
  return match ? match[1].toLowerCase() : "";
}

function hasProtocolRelativePrefix(value) {
  return value.startsWith("//");
}

function escapeCssUrlValue(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r|\n|\f/g, "");
}

export function sanitizeSafeUrl(
  value,
  {
    allowedSchemes = RESOURCE_ALLOWED_SCHEMES,
    allowRelative = true,
    allowHash = true,
    allowQuery = true
  } = {}
) {
  const candidate = normalizeUrlCandidate(value);
  if (!candidate) {
    return "";
  }

  if (hasProtocolRelativePrefix(candidate)) {
    return "";
  }

  const scheme = getScheme(candidate);
  if (scheme) {
    if (BLOCKED_SCHEMES.has(scheme)) {
      return "";
    }
    return allowedSchemes.has(scheme) ? candidate : "";
  }

  if (!allowRelative) {
    return "";
  }

  if (candidate.startsWith("#")) {
    return allowHash ? candidate : "";
  }

  if (candidate.startsWith("?")) {
    return allowQuery ? candidate : "";
  }

  return candidate;
}

export function sanitizeHref(value) {
  return sanitizeSafeUrl(value, {
    allowedSchemes: HREF_ALLOWED_SCHEMES,
    allowRelative: true,
    allowHash: true,
    allowQuery: true
  });
}

export function sanitizeImageUrl(value) {
  return sanitizeSafeUrl(value, {
    allowedSchemes: RESOURCE_ALLOWED_SCHEMES,
    allowRelative: true,
    allowHash: false,
    allowQuery: true
  });
}

export function sanitizeEmbedUrl(value) {
  return sanitizeSafeUrl(value, {
    allowedSchemes: RESOURCE_ALLOWED_SCHEMES,
    allowRelative: false,
    allowHash: false,
    allowQuery: true
  });
}

export function sanitizeCssUrl(value) {
  const safe = sanitizeImageUrl(value);
  if (!safe) {
    return "";
  }

  return `url("${escapeCssUrlValue(safe)}")`;
}
