---
title: "Workflow vs Agent AI: When Neither Is the Right Answer"
date: "2026-04-15"
slug: "workflow-vs-agent-ai-when-neither-is-right"
excerpt: "The overlooked perspective: sometimes 100% predictability matters more than agent flexibility. How to evaluate which model fits your task before writing a single line of code."
thumbnail: "/images/workflow-vs-agent-ai-when-neither-is-right-thumbnail.webp"
categories: ["AI/LLM", "Architecture"]
---

# Workflow vs Agent AI: When Neither Is the Right Answer

Everyone is building AI agents right now. If you follow the hype, the answer to every automation problem is a multi-step agent with tools, memory, and the ability to "reason" through complex tasks. But there's a perspective that gets almost no airtime: sometimes the right call is to use neither a workflow nor an agent — and choosing wrong will cost you in ways that compound over time.

This post is about making that call *before* you start coding.

## What We're Actually Talking About

Let's define terms clearly, because "agent" and "workflow" get used interchangeably in a way that causes real confusion.

**A workflow** is a deterministic sequence of steps. Given the same input, it always produces the same output via the same path. Think: ETL pipelines, scheduled reports, form submission handlers. There's no decision-making at runtime — the decisions were baked in when you designed the workflow.

**An agent** is a system where an LLM decides, at runtime, what steps to take next. It has tools it can invoke, context it accumulates, and the ability to course-correct based on what it observes. The path from input to output is not fixed — it emerges from the model's reasoning.

Both are legitimate patterns. The problem is when developers reach for one when the other (or neither) was the right fit.

## The Case for Pure Determinism

Here's the question almost nobody asks at the start of a project: *Does this task actually require decision-making at runtime?*

Consider a system that generates a weekly sales report from a database, formats it, and emails it to a distribution list. You could build this as an agent. The agent could "decide" which metrics to highlight, "reason" about whether the numbers look anomalous, and "choose" how to structure the email. That sounds impressive.

It also means:

- The output varies run to run, even with identical data
- Debugging a wrong output requires reconstructing the model's reasoning chain
- A stakeholder who got the "wrong" report has no good explanation for why
- You can't write a deterministic test for it

For a weekly report, none of that variability is a feature. It's pure downside. A cron job calling a SQL query and a templating function is strictly better. It's auditable, testable, and boring — which is exactly what you want from infrastructure.

**The rule:** If every output path can be specified in advance and the value of the task is in reliable execution, use neither an agent nor a "smart" workflow. Use a script.

## When Workflows Earn Their Keep

Workflows shine when:

1. The steps are known, but the *orchestration* is complex enough to warrant a framework
2. You need retry logic, error handling, and observability baked in
3. Multiple systems need to coordinate in a defined sequence
4. You want visual tooling or non-engineer visibility into what's happening

A workflow tool like Temporal, Airflow, or Step Functions gives you durability, observability, and composability for free. The tradeoff is a framework to learn and operate.

The key signal: **the decision tree is fully enumerable**. You can draw it on a whiteboard. Every branch has a known condition. If that's true, a workflow (or a plain script) is appropriate — and you don't need an LLM anywhere in the critical path.

Where workflows go wrong is when engineers use them as a crutch for tasks that are inherently variable. If your workflow has 47 conditional branches because the business logic is genuinely complex and context-dependent, you haven't avoided the agent problem — you've just encoded it in YAML instead of a prompt.

## When Agents Are Actually Worth It

Agents earn their complexity when the task has two properties:

1. **The output space is too large to enumerate.** You can't predefine every step because the right next step depends on what you've learned so far.
2. **Errors are recoverable.** The agent can observe that something went wrong and try a different approach.

Classic examples: code review agents that need to understand context before deciding what to flag, research agents that follow references based on what they find, customer support agents that handle genuinely novel situations.

The critical word in point 2 is *recoverable*. If a wrong intermediate step causes irreversible damage — data deleted, email sent, financial transaction committed — the agent's ability to course-correct comes too late. In those cases, you need human-in-the-loop checkpoints, which partially defeats the purpose of autonomous operation.

**The rule:** Agents are appropriate when the problem space is too large to predefine, errors are observable and recoverable, and the cost of variability is acceptable.

## The Evaluation Framework (Before You Code)

Here's the decision process I use before picking any architecture:

### Step 1: Can you write the test first?

Not a unit test for a helper function — the acceptance test. "Given input X, the system produces output Y." If Y is deterministic, you don't need an agent. If Y can only be evaluated by a human or another LLM ("was this response helpful?"), you're in agent territory.

### Step 2: What happens when it's wrong?

Map out failure modes. If a wrong output is:
- **Immediately detectable and low-cost to retry** → agent is viable
- **Detectable but high-cost to recover** → workflow with human review gates
- **Silent or catastrophic** → deterministic system only, with explicit error handling

### Step 3: Who gets blamed when it fails?

This sounds cynical, but it surfaces real constraints. If a VP gets a wrong report and asks "why did it say that?", you need to be able to answer. An agent's reasoning chain is not an answer that survives a conference room. A deterministic pipeline with logging is.

### Step 4: What's the tail risk?

Agents have heavy-tailed failure distributions. Most of the time they work well. Occasionally they do something completely wrong in a creative way you didn't anticipate. Ask whether your system can tolerate that tail — not just the happy path.

## The Hidden Third Option: LLM-Augmented Determinism

There's a pattern that often gets overlooked: using an LLM *inside* a deterministic system, for a bounded, well-defined subtask.

```python
def classify_support_ticket(text: str) -> TicketCategory:
    # LLM does one thing: classify. The rest of the pipeline is deterministic.
    response = llm.complete(CLASSIFICATION_PROMPT.format(text=text))
    return TicketCategory(response.strip())

def route_ticket(ticket: Ticket) -> Team:
    # Deterministic routing based on LLM classification
    category = classify_support_ticket(ticket.body)
    return ROUTING_TABLE[category]
```

The LLM handles the part that's genuinely hard to enumerate (natural language classification). Everything else is a lookup table. This gives you:

- Deterministic behavior for everything except the LLM call
- A clear boundary for where variability can occur
- Testability: you can mock the LLM call and test the routing logic independently
- Auditability: log the classification, and you can reconstruct any routing decision

This pattern is underused. Many systems that "need an agent" actually need an LLM in a box.

## Practical Takeaways

- **Default to determinism.** Add AI where it earns its keep, not by default.
- **Ask "can I test this?" before choosing an architecture.** If you can't write the test, you don't understand the problem well enough to build a solution.
- **Evaluate tail risk explicitly.** The happy path is not the whole story.
- **Consider LLM-augmented determinism** as a middle path before committing to a full agent architecture.
- **Agents are appropriate for genuinely open-ended tasks** where the output space is too large to enumerate and errors are recoverable.

The question "workflow or agent?" is the wrong starting point. The right question is: "What level of predictability does this task actually require?" Answer that first, and the architecture usually follows naturally.

The teams that ship reliable AI systems aren't the ones who reached for agents first — they're the ones who reached for the simplest thing that could possibly work, and added complexity only when they'd proven it was necessary.
