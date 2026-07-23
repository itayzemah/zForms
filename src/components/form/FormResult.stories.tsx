import { FormResult } from './FormResult'
import { contactRequest } from '#/forms/definitions/contact-request'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Form/FormResult',
  component: FormResult,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FormResult>

export default meta
type Story = StoryObj<typeof meta>

export const ContactRequest: Story = {
  args: {
    form: contactRequest,
    values: {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      topic: 'support',
      message: 'My drone will not connect to the app.',
    },
  },
}
