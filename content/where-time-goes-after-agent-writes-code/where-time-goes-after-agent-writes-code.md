---
title: "Where the Time Goes After the Agent Writes the Code"
date: "2026-11-07"
slug: "where-time-goes-after-agent-writes-code"
excerpt: "With a coding agent a new endpoint takes a few minutes, and then the change can wait a week for a decision. Where that time goes and what could shorten it."
thumbnail: "/images/where-time-goes-after-agent-writes-code-thumbnail.webp"
categories: ["AI/LLM", "Software Engineering", "Productivity"]
---

# Where the Time Goes After the Agent Writes the Code

With a coding agent I can add a new view in the frontend or a new endpoint in a few minutes. I describe the change, the agent writes it, I check the result and run the tests.

Then the change waits. Someone has to say whether this is what the product needs and whether it should work this way. The client's team may want to see it first. The product owner should know about it. A tech lead or a manager has to accept it. From what I've seen, all of that can easily take a week, sometimes longer.

These are my observations, I haven't measured it. I've had changes to an algorithm ready almost right away, and then I waited until the right people agreed that it was really what they needed.

AI-assisted development makes developers more productive. I don't think the company gets faster at the same rate, because most of the waiting now happens around decisions.

## Where the time goes

When I look at the time between "the change is ready" and "the change is in production", most of it goes to people agreeing with each other:

- **Alignment in the team.** We discuss the approach, often in a meeting that has to fit into several calendars.
- **Approval.** A tech lead or a manager accepts the direction before the change moves on.
- **Product management.** Someone decides whether this is the right change and in what form, and someone needs to be told it happened.
- **The business or the client.** The people who will use it confirm that it fits their process. That usually means another call or another email thread.

QA could be on this list too, but in my experience testers are often quick, so I don't count them as the main delay.

Each of these steps hands the change to another person, and each handoff has its own waiting time. A faster agent doesn't shorten any of them.

## Adding more AI won't help much

The first idea is usually to add more AI: faster agents, more agents, agents working in parallel. All of these speed up writing the code.

Eliyahu Goldratt's theory of constraints describes this situation. A system moves as fast as its slowest step, and improving the other steps doesn't change the overall result. If a change waits a week for a decision, it hardly matters whether the code took ten minutes or a day. And when developers produce more changes than before, more of them wait in the same queue.

What would help is improving the process itself and making the path to a decision shorter. That's something the organisation has to change.

## More teams, fewer people in each

I'd go for more teams with fewer people in each.

In a small team fewer people need to agree on anything, so there are fewer meetings and fewer approvals. When a team owns a smaller part of the product, the developer who makes the change usually knows the problem well enough to judge whether it's the right change.

I'd also give developers more responsibility, including part of the product management. A developer who owns a part of the product looks after it and can decide what changes in it.

Before agents, implementation took most of a developer's time, so asking them to also manage the product was a lot. Today the agent does a good part of the implementation and some of that time is free. Whether developers can spend it on product decisions depends on the organisation.

## A team of one

The extreme version is a one-person team. One developer is their own tech lead, works with the agent, talks to the people who use the product and makes the decisions. There are no internal email threads and no meetings to align eight people.

I work in a one-person team right now, and I like it.

How far you can go depends on the product and the project, and you can't remove too many people. I think a senior developer working with AI can handle a lot alone. I'd still want one of these two things:

- **Another person who can test manually when needed**, for example when a change is risky.
- **A system where a change is easy to revert.** If a decision turns out wrong, rolling it back should be quick.

## What you can try next week

You probably can't reorganise your company next week. There are smaller things to start with.

**If you're a developer:**

- Look at your last few changes and check where the time went: writing code or waiting for a decision.
- When something needs a decision, come with a ready proposal, for example "I'd change it this way, here's the result". With an agent it's cheap to prepare, and people can react to something concrete.
- Take ownership of a small part of the product and make decisions there.

**If you're a tech lead or a manager:**

- List the decisions that wait for you and check which of them really need you.
- Shorten the path from a request to a decision: fewer people involved, clear ownership, and an agreed default when nobody objects.
- Make reverting changes easy, so that you can approve less up front.

I'm curious how this looks in your team. After the code is written, where does the time go?
