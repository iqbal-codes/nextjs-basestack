# Biome Standards

## Configuration

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "trailingCommas": "all",
      "semicolons": "always"
    }
  }
}
```

## Formatting Rules

| Rule | Value | Example |
|------|-------|---------|
| Indent | 2 spaces | No tabs |
| Line width | 100 chars | Wrap at 100 |
| Quotes | Double | `"string"` |
| Semicolons | Always | End every statement |
| Trailing commas | All | `[1, 2, 3,]` |

## Lint Rules (Key Ones)

| Rule | Level | Action |
|------|-------|--------|
| `noUnusedImports` | warn | Remove unused imports |
| `noUnusedVariables` | warn | Remove unused variables |
| `noNonNullAssertion` | warn | Avoid `!` — use type narrowing |
| `noExplicitAny` | warn | Prefer typed alternatives |

## Test File Override

```json
{
  "overrides": [
    {
      "includes": ["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "off"
          }
        }
      }
    }
  ]
}
```

## Commands

```bash
bun run lint         # Check for issues
bun run lint:fix     # Auto-fix issues
bun run format       # Format code
bun run format:check # Check formatting
```

## Import Organization

Biome auto-organizes imports. Run `biome check --write src/` to sort.

Import order (auto-enforced):
1. Built-in modules
2. External packages
3. Internal aliases (`@/*`)
4. Relative imports

## Common Fixes

```bash
# Fix all issues
biome check --write src/

# Fix only formatting
biome format --write src/

# Fix only linting
biome check --write --linter-enabled src/
```

## Pre-Commit

Always run before committing:

```bash
bun run lint:fix && bun run format
```
