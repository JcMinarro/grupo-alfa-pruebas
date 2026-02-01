# Forms Spec

## Background
The website currently has a basic reusable `ContactForm.astro` component used on the homepage, and a separate, hardcoded form on the `/contacto` page. The hardcoded form includes additional fields like a privacy policy checkbox and different styling. We need a single, flexible `ContactForm` component that can handle both use cases.

## Requirements

### 1. ContactForm Component
Enhance the existing `ContactForm.astro` to support optional fields and configuration.

-   **Props**:
    -   `id` (string, optional): Form ID.
    -   `action` (string, default: '#'): Form action URL.
    -   `method` (string, default: 'POST'): Form method.
    -   `theme` (string, default: 'light'): 'light' or 'dark' to adjust input backgrounds/borders if needed.
    -   `showPhone` (boolean, default: false): Whether to show the phone input field.
    -   `showPrivacy` (boolean, default: true): Whether to show the privacy policy checkbox (required for GDPR).
    -   `buttonText` (string, default: 'ENVIAR'): Submit button label.

### 2. Fields & Structure
-   **Standard Fields**:
    -   `name` (required): "Nombre"
    -   `email` (required, type="email"): "Email"
    -   `phone` (optional prop, type="tel"): "Teléfono"
    -   `message` (textarea): "Comentario" or "Mensaje"
-   **Privacy Checkbox**:
    -   Must include text: "Acepto la política de privacidad..." with a link.
    -   Must be `required` if shown.

### 3. Usage Examples

**Homepage (Simple)**:
```astro
<ContactForm showPhone={false} showPrivacy={false} />
```

**Contact Page (Full)**:
```astro
<ContactForm 
  showPhone={true} 
  showPrivacy={true} 
  action="/api/contact" 
/>
```

### 4. Styling
-   Use the **Design System** input styles (`.form-control`, `.btn-submit`).
-   Ensure the layout handles responsiveness (e.g., fields stacking on mobile).
