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
- `@brainage04/astro-shell/components/SiteLayout.astro`
- `@brainage04/astro-shell/components/SiteHeader.astro`
- `@brainage04/astro-shell/components/SiteFooter.astro`
- `@brainage04/astro-shell/components/TerminalPanel.astro`
- `@brainage04/astro-shell/withBase`
- `@brainage04/astro-shell/global.css`

## Development

```bash
npm ci
npm run check
npm run lint
npm run format:check
npm run pack:check
```

## Release

`npm run release:check` validates the publishable package. `npm run publish:package` publishes it to npm. GitHub release publishing is also available through `.github/workflows/publish.yml` and requires an `NPM_TOKEN` repository secret.
