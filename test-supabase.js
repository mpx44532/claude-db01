require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'NOT FOUND')
console.log('')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    // Test 1: Check if we can connect and query the table
    console.log('📊 Test 1: Checking if temperature_readings table exists...')
    const { data, error, count } = await supabase
      .from('temperature_readings')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('❌ Error querying table:', error.message)
      console.log('\n⚠️  Make sure you have created the table in Supabase!')
      console.log('   Run the SQL from DATABASE_SCHEMA.md in your Supabase SQL Editor\n')
      return false
    }

    console.log('✅ Table exists! Current row count:', count)
    console.log('')

    // Test 2: Insert sample data
    console.log('📝 Test 2: Inserting sample temperature data...')
    const sampleData = [
      { user_name: 'Alice', temperature_celsius: 22.5 },
      { user_name: 'Bob', temperature_celsius: 23.0 },
      { user_name: 'Charlie', temperature_celsius: 21.8 },
      { user_name: 'Alice', temperature_celsius: 24.2 },
      { user_name: 'Bob', temperature_celsius: 22.0 }
    ]

    const { data: insertedData, error: insertError } = await supabase
      .from('temperature_readings')
      .insert(sampleData)
      .select()

    if (insertError) {
      console.error('❌ Error inserting data:', insertError.message)
      return false
    }

    console.log(`✅ Successfully inserted ${sampleData.length} temperature readings!`)
    console.log('')

    // Test 3: Query all data
    console.log('📖 Test 3: Fetching all temperature readings...')
    const { data: allData, error: fetchError } = await supabase
      .from('temperature_readings')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('❌ Error fetching data:', fetchError.message)
      return false
    }

    console.log(`✅ Found ${allData.length} total readings:`)
    console.log('')
    console.table(allData.map(r => ({
      ID: r.id,
      User: r.user_name,
      'Temp (°C)': r.temperature_celsius,
      'Created': new Date(r.created_at).toLocaleString()
    })))

    // Test 4: Calculate statistics
    console.log('📊 Test 4: Calculating statistics...')
    const temps = allData.map(r => parseFloat(r.temperature_celsius))
    const avg = temps.reduce((sum, t) => sum + t, 0) / temps.length
    const min = Math.min(...temps)
    const max = Math.max(...temps)

    console.log(`✅ Statistics:`)
    console.log(`   Average: ${avg.toFixed(2)}°C`)
    console.log(`   Min: ${min.toFixed(2)}°C`)
    console.log(`   Max: ${max.toFixed(2)}°C`)
    console.log('')

    console.log('🎉 All tests passed! Your Supabase connection is working perfectly!')
    console.log('')
    console.log('Next steps:')
    console.log('  1. Run: npm run dev')
    console.log('  2. Open: http://localhost:3000')
    console.log('  3. Try the User Portal and Admin Dashboard')
    console.log('')

    return true
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

testConnection()
