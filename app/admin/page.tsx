'use client'

import { useEffect, useState } from 'react'
import { supabase, type TemperatureReading } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminPage() {
  const [readings, setReadings] = useState<TemperatureReading[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReadings()
  }, [])

  const fetchReadings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('temperature_readings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setReadings(data || [])
    } catch (err) {
      console.error('Error fetching readings:', err)
      setError('Failed to load temperature readings')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    if (readings.length === 0) return null

    const temps = readings.map((r) => r.temperature_celsius)
    const average = temps.reduce((sum, temp) => sum + temp, 0) / temps.length
    const min = Math.min(...temps)
    const max = Math.max(...temps)

    const userStats = readings.reduce((acc, reading) => {
      if (!acc[reading.user_name]) {
        acc[reading.user_name] = []
      }
      acc[reading.user_name].push(reading.temperature_celsius)
      return acc
    }, {} as Record<string, number[]>)

    const userAverages = Object.entries(userStats).map(([name, temps]) => ({
      name,
      average: temps.reduce((sum, temp) => sum + temp, 0) / temps.length,
      count: temps.length,
    }))

    return {
      overall: { average, min, max, count: readings.length },
      byUser: userAverages,
    }
  }

  const stats = calculateStats()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <button
              onClick={fetchReadings}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {stats && (
            <>
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Readings</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.overall.count}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Average Temp</div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.overall.average.toFixed(2)}°C
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Min Temp</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.overall.min.toFixed(2)}°C
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Max Temp</div>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.overall.max.toFixed(2)}°C
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Average by User
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {stats.byUser.map((user) => (
                    <div
                      key={user.name}
                      className="border border-gray-200 p-4 rounded-lg"
                    >
                      <div className="font-semibold text-gray-800">{user.name}</div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {user.average.toFixed(2)}°C
                      </div>
                      <div className="text-sm text-gray-600">
                        {user.count} reading{user.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              All Temperature Readings
            </h2>
            {readings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No temperature readings yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Temperature
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date & Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {readings.map((reading) => (
                      <tr key={reading.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {reading.user_name}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-indigo-600">
                          {reading.temperature_celsius}°C
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(reading.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
