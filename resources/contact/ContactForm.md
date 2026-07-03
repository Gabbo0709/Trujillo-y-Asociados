# Component Specification: ContactForm.astro

## Objective
Implement the multi-column input execution layer containing the layout anchor heading ("Contact") on the left and the interactive minimal line submission form on the right.

## Architecture & Performance
- **Type**: Pure Astro Component.
- **Interactivity Strategy**: Utilizes semantic standard HTML5 client validations directly inside fields (`required`, `type="email"`). Form parsing should be mapped to native server-side endpoints (Astro Actions) to eliminate unnecessary client hydration runtimes.
- **Accessibility (a11y)**: Every layout text-line is tied explicitly using semantic `<label>` descriptors hidden visually or styled appropriately.

## Component Location
`src/features/contact/components/ContactForm.astro`

## Structural Schema (HTML + Scoped CSS)
```html
<section class="contact-form-section">
  <div class="form-wrapper">
    
    <!-- Left Static Context Column -->
    <div class="brand-column">
      <h2 class="form-main-heading">Contacto</h2>
      <p class="response-notice">Nuestro equipo responderá dentro de un día hábil.</p>
    </div>

    <!-- Right Interaction Input Form -->
    <form class="interactive-form-element" method="POST">
      <div class="form-grid">
        
        <!-- Full Name Input Field -->
        <div class="input-group">
          <label for="fullName" class="field-label">Nombre completo *</label>
          <input type="text" id="fullName" name="fullName" required class="underline-input" />
        </div>

        <!-- Email Input Field -->
        <div class="input-group">
          <label for="email" class="field-label">Correo electrónico *</label>
          <input type="email" id="email" name="email" required class="underline-input" />
        </div>

        <!-- Phone Input Field -->
        <div class="input-group">
          <label for="phone" class="field-label">Teléfono *</label>
          <div class="phone-input-container">
            <span class="globe-icon" aria-hidden="true">🌐 🗗</span>
            <input type="tel" id="phone" name="phone" required class="underline-input phone-field" />
          </div>
        </div>

        <!-- Subject Input Field -->
        <div class="input-group">
          <label for="subject" class="field-label">Asunto</label>
          <input type="text" id="subject" name="subject" class="underline-input" />
        </div>

        <!-- Message Textarea Block -->
        <div class="input-group full-width">
          <label for="message" class="field-label">Mensaje</label>
          <textarea id="message" name="message" rows="4" class="underline-textarea"></textarea>
        </div>

      </div>

      <!-- Action Submission Control Trigger -->
      <div class="button-row">
        <button type="submit" class="submit-action-btn">Enviar consulta</button>
      </div>
    </form>

  </div>
</section>

<style>
  .contact-form-section {
    background-color: #EADCC9;
    padding: 80px 24px;
    width: 100%;
    color: #3D1411;
    box-sizing: border-box;
  }

  .form-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .form-main-heading {
    font-family: serif;
    font-size: 4.5rem;
    line-height: 1;
    margin: 0 0 16px 0;
    font-weight: 300;
  }

  .response-notice {
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    max-width: 260px;
    margin: 0;
  }

  .interactive-form-element {
    width: 100%;
  }

  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .field-label {
    font-family: sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .underline-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #3D1411;
    color: #3D1411;
    padding: 8px 0;
    font-family: sans-serif;
    font-size: 1rem;
    outline: none;
    width: 100%;
  }

  .underline-textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid #3D1411;
    color: #3D1411;
    padding: 8px 0;
    font-family: sans-serif;
    font-size: 1rem;
    outline: none;
    resize: none;
    width: 100%;
  }

  .phone-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #3D1411;
  }

  .phone-input-container .underline-input {
    border-bottom: none;
  }

  .globe-icon {
    font-size: 0.9rem;
    opacity: 0.7;
    white-space: nowrap;
  }

  .button-row {
    margin-top: 40px;
    width: 100%;
  }

  .submit-action-btn {
    width: 100%;
    background-color: #3D1411;
    color: #EADCC9;
    border: none;
    padding: 16px;
    font-family: sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .submit-action-btn:hover {
    background-color: #2B0E0C;
    color: #ffffff;
  }

  /* Desktop Fluid Realignment Specifications */
  @media (min-width: 768px) {
    .form-wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 32px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 40px 32px;
    }

    .full-width {
      grid-column: span 2;
    }

    .submit-action-btn {
      width: auto;
      min-width: 250px;
      float: right;
    }
    
    .button-row {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
```
