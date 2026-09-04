# AstroShell

Shared Astro layout, navigation, footer, terminal panel, metadata, base-path handling, and WebTUI foundation used by the sites in this workspace.

## Requirements

- Node.js 24
- Astro `^7.1.5`
- `@webtui/css` `^0.1.9`

## Installation

```bash
npm install @brainage04/astro-shell
```

## Usage

```astro
---
import SiteLayout from '@brainage04/astro-shell/components/SiteLayout.astro';
import TerminalPanel from '@brainage04/astro-shell/components/TerminalPanel.astro';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects/', activeMode: 'prefix' },
];
---

<SiteLayout
  title="Home"
  siteName="Example"
  description="Example site"
  sourceHref="https://github.com/example/site"
  navItems={navItems}
>
  <TerminalPanel title="Hello">Shared shell content.</TerminalPanel>
</SiteLayout>
```

Local links and assets passed to the shell are prefixed with Astro's configured base path. Use `withBase` for application-owned links:

```ts
import { withBase } from '@brainage04/astro-shell/withBase';
```

## Exports

- `@brainage04/astro-shell/components/PageHeader.astro`
- `@brainage04/astro-shell/components/NotFoundPage.astro`
- `@brainage04/astro-shell/components/SiteLayout.astro`
- `@brainage04/astro-shell/components/SiteHeader.astro`
- `@brainage04/astro-shell/components/SiteFooter.astro`
- `@brainage04/astro-shell/components/TerminalPanel.astro`
- `@brainage04/astro-shell/config`
- `@brainage04/astro-shell/withBase`
- `@brainage04/astro-shell/global.css`

## Development

```bash
npm ci
```

## Validation

```bash
npm run check
npm run lint
npm run format:check
npm test
npm run pack:check
```

`npm run release:check` runs the complete pre-publish validation sequence.

## Deployment

`npm run publish:package` publishes the package to npm. `.github/workflows/publish.yml` provides the same release path through npm trusted publishing.
