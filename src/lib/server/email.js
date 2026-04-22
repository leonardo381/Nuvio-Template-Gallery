import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

let resendClient = null;
let cachedApiKey = '';

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeRecipients(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => asString(entry)).filter(Boolean);
  }

  const recipient = asString(value);
  return recipient ? [recipient] : [];
}

function getResendClient() {
  const apiKey = asString(env.RESEND_API_KEY);

  if (!apiKey) {
    return { client: null, reason: 'api_key_not_configured' };
  }

  if (!resendClient || cachedApiKey !== apiKey) {
    resendClient = new Resend(apiKey);
    cachedApiKey = apiKey;
  }

  return { client: resendClient, reason: '' };
}

export async function sendTransactionalEmail({
  to,
  subject = '',
  text = '',
  html = '',
  replyTo = ''
}) {
  const recipients = normalizeRecipients(to);
  const normalizedSubject = asString(subject);
  const normalizedText = asString(text);
  const normalizedHtml = asString(html);
  const normalizedReplyTo = asString(replyTo);
  const fromEmail = asString(env.RESEND_FROM_EMAIL);

  if (!fromEmail) {
    return { ok: false, reason: 'from_email_not_configured' };
  }

  if (!recipients.length) {
    return { ok: false, reason: 'recipient_not_configured' };
  }

  if (!normalizedSubject) {
    return { ok: false, reason: 'subject_not_configured' };
  }

  if (!normalizedText && !normalizedHtml) {
    return { ok: false, reason: 'body_not_configured' };
  }

  const { client, reason } = getResendClient();

  if (!client) {
    return { ok: false, reason };
  }

  const payload = {
    from: fromEmail,
    to: recipients,
    subject: normalizedSubject
  };

  if (normalizedText) {
    payload.text = normalizedText;
  }

  if (normalizedHtml) {
    payload.html = normalizedHtml;
  }

  if (normalizedReplyTo) {
    payload.replyTo = normalizedReplyTo;
  }

  try {
    const response = await client.emails.send(payload);

    if (response?.error) {
      console.error('[email] Transactional send failed', {
        message: response.error.message,
        name: response.error.name
      });
      return { ok: false, reason: 'send_failed' };
    }

    return {
      ok: true,
      id: asString(response?.data?.id)
    };
  } catch (error) {
    console.error('[email] Transactional send failed', {
      message: error?.message,
      status: error?.statusCode ?? error?.status,
      response: error?.response?.message
    });

    return { ok: false, reason: 'send_failed' };
  }
}
