import { FormRenderer } from './FormRenderer'
import { contactRequest } from '#/forms/definitions/contact-request'
import { serviceBooking } from '#/forms/definitions/service-booking'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Form/FormRenderer',
  component: FormRenderer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[32rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormRenderer>

export default meta
type Story = StoryObj<typeof meta>

export const ContactRequest: Story = { args: { form: contactRequest } }
export const ServiceBooking: Story = { args: { form: serviceBooking } }
