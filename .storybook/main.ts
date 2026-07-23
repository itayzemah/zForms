import tailwindcss from '@tailwindcss/vite'
import type { StorybookConfig } from '@storybook/react-vite'
import type { PluginOption } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    // Storybook merges the project's vite.config.ts, which includes the
    // TanStack Start + devtools plugins. Those are for the full app build and
    // break Storybook's isolated preview build, so strip them out and keep only
    // a fresh Tailwind v4 plugin for utility compilation.
    const flat = (viteConfig.plugins ?? []).flat(Infinity) as Array<PluginOption>
    viteConfig.plugins = flat.filter((plugin) => {
      const name =
        plugin && typeof plugin === 'object' && 'name' in plugin
          ? String((plugin as { name?: string }).name)
          : ''
      return !/tanstack|start-manifest|nitro|devtools|tailwind/i.test(name)
    })
    viteConfig.plugins.push(tailwindcss())
    return viteConfig
  },
}

export default config
