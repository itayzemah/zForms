import * as React from 'react'
import { cn } from '#/lib/utils'

/**
 * Minimal, dependency-free replacement for @radix-ui/react-slot.
 * Merges the Slot's props onto its single React element child,
 * combining `className`, `style`, and event handlers.
 */
function Slot({
  children,
  ...slotProps
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}) {
  if (!React.isValidElement(children)) {
    return null
  }

  const childProps = children.props as Record<string, unknown>

  const mergedProps: Record<string, unknown> = { ...childProps, ...slotProps }

  // Merge className
  mergedProps.className = cn(
    slotProps.className,
    childProps.className as string | undefined,
  )

  // Merge style
  if (slotProps.style || childProps.style) {
    mergedProps.style = {
      ...(childProps.style as React.CSSProperties | undefined),
      ...slotProps.style,
    }
  }

  // Merge event handlers (both called; child's runs after slot's)
  for (const key of Object.keys(slotProps)) {
    if (/^on[A-Z]/.test(key)) {
      const slotHandler = (slotProps as Record<string, unknown>)[key]
      const childHandler = childProps[key]
      if (typeof slotHandler === 'function' && typeof childHandler === 'function') {
        mergedProps[key] = (...args: Array<unknown>) => {
          ;(slotHandler as (...a: Array<unknown>) => void)(...args)
          ;(childHandler as (...a: Array<unknown>) => void)(...args)
        }
      }
    }
  }

  return React.cloneElement(children, mergedProps)
}

export { Slot }
