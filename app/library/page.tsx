"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stories = [
  {
    id: "oz",
    title: "The Wizard of Oz",
    description: "A classic tale of Dorothy's adventure in the magical land of Oz.",
    author: "L. Frank Baum",
    cover: "/placeholder.jpg",
    href: "/library/oz"
  },
  // Add more stories here
]

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-pastel-bg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-pastel-primary mb-6">Library</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <Link key={story.id} href={story.href} className="group">
              <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex-shrink-0 flex items-center justify-center bg-pastel-light rounded-full w-12 h-12 text-pastel-primary text-2xl">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-pastel-primary group-hover:underline truncate">{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-pastel-secondary text-sm mb-2">by {story.author}</div>
                  <div className="text-pastel-dark text-base line-clamp-2">{story.description}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
