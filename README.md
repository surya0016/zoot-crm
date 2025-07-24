# Zoot CRM

Zoot CRM is a modern, full-stack Customer Relationship Management (CRM) application built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), [Supabase](https://supabase.com/), and [React Context](https://react.dev/reference/react/createContext). It features robust client management, date-based filtering, tag tracking, note-taking, and real-time-like updates for a seamless user experience.

---

## 🚀 Features

- **Client Management:** Add, edit, and manage clients with ease.
- **Date-wise Filtering:** View and manage clients by their creation date.
- **Tag Tracking:** Assign, update, and track tags with timers and status indicators.
- **Notes System:** Add, edit, and delete notes for each client.
- **Real-Time Updates:** Automatic polling keeps your data fresh without manual refresh.
- **Authentication:** Secure routes and data with Supabase Auth and Row Level Security (RLS).
- **Responsive UI:** Built with modern React and Tailwind CSS for a smooth experience.
- **Skeleton Loaders & Error Handling:** Friendly feedback during loading and errors.

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zoot-crm.git
cd zoot-crm
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in your [Supabase dashboard](https://supabase.com/dashboard/project/_/settings/api).

### 4. Set up the database

- Update your `prisma/schema.prisma` if needed.
- Run migrations:

```bash
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Project Structure

```
/app                # Next.js app directory (routes, layouts, pages)
  /api              # API routes (protected with Supabase Auth)
  /components       # UI components (tables, dialogs, loaders, etc.)
  /context          # React Context providers (ClientContext, SidebarContext)
  /lib              # Utilities, scripts, and helpers
  /prisma           # Prisma schema and migrations
  /utils/supabase   # Supabase client/server utilities
```

# zoot-crm
