import { useState, useEffect } from 'react'
import { MoodEntry } from '@/types/mood'
import { moodService } from '../services/mood-service'
import MoodInput from '../components/mood-input'
import MoodList from '../components/mood-list'
import MoodChart from '../components/mood-chart'

export default function MoodPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    // Load initial entries
    const loadedEntries = moodService.getEntries()
    setEntries(loadedEntries)
  }, [])

  const handleAddEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry = moodService.addEntry(entry)
    setEntries([newEntry, ...entries])
  }

  const handleDeleteEntry = (id: string) => {
    moodService.deleteEntry(id)
    setEntries(entries.filter(entry => entry.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mood Tracker</h1>
        <p className="text-gray-600">
          Track your daily mood and see how it changes over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Entry</h2>
          <MoodInput onSubmit={handleAddEntry} />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Entries</h2>
          <MoodList entries={entries.slice(0, 5)} onDelete={handleDeleteEntry} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Mood Trends</h2>
        <MoodChart entries={entries} days={7} />
      </div>
    </div>
  )
}
