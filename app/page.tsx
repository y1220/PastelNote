import { NotesList } from "@/components/notes-list"
import { CatMascot } from "@/components/cat-mascot"
import { CreateNoteButton } from "@/components/create-note-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pastel-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-pastel-primary mb-2">Pastel Notes</h1>
          <p className="text-lg text-pastel-secondary mb-6">Connect your thoughts, visualize your ideas</p>
          <CatMascot message="Ready to take some purr-fect notes today?" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-pastel-primary">Your Notes</h2>
              <CreateNoteButton />
            </div>
            <NotesList />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-pastel-primary mb-4">Knowledge Graph</h2>
            <p className="text-pastel-secondary mb-4">Visualize connections between your notes</p>
            <div className="aspect-square bg-pastel-light rounded-lg flex items-center justify-center">
              <p className="text-pastel-secondary">Your graph will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
