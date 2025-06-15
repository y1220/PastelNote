"use client"

import React, { useEffect } from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import logger from "@/lib/logger"
import { Quicksand } from "next/font/google"

const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Move both useEffect calls inside the component
  useEffect(() => {
    logger.info('Application starting up (client-side)');
    logger.info('Client-side rendering complete');
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={quicksand.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
