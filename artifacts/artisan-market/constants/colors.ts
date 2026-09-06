/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#1c1c1a',
    tint: '#c96543',
    background: '#fbf7f1',
    foreground: '#1c1c1a',
    card: '#fffdf9',
    cardForeground: '#1c1c1a',
    primary: '#c96543',
    primaryForeground: '#fffaf4',
    secondary: '#f2e9dc',
    secondaryForeground: '#5b3a2c',
    muted: '#eee5d9',
    mutedForeground: '#7e746a',
    accent: '#e6a23c',
    accentForeground: '#4a3018',
    destructive: '#b94b43',
    destructiveForeground: '#fffaf4',
    border: '#e4d7c8',
    input: '#ded0c0',
    indigo: '#263d5e',
    sage: '#798d6e',
    success: '#658163',
  },
  radius: 16,
};

export default colors;
