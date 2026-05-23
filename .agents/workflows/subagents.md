# Subagents Workflow

## Overview

`pi-subagents` enables delegation to focused child agents for scouting, planning, implementation, review, and research. Use it for tasks that benefit from separate context or parallel execution.

## Builtin Agents

| Agent | Use When |
|-------|----------|
| `scout` | Fast codebase recon — files, entry points, data flow, risks |
| `researcher` | Web/docs research with sources and citations |
| `planner` | Concrete implementation plan from context |
| `worker` | Implementation work — edits files, validates |
| `reviewer` | Code review — checks against task, tests, edge cases |
| `context-builder` | Gathers code context for planning handoff |
| `oracle` | Second opinion — challenges assumptions, recommends next move |
| `delegate` | Lightweight general child agent |

**Rule of thumb:** `scout` before you understand code, `researcher` before trusting external facts, `planner` before bigger changes, `worker` to implement, `reviewer` to check, `oracle` when decisions feel risky.

## Execution Modes

### Single Agent

```tsx
subagent({ agent: "scout", task: "Find all auth-related code" })
subagent({ agent: "worker", task: "Refactor the auth flow" })
```

### Chain (Sequential Pipeline)

```tsx
subagent({
  chain: [
    { agent: "scout", task: "Gather context for auth refactor" },
    { agent: "planner" },  // gets {previous} from scout
    { agent: "worker" },   // gets {previous} from planner
    { agent: "reviewer" }  // gets {previous} from worker
  ]
})
```

### Parallel (Concurrent Execution)

```tsx
subagent({
  tasks: [
    { agent: "reviewer", task: "Review for correctness" },
    { agent: "reviewer", task: "Review for test coverage" },
    { agent: "reviewer", task: "Review for complexity" }
  ]
})
```

### Chain with Parallel Fan-Out

```tsx
subagent({
  chain: [
    { agent: "scout", task: "Analyze the codebase" },
    {
      parallel: [
        { agent: "reviewer", task: "Review backend" },
        { agent: "reviewer", task: "Review frontend" }
      ]
    },
    { agent: "worker", task: "Apply fixes" }
  ]
})
```

### Background Execution

```tsx
// Fire and forget — check status later
subagent({ agent: "scout", task: "Audit the codebase", async: true })
```

### Forked Context

```tsx
// Child gets a branched session — isolated from parent
subagent({ agent: "worker", task: "Implement feature", context: "fork" })
```

## Common Workflows

### Scout → Plan → Implement → Review

```tsx
subagent({
  chain: [
    { agent: "scout", task: "Analyze auth flow and find issues" },
    { agent: "planner", task: "Create implementation plan" },
    { agent: "worker", task: "Implement the plan" },
    { agent: "reviewer", task: "Review the implementation" }
  ]
})
```

### Parallel Review

```tsx
subagent({
  tasks: [
    { agent: "reviewer", task: "Check for correctness and bugs" },
    { agent: "reviewer", task: "Check for test coverage gaps" },
    { agent: "reviewer", task: "Check for unnecessary complexity" }
  ]
})
```

### Research + Scout (Parallel Context Build)

```tsx
subagent({
  tasks: [
    { agent: "researcher", task: "Research Next.js 16 server action best practices" },
    { agent: "scout", task: "Find all server actions in this codebase" }
  ]
})
```

### Review Loop (Until Clean)

```tsx
// Ask naturally: "Run a review loop on this change with max 3 rounds"
// Pi orchestrates: worker → reviewer → worker → reviewer → ...
```

## Context Modes

| Mode | When to Use |
|------|-------------|
| `fresh` | Child starts clean, no parent context (default) |
| `fork` | Child gets branched session with parent history |

Use `fork` when the child needs full conversation context. Use `fresh` when isolation is better (parallel reviewers, independent tasks).

## Prompt Recipes

### Gather Context Before Planning

```
Use scout to understand the auth flow, then have planner turn that into an implementation plan.
```

### Implement Then Review

```
Implement this approved plan. Afterward, run parallel reviewers, summarize their feedback, and apply the fixes that make sense.
```

### Review Until Clean

```
Run a review loop on this change until reviewers stop finding fixes worth doing, with a max of 3 rounds.
```

### Get Second Opinion

```
Ask oracle for a second opinion on my current plan. Challenge assumptions and tell me what I might be missing.
```

### Solve Hard Bug

```
Use oracle to investigate this bug before we edit anything. Have it inspect the code and propose the best next move.
```

## Chain Variables

| Variable | Description |
|----------|-------------|
| `{task}` | Original task from the first step |
| `{previous}` | Output from the prior step |
| `{chain_dir}` | Path to chain artifact directory |

## Tips

1. **Scout first** — Before planning or implementing, understand the codebase
2. **Parallel reviews** — Run multiple reviewers with different angles
3. **Chain for complex tasks** — Scout → Plan → Implement → Review
4. **Fork for context** — When child needs conversation history
5. **Fresh for isolation** — When parallel tasks might conflict
6. **Background for long tasks** — Don't block the conversation
7. **Oracle for risky decisions** — Before big refactors or architectural changes

## Diagnostics

```
/subagents-doctor          # Check setup
subagent({ action: "list" }) # See available agents
subagent({ action: "status" }) # Check running agents
```
