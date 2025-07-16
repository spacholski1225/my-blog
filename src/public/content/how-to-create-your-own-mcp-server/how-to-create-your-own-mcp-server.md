---
title: "How to Create Your Own MCP Server"
date: "2025-06-17"
slug: "how-to-create-your-own-mcp-server"
excerpt: "Learn how to build a custom MCP server by creating an integration with AnkiConnect API. This comprehensive guide covers everything from setup to implementation."
thumbnail: "/images/how-to-create-your-own-mcp-server-thumbnail.png"
categories: ["AI/LLM", "MCP", "Tutorial"]
---

# How to Create Your Own MCP Server

Model Context Protocol (MCP) is a communication standard that allows AI assistants to connect with external tools and services. In this guide, I'll show you how to create your own MCP server using an integration with AnkiConnect - an API for the popular learning application Anki.

If you’d like to test my **MCP server implementation**, you can find the repository here: [GitHub Repository](https://github.com/spacholski1225/anki-connect-mcp).

## What is AnkiConnect?

AnkiConnect is an add-on for the Anki application that provides a REST API allowing programmatic control over flashcards. With it, we can:

- Create new flashcards
- Manage card decks
- Search and modify existing notes
- Control the Anki user interface

AnkiConnect runs as a local HTTP server on port 8765, accepting JSON requests and returning responses in the same format.

## MCP Project Structure

Before we move to implementation, let's look at our project structure:

```
mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts             # Main MCP server file
│   ├── methods/
│   │   └── anki.ts          # AnkiConnect communication
│   ├── tools/
│   │   └── notes.ts         # Note management tools
│   └── types/
│       └── anki/
│           └── notes.ts     # TypeScript type definitions
```

## Dependency Configuration

The first step is configuring `package.json` with necessary dependencies:

```json
{
  "name": "mcp-server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.1",
    "axios": "^1.9.0"
  },
  "devDependencies": {
    "@types/node": "^22.15.29",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.3"
  }
}
```

Key dependencies:
- **`@modelcontextprotocol/sdk`** - Official SDK for creating MCP servers
- **`axios`** - HTTP library for AnkiConnect communication
- **`typescript`** - For type safety

## Implementing AnkiConnect Communication

Let's start by creating the AnkiConnect communication module in `src/methods/anki.ts`:

```typescript
import axios from 'axios';
import { AnkiConnectResponse, AnkiConnectRequest } from '../types/anki';

const BASE_URL = 'http://localhost:8765';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function callAnkiConnect<T = any>(
    request: AnkiConnectRequest
): Promise<AnkiConnectResponse<T>> {
    try {
        const response = await api.post<AnkiConnectResponse<T>>('/', request);
        return response.data;
    } catch(error) {
        console.log('Anki Connect Error:', error);
        throw error;
    }
}
```

The `callAnkiConnect()` function serves as a universal interface for communicating with the AnkiConnect API.

## TypeScript Type Definitions

For type safety, we define data structures in `src/types/anki/notes.ts`:

```typescript
export interface Note {
    deckName: string;
    modelName: string;
    fields: Record<string, string>;
    tags?: string[];
    audio?: NoteAudio;
}

export interface NoteAudio {
    url: string;
    filename: string;
    skipHash?: string;
    fields: string;
}

export interface AddNoteResponse extends AnkiConnectResponse<number | null> {
    result: number | null; // Note ID if success, null if error
}
```

## Creating the Main MCP Server

Now let's move to the most important part - implementing the MCP server in `src/index.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { callAnkiConnect } from "./methods/anki.js";

// MCP server initialization
const server = new McpServer({
  name: 'anki-connect mcp',
  version: '0.0.1'
});
```

The `McpServer` class from the `@modelcontextprotocol/sdk` package is the foundation of our server.

## Implementing the create_flashcard Tool

The most important part is implementing the flashcard creation tool. Here's how the `create_flashcard` tool looks:

```typescript
server.tool(
  'create_flashcard',
  {
    front: z.string(),
    back: z.string()
  },
  async ({ front, back }) => {
    const mcpFlashCard = {
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: "Default",
          modelName: "Basic",
          fields: {
            Front: front,
            Back: back
          },
          tags: ["ai"],
          options: {
            allowDuplicate: false
          }
        }
      }
    };
    
    const responseData = await callAnkiConnect(mcpFlashCard);
    return {
      content: [{
        type: "text", 
        text: JSON.stringify(responseData)
      }]
    };
  }
);
```

### Implementation Analysis:

1. **Schema Definition**: We use the `zod` library for input parameter validation:
   ```typescript
   {
     front: z.string(),
     back: z.string()
   }
   ```

2. **AnkiConnect Request Structure**: We create an object compliant with the AnkiConnect API:
   - `action: "addNote"` - note addition action
   - `version: 6` - API version
   - `params.note` - note details

3. **Note Configuration**:
   - `deckName: "Default"` - default deck
   - `modelName: "Basic"` - basic card model (front/back)
   - `fields` - card field mapping
   - `tags: ["ai"]` - automatic tagging
   - `allowDuplicate: false` - prevent duplicates

4. **API Call**: We use the `callAnkiConnect()` function to send the request

5. **Result Return**: We format the response according to the MCP standard

## Running the Server

At the end of the `src/index.ts` file, we add the code to run the server:

```typescript
// Server startup
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Anki MCP Server started!');
}

main().catch(console.error);
```

## Usage Example

After starting the server, host i.e. an AI assistant can use the `create_flashcard` tool as follows:

```json
{
  "tool": "create_flashcard",
  "parameters": {
    "front": "What is MCP?",
    "back": "Model Context Protocol - a communication standard between AI and external tools"
  }
}
```

## Extending Functionality

Our example shows only one tool, but an MCP server can offer many tools. In a full implementation, we can add:

- `add_note` - more advanced note creation
- `find_notes` - searching existing notes
- `update_note_fields` - modifying note fields
- `deck_names` - deck management

## Summary

We've created a functional MCP server that:

1. **Connects to AnkiConnect API** via HTTP
2. **Provides the `create_flashcard` tool** for AI assistants
3. **Validates input data** using Zod schema
4. **Handles errors** and logs communication
5. **Returns formatted responses** compliant with the MCP standard

This example shows how easy it is to integrate any API with the MCP ecosystem, opening new possibilities for AI assistants. Thanks to MCP, assistants can not only converse but also perform concrete actions in external applications.

The complete project code is available in the repository on my GitHub, where you'll also find implementations of additional tools and more advanced functionalities.