import type { ContactFormData } from '../types/contact';

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validatePhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const cleanFullName = data.fullName.trim();
  if (!cleanFullName || cleanFullName.length < 2 || cleanFullName.length > 100) {
    errors.fullName = 'El nombre completo debe tener entre 2 y 100 caracteres.';
  }

  const cleanEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || cleanEmail.length > 100 || !emailRegex.test(cleanEmail)) {
    errors.email = 'Proporcione un correo electrónico válido (máximo 100 caracteres).';
  }

  const cleanPhone = data.phone.trim();
  if (!cleanPhone || !validatePhoneNumber(cleanPhone)) {
    errors.phone = 'Proporcione un teléfono válido de entre 8 y 15 dígitos.';
  }

  if (data.subject && data.subject.trim().length > 120) {
    errors.subject = 'El asunto no puede exceder 120 caracteres.';
  }

  if (data.message && data.message.trim().length > 1000) {
    errors.message = 'El mensaje no puede exceder 1000 caracteres.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
