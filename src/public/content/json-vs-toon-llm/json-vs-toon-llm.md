---
title: "JSON vs TOON: Which Format Works Better with Large Language Models?"
date: "2025-11-17"
slug: "json-vs-toon-llm"
excerpt: "Comparison of JSON and TOON formats in the context of large language models and token efficiency."
thumbnail: "/images/json-vs-toon-llm-thumbnail.webp"
categories: ["AI/LLM", "Architecture"]
---

# JSON vs TOON: Which Format Works Better with Large Language Models?

When working with large language models (LLMs), JSON has naturally become the standard data format — common, simple and perfect for exchanging structured information between systems. However, it has one significant drawback in the context of LLMs: it is token‑heavy. As model context windows grow, we tend to send increasingly large data structures, but every bracket, quote and repeated key name adds extra cost.

This is exactly why TOON — Token-Oriented Object Notation — was created. It doesn’t try to replace JSON as a universal application format, but it *does* replace it effectively when communicating with LLMs, where token efficiency and structural clarity matter most.

In this post, I’ll explain:

* why JSON becomes expensive with large contexts,
* what TOON does and why it’s more "LLM‑friendly",
* how TOON compares to JSON on typical application data,
* how to easily convert JSON → TOON.

## Why JSON Is Costly for LLMs

JSON was designed for both humans and machines. For LLMs, however:

* it requires braces `{}` and brackets `[]`,
* all keys must be in quotes,
* elements are separated using commas, colons and spaces,
* field names repeat for every record.

For humans this is just structure, but for models it means dozens of percent of tokens spent on syntax rather than data.

With arrays containing hundreds or thousands of objects, the cost difference becomes significant.

## TOON — How It Works and Why It's Better for LLMs

TOON preserves full semantic compatibility with JSON (objects, arrays, primitives), but encodes it in a much more compact way. Key characteristics:

1. **Indentation instead of brackets** — TOON eliminates `{}`, `[]` and quotes on keys; the structure is defined by indentation, similar to YAML.
2. **Array headers** — Object arrays use a concise header, e.g.:

```
users[3]{id,name,role}:
```

This eliminates repeated field names — saving a huge number of tokens.

3. **100% structural compatibility with JSON** — Any TOON can be losslessly converted to JSON and vice versa.

4. **LLMs handle it better** — Less noise, fewer characters, clearer structure = lower hallucination risk.

## Example: JSON vs TOON

Here is a more realistic and complex example that demonstrates how TOON preserves the full structure of JSON — including nested objects, arrays of objects, and heterogeneous arrays — something CSV cannot represent.

**JSON input:**

```json
{
  "project": {
    "id": "PRJ-204",
    "name": "AI Dashboard",
    "config": {
      "theme": "dark",
      "refreshRate": 30,
      "flags": ["beta", "logging"]
    },
    "members": [
      {
        "id": 1,
        "name": "Alice",
        "roles": ["admin", "developer"],
        "profile": { "email": "alice@example.com", "active": true }
      },
      {
        "id": 2,
        "name": "Bob",
        "roles": ["developer"],
        "profile": { "email": "bob@example.com", "active": false }
      }
    ],
    "events": [
      "init",
      { "type": "error", "message": "Timeout", "timestamp": 1731542000 },
      "shutdown"
    ]
  }
}
```

**TOON:**

```
project:
  id: PRJ-204
  name: AI Dashboard
  config:
    theme: dark
    refreshRate: 30
    flags[2]:
      - beta
      - logging

  members[2]{id,name,roles,profile}:
    1,Alice,[admin,developer],{email:alice@example.com,active:true}
    2,Bob,[developer],{email:bob@example.com,active:false}

  events[3]:
    - init
    - {type:error,message:Timeout,timestamp:1731542000}
    - shutdown
```

## TOON vs CSV — Why It’s Not the Same — Why It’s Not the Same

CSV works great for tables, but struggles with:

* nested structures,
* arrays inside objects,
* heterogeneous data,
* values not fitting a rectangular grid.

TOON, on the other hand, preserves the full JSON data model, including arbitrary nesting.

Use TOON when:

* you work with JSON data,
* you want to pass it to an LLM,
* you need token minimization,
* you require strict and unambiguous structure.

## JSON → TOON Conversion in Node.js

The library `@toon-format/toon` allows easy conversion between JSON and TOON — even for complex, nested data structures like the example above.

### Installation

```bash
npm install @toon-format/toon
```

### Example Code

```javascript
import { encode } from "@toon-format/toon";

const data = {
  project: {
    id: "PRJ-204",
    name: "AI Dashboard",
    config: {
      theme: "dark",
      refreshRate: 30,
      flags: ["beta", "logging"]
    },
    members: [
      {
        id: 1,
        name: "Alice",
        roles: ["admin", "developer"],
        profile: { email: "alice@example.com", active: true }
      },
      {
        id: 2,
        name: "Bob",
        roles: ["developer"],
        profile: { email: "bob@example.com", active: false }
      }
    ],
    events: [
      "init",
      { type: "error", message: "Timeout", timestamp: 1731542000 },
      "shutdown"
    ]
  }
};

const toon = encode(data);
console.log(toon);
```

### Output

```
project:
  id: PRJ-204
  name: AI Dashboard
  config:
    theme: dark
    refreshRate: 30
    flags[2]:
      - beta
      - logging

  members[2]{id,name,roles,profile}:
    1,Alice,[admin,developer],{email:alice@example.com,active:true}
    2,Bob,[developer],{email:bob@example.com,active:false}

  events[3]:
    - init
    - {type:error,message:Timeout,timestamp:1731542000}
    - shutdown
```

You can also change the delimiter (e.g., to tab):

```javascript
encode(data, { delimiter: "	" });
```

## Summary

JSON is excellent as a data exchange format, but not optimal for language models. TOON offers:

* the same semantics as JSON,
* significantly fewer tokens,
* a structure models interpret more easily,
* more predictable responses.

It doesn’t aim to replace JSON everywhere — it simply maps JSON → TOON efficiently during LLM interactions, reducing cost and improving precision.

If you regularly send sets of objects or large arrays to models, TOON can dramatically improve the efficiency of your prompts.
