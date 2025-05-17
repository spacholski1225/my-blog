---
title: "Understanding Dependency Injection in C#"
date: "2024-03-12"
slug: "dependency-injection-csharp"
excerpt: "Learn how Dependency Injection can improve your code structure, make your applications more testable, and increase flexibility. A practical overview with C# examples."
thumbnail: "/images/dependency-injection-csharp-thumbnail.jpg"
categories: ["Architecture", ".NET"]
---

**Dependency Injection (DI)** is a core concept in object-oriented programming. It refers to a technique where dependencies are provided to a class from the outside—typically via a constructor—rather than the class creating them itself.

Why is this useful? Because DI leads to **more flexible, testable, and maintainable** applications.

---

## Why Use Dependency Injection?

### ✅ Separation of Concerns  
With DI, the responsibility for creating dependencies is separated from their usage. A class doesn’t need to know how to create its dependencies—it just receives them ready to use.

### ✅ Testability  
DI makes unit testing easier. You can mock dependencies like `DbContext`, services, or repositories and inject them into your test subject. This allows for isolated and reliable tests.

### ✅ Flexibility and Extensibility  
Your code becomes easier to extend or change. If a dependency changes, you don’t need to search through multiple files—you just inject a new implementation where needed.

---

## Ways to Implement DI in C#

Here are three common approaches:

### 1. **Constructor Injection (Recommended)**

The most common and preferred way.

```csharp
public class OrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    // OrderService methods...
}
```

## 2. Property Injection
Less commonly used, but sometimes helpful in frameworks like ASP.NET Core.

```csharp
public class OrderService
{
    public IOrderRepository OrderRepository { get; set; }

    // OrderService methods...
}
```

## 3. Method Injection
Useful when a dependency is only needed temporarily.

```csharp
public class OrderService
{
    public void SetOrderRepository(IOrderRepository orderRepository)
    {
        // Set the dependency
    }

    // OrderService methods...
}
```

## Summary
Dependency Injection is all about externalizing object creation to promote cleaner architecture. It improves testability, modularity, and overall code quality.

If you're building applications in C#, learning DI (and using it with tools like Microsoft.Extensions.DependencyInjection or Autofac) will take your design to the next level.

Thanks for reading! 🙌
Feel free to ask questions or follow me on Instagram where I share what I’m currently learning and working on. See you there!