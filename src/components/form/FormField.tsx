import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Select } from '#/components/ui/select'
import { cn } from '#/lib/utils'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FieldDef } from '#/forms/types'

/** Normalize TanStack Form / standard-schema errors to display strings. */
function errorMessages(errors: Array<unknown>): Array<string> {
  return errors
    .map((err) => {
      if (!err) return ''
      if (typeof err === 'string') return err
      if (typeof err === 'object' && 'message' in err) {
        return String(err.message)
      }
      return String(err)
    })
    .filter(Boolean)
}

/** Renders the right control for a field definition, wired to a form field API. */
export function FormField({
  field,
  api,
}: {
  field: FieldDef
  api: AnyFieldApi
}) {
  if (field.type === 'static') {
    return (
      <div className="flex flex-col gap-1.5">
        <Label className="text-muted-foreground text-xs">{field.label}</Label>
        <div className="border-input bg-muted/40 text-muted-foreground flex h-9 w-full items-center rounded-md border px-3 py-1 text-sm select-none">
          {field.value}
        </div>
      </div>
    )
  }

  const value = (api.state.value as string | undefined) ?? ''
  const isInvalid = api.state.meta.isTouched && !api.state.meta.isValid
  const messages = isInvalid ? errorMessages(api.state.meta.errors) : []
  const describedBy = field.description ? `${api.name}-desc` : undefined

  const commonProps = {
    id: api.name,
    name: api.name,
    'aria-invalid': isInvalid || undefined,
    'aria-describedby': describedBy,
    onBlur: api.handleBlur,
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={api.name}>
        {field.label}
        {field.required ? (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>

      {field.type === 'textarea' ? (
        <Textarea
          {...commonProps}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => api.handleChange(e.target.value)}
        />
      ) : field.type === 'select' ? (
        <Select
          {...commonProps}
          value={value}
          options={field.options}
          placeholder={field.placeholder}
          onChange={(e) => api.handleChange(e.target.value)}
        />
      ) : (
        <>
          <Input
            {...commonProps}
            type={
              field.type === 'number'
                ? 'number'
                : field.type === 'time'
                  ? 'time'
                  : 'text'
            }
            value={value}
            placeholder={field.placeholder}
            min={field.type === 'number' ? field.min : undefined}
            max={field.type === 'number' ? field.max : undefined}
            onChange={(e) => api.handleChange(e.target.value)}
          />
          {field.type === 'text' && field.shortcuts?.map((sc) => (
            <label key={sc.value} className="flex items-center gap-2 text-sm cursor-pointer w-fit">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={value === sc.value}
                onChange={(e) => api.handleChange(e.target.checked ? sc.value : '')}
              />
              {sc.label}
            </label>
          ))}
        </>
      )}

      {field.description ? (
        <p id={describedBy} className="text-muted-foreground text-xs">
          {field.description}
        </p>
      ) : null}

      {messages.map((message) => (
        <p key={message} className={cn('text-destructive text-xs')}>
          {message}
        </p>
      ))}
    </div>
  )
}
