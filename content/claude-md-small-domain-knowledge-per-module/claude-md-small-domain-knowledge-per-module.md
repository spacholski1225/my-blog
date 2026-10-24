---
title: "Keep CLAUDE.md Small: Where Your AI Agent Should Find Domain Knowledge"
date: "2026-10-24"
slug: "claude-md-small-domain-knowledge-per-module"
excerpt: "An AI agent can read a lot of business logic from code, but not the physics of your client's machine. Keep that knowledge in per-module domain files and keep CLAUDE.md for rules the whole project needs."
thumbnail: "/images/claude-md-small-domain-knowledge-per-module-thumbnail.webp"
categories: ["AI/LLM", "Claude Code", "Architecture"]
---

# Keep CLAUDE.md Small: Where Your AI Agent Should Find Domain Knowledge

Two 500 mm parts from a 1000 mm bar. It fits, right?

Not on the machine I want to talk about. Its clamp holds the first 80 mm of every bar, and every cut loses 3 mm to the blade. So the real requirement is:

`500 + 500 + 2 × 3 + 80 = 1086 mm`

That is 86 mm more than the bar has.

An AI agent working in this codebase has no way to know that unless someone tells it. This article is about how I tell it: what goes into a per-module domain file, what stays in `CLAUDE.md`, and why I try to keep the memory file as small as possible.

## What an Agent Can and Can't Read From Code

Let's say you're building a module that plans cuts of steel bars for a client. An operator takes bars of different lengths from the warehouse, orders list the lengths of finished parts, and the goal is to fulfil as many parts as possible with as little waste as possible.

To be fair to the agent: it can read a lot of business logic from code. In the demo code I prepared for this example, it will find this at the top of the planner:

```python
CLAMP_MM = 80
KERF_MM = 3
```

What it won't find is *why* those numbers matter and *how* they apply. The clamp is reserved once per bar, not once per part. Kerf is lost on every cut, including the one that separates the last part. Waste is never zero, because clamp and kerf are always there. None of that is a property of the code. It's a property of a physical machine standing in the client's workshop.

The risk is not that the agent writes the whole planner wrong on day one. The risk is the small change later. Someone asks it to adjust a single function, the agent "simplifies" a calculation that looked redundant, and a rule it never saw is gone. Tests may catch it, if someone thought to write a test for that rule.

So the goal is simple: when the agent touches this module, it should know the rules of this module, even if the change is one function.

## The Same Word, a Different Module

The obvious move is to write these rules down somewhere. The question is where.

In a real application, cutting planning is one module among many. Words that sound universal often aren't. "Waste" in the cutting module means kerf plus clamp plus the remaining piece of the bar. In another module, say reporting or inventory, the same word could mean something else, for example only the offcuts that go to the scrap bin, or a cost rather than a length. If all of these definitions live in one global file, the agent gets several meanings of the same word and has to guess which one applies.

That is why I keep domain knowledge per module, or per bounded context, if you think in DDD terms. Each module gets a file describing its own vocabulary and rules: what a stock bar is, what an order is, what clamp and kerf mean here, how to check whether parts fit on a bar.

In the demo, that rule is written as a single line the agent can apply directly:

```text
sum(part_lengths) + n * kerf + clamp <= stock_length
```

In a larger project there is also a top-level `DOMAIN.md` that works as a map. It doesn't hold every rule. It describes which modules exist, how they cooperate, and the path to the domain file of each module.

I'm deliberately not giving you a template for these files. What goes into one depends on the module, and writing it well requires understanding the business, not filling in headings.

How the agent gets to the right file matters more than the format. In my projects, the root `CLAUDE.md` holds the shared project rules and points to two files: one describes the system's modules and what each is responsible for, the other holds the business domain knowledge. From there, the agent follows the path to the module it's working on. If you use Claude Code, it also has built-in mechanisms that fit this approach:

- A `CLAUDE.md` placed in a subdirectory is not loaded at launch. Claude Code loads it when Claude reads, writes or edits a file in that subdirectory.
- Rules in `.claude/rules/` with a `paths` field load only when Claude works with matching files.

One trap: an `@path/to/DOMAIN.md` import inside your root `CLAUDE.md` does not make the file "on demand". The [Claude Code documentation](https://code.claude.com/docs/en/memory) is explicit that imported files load together with the `CLAUDE.md` that imports them. Imports help organise a long file, but they don't reduce its context cost.

## What Stays in CLAUDE.md

This doesn't mean `CLAUDE.md` should be empty. It holds the rules that are true for the whole project, in every conversation: what the repository integrates with, how to build and test it, conventions everyone follows. Domain files hold the rules of one module, one business process, one slice of the application.

The test I use is a question: does the agent need this in literally every conversation? If not, it doesn't belong in the memory file.

I've also noticed a pattern in my own work: the more I put into `CLAUDE.md`, the worse the agent handled what came later in the session. It's an observation, not a measurement, but there are two reasons why it's plausible.

## Why: Cost and Lost in the Middle

**The first reason is cost.** Everything in the memory file is loaded into every conversation. Claude Code loads `CLAUDE.md` at the start of every session. If the cutting rules live there, you pay for them while the agent is fixing a CSS bug in a completely different part of the application. The Claude Code documentation recommends keeping each `CLAUDE.md` under 200 lines, because longer files consume more context and reduce adherence.

**The second reason is position in the context.** In ["Lost in the Middle: How Language Models Use Long Contexts"](https://arxiv.org/abs/2307.03172) (Liu et al., 2023), the authors found that language models perform best when relevant information is at the beginning or the end of the input, and noticeably worse when it's in the middle, even for models built for long contexts.

Now apply that to a typical session. A large memory file sits at the very beginning. Then you invoke a skill. In Claude Code, a skill's full content enters the conversation only when it's invoked, as one message that stays there for later turns. A skill is often a long prompt in itself. Then the conversation continues: tool calls, file reads, edits. The skill's instructions end up somewhere in the middle, between a heavy beginning and a growing end.

My reasoning, not a result from the paper: that is exactly where part of the skill can get ignored or used less effectively. The paper tested question answering and retrieval tasks, not coding agents. But the mechanism is the same: the more you load up front, the more of what follows ends up in the middle.

## Context Hygiene: A Practical Rule of Thumb

Here is the rule I follow:

- **Memory file: minimal.** Only what every conversation needs.
- **Domain knowledge: in dedicated files per module or bounded context.** The agent reads them when it works on that module.
- **A map for larger projects.** One top-level file that says which modules exist and where their domain files are.

The agent gets the context it needs for the task in front of it, not everything you know about the system. The larger the application, the more this matters, because the gap between "everything" and "what this task needs" keeps growing.

I think of it as context hygiene. Do you use a similar approach? I'm curious what works for you, especially if you have a domain rule your agent got wrong because nobody wrote it down.
