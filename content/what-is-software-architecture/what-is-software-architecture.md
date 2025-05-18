---
title: "What is Software Architecture?"
date: "2025-05-07"
slug: "what-is-software-architecture"
excerpt: "Understanding the high-level structure and design principles of software systems versus the detailed planning of individual components."
thumbnail: "/images/what-is-software-architecture-thumbnail.jpg"
categories: ["Architecture"]
---

# What is Software Architecture?

Imagine you're building a house. Before the bricklayers get to work, you need a plan for the entire building – where the walls will be, how large the rooms will be, where to put the installations. That's what architecture is!

In the world of software, architecture is the "big picture" of the system. It's the high-level structure that defines:

* What the main components of the system will be
* How these components will communicate with each other
* What technology will be used
* How scalable the system will be
* How to ensure security, performanceand reliability

Software architecture is usually created at the beginning of a project and is rarely changed, because any modifications at this level can have a huge impact on the entire system.

## What is Software Design?

Going back to the house analogy – software design is like planning specific rooms. Once you know where the kitchen will be, you need to decide exactly how to arrange it, where to place appliances, what the cabinets will look like, etc.

Software design concerns smaller, more detailed elements:

* How a given module or component will specifically work
* What classes and functions will be needed
* How to implement specific algorithms
* How to organize code into files and directories

## Key Differences

### Scope

* **Architecture:** Macrostructure of the system - a "bird's eye view"
* **Design:** Microstructure of specific components - "up close"

### Level of Abstraction

* **Architecture:** High-level concepts, without delving into implementation details
* **Design:** Low-level solutions, specific mechanisms and strategies

### Goal

* **Architecture:** Ensuring that the global structure of the system meets the requirements
* **Design:** Ensuring that individual modules work correctly and efficiently

### Visualization

* **Architecture:** Often represented using UML diagrams, such as component or deployment diagrams
* **Design:** Implemented through class and sequence diagrams, showing exactly how a given module works

### Who is Involved

* **Architecture:** Usually experienced engineers or software architects
* **Design:** Often implemented by development teams or individual programmers

### Flexibility and Refactoring

* **Architecture:** Rather stable, changes are difficult and costly
* **Design:** More flexible, changes are easier and affect a smaller area

## The Software Development Process

In a typical software development process:

1.  First, we define the **architecture** - we make key decisions about the entire system.
2.  Then, we move on to **design** - we determine the implementation details of individual components.
3.  Finally, it's time for **implementation** - writing code according to the established design.

## Managing Changes

An interesting difference is the approach to changes:

* **Architecture:** Changes at the architectural level are a serious matter and require the approval of many people because they can affect the entire system.
* **Design:** Changes at the design level are more local and easier to implement.

## Practical Example

Let's imagine we are creating an e-commerce application:

**Architecture will determine:**

* Whether it will be a monolithic or microservices application
* What main components will be needed (shopping cart, product catalog, payment system)
* How these components will communicate
* Where the data will be stored
* How to ensure scalability during promotions

**Design will take care of:**

* How exactly the shopping cart will work (what classes, methods)
* How to implement product search
* How to organize the code of the payment system
* How to design the user interface for the order process