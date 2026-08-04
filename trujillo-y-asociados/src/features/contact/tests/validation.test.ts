import { describe, it, expect } from 'vitest';
import { validatePhoneNumber, validateContactForm } from '../utils/validation';

describe('Contact Form Validation Utilities', () => {
  describe('validatePhoneNumber', () => {
    it('debe aceptar números válidos con formatos comunes', () => {
      expect(validatePhoneNumber('+52 (55) 7340-8674')).toBe(true);
      expect(validatePhoneNumber('5512345678')).toBe(true);
      expect(validatePhoneNumber('525512345678')).toBe(true);
    });

    it('debe rechazar números con menos de 8 dígitos numéricos', () => {
      expect(validatePhoneNumber('1234567')).toBe(false);
      expect(validatePhoneNumber('+52 12')).toBe(false);
    });

    it('debe rechazar números con más de 15 dígitos numéricos', () => {
      expect(validatePhoneNumber('1234567890123456')).toBe(false);
    });
  });

  describe('validateContactForm', () => {
    it('debe validar exitosamente datos válidos', () => {
      const validData = {
        fullName: 'Lic. Roberto Trujillo',
        email: 'contacto@trujillo.com',
        phone: '5512345678',
        subject: 'Consulta Laboral',
        message: 'Requiero asesoría sobre contrato de trabajo.',
      };

      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('debe retornar errores si los campos requeridos exceden o no cumplen los límites', () => {
      const invalidData = {
        fullName: 'A', // demasiado corto (< 2)
        email: 'invalid-email',
        phone: '123', // < 8 dígitos
        subject: 'A'.repeat(121), // > 120
        message: 'M'.repeat(1001), // > 1000
      };

      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.fullName).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.phone).toBeDefined();
      expect(result.errors.subject).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });
  });
});
