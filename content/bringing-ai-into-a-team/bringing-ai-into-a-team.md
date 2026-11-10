---
title: "Bringing AI Into a Team: People, Workshops, Processes and What to Measure"
date: "2026-11-14"
slug: "bringing-ai-into-a-team"
excerpt: "How I'd bring AI tools into a team so people want to use them: start with those who already use AI, run workshops, make the process clear for whoever supervises the agent and measure time and quality of the delivered work."
thumbnail: "/images/bringing-ai-into-a-team-thumbnail.webp"
categories: ["AI/LLM", "Software Engineering", "Productivity"]
---

# Bringing AI Into a Team: People, Workshops, Processes and What to Measure

When I think about bringing AI tools into a team, the goal for me is that people actually want to use them. Below is how I'd start and how I'd check whether it works.

At a previous company I prepared workshops and presentations for around 40–50 people. It was 2025, when many developers were moving from chatbots to coding agents in the terminal. I talked about LLMs, about coding agents, about an AI code reviewer I had built and about my own way of working with these tools. Some people came back later with questions about the tools, and I took that as a sign they had started using them. I didn't measure it. What I describe below is what I'd do today, and those workshops looked a bit different.

## Start with the people who already use AI

First I'd find out whether someone in the team, or working on the same product, already uses AI every day and can tell more about it. I'd start with them, because they already know the process and know where AI helps and where it doesn't.

## If nobody uses AI yet, start with workshops

If there's nobody like that in the team, I'd start with workshops and build the skills from the beginning. The order I'd use:

1. What LLMs are and how AI tools work, for example what a context window is.
2. How to write prompts.
3. How to integrate agents into the work.
4. How to create skills for our own processes.

I'd run the last one for the specific team, because every product and every team works a bit differently, has slightly different processes and will use these tools in its own way, so that the team gets real value and a return on the whole investment.

A simple check after the first workshops: someone who works with a chat like ChatGPT can say why we can't paste a whole document into it and count on a sensible answer.

## Make the process clear for the person supervising the agent

If we want AI to do part of the work for us, the process has to be clear, first of all for the human. The person supervising the agent has to be able to check what it does: whether the agent's line of reasoning is OK, or whether something is off and we should give it different skills or change its whole workflow.

The process around the code matters as well. I wrote about the time that goes into decisions and approvals after the agent has written the code in [Where the Time Goes After the Agent Writes the Code](https://szymonpacholski.com/blog/where-time-goes-after-agent-writes-code).

The answer "AI is useless in our case" is also valuable feedback, and I wouldn't be afraid of it. Before accepting it, I'd check whether this really is a process, or a part of one, where we can't use these tools, or whether we're missing some skills and need training to use them effectively.

## What to measure

The next part is measuring: whether AI use is actually growing and whether it saves us time. We have to decide what to measure and how.

One option is token count. On its own it tells me very little, because reading documents also eats tokens, and that doesn't mean the team delivers more value or finishes a given task faster. So I'd look at two things side by side: the tokens we burn and the value we actually deliver, for example whether a task got delivered faster.

Measuring time is a fairly good indicator. Say someone used to spend a week on a task. They get AI tools and can do the same task in a few days, with the same quality. For me that's a success.

Something else to keep in mind: an agent may work on a task as long as a person would, or even longer, and in that time I can work on something else. That's a time saving too. When I count it, I include the time I spend reviewing what the agent did.

Amazon wrote about the same problem in its recent guidance on the developer role ([memo by Terk Terkowitz](https://www.aboutamazon.com/news/company-news/amazon-software-engineer-role-guideline-ai), October 2026). It calls token usage and AI tool adoption input metrics, admits they are deeply flawed, says they still correlate well with the outcomes that matter and warns against turning them into targets.

## Step by step

To sum up, for me the start of bringing AI into a team is clear processes, ideally having any processes at all, and building people's skills. Then we roll AI out step by step, remembering that people will be the ones using it, so they have to see the value in it. If they decide that what AI produces is worthless, they won't want to use it.
