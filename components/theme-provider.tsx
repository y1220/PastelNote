'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Only add suppressHydrationWarning if this is a client component
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so we can safely show the UI without hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
