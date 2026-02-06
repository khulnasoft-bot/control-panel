import fs from 'node:fs/promises';
import path from 'node:path';

import dotenv from 'dotenv';
import { defineConfig, type Plugin } from 'vitest/config';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tanstackRouter from '@tanstack/router-plugin/vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

import preload from 'vite-plugin-preload';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();

/* ---------------------------------------------------------
 * Env & Paths
 * ------------------------------------------------------- */
const ROOT = process.cwd();
const IS_PROD = process.env.VITE_ENVIRONMENT === 'production';
const APP_VERSION = process.env.VITE_APP_VERSION ?? 'unknown';

const DESIGN_SYSTEM_SRC = path.resolve(
  ROOT,
  'apps/design-system',
);

/* ---------------------------------------------------------
 * Helpers
 * ------------------------------------------------------- */
function robotsTxt(): string {
  return [
    'User-agent: *',
    IS_PROD ? 'Disallow:' : 'Disallow: /',
    '',
  ].join('\n');
}

/* ---------------------------------------------------------
 * Vite Config
 * ------------------------------------------------------- */
export default defineConfig({
  base: '/',

  resolve: {
    alias: {
      '@design-system': DESIGN_SYSTEM_SRC,
    },
  },

  plugins: [
    /* Path resolution */
    tsconfigPaths(),

    /* Routing */
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/route-tree.generated.ts',
      tmpDir: 'node_modules/.tanstack',
    }),

    /* Core */
    react(),
    tailwindcss(),

    /* Assets */
    svgr({
      svgrOptions: {
        ref: true,
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: false,
                },
              },
            },
            'prefixIds',
          ],
        },
      },
    }),
    preload(),

    /* Build outputs */
    outputFile({
      filePath: 'robots.txt',
      content: robotsTxt,
    }),
    outputFile({
      filePath: 'version.txt',
      content: () => APP_VERSION,
    }),

    /* Observability (prod only) */
    process.env.SENTRY_AUTH_TOKEN &&
    sentryVitePlugin({
      org: 'khulnasoft',
      project: 'kdx',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: { name: APP_VERSION },
      silent: true,
      telemetry: false,
    }),
  ].filter(Boolean),

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          xterm: ['@xterm/xterm'],
          nivo: ['@nivo/line', '@nivo/bar'],
          analytics: ['@sentry/react', 'posthog-js'],
          'code-mirror': [
            '@uiw/codemirror-extensions-langs',
            '@uiw/codemirror-theme-github',
            '@uiw/react-codemirror',
          ],
          vendors: [
            '@floating-ui/react',
            'ansi_up',
            'downshift',
            'react-hook-form',
            'react-intl',
            'tldts',
            'unique-names-generator',
            'zod',
            'lodash-es',
          ],
        },
      },
    },
  },

  server: {
    port: 8000,
    proxy: {
      '/v1': process.env.PROXY_API_URL!,
    },
  },

  preview: {
    port: 3000,
  },

  test: {
    watch: false,
    environment: 'happy-dom',
    reporters: 'verbose',
    dir: 'src',
    restoreMocks: true,
  },
});

/* ---------------------------------------------------------
 * Custom Plugins
 * ------------------------------------------------------- */
type OutputFileOptions = {
  filePath: string;
  content: () => string;
};

function outputFile({ filePath, content }: OutputFileOptions): Plugin {
  let outDir = '';

  return {
    name: `output-file:${filePath}`,
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async writeBundle() {
      await fs.writeFile(
        path.join(outDir, filePath),
        content(),
        'utf-8',
      );
    },
  };
}
