import { useState } from 'react'
import { MoodEntry } from '@/types/mood'

interface MoodInputProps {
  onSubmit: (entry: Omit<MoodEntry, 'id'>) => void
}

const MOOD_LEVELS = [
  { value: 1, label: '😢 Very Bad' },
  { value: 2, label: '🙁 Bad' },
  { value: 3, label: '😐 Okay' },
  { value: 4, label: '🙂 Good' },
  { value: 5, label: '😄 Very Good' },
]

export default function MoodInput({ onSubmit }: MoodInputProps) {
  const [value, setValue] = useState<number>(3)
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      value,
      note: note.trim(),
      timestamp: new Date().toISOString(),
      tags: [], // We'll implement tags later
    })
    setNote('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How are you feeling?
        </label>
        <div className="grid grid-cols-5 gap-2">
          {MOOD_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setValue(level.value)}
              className={`p-2 rounded-lg text-center transition-colors ${
                value === level.value
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{level.label.split(' ')[0]}</div>
              <div className="text-xs">{level.label.split(' ')[1]}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
          Add a note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="How was your day? What made you feel this way?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Entry
      </button>
    </form>
  )
}
