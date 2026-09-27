export function articleLink(href: string | undefined, translatedRoutes?: ReadonlySet<string>) {
  if (!translatedRoutes || !href || href.startsWith('#')) return { href, untranslated: false };
  let url: URL;
  try { url = new URL(href, 'https://www.aihero.dev'); }
  catch { return { href, untranslated: false }; }
  if (!['https:', 'http:'].includes(url.protocol) || !['www.aihero.dev', 'aihero.dev'].includes(url.hostname)) return { href, untranslated: false };
  let route: string;
  try { route = decodeURIComponent(url.pathname); }
  catch { return { href, untranslated: false }; }
  if (translatedRoutes.has(route)) return { href: `${url.pathname}${url.search}${url.hash}`, untranslated: false };
  return { href: url.href, untranslated: true };
}
