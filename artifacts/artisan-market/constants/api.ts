/**
 * Resolves the KalaSetu backend API base URL.
 * Automatically adapts between local development (http://localhost:3000) and production cloud endpoints.
 */
export function getApiBaseUrl(): string {
  const domain = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_DOMAIN;
  if (!domain) {
    return 'http://localhost:3000';
  }
  if (domain.startsWith('http://') || domain.startsWith('https://')) {
    return domain.replace(/\/+$/, '');
  }
  if (domain.includes('localhost') || domain.includes('127.0.0.1')) {
    return `http://${domain}`;
  }
  return `https://${domain}`;
}
