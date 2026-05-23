# UI Components Pattern

## Overview

Uses shadcn/ui (Base Lyra style) with `@base-ui/react` primitives, `class-variance-authority` for variants, and `cn()` utility for class merging.

## cn() Utility

```tsx
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Always use `cn()` for conditional classes. Never raw template literals.

## Component Pattern

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-none text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Compound Components

UI primitives export multiple named components:

```tsx
// Card example
export function Card({ className, ...props }) { ... }
export function CardHeader({ className, ...props }) { ... }
export function CardTitle({ className, ...props }) { ... }
export function CardDescription({ className, ...props }) { ... }
export function CardContent({ className, ...props }) { ... }
export function CardFooter({ className, ...props }) { ... }
```

## data-slot Pattern

Components use `data-slot` attributes for CSS targeting:

```tsx
<div data-slot="card" className={cn("rounded-none border bg-card text-card-foreground shadow-sm", className)}>
```

## Design Tokens

| Token | Usage |
|-------|-------|
| `rounded-none` | Sharp corners (no border-radius) |
| `text-xs` | Small type scale |
| `bg-card` | Card background |
| `bg-popover` | Popover background |
| `ring-foreground/10` | Focus rings |
| `text-primary` | Primary text |
| `text-muted-foreground` | Muted/secondary text |
| `text-destructive` | Error/danger |

## Key Rules

1. **Always use `cn()`** — For conditional/merged classes
2. **Use cva for variants** — Never manual className switching
3. **Compound components** — Export named sub-components
4. **data-slot for targeting** — CSS can target `[data-slot="card"]`
5. **No rounded corners** — Project uses `rounded-none` throughout

## Key Files

- `src/lib/utils.ts` — cn() utility
- `src/components/` — All UI primitives
- `src/features/posts/components/posts-list.tsx` — Full component example
