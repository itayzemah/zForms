import { useState } from 'react'
import { Check, Copy, MessageCircle } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { formatSubmission, whatsappShareUrl } from '#/forms/format'
import type { FormDef, FormValues } from '#/forms/types'

/** Displays a submitted form with Copy and WhatsApp share actions. */
export function FormResult({
  form,
  values,
}: {
  form: FormDef
  values: FormValues
}) {
  const [copied, setCopied] = useState(false)
  const text = formatSubmission(form, values)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard may be unavailable (e.g. insecure context); ignore silently.
    }
  }

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle>Your submission</CardTitle>
        <CardDescription>
          Copy it or share it straight to WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted/40 text-foreground overflow-x-auto rounded-md border p-4 text-sm whitespace-pre-wrap">
          {text}
        </pre>
      </CardContent>
      <CardFooter className="gap-3">
        <Button type="button" variant="outline" onClick={handleCopy}>
          {copied ? <Check /> : <Copy />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button asChild>
          <a
            href={whatsappShareUrl(text)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle />
            Share to WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
