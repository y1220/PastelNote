"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-pastel-primary" />
              <span className="ml-2 text-xl font-bold text-pastel-primary">Pastel Notes</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/notes"
              className="text-pastel-secondary hover:text-pastel-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Notes
            </Link>
            <Link
              href="/graph"
              className="text-pastel-secondary hover:text-pastel-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Graph
            </Link>
            <Link
              href="/ai-assistant"
              className="text-pastel-secondary hover:text-pastel-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              AI Assistant
            </Link>
            <ModeToggle />
            <Button variant="outline" className="ml-4">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </nav>

          <div className="md:hidden flex items-center">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-pastel-secondary hover:text-pastel-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/notes"
              className="text-pastel-secondary hover:text-pastel-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Notes
            </Link>
            <Link
              href="/graph"
              className="text-pastel-secondary hover:text-pastel-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Graph
            </Link>
            <Link
              href="/ai-assistant"
              className="text-pastel-secondary hover:text-pastel-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              AI Assistant
            </Link>
            <Button variant="outline" className="w-full mt-2">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
