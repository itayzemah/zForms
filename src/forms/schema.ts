import { z } from 'zod'
import type { FieldDef, FormDef } from './types'

/** Build a Zod field validator for a single field definition. */
function fieldSchema(field: FieldDef) {
  // Static fields are always valid — their value is fixed at definition time.
  if (field.type === 'static') return z.string()

  const requiredMsg = `${field.label} is required`

  if (field.type === 'number') {
    return z
      .string()
      .refine((v) => v === '' || !Number.isNaN(Number(v)), {
        message: `${field.label} must be a number`,
      })
      .refine((v) => v === '' || typeof field.min !== 'number' || Number(v) >= field.min, {
        message: `${field.label} must be at least ${field.min}`,
      })
      .refine((v) => v === '' || typeof field.max !== 'number' || Number(v) <= field.max, {
        message: `${field.label} must be at most ${field.max}`,
      })
      .refine((v) => !field.required || v.trim().length > 0, {
        message: requiredMsg,
      })
  }

  // text | textarea | time | select — all string-valued
  return z.string().refine((v) => !field.required || v.trim().length > 0, {
    message: requiredMsg,
  })
}

/** Derive a Zod object schema for a whole form definition. */
export function buildZodSchema(form: FormDef) {
  const shape: Record<string, ReturnType<typeof fieldSchema>> = {}
  for (const field of form.fields) {
    shape[field.name] = fieldSchema(field)
  }
  return z.object(shape)
}

/** Default (empty) values for every field in a form. */
export function defaultValues(form: FormDef): Record<string, string> {
  const values: Record<string, string> = {}
  for (const field of form.fields) {
    if (field.type === 'static') {
      values[field.name] = field.value
    } else if (typeof field.defaultValue === 'function') {
      values[field.name] = field.defaultValue()
    } else {
      values[field.name] = field.defaultValue ?? ''
    }
  }
  return values
}
