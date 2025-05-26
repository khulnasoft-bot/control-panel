import { getConfig } from './config';
import { getBaseDomain } from '../utils/getBaseDomain';

export function getCookie(name: string): string | null {
  for (const cookie of document.cookie.split(';')) {
    const [key, value] = cookie.split('=');

    if (key && value && key.trim() === name) {
      return value;
    }
  }

  return null;
}

export function setCookie(
  name: string,
  value: string,
  options: Record<string, string | boolean | undefined> = {},
): void {
  options.Domain ??= getDomain();

  document.cookie = Object.entries({ [name]: value, ...options })
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => (value === true ? key : `${key}=${value}`))
    .join(';');
}

function getDomain(): string | undefined {
  const { environment } = getConfig();
  
  // For Vercel deployments
  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
    if (vercelUrl) {
      return vercelUrl.includes('http') ? 
        new URL(vercelUrl).hostname : 
        vercelUrl;
    }
  }

  // Fallback to environment-based domains
  if (environment === 'production') {
    return process.env.VITE_APP_DOMAIN ?? `app.${getBaseDomain()}`;
  }

  if (environment === 'staging') {
    return process.env.VITE_APP_DOMAIN ?? `${getBaseDomain()}/staging`;
  }
}
