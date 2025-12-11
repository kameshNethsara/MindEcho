import { type Journal } from "../services/journal.service"

// Count moods
export function getMoodCounts(journals: Journal[]) {
  const counts: Record<string, number> = {}

  journals.forEach((j) => {
    counts[j.moodEmoji] = (counts[j.moodEmoji] || 0) + 1
  })

  return counts
}

// Weekly Summary (last 7 days)
export function getWeeklySummary(journals: Journal[]) {
  const last7 = journals.filter((j) => {
    const date = new Date(j.createdAt)
    const diff = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 7
  })

  const counts = getMoodCounts(last7)

  const mostFrequentMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"
  const journalEntries = last7.length

  return {
    mostFrequentMood,
    journalEntries,
  }
}

// Monthly Summary
export function getMonthlySummary(journals: Journal[]) {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const thisMonth = journals.filter((j) => {
    const date = new Date(j.createdAt)
    return date.getMonth() === month && date.getFullYear() === year
  })

  const counts = getMoodCounts(thisMonth)

  return counts
}

// Mood Score (simple version)
export function calculateMoodScore(journals: Journal[]) {
  const moodWeights: Record<string, number> = {
    "😊": 10,
    "🤩": 10,
    "😎": 9,
    "😌": 8,
    "😐": 5,
    "😉": 6,
    "🎨": 7,
    "😬": 4,
    "😰": 3,
    "😢": 2,
    "😠": 1,
  }

  if (journals.length === 0) return 0

  let total = 0
  journals.forEach((j) => {
    total += moodWeights[j.moodEmoji] || 5
  })

  return Number((total / journals.length).toFixed(1))
}
