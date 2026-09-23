import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

const CONFIG_ID = 'virtual:astro-shell/config';
const STYLES_ID = 'virtual:astro-shell/styles';

/**
 * @param {import('./integration').AstroShellOptions} options
 * @returns {import('astro').AstroIntegration}
 */
export default function astroShell({ config, styles = [], notFound = true }) {
  return {
    name: '@brainage04/astro-shell',
    hooks: {
      'astro:config:setup': ({ config: astroConfig, updateConfig, injectRoute }) => {
        const site = process.env.PUBLIC_SITE_URL;
        const resolvedStyles = styles.map((entry) =>
          entry.startsWith('./') || entry.startsWith('../') ? fileURLToPath(new URL(entry, astroConfig.root)) : entry,
        );
        const modules = new Map([
          [CONFIG_ID, `export default ${JSON.stringify(config)};`],
          [STYLES_ID, resolvedStyles.map((entry) => `import ${JSON.stringify(entry)};`).join('\n')],
        ]);

        updateConfig({
          ...(site ? { site } : {}),
          base: process.env.PUBLIC_BASE_PATH ?? '/',
          vite: {
            plugins: [
              {
                name: 'astro-shell:virtual-modules',
                resolveId(id) {
                  return modules.has(id) ? `\0${id}` : undefined;
                },
                load(id) {
                  return id.startsWith('\0') ? modules.get(id.slice(1)) : undefined;
                },
              },
            ],
          },
        });

        if (notFound) {
          injectRoute({ pattern: '/404', entrypoint: '@brainage04/astro-shell/pages/404.astro' });
        }
      },
    },
  };
}
