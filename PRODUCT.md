# PRODUCT.md

## Product Vision

Next.js Basestack is a **starter template / foundation** for building modern web applications. It's not a product itself, but enables rapid development of products.

## Target Users

- **Solo developers** building side projects or MVPs
- **Small teams** needing a solid starting point
- **Anyone** wanting to learn modern Next.js patterns

## Key Features (Template Capabilities)

### Authentication
- Email/password sign-up and sign-in
- Session management (7-day expiry)
- OAuth ready (Google, GitHub configured but disabled)
- Protected routes via middleware
- Client-side session hook (`useSession`)

### Posts CRUD
- Create, read, update, delete posts
- Draft/published status
- Tagging system
- Search and filter
- Pagination
- Ownership validation

### AI Chat
- Basic chat interface
- Vercel AI SDK integration
- Streaming responses
- Google Gemini model (configurable)

### Dashboard
- Post statistics (total, published, drafts)
- Recent posts list
- Quick actions

## User Flows

### Authentication Flow

```
Landing Page → Sign Up → Dashboard
                ↓
           Sign In → Dashboard
                ↓
           Forgot Password → Reset → Sign In
```

### Content Management Flow

```
Dashboard → Posts → Create Post → Fill Form → Save (draft/published)
                ↓
           Posts → Edit Post → Modify → Save
                ↓
           Posts → Delete Post → Confirm → Remove
```

### Chat Flow

```
Dashboard → Chat → Type Message → Send → View Response → Continue
```

## Information Architecture

```
/ (Landing)
├── /sign-in
├── /sign-up
├── /dashboard (protected)
├── /posts (protected)
├── /chat (protected)
├── /profile (planned)
└── /settings (planned)
```

## Current Limitations

- **No file uploads** — Posts are text-only
- **No email verification** — Email verified flag exists but not enforced
- **No password reset** — Schema exists but flow not implemented
- **No profile editing** — Profile page not built
- **No settings page** — Settings page not built
- **No real-time updates** — Polling-based refresh
- **No search indexing** — Basic LIKE search only
- **No rate limiting** — API endpoints unprotected
- **No analytics** — No tracking or metrics

## Future Considerations

- [ ] Email verification flow
- [ ] Password reset flow
- [ ] Profile editing page
- [ ] Settings page
- [ ] File upload support
- [ ] Rich text editor for posts
- [ ] Post comments
- [ ] User following
- [ ] Notifications
- [ ] Admin dashboard
- [ ] API rate limiting
- [ ] Logging infrastructure
- [ ] Error tracking (Sentry)
- [ ] Analytics (PostHog, Mixpanel)
- [ ] E2E tests
- [ ] CI/CD pipeline
- [ ] Docker deployment
- [ ] PostgreSQL adapter option

## Success Metrics (For Template Users)

- **Time to first deploy**: < 10 minutes
- **Developer satisfaction**: Easy to understand and extend
- **Code quality**: Type-safe, well-organized, maintainable
- **Performance**: Lighthouse score > 90
