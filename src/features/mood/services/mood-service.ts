import { MoodEntry } from '@/types/mood'

const STORAGE_KEY = 'mood-entries'

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9)

// Load entries from localStorage
const loadEntries = (): MoodEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error loading mood entries:', error)
    return []
  }
}

// Save entries to localStorage
const saveEntries = (entries: MoodEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch (error) {
    console.error('Error saving mood entries:', error)
  }
}

export const moodService = {
  // Get all entries
  getEntries: () => {
    return loadEntries()
  },

  // Add a new entry
  addEntry: (entry: Omit<MoodEntry, 'id'>) => {
    const entries = loadEntries()
    const newEntry: MoodEntry = {
      ...entry,
      id: generateId(),
    }
    entries.unshift(newEntry) // Add to beginning of array
    saveEntries(entries)
    return newEntry
  },

  // Delete an entry
  deleteEntry: (id: string) => {
    const entries = loadEntries()
    const newEntries = entries.filter(entry => entry.id !== id)
    saveEntries(newEntries)
  },

  // Update an entry
  updateEntry: (id: string, updates: Partial<Omit<MoodEntry, 'id'>>) => {
    const entries = loadEntries()
    const index = entries.findIndex(entry => entry.id === id)
    if (index === -1) return null

    const updatedEntry = { ...entries[index], ...updates }
    entries[index] = updatedEntry
    saveEntries(entries)
    return updatedEntry
  },

  // Get entries for a specific date range
  getEntriesInRange: (startDate: Date, endDate: Date) => {
    const entries = loadEntries()
    return entries.filter(entry => {
      const entryDate = new Date(entry.timestamp)
      return entryDate >= startDate && entryDate <= endDate
    })
  }
}
