import { bdikaKesher } from './definitions/bdika-kesher'
import { hatasa } from './definitions/hatasa'
import type { FormDef } from './types'

/** All forms available in the factory. Add a new form by appending here. */
export const forms: Array<FormDef> = [hatasa, bdikaKesher]

/** Look up a form definition by its id/slug. */
export function getForm(id: string): FormDef | undefined {
  return forms.find((form) => form.id === id)
}
