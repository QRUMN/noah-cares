export interface MoodEntry {
  id: string
  value: number // 1-5 scale
  note?: string
  timestamp: string
  tags?: string[]
}

export type TrendType = 'improving' | 'declining' | 'stable'

export interface MoodTrend {
  type: TrendType
  startValue: number
  endValue: number
  periodStart: string
  periodEnd: string
}
