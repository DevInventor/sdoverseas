# SD Overseas Website

A modern, responsive React.js website for SD Overseas - a global Indian spice trading company.

## Features

- 🚀 **Modern Tech Stack**: React 18, TypeScript, Vite
- 🎨 **Design System**: Tailwind CSS + Bootstrap 5 integration
- 🌙 **Dark/Light Mode**: Automatic theme switching
- 📱 **Responsive Design**: Mobile-first approach
- 🔄 **Component-Based**: Reusable component architecture
- ⚡ **Performance**: Optimized builds and loading

## Tech Stack

### Core Technologies
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS 3.x** + Bootstrap 5.x for styling
- **React Router** for navigation
- **Lucide React** for icons

### Development Tools
- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   └── pages/            # Page-specific components
├── pages/                # Route components
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── constants/            # App constants
├── contexts/             # React contexts
└── assets/               # Static assets
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages Overview

The website includes 9 pages:

### Home Pages (3 variants)
- **Home V1** (`/`) - Hero-focused design with featured spices
- **Home V2** (`/home-v2`) - Comprehensive showcase (to be implemented)
- **Home V3** (`/home-v3`) - Professional trade-focused (to be implemented)

### Main Pages
- **About** (`/about`) - Company story, mission, timeline
- **Products** (`/products`) - Spice catalog and listings
- **Services** (`/services`) - Service offerings
- **Contact** (`/contact`) - Contact form and location
- **Testimonials** (`/testimonials`) - Client reviews

## Component Architecture

### Reusable Components
- **Header** - Navigation with logo, menu, theme toggle
- **Footer** - Company info, links, contact details
- **ThemeToggle** - Dark/light mode switcher
- **PageContainer** - Consistent page wrapper

### Theme System
- Automatic dark/light mode detection
- Local storage persistence
- Smooth transitions between themes
- CSS custom properties for consistent theming

## Development Guidelines

### Code Standards
- Use functional components with TypeScript
- Follow naming conventions: PascalCase for components
- Import organization: external packages first, then internal
- Consistent prop interfaces and exports

### Styling Guidelines
- Tailwind CSS classes as primary styling
- Bootstrap utilities for complex layouts
- Custom CSS for animations and transitions
- Responsive design with mobile-first approach

## Design System

### Colors
- **Primary**: Orange/amber tones (`#f97316`, `#ea580c`, `#c2410c`)
- **Background**: Light cream (`#fdfaf8`) / Dark brown (`#221910`)
- **Text**: Dark brown (`#1a120b`) / Light cream (`#fdfaf8`)

### Typography
- **Font Family**: Work Sans (headers), Inter (body text)
- **Font Weights**: 400 (normal), 500 (medium), 700 (bold), 900 (black)

### Spacing
- Consistent spacing scale using Tailwind classes
- Container max-width: 1400px
- Responsive padding and margins

## Performance Optimization

- Code splitting by routes
- Image optimization with proper formats
- Lazy loading for non-critical components
- Bundle size monitoring
- Core Web Vitals optimization target

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

The site is configured for static hosting platforms:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

### Build Process
```bash
npm run build
```

This creates optimized production files in the `dist` directory.

## Future Enhancements

- **E-commerce Integration**: Online ordering system
- **CMS Integration**: Content management capabilities
- **Multi-language Support**: International expansion
- **Advanced Analytics**: Enhanced tracking and reporting
- **Progressive Web App**: Offline functionality

## Contributing

1. Follow the established code standards
2. Test across different browsers and devices
3. Ensure accessibility compliance (WCAG 2.1 AA)
4. Optimize for performance and SEO

---

**Note**: This is Phase 1 of development. Additional pages and features will be implemented in subsequent phases according to the development plan.
