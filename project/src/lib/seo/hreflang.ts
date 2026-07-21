export function getHreflangEntries(baseUrl: string, locales: string[] = ['en', 'fr', 'sw']): string[] {
  return locales.map((locale) => `${baseUrl}/${locale}`);
}
