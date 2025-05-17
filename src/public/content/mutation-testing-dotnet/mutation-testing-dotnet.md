---
title: "Mutation Testing in .NET with Stryker"
date: "2024-03-11"
slug: "mutation-testing-dotnet"
excerpt: "Learn how mutation testing helps evaluate the quality of your unit tests by injecting artificial bugs into your code. We’ll walk through a practical example using Stryker.NET."
thumbnail: "/images/mutation-testing-dotnet-thumbnail.jpg"
categories: [".NET"]
---

Mutation testing is a technique that introduces artificial changes (mutants) into your code to verify whether your existing unit tests can detect them. These changes mimic common developer mistakes and help assess the effectiveness of your tests.

---

## Why Use Mutation Testing?

Mutation testing helps you answer an important question: **Are my unit tests actually catching bugs?**

If a mutant survives (i.e., the tests don’t fail despite the code change), it’s a red flag—your tests might be missing edge cases or not testing the logic thoroughly enough.

---

## Practical Example with Stryker.NET

We'll use .NET 8 and a library called [Stryker.NET](https://stryker-mutator.io/) to run our mutation tests.

### Step 1: A Simple Class

Let’s begin by creating a simple class with a basic method:

```csharp
public class FinancialComponent
{
    public decimal CalculateInterest(decimal principal, decimal rate)
    {
        if (principal <= 0 || rate <= 0)
        {
            return -1;
        }

        return principal * rate / 25;
    }
}
```
## Step 2: Unit Tests
Now we’ll write some basic unit tests for this class.

```csharp
[TestFixture]
public class FinancialComponentTests
{
    [Test]
    public void CalculateInterest_ValidInput_ReturnsInterest()
    {
        var financialComponent = new FinancialComponent();
        var result = financialComponent.CalculateInterest(1000, 5);
        Assert.AreEqual(200, result);
    }

    [Test]
    public void CalculateInterest_InvalidInput_ReturnsMinusOne()
    {
        var financialComponent = new FinancialComponent();
        var result = financialComponent.CalculateInterest(-1000, 5);
        Assert.AreEqual(-1, result);
    }
}
```

At first glance, everything seems covered. We're testing valid and invalid inputs. But let’s run mutation tests to verify if that’s really enough.

## Step 3: Run Mutation Tests
Stryker will mutate your code, for example:

```csharp
- if (principal <= 0 || rate <= 0)
+ if (principal < 0 || rate <= 0)
```
If your tests still pass despite this change, then the mutant has survived, meaning your tests didn’t catch the error.

And that’s exactly what happened! One of our conditions wasn't fully tested.

## Step 4: Improve the Tests
Let’s fix that by adding more test cases:

```csharp
[TestCase(-1000, 5)]
[TestCase(0, 5)]
[TestCase(1000, 0)]
[TestCase(1000, -5)]
public void CalculateInterest_InvalidInput_ReturnsMinusOne(decimal principal, decimal rate)
{
    var financialComponent = new FinancialComponent();
    var result = financialComponent.CalculateInterest(principal, rate);
    Assert.AreEqual(-1, result);
}
```
Now we've covered all possible input variations that hit the condition.

## Step 5: Run Stryker Again
After re-running the mutation tests—success! All mutants have been killed. 💥
This indicates that your tests are now strong enough to detect logic changes.

## Conclusion
Mutation testing is a powerful technique for evaluating the effectiveness of your unit tests. It helps you:

Identify missing test cases

Strengthen your test coverage

Improve overall code quality

If you're serious about testing, tools like Stryker.NET are definitely worth including in your workflow.

Thanks for reading! 🙌
If you have questions, feel free to reach out or follow me on Instagram where I share what I’m learning and working on.