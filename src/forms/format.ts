import type { FormDef, FormValues } from './types'

/** Render a value for display, resolving select values to their labels. */
function displayValue(
  form: FormDef,
  name: string,
  value: string,
): string {
  const field = form.fields.find((f) => f.name === name)
  if (field?.type === 'select') {
    return field.options.find((o) => o.value === value)?.label ?? value
  }
  return value
}

/**
 * Format a submission as a WhatsApp-friendly plain-text block.
 * Used as the single source of truth for both Copy and WhatsApp share.
 * Empty fields are skipped.
 */
export function formatSubmission(form: FormDef, values: FormValues): string {
  if (form.formatOutput) return form.formatOutput(values)

  const lines: Array<string> = [`*${form.title}*`, '']

  for (const field of form.fields) {
    const raw = values[field.name] ?? ''
    if (raw.trim().length === 0) continue
    lines.push(`${field.label}: ${displayValue(form, field.name, raw)}`)
  }

  return lines.join('\n')
}

/** Build a WhatsApp share-sheet URL with the formatted submission prefilled. */
export function whatsappShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
