---
title: "How to Use Marten in Multitenant Architecture? A Guide for .NET Developers"
date: "2025-07-09"
slug: "marten-multitenancy-guide-dotnet-developers"
excerpt: "Learn how to implement multitenancy in .NET applications using Marten - from row-level isolation to separate databases per tenant"
thumbnail: "/images/marten-multitenancy-guide-dotnet-developers-thumbnail.png"
categories: ["Archtecture", ".NET", "Programming"]
---

# How to Use Marten in Multitenant Architecture? A Guide for .NET Developers

If you're building a .NET application and need a flexible approach to data storage - especially in **multitenant environments** - Marten can be your ally.

This open-source library allows you to use PostgreSQL as both a **document database** and an **event store**, while providing extensive configuration options - including support for multiple tenants.

## What is Marten?

Marten is a powerful tool for .NET that transforms PostgreSQL into much more than a relational database. It supports:

- **Document Store** - store objects as JSON (thanks to `jsonb` support in PostgreSQL)
- **Event Sourcing** - full event stream support
- **CQRS** - natural support for separating writes and reads
- **Projections** - synchronous and asynchronous read model generation

But today we'll focus on **how to use Marten in multitenant environments**.

## What is Multitenancy?

**Multitenancy** means an architecture where one application serves multiple clients (tenants), but each tenant's data is **isolated**. In Marten, you can achieve this in different ways:

1. **Separate databases** for each tenant (Database-per-tenant)
2. **Separate schemas** in one database (Schema-per-tenant)
3. **One database, shared tables** with tenant identifier (Row-per-tenant)

## How Does Marten Support Multitenancy?

Marten gives you complete freedom - you decide whether to isolate tenants through separate databases, schemas, or simply use an additional `TenantId` column.

### 🔹 1. Row-per-tenant (shared table, tenant identifier)

This is the simplest approach. Just add a `TenantId` property to your documents, then use `IDocumentSession` assigned to a specific tenant:

```csharp
var session = documentStore.LightweightSession("tenant-a");
await session.StoreAsync(new User { Name = "Adam", TenantId = "tenant-a" });
await session.SaveChangesAsync();
```

This approach is simple and efficient, but requires manual control to ensure queries are filtered by `TenantId`.

### 🔹 2. Schema-per-tenant - separate schemas for each client

Marten allows you to dynamically set the database schema per session. Example:

```csharp
services.AddMarten(options =>
{
    options.Connection("Host=localhost;Database=multitenant;Username=postgres;Password=password");
    options.MultiTenanted();
});
```

During operation:

```csharp
using var session = documentStore.LightweightSession("tenant1");
await session.StoreAsync(new Customer { Name = "Tenant 1 Customer" });
await session.SaveChangesAsync();
```

Tenant "tenant1" gets its own schema in PostgreSQL. Marten creates separate table structures per tenant - clean data separation.

### 🔹 3. Database-per-tenant - separate database per client

Here you have full isolation - each tenant gets its own database.

Example (using factory):

```csharp
services.AddSingleton<IDocumentStoreFactory, MyTenantStoreFactory>();
```

Inside `MyTenantStoreFactory`, you can create `DocumentStore` dynamically per tenant:

```csharp
public class MyTenantStoreFactory : IDocumentStoreFactory
{
    public IDocumentStore ForTenant(string tenantId)
    {
        var connStr = $"Host=localhost;Database=tenant_{tenantId};Username=postgres;Password=secret";
        return DocumentStore.For(options =>
        {
            options.Connection(connStr);
            options.AutoCreateSchemaObjects = AutoCreate.All;
        });
    }
}
```

This approach is more complex but works great in enterprise-class systems where complete isolation is important.

## 🔧 Configuring Multitenancy in Marten

To enable multitenancy support, simply:

```csharp
services.AddMarten(options =>
{
    options.Connection("...");

    // Enable multitenant mode
    options.MultiTenanted();

    // Projection configuration - also per tenant
    options.Projections.Add<InvoiceProjection>(ProjectionLifecycle.Async);
});
```

In code, you can use `IDocumentSession` with a specific tenant:

```csharp
var session = documentStore.LightweightSession("tenant42");

var user = new User { Name = "Karolina" };
await session.StoreAsync(user);
await session.SaveChangesAsync();
```

## 🧩 What About Event Sourcing?

Marten supports Event Sourcing also in multitenant mode:

```csharp
var session = documentStore.OpenSession("tenantX");

session.Events.StartStream<UserCreated>(Guid.NewGuid(), new UserCreated { Name = "New user" });
await session.SaveChangesAsync();
```

Each tenant will have separate event streams and separate projections, if you design the system that way.

## ✅ Benefits of Multitenancy with Marten

- **High flexibility** - you can change isolation strategy without changing application logic
- **Data security** - easier to control access and tenant separation
- **Scaling support** - different clients can operate in different environments (even physically)

## Conclusion

Marten is a powerful library for .NET applications, and combined with multitenancy, it becomes an excellent solution for SaaS and systems serving multiple clients.

Depending on your needs, you can:

- Use one database and filter by `TenantId`
- Use separate schemas for each client
- Have complete isolation through databases per tenant