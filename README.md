# Next.js Blog & Portfolio

A modern blog and portfolio website built with Next.js, featuring a markdown-based blog system, category filtering, syntax highlighting, and a professional portfolio section.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Blog System](#blog-system)
- [Creating New Blog Posts](#creating-new-blog-posts)
- [Portfolio Section](#portfolio-section)
- [Deployment](#deployment)
- [Implementation Notes](#implementation-notes)
- [Copy-Paste Ready Blog Post Template](#copy-paste-ready-blog-post-template)

## 🚀 Project Overview

This project is a personal website that combines a blog and portfolio. It leverages modern web technologies:

- **Next.js 15.3** - React framework with server-side rendering
- **TypeScript** - Type safety for JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Markdown** - Content management for blog posts

## 🏁 Getting Started

The project is organized with the main source code in the `/src` directory. For detailed instructions on development workflow, refer to the [src/README.md](src/README.md) file.

### Prerequisites

- Node.js (recommended: v18+)
- npm or yarn

### Installation

```bash
# Navigate to the src directory
cd src

# Install dependencies
npm install
```

### Running the Development Server

```bash
# Start the development server
npm run dev
```

This will:
1. Copy content from the `/content` directory to `/src/public/content`
2. Start the Next.js development server
3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
# Create a production build
npm run build

# Start the production server
npm run start
```

## 📂 Project Structure

```
my-blog/
├── content/                  # Markdown blog posts
│   ├── building-secure-dotnet-api.md
│   ├── modern-css-techniques.md
│   └── ...
├── src/                      # Next.js application
│   ├── public/               # Static files
│   │   ├── content/          # Copied blog content
│   │   └── images/           # Images
│   ├── src/                  # Source code
│   │   ├── app/              # Next.js app router
│   │   ├── components/       # React components
│   │   └── lib/              # Utility functions
│   ├── package.json          # Dependencies
│   └── copy-content.js       # Script to copy content
```

## 📝 Blog System

The blog system uses markdown files for content with a custom processing pipeline:

1. Markdown files are stored in the `/content` directory
2. Files are parsed using `gray-matter` for frontmatter
3. Content is converted to HTML using `remark` and `rehype`
4. Code blocks are highlighted using `rehype-prism-plus`
5. Images are handled with Next.js Image optimization

### Key Features

- Category-based filtering
- Responsive design
- Syntax highlighting for code blocks
- Thumbnail images for posts

## ✍️ Creating New Blog Posts

### Step 1: Create a New Markdown File

Create a new `.md` file in the `/content` directory. The filename should match the intended slug (URL) of your post.

### Step 2: Add Frontmatter

Each blog post requires frontmatter at the beginning of the file. Frontmatter must be enclosed between `---` lines and contains metadata about your post.

### Step 3: Write Your Content

After the frontmatter, write your blog post content using Markdown syntax.

### Blog Post Template

Here's a template for creating a new blog post:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
slug: "your-post-slug"
excerpt: "A brief summary of your post (appears in listings)"
thumbnail: "/images/default-thumbnail.png"
categories: ["Category1", "Category2"]
---

# Your Post Title

Introduction paragraph goes here.

## Section Heading

Content goes here with **bold** or *italic* formatting.

### Code Example

```javascript
// This is a code block with syntax highlighting
function helloWorld() {
  console.log("Hello, world!");
}
```