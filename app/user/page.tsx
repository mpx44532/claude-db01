'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function UserPage() {
  const [userName, setUserName] = useState('')
  const [temperature, setTemperature] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const tempValue = parseFloat(temperature)

      if (isNaN(tempValue)) {
        setMessage({ type: 'error', text: 'Please enter a valid temperature' })
        setLoading(false)
        return
      }

      const { error } = await supabase
        .from('temperature_readings')
        .insert([
          {
            user_name: userName,
            temperature_celsius: tempValue,
          },
        ])

      if (error) throw error

      setMessage({ type: 'success', text: 'Temperature recorded successfully!' })
      setTemperature('')
    } catch (error) {
      console.error('Error submitting temperature:', error)
      setMessage({ type: 'error', text: 'Failed to submit temperature. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Submit Temperature Reading
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="temperature"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Temperature (°C)
              </label>
              <input
                type="number"
                id="temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                step="0.1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter temperature in Celsius"
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Temperature'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
