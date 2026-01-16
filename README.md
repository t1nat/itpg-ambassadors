# ITPG Ambassadors

A Next.js web application for the ITPG Ambassadors program, showcasing ambassadors, teachers, projects, and voting functionality.

## Overview

This project is built with Next.js, TypeScript, Tailwind CSS, and ShadCN/UI components. It uses SQLite as the local backend for data storage.

## Features

- **Ambassadors Page**: Display information about program ambassadors
- **Teachers Page**: Showcase program mentors and educators
- **Projects Page**: List student projects with voting functionality
- **Results Page**: Display voting results and rankings
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS, ShadCN/UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd itpg-ambassadors
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings > API
   - Copy your project URL and anon key

4. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. Set up the database:
   - Go to your Supabase dashboard > SQL Editor
   - Run the contents of `scripts/001_create_tables.sql`
   - Run the contents of `scripts/002_seed_data.sql`

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── ambassadors/       # Ambassadors page
│   ├── projects/          # Projects page
│   ├── results/           # Results page
│   └── teachers/          # Teachers page
├── components/            # Reusable components
│   ├── ui/               # ShadCN/UI components
├── lib/                  # Utility libraries
│   ├── supabase/         # Database client configuration
│   └── db.ts            # SQLite database setup
├── public/               # Static assets
└── scripts/              # Database setup scripts
```

## Build for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to ITPG.
