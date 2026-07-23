import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, FileText } from 'lucide-react'
import { forms } from '#/forms/registry'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="page-wrap py-16">
      <header className="rise-in mb-10 flex flex-col gap-3">
        <span className="island-kicker">Forms Factory</span>
        <h1 className="display-title text-4xl font-bold">Pick a form</h1>
        <p className="max-w-xl text-lg text-[var(--sea-ink-soft)]">
          Choose a form, fill it in, and instantly copy the result or share it
          to WhatsApp.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {forms.map((form) => (
          <Link
            key={form.id}
            to="/forms/$formId"
            params={{ formId: form.id }}
            className="group no-underline"
          >
            <Card className="feature-card h-full cursor-pointer">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <FileText className="size-5 text-[var(--lagoon-deep)]" />
                  <ArrowRight className="size-5 text-[var(--sea-ink-soft)] transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="text-xl">{form.title}</CardTitle>
                {form.description ? (
                  <CardDescription>{form.description}</CardDescription>
                ) : null}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
