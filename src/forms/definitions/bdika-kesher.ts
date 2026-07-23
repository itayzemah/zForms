import type { FormDef } from '../types'

function hhmm(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function nearestHour(): string {
  const d = new Date()
  if (d.getMinutes() >= 30) d.setHours(d.getHours() + 1)
  d.setMinutes(0)
  return hhmm(d)
}

const ANSWERED = [
  { label: 'ענו', value: 'ענו' },
  { label: 'לא ענו', value: 'לא ענו' },
]

export const bdikaKesher: FormDef = {
  id: 'bdika-kesher',
  title: 'בדיקת קשר',
  description: 'בדיקת קשר — מלא ושתף בוואטסאפ',
  submitLabel: 'שתף בוואטסאפ',
  rtl: true,
  fields: [
    { name: 'shaah', label: 'שעה', type: 'time', required: true, defaultValue: nearestHour },
    { name: 'hafak', label: 'חפק', type: 'text', required: true, placeholder: 'מיקום...', shortcuts: [{ label: 'מכלאות', value: 'מכלאות' }] },
    { name: 'dores', label: 'דורס', type: 'text', required: true, placeholder: 'מיקום...' },
    { name: 'carmel', label: 'כרמל', type: 'text', required: true, placeholder: 'מיקום...', shortcuts: [{ label: 'מכלאות', value: 'מכלאות' }] },
    { name: 'machsom_beitar', label: 'מחסום בית"ר', type: 'select', required: true, placeholder: 'בחר...', options: ANSWERED },
    { name: 'tzur_hadassah', label: 'צור הדסה', type: 'select', required: true, placeholder: 'בחר...', options: ANSWERED },
  ],
  formatOutput(values) {
    const time = values.shaah ?? ''
    const entries: Array<[string, string]> = [
      ['חפק', values.hafak ?? ''],
      ['דורס', values.dores ?? ''],
      ['כרמל', values.carmel ?? ''],
      ['מחסום בית"ר', values.machsom_beitar ?? ''],
      ['צור הדסה', values.tzur_hadassah ?? ''],
    ]
    const lines = [`*השפעה שעה ${time}*`]
    for (const [label, val] of entries) {
      if (val.trim()) lines.push(`${label} - ${val}`)
    }
    return lines.join('\n')
  },
}
