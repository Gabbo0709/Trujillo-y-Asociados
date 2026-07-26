import type { ContactFormData, WhatsAppPayloadOptions } from '@contact/types/contact';

const EMOJI = {
  PIN: '\u{1F4CD}',       // 📌
  USER: '\u{1F464}',      // 👤
  EMAIL: '\u{1F4E7}',     // 📧
  PHONE: '\u{1F4DE}',     // 📞
  CLIPBOARD: '\u{1F4CB}', // 📋
  SPEECH: '\u{1F4AC}',    // 💬
} as const;

export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function formatWhatsAppMessage(
  data: ContactFormData,
  companyName = 'TRUJILLO & ASOCIADOS'
): string {
  const header = `${EMOJI.PIN} *NUEVA CONSULTA LEGAL - ${companyName.toUpperCase()}*`;

  const fields: Array<string | null> = [
    `${EMOJI.USER} *Nombre:* ${data.fullName.trim()}`,
    `${EMOJI.EMAIL} *Correo:* ${data.email.trim()}`,
    `${EMOJI.PHONE} *Teléfono:* ${data.phone.trim()}`,
    data.subject?.trim() ? `${EMOJI.CLIPBOARD} *Asunto:* ${data.subject.trim()}` : null,
    data.message?.trim() ? `${EMOJI.SPEECH} *Mensaje:* ${data.message.trim()}` : null,
  ];

  return [header, '', ...fields.filter((field): field is string => field !== null)].join('\n');
}

export function buildWhatsAppUrl(
  data: ContactFormData,
  options: WhatsAppPayloadOptions
): string {
  const cleanPhone = sanitizePhoneNumber(options.phone);
  const rawMessage = formatWhatsAppMessage(data, options.companyName);

  const encodedText = encodeURIComponent(rawMessage);

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}