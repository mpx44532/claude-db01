import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Temperature Tracking System
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/user"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              User Portal
            </h2>
            <p className="text-gray-600">
              Submit temperature readings in Celsius
            </p>
          </Link>

          <Link
            href="/admin"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              Admin Dashboard
            </h2>
            <p className="text-gray-600">
              View all readings and statistics
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
