import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { Card, CardContent, CardHeader } from './Card';
import { Icon } from './Icon';

// Color Palette Type
interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}

// Theme Config Type
interface ThemeConfig {
  name: string;
  palette: ColorPalette;
  fonts: {
    heading: string[];
    body: string[];
  };
  spacing: {
    base: string;
    scale: number;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

// Predefined Themes
const predefinedThemes: ThemeConfig[] = [
  {
    name: 'Default',
    palette: {
      primary: '#D97706',
      secondary: '#F59E0B',
      accent: '#F97316',
      background: '#FDFBF7',
      surface: '#FFFFFF',
      text: '#3E2723',
      muted: '#795548',
      border: '#D7CCC8',
    },
    fonts: {
      heading: ['Work Sans', 'sans-serif'],
      body: ['Noto Sans', 'sans-serif'],
    },
    spacing: {
      base: '1rem',
      scale: 1.25,
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.75rem',
      full: '9999px',
    },
  },
  {
    name: 'Modern',
    palette: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#A855F7',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#111827',
      muted: '#6B7280',
      border: '#E5E7EB',
    },
    fonts: {
      heading: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    spacing: {
      base: '1rem',
      scale: 1.25,
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      full: '9999px',
    },
  },
  {
    name: 'Dark Pro',
    palette: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      muted: '#9CA3AF',
      border: '#374151',
    },
    fonts: {
      heading: ['JetBrains Mono', 'monospace'],
      body: ['JetBrains Mono', 'monospace'],
    },
    spacing: {
      base: '1rem',
      scale: 1.25,
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
  },
];

// Color Input Component
interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  label,
  className,
}) => (
  <div className={cn('space-y-2', className)}>
    {label && (
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <div className="flex gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
        placeholder="#000000"
      />
    </div>
  </div>
);

// Theme Customizer Component
interface ThemeCustomizerProps {
  onThemeChange?: (config: ThemeConfig) => void;
  currentTheme?: ThemeConfig;
  className?: string;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  onThemeChange,
  currentTheme = predefinedThemes[0],
  className,
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing'>('colors');
  const [customTheme, setCustomTheme] = useState<ThemeConfig>(currentTheme);

  // Generate CSS variables from theme config
  const generateCSSVariables = (config: ThemeConfig) => {
    const variables: Record<string, string> = {};
    
    // Color variables
    variables['--color-primary'] = config.palette.primary;
    variables['--color-secondary'] = config.palette.secondary;
    variables['--color-accent'] = config.palette.accent;
    variables['--color-background'] = config.palette.background;
    variables['--color-surface'] = config.palette.surface;
    variables['--color-text'] = config.palette.text;
    variables['--color-muted'] = config.palette.muted;
    variables['--color-border'] = config.palette.border;
    
    // Font variables
    variables['--font-heading'] = config.fonts.heading.join(', ');
    variables['--font-body'] = config.fonts.body.join(', ');
    
    // Spacing variables
    variables['--spacing-base'] = config.spacing.base;
    
    // Border radius variables
    variables['--radius-sm'] = config.borderRadius.sm;
    variables['--radius-md'] = config.borderRadius.md;
    variables['--radius-lg'] = config.borderRadius.lg;
    variables['--radius-full'] = config.borderRadius.full;
    
    return variables;
  };

  // Apply theme to document
  const applyTheme = (config: ThemeConfig) => {
    const variables = generateCSSVariables(config);
    const root = document.documentElement;
    
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    onThemeChange?.(config);
  };

  // Handle theme change
  const handleThemeChange = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...customTheme, ...updates };
    setCustomTheme(newTheme);
    applyTheme(newTheme);
  };

  // Load predefined theme
  const loadPredefinedTheme = (theme: ThemeConfig) => {
    setCustomTheme(theme);
    applyTheme(theme);
  };

  // Export theme as JSON
  const exportTheme = () => {
    const dataStr = JSON.stringify(customTheme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${customTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import theme from file
  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTheme = JSON.parse(e.target?.result as string);
        loadPredefinedTheme(importedTheme);
      } catch (error) {
        console.error('Error parsing theme file:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={cn('w-full max-w-4xl', className)}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Theme Customizer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize the appearance of your application
        </p>
      </div>

      {/* Predefined Themes */}
      <Card className="mb-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Predefined Themes
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predefinedThemes.map((theme) => (
              <div
                key={theme.name}
                className={cn(

                  'relative p-4 rounded-lg border-2 cursor-pointer transition-all',
                  'hover:shadow-md',
                  customTheme.name === theme.name
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                )}
                onClick={() => loadPredefinedTheme(theme)}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.palette.primary }} />
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.palette.secondary }} />
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.palette.accent }} />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{theme.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {theme.fonts.heading[0]} + {theme.fonts.body[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customization Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customize Theme
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('import-theme')?.click()}
              >
                Import
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportTheme}
              >
                Export
              </Button>
            </div>
          </div>
          
          <input
            id="import-theme"
            type="file"
            accept=".json"
            onChange={importTheme}
            className="hidden"
          />
          
          {/* Tab Navigation */}
          <div className="flex gap-1 mt-4">
            {[
              { key: 'colors', label: 'Colors', icon: 'palette' },
              { key: 'typography', label: 'Typography', icon: 'text_fields' },
              { key: 'spacing', label: 'Spacing', icon: 'margin' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <Icon name={tab.icon} size="sm" />
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ColorInput
                    label="Primary Color"
                    value={customTheme.palette.primary}
                    onChange={(color) => handleThemeChange({
                      palette: { ...customTheme.palette, primary: color }
                    })}
                  />
                  <ColorInput
                    label="Secondary Color"
                    value={customTheme.palette.secondary}
                    onChange={(color) => handleThemeChange({
                      palette: { ...customTheme.palette, secondary: color }
                    })}
                  />
                  <ColorInput
                    label="Accent Color"
                    value={customTheme.palette.accent}
                    onChange={(color) => handleThemeChange({
                      palette: { ...customTheme.palette, accent: color }
                    })}
                  />
                </div>
                <div className="space-y-4">
                  <ColorInput
                    label="Background Color"
                    value={customTheme.palette.background}
                    onChange={(color) => handleThemeChange({
                      palette: { ...customTheme.palette, background: color }
                    })}
                  />
                  <ColorInput
                    label="Surface Color"
                    value={customTheme.palette.surface}
                    onChange={(color) => handleThemeChange({
                      palette: { ...customTheme.palette, surface: color }
                    })}
                  />
                  <ColorInput
                    label="Text Color"
                    value={customTheme.palette.text}
                    onChange={(color) => handleThemeChange({
                      palette: { ...customTheme.palette, text: color }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Heading Font
                    </label>
                    <input
                      type="text"
                      value={customTheme.fonts.heading.join(', ')}
                      onChange={(e) => handleThemeChange({
                        fonts: { ...customTheme.fonts, heading: e.target.value.split(', ') }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg"
                      placeholder="Work Sans, sans-serif"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Body Font
                    </label>
                    <input
                      type="text"
                      value={customTheme.fonts.body.join(', ')}
                      onChange={(e) => handleThemeChange({
                        fonts: { ...customTheme.fonts, body: e.target.value.split(', ') }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg"
                      placeholder="Noto Sans, sans-serif"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spacing Tab */}
          {activeTab === 'spacing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Base Spacing
                    </label>
                    <input
                      type="text"
                      value={customTheme.spacing.base}
                      onChange={(e) => handleThemeChange({
                        spacing: { ...customTheme.spacing, base: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg"
                      placeholder="1rem"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Scale Factor
                    </label>
                    <input
                      type="number"
                      value={customTheme.spacing.scale}
                      onChange={(e) => handleThemeChange({
                        spacing: { ...customTheme.spacing, scale: parseFloat(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg"
                      min="1"
                      max="2"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Theme Preview Component
interface ThemePreviewProps {
  theme: ThemeConfig;
  className?: string;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, className }) => {
  return (
    <div
      className={cn('p-6 rounded-lg', className)}
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
      }}
    >
      <div className="space-y-4">
        <h3 style={{ color: theme.palette.primary, fontFamily: theme.fonts.heading.join(', ') }}>
          Sample Heading
        </h3>
        <p style={{ fontFamily: theme.fonts.body.join(', ') }}>
          This is sample body text to preview your theme customization. 
          The typography and colors will update as you make changes.
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: theme.palette.primary }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border-2"
            style={{
              color: theme.palette.primary,
              borderColor: theme.palette.border,
            }}
          >
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
};
