import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '#/lib/utils'

export type SelectOption = { label: string; value: string }

/**
 * Dependency-free select built on a styled native `<select>`.
 * Works with SSR and matches the shadcn "new-york" input styling.
 */
function Select({
  className,
  options,
  placeholder,
  ...props
}: React.ComponentProps<'select'> & {
  options: Array<SelectOption>
  placeholder?: string
}) {
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        className={cn(
          'border-input flex h-9 w-full appearance-none rounded-md border bg-transparent px-3 py-1 pr-8 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
          !props.value && 'text-muted-foreground',
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
    </div>
  )
}

export { Select }
