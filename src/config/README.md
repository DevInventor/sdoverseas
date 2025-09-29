# Configuration System

This directory contains all configuration files for the SD Overseas website, enabling easy content and theme management without code changes.

## File Structure

### Core Configuration Files

- **`global.json`** - Global application settings, company information, and navigation
- **`theme.json`** - Centralized theme colors and styling configuration
- **`data.json`** - Dynamic data (products, services, testimonials)
- **`search.json`** - Search configuration, aliases, and quick redirects

### Page-Specific Configuration Files

- **`home-final.json`** - Home page content and sections
- **`about.json`** - About page content and sections
- **`products.json`** - Products page content and categories
- **`product-detail.json`** - Product detail page content and form fields
- **`services.json`** - Services page content and process steps
- **`contact.json`** - Contact page content and form fields

## Theme Configuration (`theme.json`)

The theme configuration centralizes all color values for easy management:

```json
{
  "colors": {
    "background": {
      "light": "#fdfaf8",
      "dark": "#221910"
    },
    "header": {
      "light": "#ffffff", 
      "dark": "#111827"
    },
    "text": {
      "light": "#1a120b",
      "dark": "#fdfaf8"
    },
    "subtle": {
      "light": "#6b7280",
      "dark": "#9ca3af"
    },
    "primary": {
      "50": "#fff7ed",
      "500": "#f97316",
      "900": "#7c2d12"
    },
    "secondary": {
      "50": "#f8fafc",
      "500": "#64748b",
      "900": "#0f172a"
    }
  },
  "opacity": {
    "header": "80",
    "card": "5", 
    "cardHover": "10"
  }
}
```

### Key Benefits

1. **Easy Color Updates**: Change any color by updating the JSON file
2. **Consistent Theming**: All components use the same color values
3. **Dark Mode Support**: Separate light and dark color definitions
4. **Opacity Control**: Centralized opacity values for overlays and transparency

## Usage

### In Components

```typescript
import { getThemeConfig } from '../config';

const theme = getThemeConfig();
const headerBg = theme.colors.header.dark; // #111827
const pageBg = theme.colors.background.dark; // #221910
```

### In Tailwind Classes

The theme colors are automatically available as Tailwind classes:

```html
<!-- Header background -->
<div className="bg-header-light/80 dark:bg-header-dark/80">

<!-- Page background -->
<div className="bg-background-light dark:bg-background-dark">

<!-- Text colors -->
<h1 className="text-text-light dark:text-text-dark">
<p className="text-subtle-light dark:text-subtle-dark">
```

## Customization

### Changing Colors

1. Update the color values in `theme.json`
2. Update corresponding values in `tailwind.config.js`
3. Restart the development server

### Adding New Colors

1. Add the color to `theme.json`
2. Add the color to `tailwind.config.js` theme.extend.colors
3. Use the new color in components

### Example: Changing Header Color

**Before:**
```json
"header": {
  "light": "#ffffff",
  "dark": "#111827"
}
```

**After:**
```json
"header": {
  "light": "#ffffff", 
  "dark": "#1a1a1a"
}
```

Update `tailwind.config.js`:
```javascript
'header-dark': '#1a1a1a',
```

## Current Theme Colors

- **Header Dark**: `#111827` (80% opacity = `#111827cc`)
- **Page Dark**: `#221910`
- **Primary**: Orange theme (`#f97316`)
- **Secondary**: Slate theme for contrast

## Best Practices

1. **Consistency**: Always use theme colors instead of hardcoded values
2. **Testing**: Test both light and dark modes after color changes
3. **Accessibility**: Ensure sufficient contrast ratios
4. **Documentation**: Update this README when adding new theme options