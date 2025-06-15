"use client"

import { useState } from "react"
import {
  Edit3,
  Clock,
  Share2,
  BookmarkPlus,
  MoreHorizontal,
  Network,
  Sparkles,
  CheckSquare,
  Save,
  X,
  Tag,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NoteDetail({ note, onClose }: { note: any, onClose: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [tempTitle, setTempTitle] = useState(note?.title || "")
  const [tempContent, setTempContent] = useState(note?.content || "")

  const handleSave = () => {
    setTitle(tempTitle)
    setContent(tempContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempTitle(title)
    setTempContent(content)
    setIsEditing(false)
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-rose-500/20 rounded-lg px-2 py-1 w-full font-quicksand"
              placeholder="Enter note title..."
            />
          ) : (
            <div className="flex items-center gap-3 group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent font-quicksand">
                {title}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 hover:text-rose-600"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel} className="hover:bg-gray-50 font-medium">
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md font-medium"
              >
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                <BookmarkPlus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                <Share2 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-50">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 font-quicksand">
                  <DropdownMenuItem>
                    <Tag className="h-4 w-4 mr-2" /> Add Tags
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" /> Set Reminder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Delete Note</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Updated {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : 'Unknown'}</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        {(note.tags || []).map((tag: string) => (
          <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium">
            {tag}
          </Badge>
        ))}
      </div>
      {/* Growth Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Growth Progress</span>
          <span className="font-medium text-emerald-600">50%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: '50%' }}
          />
        </div>
      </div>
      {/* Content */}
      <div className="prose prose-gray max-w-none">
        {isEditing ? (
          <textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            className="w-full min-h-[200px] text-gray-700 bg-transparent border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 resize-none font-quicksand"
            placeholder="Start writing your note..."
          />
        ) : (
          <div className="text-gray-700 leading-relaxed text-lg font-quicksand">
            {content || "No content yet. Click edit to add some content."}
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-16 flex-col gap-2 hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 hover:border-purple-200 group transition-all duration-200 font-medium"
          >
            <Network className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-700 group-hover:text-purple-700">View in Graph</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col gap-2 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:border-amber-200 group transition-all duration-200 font-medium"
          >
            <Sparkles className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-700 group-hover:text-amber-700">AI Insights</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col gap-2 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 hover:border-emerald-200 group transition-all duration-200 font-medium"
          >
            <CheckSquare className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-700 group-hover:text-emerald-700">See Tasks</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
