/**
 * ZBuy Design System — Dark Mode
 * Aligned with the mobile app Figma (Online Bike Shopping App identity)
 */

export const Colors = {
  // Backgrounds (dark layers)
  background: '#151929',       // page / deepest level
  surface: '#1d2338',          // cards, panels
  surfaceMuted: '#252d46',     // hover, elevated cards
  surfaceInput: '#121726',     // form inputs

  // Text
  text: '#eef1ff',             // primary (near-white, blue tint)
  textSecondary: '#8a94b4',    // muted / secondary

  // Accent
  accent: '#4b96ff',           // electric blue — primary brand color
  accentStrong: '#2b76e0',     // darker blue for pressed / hover

  // Status
  success: '#3dd68c',          // bought / confirmed
  danger: '#ff6060',           // error / not found
  warning: '#f59e0b',          // warning

  // Borders / dividers
  border: 'rgba(255, 255, 255, 0.09)',
  borderAccent: 'rgba(75, 150, 255, 0.3)',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(255, 255, 255, 0.07)',

  // Sidebar
  sidebar: '#0f1422',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const Radius = {
  sm: 8,
  md: 10,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    shadowColor: '#4b96ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;
