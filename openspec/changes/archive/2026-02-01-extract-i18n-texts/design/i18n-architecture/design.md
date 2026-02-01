# Design: i18n Architecture

## Architecture Overview

We will leverage Astro's built-in i18n support combined with a centralized UI dictionary.

### 1. Astro Configuration
Update `astro.config.mjs`:
```javascript
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
```

### 2. UI Dictionary (`src/i18n/ui.ts`)
We will define a single source of truth for all strings.
```typescript
export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'brand.name': 'Grupo Alfa',
    'hero.title': 'INVERSIÓN INTELIGENTE',
    // ... all other strings
  },
  en: {
    // To be populated later, but structure must match 'es'
  },
} as const;
```

### 3. Translation Utility (`src/i18n/utils.ts`)
A helper function to retrieve translations.
```typescript
import { ui, defaultLang } from './ui';

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}
```

### 4. Implementation in Components
```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h2>{t('hero.title')}</h2>
```

## Data Extraction Strategy
1. Identification: Scan all `.astro` files for text content.
2. Key Naming: Use dot-notation keys based on component or section (e.g., `footer.copyright`, `contact.form.name`).
3. Hierarchy: Group keys logically within the `ui.es` object.
