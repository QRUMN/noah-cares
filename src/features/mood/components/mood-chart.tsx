import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format, subDays } from 'date-fns'
import { MoodEntry } from '@/types/mood'

interface MoodChartProps {
  entries: MoodEntry[]
  days?: number
}

export default function MoodChart({ entries, days = 7 }: MoodChartProps) {
  const chartData = useMemo(() => {
    const now = new Date()
    const startDate = subDays(now, days - 1)
    const dateMap = new Map<string, { date: string; value: number; count: number }>()

    // Initialize all dates
    for (let i = 0; i < days; i++) {
      const date = format(subDays(now, i), 'yyyy-MM-dd')
      dateMap.set(date, { date, value: 0, count: 0 })
    }

    // Aggregate mood values by date
    entries.forEach((entry) => {
      const date = format(new Date(entry.timestamp), 'yyyy-MM-dd')
      if (dateMap.has(date)) {
        const current = dateMap.get(date)!
        current.value += entry.value
        current.count += 1
      }
    })

    // Calculate averages and format for chart
    return Array.from(dateMap.values())
      .map((item) => ({
        date: item.date,
        value: item.count > 0 ? item.value / item.count : null,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [entries, days])

  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No mood data available for the chart.
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
          />
          <YAxis domain={[1, 5]} tickCount={5} />
          <Tooltip
            labelFormatter={(date) => format(new Date(date), 'PPP')}
            formatter={(value: number) =>
              value ? [value.toFixed(1), 'Mood Level'] : ['No data', 'Mood Level']
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
