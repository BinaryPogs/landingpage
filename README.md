# Modern Landing Page Template

A sleek, animated landing page template built with Next.js, Framer Motion, and Tailwind CSS. Features smooth scroll animations, gradient effects, and a modern design.

## Features

- 🎨 Modern UI with gradient effects and glass morphism
- 🔄 Smooth scroll animations using Framer Motion
- 📱 Fully responsive design
- 🎯 Modular component structure
- ⚡ Built with Next.js 14 and TypeScript
- 🎨 Tailwind CSS for styling
- 📝 Waitlist system with Supabase to collect emails

## Getting Started

1. Clone and install dependencies:

```bash
git clone git@github.com:BinaryPogs/landingpage.git
cd landingpage
npm install
```

2. Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## Template Structure

The template consists of several key sections that you can customize:

- Hero Section - Main landing area with animated elements
- Features Section - Highlight your product's key features
- Workflow Section - Show your product's process steps
- Generation/Demo Section - Interactive product demo area
- Waitlist/Contact Section - User signup or contact form

## Customization

1. Update branding:

- Replace `/public/your-logo.svg` with your logo
- Modify color schemes in `globals.css`
- Update gradient values in component classes

2. Modify content:

- Edit section text in respective components under `src/components/sections/`
- Update features and workflow steps
- Customize form fields and buttons

3. Adjust animations:

- Modify Framer Motion values in page.tsx
- Customize scroll behaviors and transitions

## Deployment

Deploy easily with Vercel:

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your repository
4. Add environment variables
5. Deploy!

## Waitlist Feature Setup

The template includes a waitlist system powered by Supabase. This allows you to collect email addresses from interested users.

### Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Create the waitlist table:

```sql
create table public.waitlist (
id uuid default uuid_generate_v4() primary key,
created_at timestamp with time zone default timezone('utc'::text, now()) not null,
email text not null unique
);
```

3. Add the Supabase URL and anon key to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

This is the supabase url and anon key for the database which will be used to store the waitlist emails.

4. Set up the following policies for secure public access:

```sql
-- Policy 1: Allow email existence check
-- This policy allows checking if an email already exists without requiring authentication
alter policy "Allow email already exists check"
on "public"."waitlist"
to public
using (
  ((auth.uid() IS NOT NULL) OR (( SELECT count(*) AS count
   FROM waitlist waitlist_1
  WHERE (waitlist_1.email = waitlist_1.email)) > 0))
);

-- Policy 2: Email format validation
-- This policy ensures only valid email formats can be inserted
alter policy "Allow insert for all users"
on "public"."waitlist"
to public
with check (
  (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)
);
```

### Why These Policies?

1. **Email Existence Check Policy**:

   - Allows public users to check if an email is already registered
   - Prevents duplicate signups
   - Maintains privacy by not exposing the actual email addresses

2. **Email Format Validation Policy**:
   - Ensures only valid email formats are accepted
   - Provides server-side validation
   - Prevents malformed data in your database
