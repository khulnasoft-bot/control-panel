// Utility to get the base domain from environment variables
export function getBaseDomain(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    'snipkit.com' // fallback for local/dev
  );
}
