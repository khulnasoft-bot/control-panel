import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true, exclude: ['**/*.stories.tsx'] })],
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      formats: ['es'],
      entry: {
        main: 'src/index.ts',
        next: 'src/next.ts',
      },
    },
    rollupOptions: {
      external: [
        '@floating-ui/react',
        /^@shikijs/,
        '@tanstack/react-ranger',
        'class-variance-authority',
        'shiki',
        'clsx',
        'downshift',
        'framer-motion',
        'lucide-react',
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
    },
  },
});
