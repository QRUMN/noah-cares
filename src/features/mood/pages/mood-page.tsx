export default function MoodPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mood Tracker</h1>
        <p className="text-gray-600">
          Track your daily mood and see how it changes over time.
        </p>
      </div>

      {/* We'll add MoodInput, MoodList, and MoodChart components here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Entry</h2>
          {/* MoodInput component will go here */}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Entries</h2>
          {/* MoodList component will go here */}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Mood Trends</h2>
        {/* MoodChart component will go here */}
      </div>
    </div>
  )
}
