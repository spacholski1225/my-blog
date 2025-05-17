---
title: "Design Patterns Overview: Singleton, Factory, and Observer"
date: "2021-07-07"
slug: "design-patterns-overview"
excerpt: "An introduction to design patterns in software engineering with a focus on Singleton, Factory, and Observer patterns."
thumbnail: "/images/design_patterns.png"
categories: ["Architecture"]
---

## What is a Design Pattern?

A design pattern is a typical solution to a commonly occurring problem in software design. Each pattern comes with a plan and a set of best practices to address a specific issue.

## Types of Design Patterns

Design patterns are generally categorized into three groups:

- **Creational**
- **Structural**
- **Behavioral**

There are many design patterns. Describing them all would take considerable time, so I’ve chosen to highlight the most popular ones. This selection is based on discussions from various forums and their presence across multiple blogs.

---

## Singleton Pattern (Creational)

The goal of the Singleton pattern is to ensure that only one instance of a class exists throughout the application. However, this breaks the Single Responsibility Principle.

Singleton is commonly used for things like loggers, where all logs need to be recorded in a single place.

Let's create a `Logger` class with a private constructor to prevent new instances. Inside the constructor, we’ll add a message indicating that the constructor was called.

```csharp
public class Logger
{
    static readonly Logger logger = new Logger();

    private Logger()
    {
        Console.WriteLine("logger called");
    }

    public static Logger getLogger()
    {
        return logger;
    }
}
```
Calling the getLogger method will always return the same logger instance, regardless of where it is called in the code.

## Factory Pattern (Creational)

The Factory pattern allows you to create families of related objects without specifying their exact classes. This pattern involves defining interfaces for the product family and then implementing them in concrete classes.

A simple example is having a base class with user information and separate classes like Employee and Client that inherit from it.

This approach has several advantages:

Ensures that created objects are compatible with each other

Complies with the Single Responsibility Principle

Adheres to the Open/Closed Principle

However, it can also make the codebase more complex than necessary.

## Observer Pattern (Behavioral)

The Observer pattern enables a subscription mechanism to notify multiple objects about events occurring in the system. It’s commonly used in GUI applications—for example, buttons that trigger specific behavior when clicked.

The key benefit of this pattern is that it supports the Open/Closed Principle. You can introduce new subscribers without modifying the core code of the publisher.

For more detailed information on these and other design patterns, visit refactoring.guru.