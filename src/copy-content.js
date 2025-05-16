const fs = require('fs');
const path = require('path');

// Paths
const contentDir = path.join(__dirname, '..', 'content');
const publicContentDir = path.join(__dirname, 'public', 'content');
const publicImagesDir = path.join(__dirname, 'public', 'images');

// Default thumbnail path
const defaultThumbnailPath = path.join(publicImagesDir, 'default-thumbnail.png');

// Create the public/content and public/images directories if they don't exist
if (!fs.existsSync(publicContentDir)) {
  fs.mkdirSync(publicContentDir, { recursive: true });
  console.log(`Created directory: ${publicContentDir}`);
}

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
  console.log(`Created directory: ${publicImagesDir}`);
}

// Function to copy a file
function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
  console.log(`Copied: ${source} -> ${destination}`);
}

// Function to process content directories
function processContentDirectories(contentDir) {
  // Check if source directory exists
  if (!fs.existsSync(contentDir)) {
    console.error(`Source directory does not exist: ${contentDir}`);
    return;
  }

  // Read all items in the content directory
  const items = fs.readdirSync(contentDir);

  for (const item of items) {
    const itemPath = path.join(contentDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Process each directory (blog post folder)
      processPostDirectory(itemPath);
    } else if (stat.isFile() && path.extname(itemPath).toLowerCase() === '.md') {
      // Handle markdown files at the root level
      const destPath = path.join(publicContentDir, item);
      copyFile(itemPath, destPath);
    } else if (stat.isFile() && isImageFile(itemPath)) {
      // Handle image files at the root level
      const destPath = path.join(publicImagesDir, item);
      copyFile(itemPath, destPath);
    }
  }
}

// Function to process a blog post directory
function processPostDirectory(dirPath) {
  // Get the directory name (post slug)
  const dirName = path.basename(dirPath);
  
  // Create corresponding directory in public/content
  const publicPostDir = path.join(publicContentDir, dirName);
  if (!fs.existsSync(publicPostDir)) {
    fs.mkdirSync(publicPostDir, { recursive: true });
    console.log(`Created directory: ${publicPostDir}`);
  }
  
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile()) {
      if (path.extname(itemPath).toLowerCase() === '.md') {
        // Copy markdown file to the corresponding directory in public/content
        const destPath = path.join(publicPostDir, item);
        copyFile(itemPath, destPath);
      } else if (isImageFile(itemPath)) {
        // Copy image file to both the post directory and public/images
        const postDestPath = path.join(publicPostDir, item);
        copyFile(itemPath, postDestPath);
        
        // Also copy to public/images for backward compatibility
        const imagesDestPath = path.join(publicImagesDir, item);
        copyFile(itemPath, imagesDestPath);
      }
    }
  }
}

// Function to check if a file is an image
function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext);
}

// Process the content directory
console.log(`Processing content from ${contentDir}`);
processContentDirectories(contentDir);
console.log('Content processed successfully!');