Writing software is mostly about making decisions under uncertainty. You pick a direction, commit to it, and find out later whether it was right. The interesting part isn't the code — it's the reasoning that led to it.

## The Setup

I had a CLI tool that pulled stats from Linear and GitHub. It worked fine for weeks. Then I decided to let three AI agents loose on it simultaneously using Git worktrees.

Each agent got its own branch and a specific goal:

- **Agent 1**: Build a web dashboard with daily and weekly views
- **Agent 2**: Add chart visualizations using Recharts
- **Agent 3**: Create a history view with CSV export

## What Happened

The agents finished in about 90 minutes. Merging took another 30. The result was a full web app with interactive charts, filterable tables, and a clean layout.

Here's the config that kicked it off:

```javascript
const agents = [
  { name: "dashboard", worktree: "../cli-dashboard", task: "web UI" },
  { name: "charts", worktree: "../cli-charts", task: "visualizations" },
  { name: "history", worktree: "../cli-history", task: "history + export" },
];

agents.forEach((agent) => {
  spawnWorktree(agent.worktree, agent.name);
});
```

The key insight was keeping each agent's scope narrow. When they tried to touch shared files — like `package.json` or the main entry point — merge conflicts piled up fast.

## Lessons

1. **Worktrees are underrated.** Most people never use them, but they're perfect for parallel agent work.
2. **Small, focused tasks win.** An agent that owns one feature end-to-end produces better results than one told to "improve the app."
3. **Merge order matters.** I merged the dashboard first since it defined the layout, then layered charts and history on top.

A quick comparison of the before and after:

| Metric | CLI Only | With Web App |
|--------|----------|--------------|
| Daily review time | ~5 min | ~30 sec |
| Shareable | No | Yes |
| Historical trends | Manual spreadsheet | Built-in charts |

## The Takeaway

The tool went from a personal CLI to something I'd actually show a manager. Not because the code was impressive, but because the feedback loop got shorter. I could *see* the data instead of reading terminal output.

Sometimes the best upgrade isn't a rewrite — it's a new interface on top of what already works.
