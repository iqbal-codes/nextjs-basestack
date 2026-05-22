---
name: Next.js Basestack
description: Production-ready SaaS starter with precision-neutral design
colors:
  background: oklch(0.145 0 0)
  foreground: oklch(0.985 0 0)
  card: oklch(0.205 0 0)
  card-foreground: oklch(0.985 0 0)
  popover: oklch(0.205 0 0)
  popover-foreground: oklch(0.985 0 0)
  primary: oklch(0.922 0 0)
  primary-foreground: oklch(0.205 0 0)
  secondary: oklch(0.269 0 0)
  secondary-foreground: oklch(0.985 0 0)
  muted: oklch(0.269 0 0)
  muted-foreground: oklch(0.708 0 0)
  accent: oklch(0.269 0 0)
  accent-foreground: oklch(0.985 0 0)
  destructive: oklch(0.704 0.191 22.216)
  border: oklch(1 0 0 / 10%)
  input: oklch(1 0 0 / 15%)
  ring: oklch(0.556 0 0)
  sidebar: oklch(0.205 0 0)
  sidebar-foreground: oklch(0.985 0 0)
  sidebar-primary: oklch(0.488 0.243 264.376)
  sidebar-accent: oklch(0.269 0 0)
  sidebar-border: oklch(1 0 0 / 10%)
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  mono:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "oklch(1 0 0)"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded-lg}"
    padding: "24px"
---

# Design System: Next.js Basestack

## 1. Overview

**Creative North Star: "The Precision Workshop"**

A design system built on neutral density and tonal layering. Every surface earns its elevation through lightness shifts, not shadows. The palette is intentionally achromatic: near-black backgrounds, mid-tone surfaces, and near-white text, with color reserved strictly for destructive states and a single sidebar accent.

This system rejects decoration. No gradients on text, no glassmorphism, no bouncing transitions. The aesthetic is Linear-adjacent: tight spacing, confident weight contrast, and information density that rewards scanning. Developers evaluating this template should feel like they're looking at a tool built by engineers who care about craft.

**Key Characteristics:**
- Fully achromatic palette (chroma 0 across all neutrals)
- Tonal layering for depth instead of box-shadow
- Tight component density with generous content spacing
- Weight-driven hierarchy over size-driven hierarchy
- Dark-first with light theme as a parallel mode

## 2. Colors

The palette is entirely neutral. Every color sits on the achromatic axis (chroma 0), with hue introduced only in destructive states and the sidebar accent. Depth is conveyed through lightness steps, not saturation.

### Surface Scale
- **Background** (oklch(0.145 0 0)): Deepest surface. The canvas behind everything.
- **Card** (oklch(0.205 0 0)): Elevated surface for cards, popovers, and sidebars. One step lighter than background.
- **Secondary / Muted / Accent** (oklch(0.269 0 0)): Interactive surfaces. Hover states, selected items, filled inputs. One step above card.
- **Border** (oklch(1 0 0 / 10%)): Dividers and structural lines. Pure white at 10% opacity, reads as a faint neutral.
- **Input** (oklch(1 0 0 / 15%)): Input field borders and separators. Slightly more visible than border.

### Text Scale
- **Foreground** (oklch(0.985 0 0)): Primary text. Near-white, maximum contrast on dark surfaces.
- **Primary** (oklch(0.922 0 0)): Buttons and high-emphasis labels. Slightly dimmer than foreground for filled surfaces.
- **Muted-foreground** (oklch(0.708 0 0)): Secondary text, descriptions, placeholders. Mid-tone for reduced emphasis.
- **Ring** (oklch(0.556 0 0)): Focus indicators and subtle accents. Lowest-contrast text-adjacent token.

### Functional
- **Destructive** (oklch(0.704 0.191 22.216)): Errors, delete actions, danger states. The only high-chroma color in the system.
- **Sidebar-primary** (oklch(0.488 0.243 264.376)): Sidebar active state. Muted indigo-blue, the sole brand tint.

### Named Rules

**The Achromatic Rule.** All neutrals must sit on the zero-chroma axis. Any gray with visible hue (blue-gray, warm-gray) violates the system. The only chromatic colors are destructive (red) and sidebar-primary (indigo), and both exist at reduced saturation.

**The Tonal Layering Rule.** Depth is conveyed through lightness steps between surfaces, never through box-shadow. Background → Card → Secondary is the standard three-tier stack. Adding a fourth tier is prohibited without explicit justification.

## 3. Typography

