---

title: "Data Quality and LLM Hallucinations – Why Language Models 'Make Things Up'"
date: "2025-10-13"
slug: "data-quality-llm-hallucinations"
excerpt: "Language models can write fluently and convincingly, but they don't always tell the truth. Learn why LLMs hallucinate and how to prevent it using RAG, fact-checking, and prompt engineering techniques."
thumbnail: "/images/data-quality-llm-hallucinations-thumbnail.webp"
categories: ["AI/LLM"]
---------------------------------------------

# Data Quality and LLM Hallucinations – Why Language Models 'Make Things Up'

Language models (LLMs) can write in a fluent, logical, and often... convincing manner. The problem is, they don't always tell the truth. This phenomenon is called **model hallucination** – a situation where AI "invents" an answer instead of relying on facts.

## Where Do Hallucinations Come From?

LLMs don't "understand" the world the way humans do – they predict the next words based on what they've seen in training data. So if:

* the data was incomplete or outdated,
* it contained errors or contradictions,
* or the model was optimized only for "nice-sounding" answers –

then it starts guessing.

The principle of "garbage in, garbage out" applies without exception: **if a model learned from garbage, it will hallucinate garbage.**

## How to Reduce Hallucinations: RAG in Practice

One of the most effective ways to combat hallucinations is **RAG – Retrieval-Augmented Generation**. It's a combination of two worlds:

* **Retrieval** – the model first fetches text fragments from an external database (e.g., documentation, Wikipedia, company notes),
* **Generation** – then it creates an answer based on these specific sources.

Thanks to this, the model doesn't "guess," but refers to real data.

### Example (pseudocode):

```python
query = "Who is the president of Poland?"

# 1. Search for related documents (e.g., from Wikipedia)
docs = retrieve_documents(query)

# 2. Create context
context = "\n\n".join(docs)

# 3. Build prompt and generate answer
prompt = f"{context}\n\nQuestion: {query}\nAnswer:"
answer = llm.generate(prompt)
print(answer)
```

This architecture allows the model to stay "up to date" without needing retraining. Simply update the document database – and the LLM starts using new information.

## Validation and Fact-Checking – How to Verify AI Isn't Lying

Even with RAG, it's worth checking the correctness of answers. This uses the so-called LLM-as-a-judge approach – a model acting as a "judge" of its own responses. Here's how it works:

```python
initial_answer = llm.generate("What is the population of Krakow?")

check_prompt = f"Is the following statement true? \"{initial_answer}\""
verification = llm.generate(check_prompt)

print(f"Verification: {verification}")
```

If the verification result indicates an error – the system can correct the answer or ask another model for evaluation.

Advanced versions of this approach, like Chain-of-Verification (CoVe), go even further – the model generates control questions itself and checks its answers step by step.

## Multi-Model Verification

Sometimes it's worth asking more than one model – this is called ensemble checking. If two models independently give the same answer, the probability of error significantly decreases:

```python
ans1 = llm1.generate("What is the largest lake in the world?")
ans2 = llm2.generate("What is the largest lake in the world?")

if ans1 == ans2:
    print("Models agree:", ans1)
else:
    print("Discrepancy – verification needed.")
```

## Best Practices in Prompt Engineering

A properly formulated prompt can significantly reduce hallucinations. Here are some techniques worth applying:

### Reference sources

→ "According to Wikipedia, describe the process of photosynthesis."

This keeps the model anchored to known context.

### Chain-of-Verification

→ The model first generates an answer, then checks itself.

### Step-by-step reasoning (Chain-of-Thought)

→ "Think step by step" – a simple addition that improves answer logic.

### Limiting response format

→ "List 3 main points and provide a source for each."

### Negative instructions

→ "If you're not sure, write: 'I don't have enough information'."

### Precise instructions

→ The more specific the prompt, the less room for "making things up."

## Summary

LLM hallucinations are a natural consequence of their limitations – especially when they lack current or reliable data. To counteract them:

* ensure data quality,
* use RAG,
* apply fact-checking and prompt engineering.

Thanks to these approaches, models become not only eloquent, but also reliable.
