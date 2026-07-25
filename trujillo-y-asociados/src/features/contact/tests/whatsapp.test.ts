import { describe, it, expect } from "vitest";
import { formatWhatsAppMessage, sanitizePhoneNumber, buildWhatsAppUrl } from "../utils/whatsapp";

describe("WhatsApp Utilities", () => {
  it("debe limpiar correctamente el número telefónico", () => {
    expect(sanitizePhoneNumber("+52 (55) 7340-8674")).toBe("525573408674");
  });

  it("debe formatear el mensaje omitiendo campos opcionales vacíos", () => {
    const formData = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "5512345678",
      subject: "",
      message: "",
    };

    const result = formatWhatsAppMessage(formData, "TEST FIRM");
    
    expect(result).toContain("📍 *NUEVA CONSULTA LEGAL - TEST FIRM*");
    expect(result).toContain("👤 *Nombre:* Juan Pérez");
    expect(result).toContain("📧 *Correo:* juan@example.com");
    expect(result).toContain("📞 *Teléfono:* 5512345678");
    expect(result).not.toContain("📋 *Asunto:*");
    expect(result).not.toContain("💬 *Mensaje:*");
  });

  it("debe construir una URL válida de la API de WhatsApp con encodeURIComponent", () => {
    const url = buildWhatsAppUrl(
      { fullName: "Ana", email: "a@b.com", phone: "123" },
      { phone: "+52 555-000" }
    );
    expect(url.startsWith("https://api.whatsapp.com/send?phone=52555000&text=")).toBe(true);
  });
});
