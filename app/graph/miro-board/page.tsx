"use client"
import MiroBoardPage from "../miro-board"
import { useSearchParams } from "next/navigation"

export default function MiroBoardWrapper() {
  const searchParams = useSearchParams()
  const noteId = searchParams.get("noteId")

  // If noteId is present, fetch note-specific graph, else global
  // MiroBoardPage will fetch if no graphData is passed
  return <MiroBoardPage key={noteId || "global"} />
}
