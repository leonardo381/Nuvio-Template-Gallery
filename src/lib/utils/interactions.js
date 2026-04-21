export async function registerWhatsAppInteraction(payload) {
  try {
    const response = await fetch('/api/interactions/whatsapp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) {
      return { ok: false };
    }

    return await response.json();
  } catch {
    return { ok: false };
  }
}
