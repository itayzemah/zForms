import { useForm } from '@tanstack/react-form'
import { FormField } from './FormField'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FieldDef } from '#/forms/types'

/** Harness that provides a live TanStack Form field API to FormField. */
function FieldHarness({ field }: { field: FieldDef }) {
  const form = useForm({ defaultValues: { [field.name]: '' } })
  return (
    <div className="w-80">
      <form.Field name={field.name}>
        {(api) => <FormField field={field} api={api} />}
      </form.Field>
    </div>
  )
}

const meta = {
  title: 'Form/FormField',
  component: FieldHarness,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldHarness>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    field: {
      name: 'fullName',
      label: 'Full name',
      type: 'text',
      required: true,
      placeholder: 'Jane Doe',
    },
  },
}

export const Textarea: Story = {
  args: {
    field: {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'How can we help?',
      description: 'Add as much detail as you like.',
    },
  },
}

export const NumberField: Story = {
  args: {
    field: {
      name: 'partySize',
      label: 'Party size',
      type: 'number',
      min: 1,
      max: 20,
      placeholder: '2',
    },
  },
}

export const Time: Story = {
  args: {
    field: { name: 'time', label: 'Preferred time', type: 'time' },
  },
}

export const SelectField: Story = {
  args: {
    field: {
      name: 'topic',
      label: 'Topic',
      type: 'select',
      placeholder: 'Select a topic',
      options: [
        { label: 'General question', value: 'general' },
        { label: 'Sales', value: 'sales' },
        { label: 'Support', value: 'support' },
      ],
    },
  },
}
