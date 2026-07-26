export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
}

export interface WhatsAppPayloadOptions {
  companyName?: string;
  phone: string;
}
