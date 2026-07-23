import type { FormDef } from '../types'

export const serviceBooking: FormDef = {
  id: 'service-booking',
  title: 'Service Booking',
  description: 'Book a slot and share the details in one tap.',
  submitLabel: 'Generate booking',
  fields: [
    {
      name: 'customerName',
      label: 'Customer name',
      type: 'text',
      required: true,
      placeholder: 'Jane Doe',
    },
    {
      name: 'service',
      label: 'Service',
      type: 'select',
      required: true,
      placeholder: 'Choose a service',
      options: [
        { label: 'Consultation', value: 'consultation' },
        { label: 'Inspection', value: 'inspection' },
        { label: 'Repair', value: 'repair' },
        { label: 'Installation', value: 'installation' },
      ],
    },
    {
      name: 'partySize',
      label: 'Party size',
      type: 'number',
      required: true,
      min: 1,
      max: 20,
      placeholder: '2',
    },
    {
      name: 'time',
      label: 'Preferred time',
      type: 'time',
      required: true,
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      placeholder: 'Anything we should know?',
    },
  ],
}
