import { format } from 'date-fns'
import { MoodEntry } from '@/types/mood'

interface MoodListProps {
  entries: MoodEntry[]
  onDelete?: (id: string) => void
}

const MOOD_EMOJIS = ['😢', '🙁', '😐', '🙂', '😄']

export default function MoodList({ entries, onDelete }: MoodListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No mood entries yet. Start tracking your mood!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl" title={`Mood Level: ${entry.value}`}>
                {MOOD_EMOJIS[entry.value - 1]}
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {format(new Date(entry.timestamp), 'PPp')}
                </div>
                {entry.note && (
                  <div className="text-sm text-gray-500 mt-1">{entry.note}</div>
                )}
              </div>
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(entry.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            )}
          </div>
          {entry.tags && entry.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
