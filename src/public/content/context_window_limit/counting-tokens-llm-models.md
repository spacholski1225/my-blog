---
title: "Understanding and Counting Tokens in LLM Models"
date: "2025-01-22"
slug: "counting-tokens-llm-models"
excerpt: "Learn why token counting is crucial when working with LLMs and how to implement it in your applications"
thumbnail: "/images/counting-tokens-llm-models-thumbnail.jpg"
categories: ["AI/LLM"]
---

# Understanding and Counting Tokens in LLM Models

When using LLM models, one critical element to consider is the **context window** - the number of tokens the model can process in a single session. If you're using LLMs for simple tasks, you might not have considered this aspect, but it becomes extremely important for more complex applications. Exceeding the **context window** limit will lead to errors in your agent's behavior. That's why implementing logic for counting tokens is incredibly useful.

## Why Context Window Matters in LLM Models

Every LLM model, such as GPT-4o, has a specific **context window** - the maximum number of tokens it can handle during one session. Tokens are text units including letters, digits, words, phrases, or even punctuation marks. It's worth noting that each model uses a different tokenizer, so the same prompt may have different token counts depending on the model, for example in GPT-4o, Claude 3.5 Sonnet, or Gemma.

## Benefits of Counting Tokens

As you might already guess, it's worthwhile to count the tokens in your prompts before using an LLM, but what are the other advantages?

* **Cost Efficiency** - all language models charge based on token usage. Simply put, the fewer tokens you use, the less you pay.
* **Error Prevention** - by controlling tokens, you avoid situations where your AI agent exceeds its context window limit, preventing unexpected system errors.
* **Better Control Over Generated Text** - when you know the token count, you can optimize your model queries to obtain more precise responses.

### Python Implementation Example

Many libraries have been developed for counting tokens. One example is **tiktoken**, which handles tokenization for OpenAI models.

```python
from typing import List, Dict
import tiktoken

class TokenCounter:
    def __init__(self, model_name: str):
        self.model_name = model_name
        self.tokenizer = tiktoken.encoding_for_model(model_name)
        self.IM_START = "<|im_start|>"
        self.IM_END = "<|im_end|>"
        self.IM_SEP = "<|im_sep|>"

    def count_tokens(self, messages: List[Dict[str, str]]) -> int:
        formatted_content = "".join(
            [f"{self.IM_START}{msg['role']}{self.IM_SEP}{msg['content']}{self.IM_END}" for msg in messages]
        )
        formatted_content += f"{self.IM_START}assistant{self.IM_SEP}"
        return len(self.tokenizer.encode(formatted_content))

messages = [
    {"role": "user", "content": "How does context window work?"},
    {"role": "assistant", "content": "Context window is the maximum number of tokens..."}
]

counter = TokenCounter("gpt-4o")
print("Token count:", counter.count_tokens(messages))
```

![Output Image](/images/context_window_limit_output.png)

## How It Works

1. **Getting the tokenizer** - The **TokenCounter** class initializes the tokenizer for the model.
2. **Formatting messages** - Each message is properly formatted according to OpenAI requirements, adding special markers `<|im_start|>`, `<|im_sep|>`, `<|im_end|>`. For other models, this might look different.
3. **Counting tokens** - After formatting the messages, the **encode** method is called, followed by the **len()** function, returning the number of tokens.