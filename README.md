# Next.js Basestack

A production-ready Next.js application with a comprehensive tech stack for modern web development.

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router, Server Components, and Server Actions |
| **TypeScript** | End-to-end type safety |
| **shadcn/ui** | Beautiful, accessible UI components |
| **TanStack Query** | Server state management and data fetching |
| **React Hook Form** | Performant form handling |
| **Zod** | Schema-based validation |
| **nuqs** | URL search params state management |
| **Better Auth** | Authentication and session management |
| **Zustand** | Global client state management |
| **Drizzle ORM** | Type-safe database operations |
| **Supabase** | PostgreSQL database hosting |

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/      # Dashboard pages with layout
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   └── ui/               # shadcn/ui components
├── db/
│   ├── schema.ts         # Drizzle ORM schema
│   ├── index.ts          # Database connection
│   └── seed.ts           # Database seed script
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── schemas/              # Zod validation schemas
├── stores/               # Zustand stores
├── actions/              # Server Actions
└── types/                # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- bun (recommended package manager)
- Supabase account or local PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nextjs-basestack
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:54322/postgres"
   BETTER_AUTH_SECRET="your-secret-key-at-least-32-characters"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

5. Run database migrations:
   ```bash
   bun db:push
   ```

6. (Optional) Seed the database:
   ```bash
   bun db:seed
   ```

7. Start the development server:
   ```bash
   bun dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun db:generate` | Generate Drizzle migrations |
| `bun db:migrate` | Run migrations |
| `bun db:push` | Push schema to database |
| `bun db:studio` | Open Drizzle Studio |
| `bun db:seed` | Seed the database |

## 🔐 Authentication

This project uses [Better Auth](https://www.better-auth.com/) for authentication. To configure OAuth providers:

1. Update the auth configuration in `src/lib/auth.ts`
2. Add your OAuth credentials to `.env.local`

## 🗄️ Database

The project uses [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (Supabase). The schema is defined in `src/db/schema.ts`.

### Key Features:
- Type-safe queries
- Automatic migrations
- Relations support
- Serverless-ready

## 📦 Key Features

### Server Actions
Located in `src/actions/`, providing type-safe server-side mutations.

### TanStack Query
Custom hooks in `src/hooks/` for data fetching with automatic caching and refetching.

### Form Validation
Zod schemas in `src/schemas/` with React Hook Form integration.

### URL State Management
nuqs for filter synchronization across components.

### Global State
Zustand stores in `src/stores/` for UI state and client-side data.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
docker build -t nextjs-basestack .
docker run -p 3000:3000 nextjs-basestack
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [nuqs Documentation](https://nuqs.47ng.com)
- [Zod Documentation](https://zod.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
