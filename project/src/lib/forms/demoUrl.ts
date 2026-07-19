/** Build demo request URL with optional module/sector pre-tags (Doc 1 PRD). */
export function demoRequestUrl(params?: { module?: string; sector?: string }): string {
  const search = new URLSearchParams();
  if (params?.module) search.set('module', params.module);
  if (params?.sector) search.set('sector', params.sector);
  const query = search.toString();
  return query ? `/request-a-demo?${query}` : '/request-a-demo';
}
