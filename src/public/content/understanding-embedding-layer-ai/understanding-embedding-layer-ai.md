---
title: "Where Did My Words Go? – Understanding the Embedding Layer in AI"
date: "2025-12-25"
slug: "understanding-embedding-layer-ai"
excerpt: "Ever wondered what ChatGPT actually 'sees' when you type a sentence? Dive deep into the crucial moment when words stop being words and become a mathematical map of meaning."
thumbnail: "/images/understanding-embedding-layer-ai-thumbnail.webp"
categories: ["AI/LLM", "Machine Learning"]
---

# Where Did My Words Go? – Understanding the Embedding Layer in AI

Have you ever wondered what ChatGPT or another language model actually "sees" when you type a sentence into it? For us, text is letters, words, and meanings. For a computer? Text is an illusion.

If you want to understand how modern Transformer models (like BERT or GPT) work, you need to grasp this one crucial moment right at the beginning: the instant when words stop being words and become a mathematical map of meaning.

Today, we're going to peek under the hood and discuss the **Embedding Layer**.

## Introduction: Text is Just an Agreement

Before we even touch the neural network, we must accept a brutal truth: AI models can't read. They don't understand letters or words the way we do. They only understand numbers.

That's why the first step is always **Tokenization**. This is the process where we chop our sentence into pieces (tokens) and convert them into numbers from a large vocabulary.

Let's take an example:

**Sentence:** "Hello world !"

The model will add special start and end markers (like `<bos>` and `<eos>`), then convert this into a sequence of integers (indices). It might look like this:
```
[12, 15496, 2159, 5145]
```

This is where linguistics ends and mathematics begins.

## Starting Point: Input IDs

Before actual processing begins, we have raw input data. In the AI programming world (e.g., in the PyTorch library), we store this in a structure called a **Tensor**.

Our input tensor has a very specific shape:
```
[batch_size, seq_len]
```

Let's decode this:

- **batch_size** (e.g., 1): How many sentences we're processing at once. In our example, it's one sentence.
- **seq_len** (e.g., 4): The length of the sentence (number of tokens).

So we have a simple, two-dimensional array:
```
[[12, 15496, 2159, 5145]]
```

### Where's the Problem?

Look at these numbers. Is the number 15496 mathematically close to 2159? Not necessarily. These are just catalog numbers. It's like saying that a book with call number 500 in a library is thematically similar to book 501. They could be about completely different things.

This is where **Embedding** comes in. We need to convert these "flat" catalog numbers into something that carries meaning.

## The Key Transformation: The Giant Table

What is an Embedding Layer? The simplest way to think about it is as a giant **Lookup Table**.

Imagine a table with as many rows as words the model knows (e.g., 50,000). But that's not all. Each word in this table has assigned to it a unique, long sequence of numbers – a **vector**.

When our indices `[12, 15496...]` hit this layer, magic happens:

For each index (e.g., for the word "Hello" with ID 12), the model "pulls out" from the table the vector assigned to it.

### Dimensional Change – THIS IS KEY

This is the most important moment in today's post. Look at what happens to the shape of our data:

**Input:** `[1, 4]` (Flat list of indices)

**Output:** `[1, 4, 768]` (Three-dimensional representation)

### Where Did This 768 Come From?

This is called the **embedding dimension** (or `hidden_dim`). It's the size of the vector that describes one word.

Instead of a single number (e.g., 12), the word "Hello" is now represented by a list of 768 numbers:
```
[0.12, -0.45, 0.99, ... , 0.05]
```

(and so on, 768 times).

## Why Do We Need These 768 Numbers? (Semantics)

You might ask: Why complicate things? Why does one word need to be described by as many as 768 numbers?

The answer is: **Context and Meaning**.

A single index (e.g., 8848 for the word "King" and 9584 for "Man") tells us nothing about the relationship between these words. But in 768-dimensional space, the vectors representing these words can be mathematically close to each other.

Thanks to this "depth":

- The model can encode in numbers the information that "King" is someone "Royal" + "Male"
- "Queen" will be found in this space close to "King," but shifted toward the "Female" trait

The embedding layer is the foundation. Without this dimension (`hidden_dim`), the **Attention mechanism** that comes later would have nothing to work with. You can't analyze dependencies between words when you only have their library numbers.

## Summary (TL;DR)

If you remember one thing from this post, let it be this data shape transformation:

**We enter with a flat sheet of paper:**
```
➡️ [Batch, Sentence Length]
```

**We exit with a three-dimensional data block:**
```
➡️ [Batch, Sentence Length, Depth (768)]
```

Only now, with this three-dimensional structure full of mathematical meaning, is the Transformer ready to "think." But that's a topic for the next post!