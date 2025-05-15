import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypePrism from 'rehype-prism-plus'; // Modern syntax highlighting

// Try multiple possible paths for the content directory
function findContentDirectory() {
  const possiblePaths = [
    path.join(process.cwd(), 'content'),           // /content
    path.join(process.cwd(), '..', 'content'),     // ../content
    path.join(process.cwd(), 'public', 'content'), // /public/content
  ];

  for (const dirPath of possiblePaths) {
    console.log(`Checking if content directory exists at: ${dirPath}`);
    if (fs.existsSync(dirPath)) {
      console.log(`Found content directory at: ${dirPath}`);
      return dirPath;
    }
  }

  // Default to the public/content directory even if it doesn't exist yet
  const defaultPath = path.join(process.cwd(), 'public', 'content');
  console.log(`No content directory found, defaulting to: ${defaultPath}`);
  return defaultPath;
}

const contentDirectory = findContentDirectory();

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  thumbnail: string | null; // Path to thumbnail image or null
};

// Check if a thumbnail exists for a post
function findThumbnailForPost(slug: string): string | null {
  try {
    // Check for common image extensions
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    // First check for {slug}-thumbnail.{ext}
    for (const ext of extensions) {
      const thumbnailPath = path.join(contentDirectory, `${slug}-thumbnail.${ext}`);
      if (fs.existsSync(thumbnailPath)) {
        // Return relative path for use in components
        return `./${slug}-thumbnail.${ext}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding thumbnail for ${slug}:`, error);
    return null;
  }
}

// Get all post slugs
export function getPostSlugs() {
  // Ensure content directory exists
  if (!fs.existsSync(contentDirectory)) {
    console.log(`Content directory does not exist: ${contentDirectory}`);
    try {
      // Try to create the directory
      fs.mkdirSync(contentDirectory, { recursive: true });
      console.log(`Created content directory: ${contentDirectory}`);
    } catch (error) {
      console.error(`Failed to create content directory: ${error}`);
      return [];
    }
  }
  
  try {
    const files = fs.readdirSync(contentDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    console.log(`Found ${markdownFiles.length} markdown files in ${contentDirectory}`);
    return markdownFiles;
  } catch (error) {
    console.error(`Error reading content directory: ${error}`);
    return [];
  }
}

// Get post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    console.log(`Getting post by slug: ${slug}`);
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);
    
    console.log(`Looking for file at path: ${fullPath}`);
    console.log(`File exists: ${fs.existsSync(fullPath)}`);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      // List all files in the content directory for debugging
      if (fs.existsSync(contentDirectory)) {
        console.log('Files in content directory:', fs.readdirSync(contentDirectory));
      } else {
        console.log('Content directory does not exist');
      }
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    console.log(`Post data:`, data);

    // Check for thumbnail in frontmatter or look for a matching file
    let thumbnail = data.thumbnail || null;
    
    // If no thumbnail specified in frontmatter, look for a matching file
    if (!thumbnail) {
      thumbnail = findThumbnailForPost(realSlug);
    }
    
    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content: content,
      thumbnail: thumbnail,
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

// Get all posts
export function getAllPosts(): Post[] {
  console.log('Getting all posts');
  
  // Check if content directory exists
  if (!fs.existsSync(contentDirectory)) {
    console.log(`Content directory does not exist: ${contentDirectory}`);
    return [];
  }
  
  const slugs = getPostSlugs();
  console.log(`Found ${slugs.length} markdown files:`, slugs);
  
  const posts = slugs
    .map(slug => {
      console.log(`Processing slug: ${slug}`);
      return getPostBySlug(slug.replace(/\.md$/, ''));
    })
    .filter((post): post is Post => post !== null) // Type guard to filter out null values
    .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
  
  console.log(`Returning ${posts.length} posts`);
  return posts;
}

// Convert markdown to HTML
export async function markdownToHtml(markdown: string) {
  try {
    console.log('Converting markdown to HTML...');
    // First convert markdown to HTML
    const remarkResult = await remark()
      .use(html, { sanitize: false })
      .process(markdown);
    
    // Then process the HTML with rehype to add syntax highlighting
    const rehypeResult = await rehype()
      .use(rehypePrism, { showLineNumbers: true })
      .process(remarkResult.toString());
    
    return rehypeResult.toString();
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    // Return a basic HTML version of the markdown in case of error
    return `<div class="markdown-error">
      <p>Error rendering markdown content.</p>
      <pre>${markdown.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>`;
  }
}