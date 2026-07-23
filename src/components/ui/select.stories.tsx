import { Select } from './select'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    placeholder: 'Select a topic',
    options: [
      { label: 'General question', value: 'general' },
      { label: 'Sales', value: 'sales' },
      { label: 'Support', value: 'support' },
    ],
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = { args: { value: '' } }
export const Selected: Story = { args: { value: 'sales' } }
export const Disabled: Story = { args: { value: '', disabled: true } }
