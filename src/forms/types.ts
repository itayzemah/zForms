import type { SelectOption } from '#/components/ui/select'

/** Shared metadata every field carries. */
type BaseField = {
  /** Unique key within the form; used as the value key in submissions. */
  name: string
  label: string
  required?: boolean
  placeholder?: string
  /** Optional helper text rendered under the field. */
  description?: string
  /** Static string or factory called once at form initialisation. */
  defaultValue?: string | (() => string)
}

export type FieldDef =
  | (BaseField & { type: 'text' | 'textarea' })
  | (BaseField & { type: 'number'; min?: number; max?: number })
  | (BaseField & { type: 'time' })
  | (BaseField & { type: 'select'; options: Array<SelectOption> })
  /** Read-only field — always submitted with its fixed value, never editable. */
  | (BaseField & { type: 'static'; value: string })

export type FieldType = FieldDef['type']

export type FormDef = {
  /** URL slug + registry key. */
  id: string
  title: string
  description?: string
  /** Text shown on the submit button. */
  submitLabel?: string
  /** Enable RTL layout (e.g. Hebrew forms). */
  rtl?: boolean
  fields: Array<FieldDef>
}

/** A submitted form: field name -> value (all captured as strings). */
export type FormValues = Record<string, string>
