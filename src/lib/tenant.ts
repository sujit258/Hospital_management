const LOCAL_HOSTS = ["localhost", "127.0.0.1"];

export function parseHostHeader(hostHeader: string | null | undefined): string {
  if (!hostHeader) return "";
  return hostHeader.split(":")[0].toLowerCase();
}

export function hospitalSlugFromHost(hostHeader: string | null | undefined): string | null {
  const host = parseHostHeader(hostHeader);
  if (!host || LOCAL_HOSTS.includes(host)) return null;

  const baseDomain = process.env.APP_BASE_DOMAIN?.toLowerCase();
  if (!baseDomain) return null;

  if (host === baseDomain) return null;
  if (!host.endsWith(`.${baseDomain}`)) return null;

  const slug = host.slice(0, host.length - (`.${baseDomain}`).length);
  return slug || null;
}
