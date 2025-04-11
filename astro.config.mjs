// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      Logger: 1
    })
  ],
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['cubichi.ru', 'cubichi.netlify.app'],
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'games': [
              './src/components/DragAndDropGame.astro',
              './src/components/UnstressedVowelsGame.astro'
            ],
            'ui': [
              './src/components/Button.astro',
              './src/components/Card.astro',
              './src/components/Hero.astro',
              './src/components/Navigation.astro',
              './src/components/Footer.astro'
            ]
          }
        }
      },
      target: 'es2018',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096
    },
    ssr: {
      noExternal: ['react-icons', '@astrojs/tailwind']
    }
  }
});
