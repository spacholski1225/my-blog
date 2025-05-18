---
title: "RAG and AWS Bedrock - A Brief Introduction"
date: "2025-04-21"
slug: "rag-aws-bedrock-intro"
excerpt: "A short introduction to Retrieval Augmented Generation (RAG) and why AWS Bedrock is an interesting tool in this context."
thumbnail: "/images/rag-aws-bedrock-intro-thumbnail.jpg"
categories: ["AI/LLM", "AWS"]
---

# RAG and AWS Bedrock - A Brief Introduction

Before diving into the main topic, it's worth recalling what RAG (Retrieval Augmented Generation) is and why AWS Bedrock is an interesting tool in this context.

RAG is an approach that combines the generative capabilities of language models (LLMs) with searching external knowledge sources. In short, it allows the model to "read" documents and codeand then generate responses based on them.

AWS Bedrock provides a managed RAG pipeline that automates the key stages of this process:

* Document extraction
* Chunking (splitting into smaller fragments)
* Creating embeddings (vector representations)
* Storing in a vector database

Bedrock works with various vector stores, such as OpenSearch, Amazon Neptune, Pineconeand Redis, which provides considerable flexibility.

The main goal of this approach is to enrich language models with "external" knowledge – whether it's company documents, technical specifications, or source code – and to enable the generation of well-documented answers with references to the original sources.

## Indexing Raw Code

When working with AWS Bedrock, my first idea was to index the entire code repository.

The process looked like this:

1.  I collected all the source files.
2.  I used the default chunking settings (fixed token size).
3.  I applied a standard embedding model.
4.  I loaded the fragments as documents into the vector database.

Theoretically, everything should work, right? It quickly turned out that it wasn't necessarily the case.

## Main Problems with Indexing Raw Code

### 1. Loss of Function and Class "Wholeness"

When answering questions, the model extracts chunks of code. The problem in this case is that a given chunk may not contain the entire implementation of the code, which greatly affects the final answer of the model.

```java
// Chunk 1:
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
// Chunk 2:
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    public List<User> getAllActiveUsers() {
        return userRepository.findByStatus(UserStatus.ACTIVE);
    }
}
```

Do you see the problem? The *findUserById* function was cut in half, which makes the context of the function incomprehensible.

### 2. Poor Semantic Matching

Universal embedding models are not designed to understand the specifics of code. They don't "know" anything about:

- API structure
- Data Transfer Objects (DTOs)
- Design patterns
- Dependencies between modules

As a result, asking the question "How does the payment verification process work?" might return code snippets that contain the word "payment" but not necessarily those that actually implement the verification process.

### 3. Limited LLM Context Window

Even the latest LLMs have a limited context window. With large repositories, it's impossible to inject the full logic into the prompt. The model can only "see" a slice of the entire system, which leads to incomplete or incorrect answers.

### 4. Lack of High-Level Documentation

RAG returns code snippets, but it doesn't generate a description of what a method does, what its parameters are, or what the business logic is. The user has to analyze the code themselves, which can be very time-consuming for complex systems.