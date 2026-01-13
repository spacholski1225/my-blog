---

title: "How I Tame Legacy Code with Claude Code"
date: "2025-11-03"
slug: "tame-legacy-code-with-claude"
excerpt: "Discover how I use Claude Code to manage legacy codebases more efficiently — from context management and CLAUDE.md to GitHub integration and automation."
thumbnail: "/images/tame-legacy-code-with-claude-thumbnail.webp"
categories: ["AI Tools", "Claude Code", "Productivity"]
----------------------------------------------------------------

# How I Tame Legacy Code with Claude Code

Anyone who's ever dealt with legacy code knows it's a bit like renovating an old house — everything looks fine until you touch something, and suddenly you uncover twenty years' worth of wiring, hacks, and long-forgotten decisions. At some point, I realized that regular tools just weren’t enough. That’s when **Claude Code** came into play.

In this post, I’ll walk you through my daily workflow with Claude Code: how I manage context and costs, how I use `CLAUDE.md` and `settings.json`, and how I tie it all together with GitHub and agents. The goal is to make working with legacy code more structured and a lot less frustrating.

---

## 🧩 Managing Context and Costs

The biggest game-changer Claude Code introduced for me is **context and token management**.

I don’t keep one long conversation that eventually becomes unreadable. Instead, I use **subagents** — each with its own context, handling one specific topic.

Here’s how it works: in the main thread, I provide Claude with the initial files, problem description, and background. When deeper work is needed — like debugging or refactoring a large module — I delegate that task to a subagent. The subagent performs a full analysis, runs tests, reviews dependencies, and returns only a **summary**.

**Example:**

* diagnosis: 10k tokens
* analysis: 50k
* summary from subagent: 2k

So instead of 60k tokens, I end up with around 12k. The main thread stays clean, lightweight, and easy to follow — perfect for long-term projects.

---

## 📘 CLAUDE.md – My Command Center

The second key element is **`CLAUDE.md`** — a file that defines how Claude should behave when working with me. Not just technically, but also in terms of communication style.

In short, it defines that Claude should:

* be direct and honest,
* not always agree with me,
* be proactive — better to ask than guess,
* when working with legacy code, run tests first and then make changes,
* follow TDD principles,
* avoid empty comments like *"improved"* or *"better"*.

Thanks to that, Claude acts like a capable teammate, not just a command executor.

---

## 🔗 GitHub in Action

I mainly use the GitHub CLI to **inspect PRs and change history**.

Claude can check `git blame`, see who last touched a particular piece of code, and even link it to a Jira task. This makes it possible to reconstruct the entire context behind decisions that shaped the current codebase.

In practice — if a commit includes a Jira ticket number, Claude can connect to it and query it as an MCP server. That really helps to understand *why* something was done, not just *how*.

---

## 💭 Wrapping Up

Claude Code shines where other tools stumble — in legacy systems, where the **context is more complex than the code itself**.

It helps quickly grasp project structure, dependencies, frequently modified files, and how everything fits together. The GitHub and Jira integration makes it not just a code analysis tool, but a system that also understands the **history** behind the code.

Sure, you can do all this manually without configuration. But when certain tasks repeat regularly, it pays off to encapsulate them in Custom Commands, Skills, and Agents. It saves tons of time and lets you focus on what really matters.

👉 [Here’s a link to my repo with Claude Code configuration](https://github.com/spacholski1225/cc-config)