**Display Font:** Inter (with system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Mono Font:** Geist Mono (with monospace fallback)

**Character:** Inter is a neutral, high-legibility sans-serif that disappears into the interface. It doesn't carry personality; it carries information. Geist Mono pairs cleanly for code and technical labels.

### Hierarchy
- **Display** (semibold, 2.25rem / 36px, line-height 1.2): Page titles and hero text. Rare; used once per page maximum.
- **Headline** (semibold, 1.5rem / 24px, line-height 1.3): Section headers and card titles. The workhorse heading.
- **Title** (medium, 1.125rem / 18px, line-height 1.4): Subsection headers and list item titles. Bridges heading and body.
- **Body** (regular, 0.875rem / 14px, line-height 1.6): All running text, descriptions, and form labels. Max width 65ch.
- **Label** (medium, 0.75rem / 12px, letter-spacing 0.02em, line-height 1.4): Buttons, badges, navigation items, and metadata. Compact and functional.

### Named Rules

**The Weight Contrast Rule.** Hierarchy is driven by font-weight contrast (≥600 vs 400), not by size alone. A title at medium weight must be distinguishable from body text by weight, not just by being 2px larger.

**The Single Display Rule.** Each page gets exactly one display-scale element. Two display elements on the same screen means the hierarchy has collapsed.

## 4. Elevation

This system uses flat surfaces with tonal layering. There are no box-shadows in the default palette. Depth is communicated entirely through background lightness steps: darker = recessed, lighter = elevated.

### Shadow Vocabulary

No shadows. Surfaces at rest are flat. If a shadow appears, it must be a state response (drag preview, floating popover), not a resting treatment. The tonal layering between Background → Card → Secondary provides sufficient depth discrimination.

### Named Rules

**The Flat-By-Default Rule.** Every surface starts without shadow. Shadows appear only as transient state feedback (drag, float), never as a permanent resting treatment. If a component needs to feel elevated, use a lighter background, not a shadow.

## 5. Components

Components are tight, functional, and unadorned. Padding is compact. Radius is minimal. Color is applied through background fills, not decorative accents.

### Buttons
- **Shape:** Gently curved (6px radius)
- **Primary:** Near-white fill (oklch(0.922 0 0)) on dark foreground. Compact padding (8px 16px). The primary action on any screen.
- **Secondary:** Muted surface fill (oklch(0.269 0 0)) with near-white text. For supplementary actions.
- **Ghost:** Transparent background, foreground text. For tertiary actions and navigation.
- **Destructive:** Red fill (oklch(0.704 0.191 22.216)) with white text. Reserved exclusively for destructive confirmations.
- **Label:** Uppercase label typography (0.75rem, medium weight, 0.02em tracking). All buttons use label scale.

### Cards
- **Corner Style:** Slightly curved (8px radius)
- **Background:** Card surface (oklch(0.205 0 0))
- **Shadow Strategy:** None. Flat by default.
- **Border:** Faint 1px border at 10% white opacity, or rely on tonal contrast against background.
- **Internal Padding:** 24px standard. Compact variant at 16px for dense layouts.

### Inputs / Fields
- **Style:** Transparent background with 1px border at 15% white opacity. 6px radius. Body-scale text (14px).
- **Focus:** Ring color (oklch(0.556 0 0)) as a 2px outline offset. No background change.
- **Error:** Destructive color on border and helper text.
- **Placeholder:** Muted-foreground color (oklch(0.708 0 0)).

### Navigation
- **Style:** Label-scale text (12px, medium weight). Ghost buttons for items, secondary surface for active state.
- **Active:** Secondary surface fill (oklch(0.269 0 0)) with foreground text.
- **Hover:** Subtle surface shift toward secondary.

### Tables
- **Style:** Full-width, borderless rows with 1px bottom border at 10% opacity.
- **Header:** Label-scale, muted-foreground text, uppercase tracking.
- **Row hover:** Secondary surface fill (oklch(0.269 0 0)).

### Dialogs / Sheets
- **Background:** Card surface (oklch(0.205 0 0))
- **Overlay:** Background at 80% opacity.
- **Radius:** 12px on container.
- **Padding:** 24px internal.

## 6. Do's and Don'ts

### Do:
- **Do** use tonal layering for depth. Background → Card → Secondary is the standard three-tier hierarchy.
- **Do** keep all neutrals on the achromatic axis. Zero chroma, zero hue.
- **Do** use font-weight contrast (≥600 vs 400) as the primary hierarchy mechanism.
- **Do** keep button padding compact (8px 16px). This is a dense interface.
- **Do** use label-scale typography (12px, medium weight) for all interactive elements.
- **Do** respect the flat-by-default rule. Shadows are for transient states only.
- **Do** use the single display rule. One display-scale heading per page, maximum.

### Don't:
- **Don't** use box-shadow as a resting treatment on any component. Use lighter backgrounds for elevation.
- **Don't** add hue to neutrals. No blue-grays, no warm-grays, no tinted backgrounds.
- **Don't** use gradient text. One solid color per element.
- **Don't** apply glassmorphism or backdrop-blur as decoration.
- **Don't** create identical card grids with icon + heading + text repeated endlessly.
- **Don't** use modal dialogs as a first interaction pattern. Exhaust inline alternatives first.
- **Don't** animate layout properties (width, height, padding). Animate opacity and transform only.
- **Don't** exceed 10% chroma on any neutral. The system is achromatic by design.
- **Don't** use bounce or elastic easing curves. Ease-out with exponential curves only.
- **Don't** restate headings in body copy. Every word earns its place.
