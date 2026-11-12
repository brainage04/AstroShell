export type Theme = 'light' | 'dark';

/** localStorage key for the visitor's theme pick, shared by every shell site on one origin. */
export const THEME_KEY = 'astro-shell.theme';

/** Points the theme-color metas at the picked theme, so the browser's own UI follows a pick that differs from the system. */
export function themeColorMetas(theme: Theme): void {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = meta.dataset[theme] ?? meta.content;
  });
}
