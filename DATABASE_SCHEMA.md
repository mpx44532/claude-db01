# Database Schema

## Supabase Setup Instructions

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be provisioned

### 2. Create the Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create temperature_readings table
CREATE TABLE temperature_readings (
  id BIGSERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  temperature_celsius DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_created_at ON temperature_readings(created_at DESC);
CREATE INDEX idx_user_name ON temperature_readings(user_name);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE temperature_readings ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (adjust based on your needs)
CREATE POLICY "Allow all operations" ON temperature_readings
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 3. Get Your Credentials

1. Go to Project Settings > API
2. Copy the **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
3. Copy the **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 4. Configure Your Application

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Table Structure

### temperature_readings

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Auto-incrementing primary key |
| user_name | TEXT | Name of the user submitting the reading |
| temperature_celsius | DECIMAL(5,2) | Temperature value in Celsius (e.g., 23.45) |
| created_at | TIMESTAMP | Timestamp when the reading was created |

## Example Data

```sql
-- Insert sample data
INSERT INTO temperature_readings (user_name, temperature_celsius) VALUES
  ('Alice', 22.5),
  ('Bob', 23.0),
  ('Alice', 21.8),
  ('Charlie', 24.2);
```
