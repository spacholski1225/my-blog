---
title: "Building a Secure .NET API"
date: "2025-05-10"
slug: "building-secure-dotnet-api"
excerpt: "Learn how to build a secure API with .NET 8 using the latest security best practices and authentication methods."
---

# Building a Secure .NET API

In this post, we'll explore how to build a secure API with .NET 8 using the latest security best practices.

## Authentication with JWT

Authentication and authorization are critical components of any modern API. We'll look at how to implement JWT authentication and role-based access control.

```csharp
public class AuthController : ControllerBase
{
    [HttpPost("token")]
    public IActionResult GetToken(LoginModel model)
    {
        // Authentication logic
        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }
}
```

## Protecting Against Common Vulnerabilities

We'll also cover input validation, output encoding, and other security measures to protect against common vulnerabilities like SQL injection and XSS attacks.

### Input Validation

Always validate input data before processing it:

```csharp
public class UserController : ControllerBase
{
    [HttpPost]
    public IActionResult Create(UserModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        // Process valid data
    }
}
```

### HTTPS Enforcement

Always enforce HTTPS in production environments:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddHsts(options =>
    {
        options.MaxAge = TimeSpan.FromDays(365);
        options.IncludeSubDomains = true;
        options.Preload = true;
    });
}
```

## Secure Configuration Management

Store sensitive configuration data securely using the Secret Manager tool or Azure Key Vault:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration((context, config) =>
        {
            if (context.HostingEnvironment.IsProduction())
            {
                var builtConfig = config.Build();
                config.AddAzureKeyVault(
                    builtConfig["KeyVault:Vault"],
                    builtConfig["KeyVault:ClientId"],
                    builtConfig["KeyVault:ClientSecret"]);
            }
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

## Conclusion

Building a secure API requires attention to detail and following best practices. By implementing proper authentication, input validation, and secure configuration management, you can protect your API from common security threats.