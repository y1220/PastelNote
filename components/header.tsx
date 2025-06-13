"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Pastel Notes
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/notes">
              <Button
                variant="ghost"
                className="text-gray-600 transition-colors duration-200 hover:text-pink-600 hover:bg-pink-50/80 active:bg-pink-50"
              >
                Notes
              </Button>
            </Link>
            <Link href="/graph">
              <Button
                variant="ghost"
                className="text-gray-600 transition-colors duration-200 hover:text-purple-600 hover:bg-purple-50/80 active:bg-purple-50"
              >
                Graph
              </Button>
            </Link>
            <Link href="/ai-assistant">
              <Button
                variant="ghost"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 active:bg-indigo-50"
              >
                AI Assistant
              </Button>
            </Link>
            <ModeToggle />
            <Button
              variant="outline"
              className="ml-4 border-gray-200 transition-all duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </nav>

          <div className="md:hidden flex items-center space-x-3">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 transition-all duration-200 hover:text-gray-700"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-1">
            <Link href="/notes" className="block w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 transition-colors duration-200 hover:text-pink-600 hover:bg-pink-50/80 active:bg-pink-50"
              >
                Notes
              </Button>
            </Link>
            <Link href="/graph" className="block w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 transition-colors duration-200 hover:text-purple-600 hover:bg-purple-50/80 active:bg-purple-50"
              >
                Graph
              </Button>
            </Link>
            <Link href="/ai-assistant" className="block w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 transition-colors duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 active:bg-indigo-50"
              >
                AI Assistant
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full mt-4 border-gray-200 transition-all duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 shadow-sm"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
