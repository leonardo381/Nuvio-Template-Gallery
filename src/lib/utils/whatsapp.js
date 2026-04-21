export function sanitizeWhatsAppPhone(phone) {
  if (phone === null || phone === undefined) {
    return '';
  }

  let digitsOnly = String(phone).trim().replace(/\D/g, '');

  if (digitsOnly.startsWith('00')) {
    digitsOnly = digitsOnly.slice(2);
  }

  return digitsOnly;
}

export function resolveWhatsAppMessage(localMessage, globalMessage) {
  const local = typeof localMessage === 'string' ? localMessage.trim() : '';
  if (local) {
    return local;
  }

  const global = typeof globalMessage === 'string' ? globalMessage.trim() : '';
  return global;
}

export function buildWhatsAppLink(phone, message = '') {
  const sanitizedPhone = sanitizeWhatsAppPhone(phone);

  if (!sanitizedPhone) {
    return '';
  }

  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedMessage) {
    return `https://wa.me/${sanitizedPhone}`;
  }

  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(trimmedMessage)}`;
}
