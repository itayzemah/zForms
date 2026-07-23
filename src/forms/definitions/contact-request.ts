import type { FormDef } from '../types'

export const contactRequest: FormDef = {
  id: 'contact-request',
  title: 'Contact Request',
  description: 'Reach out and we will get back to you shortly.',
  submitLabel: 'Generate message',
  fields: [
    {
      name: 'fullName',
      label: 'Full name',
      type: 'text',
      required: true,
      placeholder: 'Jane Doe',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      placeholder: 'jane@example.com',
    },
    {
      name: 'topic',
      label: 'Topic',
      type: 'select',
      required: true,
      placeholder: 'Select a topic',
      options: [
        { label: 'General question', value: 'general' },
        { label: 'Sales', value: 'sales' },
        { label: 'Support', value: 'support' },
        { label: 'Partnership', value: 'partnership' },
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'How can we help?',
      description: 'Add as much detail as you like.',
    },
  ],
}
