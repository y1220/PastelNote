import { NotesList } from "@/components/notes-list"
import { CreateNoteButton } from "@/components/create-note-button"
import Link from "next/link"

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-pastel-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pastel-primary">Your Notes</h1>
          <CreateNoteButton />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <NotesList />
        </div>
      </div>
    </div>
  )
}
