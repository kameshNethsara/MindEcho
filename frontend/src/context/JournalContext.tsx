import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getJournals, createJournal, deleteJournal, type Journal as JournalType } from "../services/journal.service"
import Swal from "sweetalert2"

// Define the shape of the context
interface JournalContextProps {
  journals: JournalType[]
  loading: boolean
  fetchJournals: () => Promise<void>
  addJournal: (moodEmoji: string, text: string) => Promise<void>
  removeJournal: (id: string) => Promise<void>
}

// Create the context
const JournalContext = createContext<JournalContextProps | undefined>(undefined)

// Provider component
export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [journals, setJournals] = useState<JournalType[]>([])
  const [loading, setLoading] = useState(false)

  const fetchJournals = async () => {
    setLoading(true)
    try {
      const res = await getJournals(1, 10)
      setJournals(res.data)
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to load journals.", "error")
    }
    setLoading(false)
  }

  const addJournal = async (moodEmoji: string, text: string) => {
    try {
      await createJournal({ moodEmoji, text })
      Swal.fire({
        icon: "success",
        title: "Journal Added!",
        timer: 1200,
        showConfirmButton: false,
      })
      fetchJournals()
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to create journal entry.", "error")
    }
  }

  const removeJournal = async (id: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This entry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    })

    if (!isConfirmed) return

    try {
      await deleteJournal(id)
      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1200,
        showConfirmButton: false,
      })
      fetchJournals()
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to delete journal.", "error")
    }
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  return (
    <JournalContext.Provider value={{ journals, loading, fetchJournals, addJournal, removeJournal }}>
      {children}
    </JournalContext.Provider>
  )
}

// Hook for consuming context
export const useJournal = () => {
  const context = useContext(JournalContext)
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider")
  }
  return context
}

export default JournalProvider
