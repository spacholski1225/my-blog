---
title: Everything you need to know about Docker
date: "2025-06-24"
slug: "everything-you-need-to-know-about-docker"
excerpt: "Learn Docker from scratch - solve the 'it works on my machine' problem and master containerization with practical examples and best practices."
thumbnail: "/images/everything-you-need-to-know-about-docker-thumbnail.png"
categories: ["Docker", "DevOps", "Tutorial"]
---

Have you ever experienced an application that works on your computer but stops working when moved to a server? If so, you're not alone. This is a common problem, but there's a solution that solves the "it works on my machine" issue - it's called **Docker**.

## What is Docker and why should you learn it?

Docker is a containerization platform that allows you to "package" your application along with the entire environment it runs in into one portable unit called a **container**. Imagine that instead of moving just furniture when relocating, you move the entire house - with walls, installations, and everything needed for living.

### Why is Docker so popular?

**1. No more environment issues**
A container will run identically on your laptop, test server, and production environment. Always.

**2. Lightning speed**
Containers start in seconds, not minutes like traditional virtual machines.

**3. Resource savings**
You can run significantly more containers than virtual machines on a single server.

## Docker vs Virtual Machines: Key differences

| Aspect | Virtual Machine | Docker |
| --- | --- | --- |
| **Size** | Gigabytes (entire OS) | Megabytes (just the application) |
| **Startup** | Minutes | Seconds |
| **Resources** | High consumption | Minimal consumption |
| **Isolation** | Complete (more security) | Process level |

Key difference: virtual machines emulate entire computer hardware, while containers share the host operating system kernel.

## Docker Glossary: Basic concepts

### 🖼️ Image

This is like a recipe for your application. An immutable template containing code, runtime environment, and all dependencies. One image can be used to create multiple containers.

### 📦 Container

A running instance of an image. This is your application in action. If an image is a recipe, a container is the finished dish.

### 📋 Dockerfile

A text file with instructions on how to build an image. It's an automated recipe that Docker executes step by step.

### 🏪 Registry

A place to store images, like GitHub for code. The largest is Docker Hub with thousands of ready-made images.

### 💾 Volume

A mechanism for storing data outside the container. Without this, all data disappears when the container is removed.

## First steps with Docker

### Installation

1. Download Docker Desktop from the official website
2. Install and run
3. Check installation with the command:

```bash
docker run hello-world
```

### Most important commands

**Container management:**

```bash
# Run container from image
docker run nginx

# View running containers
docker ps

# Stop container
docker stop [container_name]

# Remove container
docker rm [container_name]

# View container logs
docker logs [container_name]
```

**Image management:**

```bash
# View local images
docker images

# Download image
docker pull ubuntu

# Remove image
docker rmi ubuntu

# Build image from Dockerfile
docker build -t my-app .
```

## Practical example: Application containerization

Let's create a simple Node.js application and containerize it.

### Step 1: Prepare the application

**package.json:**

```json
{
  "name": "docker-app",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

**app.js:**

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the world of Docker! 🐳');
});

app.listen(3000, () => {
  console.log('Application running on port 3000');
});
```

### Step 2: Write Dockerfile

```dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Run application
CMD ["node", "app.js"]
```

### Step 3: Build and run

```bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 my-app
```

Done! Your application is running in a container and is available at `http://localhost:3000`.

## Docker Compose: Managing multiple containers

When your application consists of multiple services (e.g., application + database), Docker Compose greatly simplifies management.

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run the entire infrastructure with one command:

```bash
docker-compose up
```

## Best practices for beginners

### ✅ Do this:

- Use small base images (e.g., `alpine`)
- Create a `.dockerignore` file with unnecessary files
- Don't run processes as root
- Utilize layer caching in Dockerfile

### ❌ Avoid this:

- Installing unnecessary packages in the image
- Placing secrets in Dockerfile
- Creating images that are too large
- Ignoring security

## Example .dockerignore

```
node_modules
npm-debug.log
.git
.env
README.md
```

## Next steps

After mastering Docker basics, it's worth learning:

**1. Kubernetes** - container orchestration at scale
**2. Docker Swarm** - simpler clustering tool
**3. Container security** - image scanning, secrets management
**4. CI/CD with Docker** - deployment automation

## Summary

Docker is a technology that revolutionizes the way applications are created and deployed. Even if you're just starting your programming journey, it's worth learning containerization basics as soon as possible. This is an investment that will pay off many times over - both in daily work and in the job market.

Remember: every expert was once a beginner. Start with simple examples, experiment, and don't be afraid of mistakes. Docker is beginner-friendly, and the community is happy to help when problems arise.