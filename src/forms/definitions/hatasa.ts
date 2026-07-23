import type { FormDef } from '../types'

const NAMES = [
  { label: 'איתי', value: 'איתי' },
  { label: 'סטס', value: 'סטס' },
  { label: 'אלון', value: 'אלון' },
  { label: 'אבי', value: 'אבי' },
  { label: 'ניקיטה', value: 'ניקיטה' },
  { label: 'שון', value: 'שון' },
  { label: 'לירון', value: 'לירון' },
  { label: 'אבישג', value: 'אבישג' },
  { label: 'ניב', value: 'ניב' },
]

const PHONES = [
  { label: 'אבי - 050-869-3468', value: 'אבי - 050-869-3468' },
  { label: 'ניב - 054-330-4707', value: 'ניב - 054-330-4707' },
  { label: 'שון - 054-802-7559', value: 'שון - 054-802-7559' },
  { label: 'אבישג אלפיה - 052-709-0130', value: 'אבישג אלפיה - 052-709-0130' },
  { label: 'לירון סמנדואב - 053-334-7827', value: 'לירון סמנדואב - 053-334-7827' },
  { label: 'סטס - 058-427-0520', value: 'סטס - 058-427-0520' },
  { label: 'ניקיטה - 050-876-5328', value: 'ניקיטה - 050-876-5328' },
  { label: 'אלון - 054-525-0666', value: 'אלון - 054-525-0666' },
  { label: 'איתי - 052-875-3953', value: 'איתי - 052-875-3953' },
  { label: 'חמ"ל - 0529019328', value: 'חמ"ל - 0529019328' },
]

function hhmm(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function nowTime(): string {
  return hhmm(new Date())
}

function oneHourLater(): string {
  const d = new Date()
  d.setHours(d.getHours() + 1)
  return hhmm(d)
}

export const hatasa: FormDef = {
  id: 'hatasa',
  title: 'הטסה',
  description: 'טופס הטסה — מלא את הפרטים ושתף בוואטסאפ',
  submitLabel: 'שתף בוואטסאפ',
  rtl: true,
  fields: [
    {
      name: 'mefaked',
      label: 'מפקד הטסה',
      type: 'select',
      required: true,
      placeholder: 'בחר שם',
      options: [
        { label: 'אורן', value: 'אורן' },
        { label: 'אלון', value: 'אלון' },
        { label: 'אלעזר', value: 'אלעזר' },
        { label: 'רוני', value: 'רוני' },
        { label: 'דין', value: 'דין' },
        { label: 'איתן', value: 'איתן' },
      ],
    },
    {
      name: 'meafil',
      label: 'מפעיל',
      type: 'select',
      required: true,
      placeholder: 'בחר שם',
      options: NAMES,
    },
    { name: 'koah', label: 'כוח', type: 'static', value: '996' },
    { name: 'degemKli', label: 'דגם הכלי', type: 'static', value: 'איבו' },
    {
      name: 'misparSiduri',
      label: 'מספר סידורי',
      type: 'select',
      required: true,
      placeholder: 'בחר כלי',
      options: [
        { label: 'חפ"ק - 1748FEV3HMA824181240', value: '1748FEV3HMA824181240' },
        { label: 'סיור - 1748FEV3HMK824411064', value: '1748FEV3HMK824411064' },
      ],
    },
    { name: 'bereshit', label: 'בראשית', type: 'static', value: '243,242,102' },
    { name: 'govah', label: 'גובה', type: 'static', value: 'עד 100 מעפ"ש' },
    { name: 'mekom', label: 'מיקום גיאוגרפי', type: 'static', value: 'צור הדסה' },
    { name: 'misima', label: 'משימה', type: 'static', value: 'סיור' },
    {
      name: 'shaotMi',
      label: 'שעות פעילות מ',
      type: 'time',
      required: true,
      defaultValue: nowTime,
    },
    {
      name: 'shaotAd',
      label: 'שעות פעילות עד',
      type: 'time',
      required: true,
      defaultValue: oneHourLater,
    },
    {
      name: 'phone1',
      label: 'טלפון 1',
      type: 'select',
      required: true,
      placeholder: 'בחר טלפון',
      options: PHONES,
    },
    {
      name: 'phone2',
      label: 'טלפון 2',
      type: 'select',
      required: true,
      placeholder: 'בחר טלפון',
      options: PHONES,
      defaultValue: 'חמ"ל - 0529019328',
    },
    { name: 'hativa', label: 'חטיבה', type: 'static', value: 'עציון' },
    {
      name: 'zmanLahorida',
      label: 'זמן להורדה',
      type: 'time',
      required: true,
      defaultValue: oneHourLater,
    },
  ],
}
