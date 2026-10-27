---
title: "Superpowers Is a Template: How Agent Skills Change Between a Monolith, a Monorepo and Microservices"
date: "2026-10-31"
slug: "superpowers-template-agent-skills-per-architecture"
excerpt: "Superpowers gives you a solid workflow. The decisions inside it depend on your project — here is how agent skills differ in a monolith, a monorepo and microservices."
thumbnail: "/images/superpowers-template-agent-skills-per-architecture-thumbnail.webp"
categories: ["AI/LLM", "AI Agents", "Architecture"]
---

# Superpowers Is a Template: How Agent Skills Change Between a Monolith, a Monorepo and Microservices

Community skill packs like [Superpowers](https://github.com/obra/superpowers) are one of the best ways to start working with a coding agent. They give you a full workflow out of the box: brainstorm, plan, implement test-first, review. They also show you what a well-written skill looks like.

But a skill pack makes decisions. Those are the decisions of the person who wrote it, made without knowing your project.

I've worked in a large .NET monolith and later in TypeScript microservices. The development workflow in both was roughly the same. What an agent would need to know to work well in each of them was not. This article is about that difference: what I'd change in a community skill pack depending on the architecture of the project.

## A Good Rule That Doesn't Know Your Project

Take the test-driven development skill from Superpowers. Its core is called The Iron Law:

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

It's followed by "Write code before the test? Delete it. Start over." The skill applies it always: to new features, bug fixes, refactoring and behaviour changes. There are only three exceptions (throwaway prototypes, generated code and configuration files), and even those need your approval.

This is a good rule. I'm not arguing against it. But think about what it doesn't say.

Imagine you remove an element from a page footer. That's a behaviour change, so the agent writes a failing test first. Then another one for the next small change. The skill says nothing about cleaning up tests that no longer protect anything, or about how long your test suite is allowed to run. If nobody decides that, a few months later your CI takes several minutes instead of a dozen seconds.

That decision doesn't belong in a generic skill. It belongs to your project.

## The Workflow Is Universal, the Decisions Aren't

Almost every project I've seen follows the same loop: some kind of specification, implementation, tests somewhere in between, code review and deployment. That's not new. That's what the software development lifecycle has always looked like, and it's why a community workflow works well as a starting point.

The differences appear when you go one level deeper. What should review check? Which tests should run, and how? Where do you look when something breaks in production? The answers depend on the architecture, on how you work and on who you work with.

It helps to separate two things:

- **A project knowledge file** describes the project: what it does, its domain, its conventions. Most agents have a place for this.
- **A skill** is a tool the agent uses for a specific task, like reviewing a change or running tests. It tells the agent *how* to do that task in this repo.

The rest of this article is about the second one. The same review or testing skill needs different rules in three common architectures.

## Modular Monolith

One application, one deployment and usually one database. A modular monolith splits the code into modules, but the boundaries between them are mostly a convention. Nothing stops you from importing another module's internals, so over time the code gets tangled and a change in one place breaks something far away.

This is not a theoretical problem. Shopify [described](https://shopify.engineering/shopify-monolith) its Rails monolith of over 2.8 million lines of code, where every component depended on over half of all the other components, with many circular dependencies. A lot of the legacy code was grouped around the data it touched (database tables) rather than the task it performed. They built a tool, Packwerk, that runs in their pull request workflow and rejects changes that break the dependency graph or component encapsulation.

Other classic monolith problems are well documented too: the [anemic domain model](https://martinfowler.com/bliki/AnemicDomainModel.html), where objects hold only data and all logic lives in script-like services, and the [N + 1 query problem](https://guides.rubyonrails.org/active_record_querying.html#n-1-queries-problem), where loading 10 records triggers 11 queries.

An agent doesn't know which dependency is forbidden. It only sees that someone has already done it. So the review skill needs the boundaries written down.

For example, in a modular monolith I'd add a section like this to the review skill:

```markdown
## Module boundaries (project rules)

This repo is a modular monolith. Modules live in `src/modules/<name>/`.
Each module exposes only what is in its `public/` folder.

When reviewing a change:
- Flag any import from another module that does not go through its `public/` API.
- Allowed dependencies: `orders` → `catalog`, `orders` → `payments`.
  `catalog` and `payments` depend on no other module.
- An existing import that breaks these rules is not a precedent.
  Report it as debt; never copy it.
- A new dependency between modules needs a short reason in the PR description.
- A database query inside a loop over entities is a finding (N+1),
  even if the surrounding code does the same.
```

*The module names and paths are made up. The point is the shape: explicit boundaries, and a rule that existing violations are not an example to follow.*

## Microservices

A system split into small services that are deployed separately, each with its own data, talking over the network. In a single repository you see only one piece of the system. The rest you know only from contracts, and the most fragile place is the boundary: an API change that someone else depends on.

Martin Fowler lists the costs in [Microservice Trade-Offs](https://martinfowler.com/articles/microservice-trade-offs.html): remote calls are slow and always at risk of failure, and everyone has to manage eventual consistency. Ian Robinson's [Consumer-Driven Contracts](https://martinfowler.com/articles/consumerDrivenContracts.html) (2006) describes how consumers can couple themselves to a provider by depending on the whole document schema, not just the fields they use. And sharing one database between services brings back the problem Fowler describes as an [integration database](https://martinfowler.com/bliki/IntegrationDatabase.html): the database becomes a point of deep coupling, which significantly increases the risk of changing any of the applications.

So the review skill needs to know who calls this service and what the contracts are. It also needs naming and coding standards written down. Without them the agent matches its quality to the code that's already there. If that code is bad, the problem compounds with every change.

For example, in a microservice I'd add:

```markdown
## Contracts and consumers (project rules)

This service is `shipping-api`. Known consumers:
- `checkout-service` calls REST `/v1/quotes`
- `tracking-worker` reads the `ShipmentCreated` event

Contracts live in `contracts/` (OpenAPI and event schemas).

When reviewing a change:
- If a request, response or event changes, list which consumers read the changed field.
- Removing or renaming a field is a breaking change, even if this repo no longer uses it.
  Require a new version or a deprecation period.
- This service owns its database. Flag any query against another service's tables.
- Every call to another service needs a timeout and a handled failure path.
- Naming follows `docs/naming.md`, not the style of the file you are reviewing.
  Older code may not meet the standard.
```

*Again, the service names are invented. Same review stage as in the monolith, completely different questions.*

## Monorepo

Many projects and libraries in one repository, with shared tooling. Here the questions move from review to testing: what should run, where, and what the project has decided about it.

Monorepos work at enormous scale: Google's single repository serves [tens of thousands of developers](https://research.google/pubs/why-google-stores-billions-of-lines-of-code-in-a-single-repository/), and the paper discusses both the advantages and the trade-offs of the model. The problem that grows with the repo is scale itself. One change in a shared library can affect many projects at once, different parts may be tested differently, and the full test suite takes a long time. That's why monorepo tools like [Nx](https://nx.dev/docs/features/ci-features/affected) use Git to find what your branch changed and run only the tasks affected by it.

Flaky tests get worse with scale, too. Fowler's [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html) names the common causes: lack of isolation, asynchronous behaviour, remote services, time and resource leaks. He also warns that left uncontrolled, such tests can destroy the value of the whole regression suite.

This is where a project can consciously change a good default. Superpowers tells the agent to use real code in tests ("no mocks unless unavoidable") and to run the project's full test command before calling a change done, even if the task named only one test file. In a small repo that's exactly right. In a large monorepo, a team might decide differently, and write that decision down.

For example, a JS/TS monorepo using Nx and Stryker could add this to its testing skill:

```markdown
## Running tests in this monorepo (project rules)

Apps live in `apps/`, shared libraries in `libs/`.
The full test suite is too slow to run on every change.

- While working, run tests only for affected projects: `npx nx affected -t test`.
- The full suite runs in CI on every pull request. Do not run it locally unless asked.
- A change in `libs/` affects every project that imports it.
  Check the dependency graph before deciding what to test.
- Mock only network calls and third-party services.
  Shared libraries from `libs/` are used for real in tests.
- Mutation tests run only for `libs/pricing`, and only on request:
  `cd libs/pricing && npx stryker run`.
- A test that fails and then passes without a code change is flaky.
  Report it by name; do not re-run until it is green.
```

*Nx and Stryker are just one example for JavaScript and TypeScript. Other ecosystems have their own tools for affected tests and [mutation testing](/blog/mutation-testing-dotnet). The decision is what matters: which tests run where, and what gets mocked.*

## Same Stage, Three Different Skills

Put side by side, the workflow stays the same. The questions a skill has to answer don't.

| Stage | Modular monolith | Microservices | Monorepo |
| --- | --- | --- | --- |
| Review | Which module may depend on which? Is this import going through a public API? | Who consumes this API or event? Does this change break a contract? | Which projects does this change in a shared library affect? |
| Tests | Do tests respect module boundaries, or reach into internals? | What is mocked at the service boundary, and what is tested with contract tests? | Which tests run locally, which in CI? Where do we mock? Mutation tests, and where? |
| Debugging | Where does the call path cross modules? | How do I follow one request across services and their logs? | Which project and which version of a shared library is involved? |

## What Stays the Same, and Skills Beyond Code

Some things I keep in every project. When I change existing functionality, I first build a safety net: tests that capture the current behaviour. Then I make the change, and then I run the tests again. For key business logic I also read the diff myself.

Skills aren't only for writing code, either. One of the most useful kinds is a skill for analysing logs during a production incident. With an MCP server connected to wherever you keep logs, the skill tells the agent how to use it: where the logs are, how to filter them, what to look for first. You won't find that skill in any community pack, because everyone keeps their logs somewhere else. The same goes for opening pull requests the way your team does it.

And if you work in a team, keep the skills in the repository. Otherwise everyone runs a slightly different agent, with a different review and different standards, and the time you saved with the agent comes back as longer pull request reviews. It works better when everyone works with the same skills.

## Turning a Pack Into Your Own Set

None of this is tied to one tool. These rules are agent-agnostic: the same set of project rules works in any coding agent that can load instructions for a task.

If you're just starting with AI coding tools, install a community pack and use it. It's a great template for seeing how skills should be built. Then watch where it doesn't fit: which rules your project would answer differently, which questions it never asks. Change those parts, one skill at a time.

I treat skills, agents, plugins and configuration as machines that I have to tune for each project. The workflow comes with the pack. The decisions come from your project.

What decision in a ready-made skill didn't fit your project? Let me know in the comments.
