---
title: "Using AutoMapper with DTOs in .NET"
date: "2021-07-09"
slug: "automapper-dto-net"
excerpt: "Learn how to use AutoMapper to simplify mapping between domain models and DTOs in .NET applications."
thumbnail: "/images/automapper.png"
categories: ["Programming", "Architecture"]
---

## Why Use DTOs?

When exchanging data between a client and a server, we need a consistent and safe way to transfer only the necessary information. One solution is to use **DTOs** (Data Transfer Objects). This is where **AutoMapper** comes in—a library that helps map one object type to another automatically.

By default, AutoMapper maps properties with matching names (e.g., `FirstName` to `FirstName`). At the end of this post, we’ll also look at how to customize mapping when property names differ.

---

## Installing AutoMapper

Installing AutoMapper is simple. Open **NuGet Package Manager**, search for **AutoMapper**, and install the package.

---

## Initial Setup

The first step is to create a configuration class for AutoMapper:

```csharp
public class AutoMapperConfig
{
    private IMapper _mapper;

    public AutoMapperConfig()
    {
        _mapper = new MapperConfiguration(cfg =>
        {
            // Mapper configuration goes here
        }).CreateMapper();
    }
}
```

## Creating the Model and DTO
Let's assume we have a User class that contains the following data: First Name, Last Name, City, and Address.

We also have a UserDto class that includes only the First Name and Last Name.

Mapping Setup
Now we’ll configure the mapping:

```csharp
public class AutoMapperConfig
{
    private IMapper _mapper;

    public AutoMapperConfig()
    {
        _mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<User, UserDto>().ReverseMap();
        }).CreateMapper();
    }

    public UserDto MapUserToUserDto(User user)
    {
        return _mapper.Map<UserDto>(user);
    }
}
```
- CreateMap<User, UserDto>() defines the mapping from User to UserDto.

- ReverseMap() allows mapping in the opposite direction as well.

We also added a MapUserToUserDto method to simplify usage.

## Creating the Model and DTO
Let’s assume we have a User class that contains the following data: First Name, Last Name, City, and Address.

We also have a UserDto class that includes only the First Name and Last Name.

Mapping Setup
Now we’ll configure the mapping:

```csharp
public class AutoMapperConfig
{
    private IMapper _mapper;

    public AutoMapperConfig()
    {
        _mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<User, UserDto>().ReverseMap();
        }).CreateMapper();
    }

    public UserDto MapUserToUserDto(User user)
    {
        return _mapper.Map<UserDto>(user);
    }
}
```

- CreateMap<User, UserDto>() defines the mapping from User to UserDto.

- ReverseMap() allows mapping in the opposite direction as well.

We also added a MapUserToUserDto method to simplify usage.

## Basic Usage
Let's test the configuration with a simple example:

```csharp
static void Main(string[] args)
{
    var mapper = new AutoMapperConfig();
    var user = new User
    {
        FirstName = "John",
        LastName = "Doe",
        City = "New York",
        Adress = "123 Main St"
    };
    var dto = mapper.MapUserToUserDto(user);
    Console.WriteLine(dto.FirstName);
    Console.WriteLine(dto.LastName);
}
```

## Custom Mapping (Different Property Names)
Now suppose we rename FirstName in UserDto to Name. This will cause AutoMapper to fail silently, and the Name property will be null.

To fix this, we need to modify the configuration:

```csharp
public AutoMapperConfig()
{
    _mapper = new MapperConfiguration(cfg =>
    {
        cfg.CreateMap<User, UserDto>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FirstName))
            .ReverseMap();
    }).CreateMapper();
}
```

### Explanation:
- ForMember tells AutoMapper to map FirstName from User to Name in UserDto.

- This solves the mismatch and ensures proper value assignment.

AutoMapper can significantly reduce boilerplate code when working with DTOs. With just a few lines of configuration, you can streamline how data flows through your application.