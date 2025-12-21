require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Detailed Connection Test\n')
console.log('URL:', supabaseUrl)
console.log('Key present:', !!supabaseAnonKey)
console.log('')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('Attempting to connect...')
    const { data, error } = await supabase
      .from('temperature_readings')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return
    }

    console.log('✅ Connection successful!')
    console.log('Data:', data)
  } catch (error) {
    console.error('Caught error:', error)
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    if (error.cause) {
      console.error('Error cause:', error.cause)
    }
  }
}

testConnection()
