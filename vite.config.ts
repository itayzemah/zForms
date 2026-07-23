import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isGHPages = process.env.GITHUB_ACTIONS === 'true'
const base = isGHPages ? '/zForms/' : '/'

export default defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(
      isGHPages
        ? {
            router: { basepath: base },
            spa: { enabled: true, prerender: { crawlLinks: true } },
          }
        : {},
    ),
    viteReact(),
  ],
})
