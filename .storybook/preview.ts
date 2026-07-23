import '../src/styles.css'
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        island: { name: 'Island', value: '#e7f3ec' },
        dark: { name: 'Dark', value: '#0a1418' },
        white: { name: 'White', value: '#ffffff' },
      },
    },
    initialGlobals: {
      backgrounds: { value: 'island' },
    },
  },
}

export default preview
