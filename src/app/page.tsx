import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight">Next.js Basestack</h1>
          <p className="text-xl text-muted-foreground">
            A production-ready foundation with the best tools for modern web development
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⚡ Next.js 16</CardTitle>
              <CardDescription>
                React framework with App Router, Server Components, and Server Actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• React Server Components</li>
                <li>• Server Actions for mutations</li>
                <li>• Streaming & Suspense</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎨 shadcn/ui</CardTitle>
              <CardDescription>
                Beautiful, accessible components built with Radix UI and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Form components with validation</li>
                <li>• Dialog, Sheet, Dropdown Menu</li>
                <li>• Fully customizable</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔄 TanStack Query</CardTitle>
              <CardDescription>
                Powerful data synchronization for server state management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automatic caching</li>
                <li>• Background refetching</li>
                <li>• Optimistic updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📝 React Hook Form + Zod</CardTitle>
              <CardDescription>Performant forms with schema-based validation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Minimal re-renders</li>
                <li>• Type-safe validation</li>
                <li>• Easy integration</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔐 Better Auth</CardTitle>
              <CardDescription>
                Secure authentication with sessions and multiple providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email & Password</li>
                <li>• OAuth providers</li>
                <li>• Session management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🗄️ Drizzle ORM + Supabase</CardTitle>
              <CardDescription>Type-safe database operations with PostgreSQL</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• SQL-like syntax</li>
                <li>• Full type safety</li>
                <li>• Serverless ready</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎯 Zustand</CardTitle>
              <CardDescription>Simple, scalable global state management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Minimal boilerplate</li>
                <li>• Persistence middleware</li>
                <li>• DevTools support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔗 nuqs</CardTitle>
              <CardDescription>Type-safe URL search params state management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Filter synchronization</li>
                <li>• Shareable URLs</li>
                <li>• Server-side parsing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📘 TypeScript</CardTitle>
              <CardDescription>End-to-end type safety across the entire codebase</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Strict mode enabled</li>
                <li>• Inferred types</li>
                <li>• Better DX</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
