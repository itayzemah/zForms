import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getForm } from '#/forms/registry'
import { FormRenderer } from '#/components/form/FormRenderer'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/forms/$formId')({
  component: FormPage,
})

function FormPage() {
  const { formId } = Route.useParams()
  const form = getForm(formId)

  return (
    <div className="page-wrap py-12">
      <Link to="/" className="no-underline">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft />
          All forms
        </Button>
      </Link>

      {form ? (
        <div className="rise-in">
          <FormRenderer form={form} />
        </div>
      ) : (
        <div className="island-shell rounded-xl p-8">
          <h1 className="display-title text-2xl font-bold">Form not found</h1>
          <p className="mt-2 text-[var(--sea-ink-soft)]">
            No form exists with id{' '}
            <code>{formId}</code>. Pick one from the home page.
          </p>
        </div>
      )}
    </div>
  )
}
