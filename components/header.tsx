"use client"

import Link from "next/link"
import { useState } from "react"
import { X, BookOpen, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeView, setActiveView] = useState("")
  const [hoveredItem, setHoveredItem] = useState("")

  const navigateTo = (path: string, view: string) => {
    setActiveView(view)
    setIsMenuOpen(false)
    window.location.href = path
  }

  const NavButton = ({
    view,
    children,
    path,
  }: {
    view: string
    children: React.ReactNode
    path: string
  }) => {
    const isActive = activeView === view
    const isHovered = hoveredItem === view

    return (
      <button
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
          isActive
            ? "bg-gray-900 text-white shadow-md"
            : isHovered
              ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm scale-105"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
        )}
        onClick={() => navigateTo(path, view)}
        onMouseEnter={() => setHoveredItem(view)}
        onMouseLeave={() => setHoveredItem("")}
      >
        {children}
      </button>
    )
  }

  const MobileNavButton = ({
    view,
    children,
    path,
  }: {
    view: string
    children: React.ReactNode
    path: string
  }) => {
    const isActive = activeView === view
    const isHovered = hoveredItem === view

    return (
      <button
        className={cn(
          "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gray-900 text-white shadow-md"
            : isHovered
              ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
        )}
        onClick={() => navigateTo(path, view)}
        onMouseEnter={() => setHoveredItem(view)}
        onMouseLeave={() => setHoveredItem("")}
      >
        {children}
      </button>
    )
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-white/20 dark:border-gray-800/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-rose-500 transition-all duration-200">
                Pastel Notes
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <NavButton view="notes" path="/notes">Notes</NavButton>
            <NavButton view="library" path="/library">Library</NavButton>
            <NavButton view="graph" path="/graph">Graph</NavButton>
            <NavButton view="ai" path="/ai-assistant">AI Assistant</NavButton>
            <ModeToggle />
            <Button
              variant="outline"
              className="ml-4 border-gray-200 dark:border-gray-700 transition-all duration-200 hover:border-pink-300 dark:hover:border-pink-700 hover:bg-pink-50/90 dark:hover:bg-pink-500/10 hover:text-pink-600 dark:hover:text-pink-400 hover:shadow-md hover:scale-105"
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
              className="text-gray-500 dark:text-gray-400 transition-all duration-200 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-1">
            <MobileNavButton view="notes" path="/notes">Notes</MobileNavButton>
            <MobileNavButton view="graph" path="/graph">Graph</MobileNavButton>
            <MobileNavButton view="ai" path="/ai-assistant">AI Assistant</MobileNavButton>
            <Button
              variant="outline"
              className="w-full mt-4 border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-500/10 hover:text-pink-600 dark:hover:text-pink-400 shadow-sm hover:shadow-md transition-all duration-200"
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
