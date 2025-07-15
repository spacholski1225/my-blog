---
title: "Circuit Breaker for LLM with Retry and Backoff – Anthropic API Example (TypeScript)"
date: "2025-07-15"
slug: "circuit-breaker-llm-retry-backoff-anthropic-api-typescript"
excerpt: "Learn how to implement the Circuit Breaker pattern with retry and backoff strategies for Large Language Model APIs like Anthropic's Claude to handle rate limits and build resilient applications."
thumbnail: "/images/circuit-breaker-llm-retry-backoff-anthropic-api-typescript-thumbnail.png"
categories: ["Architecture", "AI/LLM", "TypeScript"]
---

# 🧠 **Circuit Breaker for LLM with Retry and Backoff – Anthropic API Example (TypeScript)**

In the era of growing popularity of Large Language Models (LLMs) like Claude from Anthropic or GPT from OpenAI, we increasingly implement solutions based on their APIs. However, each of these APIs has its limits — such as token limits per minute or maximum number of requests. Exceeding these limits results in errors. To prevent system overload and inefficient API spamming, you can apply the **Circuit Breaker pattern**. Today I'll show you how this looks with TypeScript and retry/backoff strategies.

---

## 🧱 What is the Circuit Breaker Pattern?

The **Circuit Breaker** pattern comes from software engineering and works analogously to an electrical circuit breaker. Its purpose is to:

- **Stop repeated failed calls** to unstable external services,
- **Protect the application from further errors and wait times**,
- **Resume operation after time**, when the service might be available again.

Circuit Breaker can have three states:

- `CLOSED` – everything works, requests are sent.
- `OPEN` – after a series of errors, requests are blocked.
- `HALF_OPEN` – after a specified time, we check if the service is working again.

---

## 🔁 Retry and Backoff — Retry Attempts with Delay

Retry means repeating a request after an error. Backoff is a strategy that determines **how long we wait between consecutive attempts**. Most commonly you'll encounter:

- **Fixed backoff** – constant waiting time,
- **Exponential backoff** – each subsequent attempt waits longer.

Combined with Circuit Breaker, we have a powerful tool for resilient use of external APIs.

---

## 💡 Example: Circuit Breaker for Anthropic API in TypeScript

Let's assume we have a limit: **200,000 tokens/minute**, and when exceeded, the API returns error code `429`. After 5 failed attempts, we **open the circuit**, and after 1 minute we try again.

### 🧩 TypeScript Code

```typescript
import axios from 'axios';

type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private failureCount = 0;
  private readonly maxFailures = 5;
  private state: CircuitBreakerState = 'CLOSED';
  private openUntil = 0; // timestamp in ms
  private readonly timeout = 60_000; // 1 minute

  canRequest(): boolean {
    const now = Date.now();
    if (this.state === 'OPEN' && now >= this.openUntil) {
      this.state = 'HALF_OPEN';
      return true;
    }
    return this.state === 'CLOSED' || this.state === 'HALF_OPEN';
  }

  recordSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failureCount++;
    if (this.failureCount >= this.maxFailures) {
      this.state = 'OPEN';
      this.openUntil = Date.now() + this.timeout;
      console.warn(`Circuit breaker opened. Will retry after ${this.timeout / 1000}s.`);
    }
  }
}

const breaker = new CircuitBreaker();

async function callClaude(prompt: string): Promise<string | null> {
  const maxRetries = 5;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (!breaker.canRequest()) {
      console.warn('Circuit breaker is open. Skipping call.');
      return null;
    }

    try {
      const response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      }, {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'content-type': 'application/json',
        },
      });

      breaker.recordSuccess();
      return response.data.completion;
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 429 || status === 503) {
        console.warn(`Attempt ${attempt} failed with status ${status}. Retrying...`);
        breaker.recordFailure();

        const backoffTime = Math.pow(2, attempt) * 1000; // exponential backoff
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      } else {
        console.error('Fatal error:', err.message);
        return null;
      }
    }
  }

  console.error('Max retry attempts reached. Opening circuit.');
  return null;
}
```

---

## 🧪 How Does It Work?

1. First failed calls are retried with backoff (`2s`, `4s`, `8s`, ...).
2. After 5 failed attempts, `CircuitBreaker` transitions to `OPEN` state and doesn't allow further requests for 1 minute.
3. After a minute, we check if the API is available again (`HALF_OPEN`), and potentially return to `CLOSED`.

---

## ✅ Applications

This pattern is useful when:

- You're using paid LLMs with limits (e.g., tokens or requests),
- You want to build resilient microservices with LLM integrations,
- You're creating chatbots or AI agents that frequently communicate with APIs.

---

## Summary

The **Circuit Breaker** pattern combined with **retry/backoff** is not just a good practice — it's a necessity when integrating with external APIs, especially those like LLMs. This way we protect our application from errors and build more resilient systems.