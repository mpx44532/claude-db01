# Temperature Tracking Application

A modern web application for tracking temperature readings from multiple users, built with Next.js, Supabase, and deployed on Vercel.

## Features

- **User Portal**: Allow users to submit temperature readings in Celsius
- **Admin Dashboard**: View all temperature readings with comprehensive statistics
- **Real-time Data**: Instant updates using Supabase
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Statistics**: View overall averages, min/max temperatures, and per-user statistics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd claude-db01
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to the SQL Editor
3. Run the SQL script from `DATABASE_SCHEMA.md` to create the table
4. Get your credentials from Project Settings > API:
   - Project URL
   - Anon/Public Key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click Deploy

### Setting Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add both variables for Production, Preview, and Development environments

## Application Structure

```
claude-db01/
├── app/
│   ├── page.tsx           # Home page with navigation
│   ├── user/
│   │   └── page.tsx       # User temperature submission page
│   ├── admin/
│   │   └── page.tsx       # Admin dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── lib/
│   └── supabase.ts        # Supabase client configuration
├── DATABASE_SCHEMA.md     # Database setup instructions
└── package.json
```

## Usage

### For Users

1. Navigate to the User Portal from the home page
2. Enter your name
3. Enter temperature in Celsius
4. Click "Submit Temperature"

### For Admins

1. Navigate to the Admin Dashboard from the home page
2. View statistics:
   - Total number of readings
   - Overall average temperature
   - Minimum and maximum temperatures
   - Per-user averages and reading counts
3. Browse all temperature readings in the table
4. Click "Refresh" to update the data

## Database Schema

The application uses a single table `temperature_readings`:

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Auto-incrementing primary key |
| user_name | TEXT | Name of the user |
| temperature_celsius | DECIMAL(5,2) | Temperature in Celsius |
| created_at | TIMESTAMP | Timestamp of the reading |

See `DATABASE_SCHEMA.md` for complete setup instructions.

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build Locally

```bash
npm run start
```

### Lint Code

```bash
npm run lint
```

## Troubleshooting

### Issue: "Failed to submit temperature"

- Check that your Supabase credentials are correctly set in `.env.local`
- Verify that the `temperature_readings` table exists in Supabase
- Check that Row Level Security policies allow insertions

### Issue: "Failed to load temperature readings"

- Verify Supabase credentials
- Check browser console for detailed error messages
- Ensure the table has the correct schema

## Future Enhancements

- User authentication with Supabase Auth
- Temperature unit conversion (Celsius/Fahrenheit)
- Data visualization with charts
- Export data to CSV
- Filter and search functionality
- Date range filtering
- Real-time updates with Supabase subscriptions

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
