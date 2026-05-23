# DESIGN.md

## Visual Identity

- **Style**: Clean, minimal, functional
- **Corners**: Sharp (`rounded-none` throughout)
- **Type scale**: Small (`text-xs` base for UI components)
- **Color**: Neutral base with semantic accents (primary, destructive, muted)

## Design Tokens

### Colors (CSS Variables)

```css
--background:        /* Page background */
--foreground:        /* Primary text */
--card:              /* Card background */
--card-foreground:   /* Card text */
--primary:           /* Primary action color */
--primary-foreground:/* Primary action text */
--secondary:         /* Secondary background */
--secondary-foreground: /* Secondary text */
--muted:             /* Muted background */
--muted-foreground:  /* Muted/placeholder text */
--accent:            /* Hover/active background */
--accent-foreground: /* Hover/active text */
--destructive:       /* Error/danger */
--destructive-foreground: /* Error text */
--border:            /* Default border */
--input:             /* Input border */
--ring:              /* Focus ring */
```

### Typography

- **Font family**: Geist Sans (primary), Geist Mono (code), Inter (fallback)
- **Base size**: `text-xs` for UI components, `text-sm` for body
- **Line height**: `leading-relaxed` (1.625)

### Spacing

- **Container**: `container` class (max-width + padding)
- **Stack**: `space-y-{n}` for vertical, `gap-{n}` for flex/grid
- **Card padding**: `p-4` default

### Borders

- **Default**: `border border-border`
- **Focus**: `ring-2 ring-ring ring-offset-2`
- **No border-radius**: `rounded-none` everywhere

## Component Patterns

### Button Variants

| Variant | Usage |
|---------|-------|
| `default` | Primary actions |
| `destructive` | Destructive actions (delete) |
| `outline` | Secondary actions |
| `secondary` | Subtle actions |
| `ghost` | Inline actions (icon buttons) |
| `link` | Text links styled as buttons |

### Button Sizes

| Size | Usage |
|------|-------|
| `default` | Standard buttons |
| `sm` | Compact spaces (pagination, badges) |
| `lg` | Hero/CTA buttons |
| `icon` | Icon-only buttons |
| `icon-sm` | Small icon buttons (close) |

### Card Structure

```
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction (optional)
├── CardContent
└── CardFooter
```

### Form Structure

```
Form
└── FormField
    └── FormItem
        ├── FormLabel
        ├── FormControl (wraps input)
        └── FormMessage (error)
```

### Table Structure

```
Table
├── TableHeader
│   └── TableRow
│       └── TableHead
└── TableBody
    └── TableRow
        └── TableCell
```

## Layout Patterns

### Page Layout

```tsx
<div className="space-y-6">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold">Title</h1>
      <p className="text-muted-foreground">Description</p>
    </div>
    <Button>Action</Button>
  </div>

  {/* Content */}
  <Card>...</Card>
</div>
```

### Dashboard Layout

```
┌─────────────────────────────────────┐
│ Header (sticky)                     │
│ [Logo] [Nav]              [Avatar] │
├─────────────────────────────────────┤
│ Main Content                        │
│ container py-8                      │
└─────────────────────────────────────┘
```

### Auth Layout

```
┌─────────────────────────────────────┐
│                                     │
│         Centered Card               │
│         (min-h-screen)              │
│                                     │
└─────────────────────────────────────┘
```

## Responsive Breakpoints

- **Mobile**: Default (no prefix)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+)
- **Wide**: `lg:` (1024px+)

## Animations

- **Loading spinner**: `animate-spin rounded-full h-8 w-8 border-b-2 border-primary`
- **Transitions**: `transition-colors` for hover states
- **Dialogs**: `data-open:animate-in data-closed:animate-out`

## Accessibility

- **Focus visible**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`
- **Disabled states**: `disabled:opacity-50 disabled:pointer-events-none`
- **ARIA labels**: Use `aria-invalid` for form errors
- **Screen reader**: `sr-only` class for hidden text
