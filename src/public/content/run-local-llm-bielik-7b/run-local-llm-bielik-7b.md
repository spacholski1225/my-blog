---
title: "How to Run Your Own LLM Locally in Python — Using Bielik-7B and Hugging Face Transformers"
date: "2025-11-10"
slug: "run-local-llm-bielik-7b"
excerpt: "Learn how to run the open-source Polish LLM Bielik-7B locally on Apple Silicon using Python and Hugging Face Transformers."
thumbnail: "/images/run-local-llm-bielik-7b-thumbnail.png"
categories: ["AI/LLM", "Local LLM", "Python"]
---

# How to Run Your Own LLM Locally in Python — Using Bielik-7B and Hugging Face Transformers

In recent months, we’ve seen a boom in local large language models (LLMs)
**Bielik-7B** by the SpeakLeash team. The best part? You no longer need an API to run a powerful AI model on your laptop.

## Why Run Models Locally

**Privacy** — Your data stays on your machine.
**Faster Iteration** — No API limits or throttling.
**Cost ≈ 0** — No API fees.
**Full Control** — Modify, train, or inspect how your model works.

This guide will walk you through running the **Polish Bielik-7B model** locally on **Apple Silicon (M1/M2/M3)** using Python and the **Transformers** library — in just a few lines of code. You’ll even build a simple Polish chatbot.

## Choosing the Model — Bielik-7B

**Bielik-7B** is an open-source, Polish-language large language model created by the **SpeakLeash** team. Available on Hugging Face:
👉 [https://huggingface.co/speakleash/Bielik-7B-Instruct-v0.1](https://huggingface.co/speakleash/Bielik-7B-Instruct-v0.1)

Variants:

* **Bielik-7B-Base** – Raw, pre-trained model.
* **Bielik-7B-Instruct** – Fine-tuned for conversation (ChatGPT-style).

* For interactive use cases or chatbots, always pick the **Instruct** version.

## Environment Setup

Let’s start with the basics — install Python 3.10+ and a few libraries:

```bash
pip install torch transformers accelerate
```

💡 If you’re on **Apple Silicon (M1/M2/M3)**, make sure you have **torch ≥ 2.1** with MPS (Metal Performance Shaders) support — this allows GPU acceleration on macOS.

Check GPU availability:

```python
import torch
print(torch.backends.mps.is_available())
```

If the output is `True`, you’re good to go!

## Running the Model — Step by Step

Copy the following code into `bielik_demo.py` and run it.

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# 1. Model ID from Hugging Face
model_id = "speakleash/Bielik-7B-Instruct-v0.1"

# 2. Device — MPS (Apple GPU) or CPU
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# 3. Load tokenizer
print(f"Loading tokenizer for {model_id}...")
tokenizer = AutoTokenizer.from_pretrained(model_id)

# 4. Load model
print(f"Loading model on {DEVICE}...")
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,  # memory efficient
    device_map=DEVICE.type
)
model.eval()

# 5. Prepare the prompt
prompt_text = "Write a short poem about an awakening artificial intelligence."
formatted_prompt = f"[[INST]] {prompt_text} [[/INST]]"
input_ids = tokenizer.encode(formatted_prompt, return_tensors="pt").to(DEVICE)

# 6. Generate response
print("\nGenerating response...")
with torch.no_grad():
    output = model.generate(
        input_ids,
        max_length=256,
        do_sample=True,
        temperature=0.7,
        top_k=50,
        top_p=0.95,
        pad_token_id=tokenizer.eos_token_id
    )

# 7. Decode result
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
final_response = generated_text.split("[[/INST]]")[-1].strip()
print("\n--- Bielik’s Response ---\n")
print(final_response)
print("\n--------------------------\n")
```

⚠️ **Tip:** If you encounter `RuntimeError: MPS backend out of memory`, try reducing `max_length` or use `torch_dtype=torch.float16`.

## Under the Hood

The **Transformers** library from Hugging Face simplifies complex model operations:

`[Prompt] → [Tokenizer] → [Model (GPU)] → [Sampling] → [Decoder] → [Text]`

* **AutoTokenizer** splits text into tokens.
* **AutoModelForCausalLM** handles decoder-only models (GPT, Llama, Bielik).
* **generate()** performs token sampling based on probability distributions.
* **temperature**, **top_k**, and **top_p** control creativity and randomness.
* **MPS** (Metal Performance Shaders) enables GPU computation on macOS.

## 5️⃣ Local vs API Comparison

| Aspect             | Local Model (Bielik-7B) | Cloud API (e.g. GPT-4) |
| ------------------ | ----------------------- | ---------------------- |
| **Privacy**        | 🔒 Full data control    | 🔄 Data sent to cloud  |
| **Cost**           | 💸 Free                 | 💰 Pay per token       |
| **Performance**    | ⚡ Hardware-dependent    | ⚙️ Cloud-scalable      |
| **Quality**        | 🧠 Good (esp. Polish)   | 🧠🧠🧠 Very high       |
| **Offline Access** | ✅ Yes                   | ❌ No                   |

On a MacBook M2 Pro, **Bielik-7B** can generate around **5–10 tokens/s**, which is more than enough for prototyping.

## Your First Local Chatbot

Add a simple interactive loop to chat with Bielik directly from your terminal:

```python
while True:
    prompt = input("You: ")
    if prompt.lower() in ["exit", "quit"]:
        break

    input_ids = tokenizer(f"[[INST]] {prompt} [[/INST]]", return_tensors="pt").to(DEVICE)
    output = model.generate(input_ids, max_length=200, temperature=0.7, top_p=0.9)
    response = tokenizer.decode(output[0], skip_special_tokens=True)

    print("Bielik:", response.split("[[/INST]]")[-1].strip())
```

Run it:

```bash
python bielik_chat.py
```

And that’s it — you now have your own **offline Polish chatbot** running entirely on your laptop.

## What’s Next?

Now that your local LLM is running, here are some ideas for next steps:

**Fine-tuning / LoRA** — Train it on your own data.
**RAG (Retrieval-Augmented Generation)** — Connect Bielik to your knowledge base.
**AI Agent in Python** — Integrate with APIs and memory systems.

## Summary

Running your own LLM locally in Python takes just a few lines of code. With Hugging Face Transformers and GPU support via MPS, you can:

* Experiment with AI without relying on the cloud.
* Keep your data private.
* Build your own NLP projects — in Polish and for free.
