---

title: "Design Patterns for Multi-Tenant Applications in DDD Architecture"
date: "2025-10-06"
slug: "design-patterns-multi-tenant-ddd"
excerpt: "Learn how to combine Domain-Driven Design with classic patterns like Repository, Strategy, and Decorator to build scalable multi-tenant applications with proper data isolation and clean architecture."
thumbnail: "/images/design-patterns-multi-tenant-ddd-thumbnail.webp"
categories: ["Architecture", "Design Patterns"]
-----------------------------------------------------------------------

# Design Patterns for Multi-Tenant Applications in DDD Architecture

Building multi-tenant applications is a challenge—on one hand, you want a single application that's centrally maintained and deployed, but on the other, you need to ensure complete isolation of data, configuration, and behavior for each client (tenant).

When we add Domain-Driven Design (DDD) to the mix, we get an architecture where business logic remains pure, and infrastructure with design patterns help manage complexity. In this post, I'll show how to combine DDD with classic patterns (Repository, Strategy, Decorator) in a multi-tenancy context.

## Multi-Tenancy and DDD — Why They Work Well Together

Multi-tenant means that a single application instance serves multiple clients. Each client (tenant) can have their own data, settings, limits, and even different functionalities.

Domain-Driven Design, on the other hand, allows for clear separation of domain logic from infrastructure. This provides:

* Domain model remains clean and independent of tenancy context
* Natural separation of concerns (domain, application, infrastructure)
* Ability to introduce different strategies and configurations without violating domain logic

In practice, it's about making the application "understand" tenants without being contaminated by them.

## Repository Pattern — The Heart of DDD in Multi-Tenant Systems

The repository in DDD is the bridge between the domain world and the database. In a multi-tenancy context, its main task is data isolation.

### Most Common Implementation Variants

**1. Parametric**

Repository methods accept `tenantId` as a parameter:

```csharp
Task<Order?> GetByIdAsync(string tenantId, Guid id);
```

Simple, but introduces tenancy into every point of the domain—not always desirable.

**2. Contextual (Preferred)**

The repository uses `ICurrentTenant`, which provides the current `TenantId`:

```csharp
public interface ICurrentTenant
{
    string TenantId { get; }
    bool IsHost { get; }
}
```

This solution "cleans" domain interfaces, keeping tenancy logic outside them.

**3. Repository Per Tenant**

Each tenant has their own repository instance registered in DI. Practical only with a small number of tenants.

### Implementation with EF Core

The most convenient approach is to add a global filter:

```csharp
modelBuilder.Entity<Order>()
    .HasQueryFilter(o => o.TenantId == _currentTenant.TenantId);
```

This prevents accidentally reading another tenant's data. In tests or migrations, the filter can be temporarily disabled.

## Strategy Pattern — Different Behaviors for Different Tenants

This pattern shines in multi-tenant applications. It allows flexible changes to domain behavior—without interfering with the base code.

### Typical Use Cases

* Different pricing algorithms (`PricingStrategy`)
* Different validations, limits, or throttling
* Integrations with different billing systems

Example:

```csharp
public interface IPricingStrategy
{
    Money CalculatePrice(Order order);
}

public class DefaultPricingStrategy : IPricingStrategy { ... }
public class EnterprisePricingStrategy : IPricingStrategy { ... }
```

Injection via DI:

```csharp
services.AddTransient<Func<string, IPricingStrategy>>(sp => tenantId =>
{
    if (tenantId == "ENT") return sp.GetRequiredService<EnterprisePricingStrategy>();
    return sp.GetRequiredService<DefaultPricingStrategy>();
});
```

This pattern naturally supports the **Open/Closed Principle** — new strategies can be added without modifying existing code.

## Decorator Pattern — Cross-Cutting Behaviors in Multi-Tenant World

Decorators allow adding functionality around existing services—ideal for logging, caching, auditing, or rate limiting.

In a multi-tenant environment, it's crucial that each tenant has isolated side effects.

Example:

```csharp
public class CachingRepositoryDecorator<T, TId> : IRepository<T, TId>
    where T : AggregateRoot
{
    private readonly IRepository<T, TId> _inner;
    private readonly ICache _cache;
    private readonly ICurrentTenant _tenant;

    public CachingRepositoryDecorator(IRepository<T, TId> inner, ICache cache, ICurrentTenant tenant)
    {
        _inner = inner;
        _cache = cache;
        _tenant = tenant;
    }

    public async Task<T?> GetAsync(TId id, CancellationToken ct = default)
    {
        var key = $"{_tenant.TenantId}:repo:{typeof(T).Name}:{id}";
        if (_cache.TryGet<T>(key, out var cached)) return cached;
        var entity = await _inner.GetAsync(id, ct);
        if (entity != null) _cache.Set(key, entity, TimeSpan.FromMinutes(10));
        return entity;
    }
}
```

**Critical:** Always include `TenantId` in the cache key. One mistake and you have a ready data leak between clients.

## Data Storage Models

| Model                      | Description                                        | Advantages                      | Disadvantages                    |
| -------------------------- | -------------------------------------------------- | ------------------------------- | -------------------------------- |
| Shared DB, Shared Schema   | One database, shared tables with `TenantId` column | Low cost, simplicity            | Risk of data leakage             |
| Shared DB, Isolated Schema | Separate schemas per tenant                        | Better isolation                | More difficult maintenance       |
| Isolated DBs               | Separate databases                                 | Maximum isolation, easy backups | High cost, management complexity |

## Tenant Resolution — Where to Identify the Client?

Best practice is as close to the system edge as possible:

**Middleware / API Gateway** — extracts `TenantId` from header, domain, or JWT, then passes it forward as `ICurrentTenant`.

Example of simple middleware:

```csharp
public class TenantResolverMiddleware
{
    private readonly RequestDelegate _next;

    public TenantResolverMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context, ICurrentTenantAccessor tenantAccessor)
    {
        var tenant = context.Request.Headers["X-Tenant-Id"].FirstOrDefault()
                     ?? ExtractFromHost(context.Request.Host.Host);

        tenantAccessor.SetTenant(tenant ?? "default");
        await _next(context);
    }
}
```

The domain should never "search" for the tenant itself—that's the infrastructure's role.

## Testing and Maintenance

### Unit Tests

* Mock `ICurrentTenant`
* Verify strategies and decorators depending on `TenantId`

### Integration Tests

* Ensure tenant filters in EF Core work correctly
* Test migrations and data isolation between tenants

### End-to-End Tests

* Verify complete user paths for different tenants

## Anti-Patterns to Avoid

* Hard-coding `TenantId` in code
* Cache without tenant prefixes
* Missing filters in repositories
* Tenancy logic in the domain
* Global, static `CurrentTenant`

Each of these mistakes can lead to catastrophic data leaks or unpredictable errors.