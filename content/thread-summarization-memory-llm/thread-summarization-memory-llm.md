---
title: "Thread Summarization: Adding Memory to LLM Applications"
date: "2025-12-21"
slug: "thread-summarization-memory-llm"
excerpt: "Learn how to implement memory in stateless LLM applications using Thread Summarization technique"
thumbnail: "/images/thread-summarization-memory-llm-thumbnail.jpg"
categories: ["AI/LLM", "Programming"]
---

# Thread Summarization: Adding Memory to LLM Applications

When creating applications that use Large Language Models (LLMs), it's natural to want the ability to reference previous responses or information contained in earlier questions. We want the model to "remember" what was said before. However, the nature of LLMs is the opposite. Their statelessness means that each API call starts a conversation from scratch - the model doesn't know what was said previously. The Thread Summarization technique offers a solution by summarizing conversation threads.

## Statelessness of LLM Models

An important characteristic to consider when designing applications using LLMs is their statelessness. This means that models don't remember previous interactions with the user. Each query is processed independently, and the conversation context must be passed in its entirety with each subsequent query. In other words, the model doesn't know what was said before.

This statelessness stems from the design principles behind LLM architecture. Although these models can analyze long input texts and generate coherent responses, they don't have a long-term memory mechanism built in.

In this example, you can see that the model has no idea which movie the user is talking about:

![Example of stateless interaction](/image/example1.png)

One solution is to emulate long-term memory during conversations with the model at the application level, where we store a summary of conversation history and add it to each query.

## Solution: Thread Summarization

Thread Summarization is a technique that allows us to emulate "memory" in applications using LLMs. The basic idea is simple but effective:

1. **Collecting context**: After each exchange (user question and assistant response), we generate a concise summary of that interaction.

2. **Knowledge accumulation**: The new summary is combined with previous ones, creating a condensed record of the entire conversation.

3. **Providing context**: With each new query, we provide the model with the current summary as part of the system prompt.

Benefits of this approach:

- **Token economy**: Instead of passing the entire conversation history, we use a shortened version, allowing for longer conversations within the context limit.

- **Memory control**: We can consciously decide which information is most important and should be preserved.

- **Cost optimization**: We can use less expensive models to generate summaries, reserving the main model for generating responses.

## Implementing Response Summarization

Here's an implementation example in Python using the OpenAI API:

```python
async def generate_summarization(user_message, assistant_response):
    global previous_summarization

    summarization_prompt = {
        "role": "system",
        "content": f"""Please summarize the following conversation in a concise manner, incorporating the previous summary if available:
<previous_summary>{previous_summarization or "No previous summary"}</previous_summary>
<current_turn> User: {user_message['content']}\nAssistant: {assistant_response.content} </current_turn>"""
    }
    response = await openai_service.completion([summarization_prompt, {"role": "user", "content": "Please create/update our conversation summary."}], model="gpt-4o-mini", stream=False)
    return response.choices[0].message.content if response else "No conversation history"

def create_system_prompt(summarization):
    return {
        "role": "system",
        "content": f"""You are Cartman, a helpful assistant who's answering a user questions like Yoda in max 10 words.

        {'Here is a summary of the conversation: <conversation_summary>' if summarization else ''}
          {summarization if summarization else ''}"""
    }
    

@app.route('/api/chat', methods=['POST'])
async def chat():
    global previous_summarization
    try:
        data = request.get_json()
        message = data.get('message')
        system_prompt = create_system_prompt(previous_summarization)
        assistant_response = await openai_service.completion([
            system_prompt, 
            message
        ], model="gpt-4o", stream=False)

        previous_summarization = await generate_summarization(message, assistant_response.choices[0].message)

        return jsonify(assistant_response)
    except Exception as e:
        print('Error in OpenAI completion:', str(e))
        return jsonify({'error': 'An error occurred while processing your request'}), 500
```

This pseudo code (full version available [here](https://github.com/spacholski1225/Blog/tree/main/ai_examples/thread)) creates a summary of the previous conversation between the user and the assistant and then adds the user's last message. Of course, with this approach, we lose some information, but we can easily expand the mechanism to include additional searching of previous threads if the summary is insufficient to provide an answer.


![Summarize thread interaction](/image/example2.png)

As you can see after asking about a favorite part of Star Wars, the model responds correctly, according to the information given to it earlier.

Additional benefits of this solution:

- Using the cheaper gpt-4o-mini model and providing fewer tokens, which reduces costs.

- The model receives less content, allowing it to better focus on the task.

## What's Next?

- Consider adding a vector database to store history.

- Implement a mechanism for prioritizing information in summaries.

- Experiment with different prompts for generating summaries.