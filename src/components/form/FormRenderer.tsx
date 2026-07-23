import { useMemo, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { FormField } from './FormField'
import { FormResult } from './FormResult'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { buildZodSchema, defaultValues } from '#/forms/schema'
import type { FormDef, FormValues } from '#/forms/types'

/** Renders any form definition and shows the submission below on success. */
export function FormRenderer({ form }: { form: FormDef }) {
  const [submitted, setSubmitted] = useState<FormValues | null>(null)

  const schema = useMemo(() => buildZodSchema(form), [form])
  const initialValues = useMemo(() => defaultValues(form), [form])

  const formApi = useForm({
    defaultValues: initialValues,
    validators: { onChange: schema },
    onSubmit: ({ value }) => {
      setSubmitted({ ...(value as FormValues) })
    },
  })

  return (
    <div className="flex flex-col gap-6">
      <Card className="feature-card" dir={form.rtl ? 'rtl' : undefined}>
        <CardHeader>
          <CardTitle className="display-title text-2xl">{form.title}</CardTitle>
          {form.description ? (
            <CardDescription>{form.description}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void formApi.handleSubmit()
            }}
          >
            {form.fields.map((field) => (
              <formApi.Field key={field.name} name={field.name}>
                {(api) => <FormField field={field} api={api} />}
              </formApi.Field>
            ))}

            <formApi.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} className="self-start">
                  {isSubmitting
                    ? 'Submitting…'
                    : (form.submitLabel ?? 'Submit')}
                </Button>
              )}
            </formApi.Subscribe>
          </form>
        </CardContent>
      </Card>

      {submitted ? <FormResult form={form} values={submitted} /> : null}
    </div>
  )
}
