---
title: "From Zero to Claude Code: Your Complete Setup Guide"
date: "2025-10-20"
slug: "claude-code-complete-setup"
excerpt: "A step-by-step guide to setting up Claude Code from scratch, including project configuration, CLI installation, and workflow best practices."
thumbnail: "/images/claude-code-complete-setup-thumbnail.webp"
categories: ["Tutorial", "Claude Code"]
---

# From Zero to Claude Code: Your Complete Setup Guide

## TL;DR

If you want to jump straight to the code and configuration, you can find the complete repository here: [GitHub: Claude Code Config](https://github.com/spacholski1225/cc-config)

The repository includes:

* A ready-to-use **CLAUDE.md** project template
* Example **.claude/settings.json**
* A few simple commands in **.claude/commands**
* A script to quickly start your first Claude Code session

---

# How to Set Up Claude Code from Scratch

Claude Code is an interactive CLI environment from Anthropic that combines the power of Claude models with your local code context. In practice, it feels like a mix of VSCode Copilot and a terminal — but with full control over session state, context, and tools. In this guide, we'll go through a complete setup from scratch.

---

## 1. Installation and First Run

1. **Install the Claude Code CLI:**

```bash
npm install -g @anthropic-ai/claude-code
```

Or, if you're on macOS and prefer Homebrew:

```bash
brew install claude-code
```

2. **Log in:**

```bash
claude login
```

This will open a browser window to authorize access to your Anthropic account.

3. **Start your first session:**

```bash
claude
```

After a moment, you'll be in an interactive REPL-like environment with `/` commands, autocompletion, and file integrations.

---

## 2. Project Configuration Structure

Claude Code uses two main configuration files:

### CLAUDE.md

This is a reference document automatically loaded into the context of every session. Think of it as a README, but AI-oriented. Place it in your project root:

```
my-project/
├── src/
├── tests/
├── .claude/
│   ├── settings.json
│   └── commands/
├── CLAUDE.md
└── package.json
```

Example minimal **CLAUDE.md**:

```markdown
# Project quickstart
- Build: `npm run build`
- Test: `npm run test`

# Style guide
- Use ES modules only
- Prefer async/await over callbacks

# Workflow
- Branches: `feature/<ticket>`
- Commit format: Conventional Commits
```

### .claude/settings.json

This is the main CLI configuration file — it lets you define the model, permissions, agents, and MCP servers.

```json
{
  "model": "opus",
  "allowedTools": ["Edit", "Bash(git commit:*)", "gh"],
  "mcpServers": {
    "puppeteer": { "url": "http://localhost:3000" }
  },
  "agents": {
    "reviewer": { "purpose": "code review", "model": "sonnet" }
  },
  "hooks": {
    "preCommit": [".claude/commands/run-tests.md"]
  }
}
```

> 💡 **Tip:** Keep `allowedTools` conservative. Start with `Edit` and `Bash(...)` before enabling more powerful commands.

---

## 3. Getting Started in the Terminal

Run Claude Code inside your project directory:

```bash
claude
```

Try a few basic commands:

* `/context` — view what's currently in context.
* `/model` — check the active model.
* `/doctor` — run diagnostics.
* `@src/index.ts` — load a file into context.
* `!npm run build` — execute a shell command.

> ✨ **Pro tip:** Use `think hard` or `ultrathink` for complex refactoring tasks.

---

## 4. Extensions and Automation

Claude Code supports four main extension types:

* **MCP Servers** — integrations with external services (e.g., Puppeteer, Sentry).
* **Agents** — specialized sub-agents for specific tasks.
* **Hooks** — scripts triggered before/after actions (e.g., pre-commit tests).
* **Commands** — custom `/` commands stored in Markdown files.

Example of a simple command `.claude/commands/run-tests.md`:

````markdown
Run all unit tests:

```bash
!npm run test:unit
````

You can now trigger it in the terminal using `/run-tests`.

---

## 5. Best Practices

- **Treat CLAUDE.md like a prompt** — test, shorten, and refine it regularly.
- **Use `/clear`** before starting a new large task.
- **Switch models contextually** — `opus` for analysis, `sonnet` for daily coding.
- **Save checkpoints** with `/resume` and `/rewind`.
- **Don’t rush to trust it fully** — confirm all file changes at the beginning.

---

## 6. Summary

Claude Code is more than just a CLI assistant. It’s a flexible, context-aware environment that allows AI to truly participate in your development workflow — from planning to coding, review, and deployment.

With the right setup (**CLAUDE.md** + **.claude/settings.json**), you can build a truly powerful workflow.

In the next post, we’ll cover how to set up an **MCP Puppeteer server** and connect Claude Code to your browser to debug and test web apps in real time.

