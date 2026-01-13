---
title: "Microservices in .NET: From Theory to Practice"
date: "2025-08-04"
slug: "microservices-dotnet-theory-to-practice"
excerpt: "Explore the world of microservices in the .NET ecosystem - from basic concepts to advanced design patterns. Learn when to use microservices, best practices, and practical implementation strategies."
thumbnail: "/images/microservices-dotnet-theory-to-practice-thumbnail.webp"
categories: ["Architecture", ".NET"]
---

# Microservices in .NET: From Theory to Practice

Have you ever wondered how Netflix handles millions of users simultaneously, or how Amazon manages thousands of orders per second? The secret lies in microservices architecture. In this article, I'll guide you through the world of microservices in the .NET ecosystem - from fundamental concepts to advanced design patterns.

## What are microservices and when to use them?

**Microservices are independently deployable, small applications that implement single functionalities.** This definition sounds simple but hides enormous implementation complexity.

### Why microservices?

The main motivations are:

- **"Scale out" scalability** - ability to scale only the parts of the system that need it
- **Faster change delivery** - small teams can work independently
- **Higher reliability** - failure of one service doesn't paralyze the entire system

### When to choose microservices?

Microservices aren't a cure-all. They work well when you have:

- Complex business domains with clear boundaries
- Independent development teams
- Need for high availability (99.9%+)
- Mature DevOps processes

### Monolith vs microservices - honest comparison

**Monolith** offers simpler management, easier debugging, and lower infrastructure costs at the start. However, over time it becomes less scalable and slower to develop.

**Microservices** provide flexibility and scalability, but at the cost of operational complexity and higher infrastructure costs.

## Design best practices

### 1. Domain design

**Bounded Context** is a key concept. Each microservice should handle one business domain:

```
├── OrderService (Bounded Context: Orders)
├── PaymentService (Bounded Context: Payments)  
├── InventoryService (Bounded Context: Inventory)
└── NotificationService (Bounded Context: Notifications)
```

**Clean Architecture** helps maintain clean code:

- **Domain layer** - business logic
- **Application layer** - use cases
- **Infrastructure layer** - databases, external APIs
- **Presentation layer** - controllers, minimal APIs

### 2. Interfaces and contracts

**OpenAPI/Swagger** automatically generates documentation:

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

**API Versioning** ensures backward compatibility:

- Path versioning: `/api/v1/orders`, `/api/v2/orders`
- Headers: `API-Version: 1.0`
- Media types: `application/vnd.api.v1+json`

### 3. Communication: sync vs async

**Synchronous communication** (REST, gRPC) is simple but prone to cascading delays. If service A calls B, which calls C - the delay adds up.

**Asynchronous communication** through queuing ensures loose coupling and higher resilience, but introduces eventual consistency complexity.

### 4. Resilience patterns

The **Polly** library is a must-have for microservices:

```csharp
var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, retryAttempt => 
        TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

var circuitBreakerPolicy = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(3, TimeSpan.FromMinutes(1));

var policyWrap = Policy.WrapAsync(retryPolicy, circuitBreakerPolicy);
```

The **Bulkhead pattern** isolates resources - e.g., separate thread pools for different request types.

### 5. Observability

Without proper monitoring, microservices are a black box:

**Logging:**
- Serilog with sinks to ElasticSearch or Seq
- Structured logging with correlation ID

**Tracing:**
- OpenTelemetry for standard request tracing
- Jaeger or Zipkin for visualization

**Monitoring:**
- Prometheus + Grafana for metrics
- Azure Monitor for all-in-one solution

### 6. Security

**Authentication and authorization:**
- OAuth2/OpenID Connect with Duende IdentityServer
- JWT tokens with ASP.NET Core Authentication

```csharp
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://your-identity-server";
        options.RequireHttpsMetadata = true;
        options.Audience = "your-api";
    });
```

**Secret management:**
- Azure Key Vault
- AWS Secrets Manager
- Never commit secrets to repo!

### 7. CI/CD and DevOps

Automation is fundamental:

- **GitHub Actions / Azure DevOps** for pipelines
- **Tests**: unit (xUnit), integration, end-to-end
- **Canary/Blue-green deployments** minimize downtime

## Data management in microservices

### Database Per Service

Each service has its own database. This ensures isolation but eliminates global ACID transactions.

### Saga Pattern

For distributed transactions, we use the Saga pattern - step-by-step compensation:

```csharp
public class OrderSaga : ISaga
{
    public async Task Handle(OrderCreated orderCreated)
    {
        // Step 1: Reserve inventory
        await reserveInventory.Send(new ReserveInventory(orderCreated.OrderId));
    }
    
    public async Task Handle(InventoryReserved inventoryReserved)
    {
        // Step 2: Process payment
        await processPayment.Send(new ProcessPayment(inventoryReserved.OrderId));
    }
    
    public async Task Handle(PaymentFailed paymentFailed)
    {
        // Compensation: Release reservation
        await releaseInventory.Send(new ReleaseInventory(paymentFailed.OrderId));
    }
}
```

### Event Sourcing and CQRS

Separating reads from writes allows for:

- Independent scaling of read/write operations
- Complete change history
- Easier analytics

## My recommendations

### 1. Start with a modular monolith

Don't jump into the deep end right away. Build a monolith with clear module boundaries (Bounded Contexts), then gradually extract microservices.

### 2. Automate everything

CI/CD, tests, monitoring, infrastructure provisioning - without automation, microservices become an operational nightmare.

### 3. Invest in observability

Without logs, metrics, and tracing, you won't find problems in a distributed system. This isn't optional.

### 4. Keep it simple

One communication standard, one logging approach, one DI framework across the entire organization.

### 5. Team education

Microservices require new skills: Domain Driven Design, resilience patterns, Kubernetes, observability.