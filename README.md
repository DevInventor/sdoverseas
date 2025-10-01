# SD Overseas Website

A modern, responsive website for SD Overseas - a premium spice trading company.

## Features

- **Responsive Design**: Optimized for all devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Dynamic Content**: Configurable content through JSON files
- **Search Functionality**: Advanced search with fuzzy matching
- **Global Presence Map**: Interactive world map showcasing global reach
- **Animated Testimonials**: Engaging customer testimonials
- **Dark/Light Theme**: Theme switching capability

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Bootstrap 5
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Material Symbols Outlined, Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sd-overseas.git
cd sd-overseas/website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
website/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── config/        # Configuration files
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── contexts/      # React contexts
├── public/            # Static assets
└── dist/              # Build output
```

## Configuration

The website uses a dynamic configuration system. Content can be updated by modifying JSON files in the `src/config/` directory:

- `products.json` - Product catalog
- `data.json` - Services and testimonials
- `global-presence.json` - Global presence map data
- `search.json` - Search configuration

## Deployment

### GitHub Pages

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

1. Push changes to the main branch
2. GitHub Actions will automatically build and deploy
3. The website will be available at: `https://yourusername.github.io/sd-overseas/`

### Manual Deployment

To deploy manually:

```bash
npm run deploy
```

## Custom Domain

To use a custom domain:

1. Add your domain to the `CNAME` file in the repository root
2. Update the `cname` field in `.github/workflows/deploy.yml`
3. Configure DNS settings with your domain provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to SD Overseas.

## Support

For support or questions, please contact the development team.