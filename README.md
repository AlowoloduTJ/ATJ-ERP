# ATJ-ERP

**Streamline Your Business Operations with Modern ERP Solutions**

A comprehensive, cloud-based Enterprise Resource Planning system designed specifically for growing businesses. Integrates inventory, production, accounting, HR, and operations into one cohesive platform.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Clerk account and application

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atj-erp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local` (see [Environment Variables](#environment-variables) below)

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Environment Variables

### Required for Local Development

Create a `.env.local` file in the project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding

# API Configuration
NEXT_PUBLIC_API_URL=/api
```

### Where to Get These Values

**Supabase:**
- Go to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Navigate to **Settings** → **API**
- Copy `Project URL` and `anon public` key
- Copy `service_role` key (keep this secret!)

**Clerk:**
- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Select your application
- Navigate to **Settings** → **API Keys**
- Copy `Publishable key` and `Secret key`

See `.env.example` for a template.

## 🔐 Authentication

This project uses [Clerk](https://clerk.com) for authentication with [Supabase](https://supabase.com) integration.

### Setup Steps

1. **Configure Clerk for Supabase:**
   - Clerk Dashboard → **Integrations** → **Connect with Supabase**
   - Follow the setup wizard

2. **Configure Supabase Third-Party Auth:**
   - Supabase Dashboard → **Authentication** → **Third Party Auth**
   - Add Clerk as a provider

3. **Configure Clerk Session Token:**
   - Clerk Dashboard → **Sessions** → **Customize session token**
   - Add custom claim: `{"role": "authenticated", "metadata": "{{user.public_metadata}}"}`

See `src/docs/auth-flow/auth-flow-prd.md` for complete setup instructions.

## 🗄️ Database

This project uses Supabase (PostgreSQL) for data storage.

### Schema Setup

1. Go to Supabase Dashboard → **SQL Editor**
2. Run the SQL files from `supabase/schemas/` in order
3. Or use: `supabase db push` (if CLI installed)

See `supabase/README.md` for schema management workflow.

## 📚 Documentation

- **Authentication Flow:** `src/docs/auth-flow/auth-flow-prd.md`
- **Database Schema:** `supabase/README.md`
- **Component Structure:** `STRUCTURE.md`

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run security-check` - Check for security issues

## 🚀 Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables (see [Environment Variables](#environment-variables))
4. Deploy!

See `VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

## 📄 License

Private - All rights reserved
