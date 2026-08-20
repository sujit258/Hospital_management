const LOCAL_HOSTS = ["localhost", "127.0.0.1"];

export function parseHostHeader(hostHeader: string | null | undefined): string {
  if (!hostHeader) return "";
  return hostHeader.split(":")[0].toLowerCase();
}

export function getBaseDomain(): string {
  return process.env.APP_BASE_DOMAIN?.toLowerCase() || "localhost";
}

export function isMainDomain(hostHeader: string | null | undefined): boolean {
  const host = parseHostHeader(hostHeader);
  if (!host) return true;
  
  // For local development, treat localhost as main domain
  if (LOCAL_HOSTS.includes(host)) return true;
  
  const baseDomain = getBaseDomain();
  return host === baseDomain;
}

export function clinicSlugFromHost(hostHeader: string | null | undefined): string | null {
  const host = parseHostHeader(hostHeader);
  if (!host) return null;
  
  // For local development, return null (main domain)
  if (LOCAL_HOSTS.includes(host)) return null;

  const baseDomain = getBaseDomain();
  
  // If it's the main domain, no clinic slug
  if (host === baseDomain) return null;
  
  // Check if it's a subdomain of the base domain
  if (!host.endsWith(`.${baseDomain}`)) return null;

  const slug = host.slice(0, host.length - (`.${baseDomain}`).length);
  return slug || null;
}

export function getSubdomain(hostHeader: string | null | undefined): string | null {
  return clinicSlugFromHost(hostHeader);
}
