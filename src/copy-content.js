const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Paths
const contentDir = path.join(__dirname, '..', 'content');
const publicContentDir = path.join(__dirname, 'public', 'content');
const publicImagesDir = path.join(__dirname, 'public', 'images');

// Function to clean a directory
async function cleanDirectory(dirPath) {
    try {
        await fs.rm(dirPath, { recursive: true, force: true });
        console.log(`Cleaned directory: ${dirPath}`);
    } catch (error) {
        console.error(`Error cleaning directory ${dirPath}:`, error);
    }
}

// Function to ensure a directory exists
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Directory ensured: ${dirPath}`);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Function to process and copy a file
async function processFile(source, destination) {
  if (isOptimizableImage(source)) {
    try {
      const webpDestination = destination.replace(/\.(jpg|jpeg|png)$/i, '.webp');

      await sharp(source)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpDestination);

      console.log(`Optimized and converted to WebP: ${source} -> ${webpDestination}`);

    } catch (err) {
      console.error(`Error optimizing image ${source}:`, err);
      // Fallback to simple copy if optimization fails
      await fs.copyFile(source, destination);
      console.log(`Copied (fallback): ${source} -> ${destination}`);
    }
  } else {
    await fs.copyFile(source, destination);
    console.log(`Copied: ${source} -> ${destination}`);
  }
}

// Function to process content directories
async function processContentDirectories(contentDir) {
  if (!await directoryExists(contentDir)) {
    console.error(`Source directory does not exist: ${contentDir}`);
    return;
  }

  const items = await fs.readdir(contentDir);

  for (const item of items) {
    const itemPath = path.join(contentDir, item);
    const stat = await fs.stat(itemPath);

    if (stat.isDirectory()) {
      await processPostDirectory(itemPath);
    } else if (stat.isFile()) {
        const destDir = isImageFile(itemPath) ? publicImagesDir : publicContentDir;
        let destPath = path.join(destDir, item);
        if(isOptimizableImage(itemPath)) {
            destPath = destPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        await processFile(itemPath, destPath);
    }
  }
}

async function directoryExists(dirPath) {
    try {
        await fs.access(dirPath);
        return true;
    } catch (e) {
        return false;
    }
}

// Function to process a blog post directory
async function processPostDirectory(dirPath) {
  const dirName = path.basename(dirPath);

  const publicPostDir = path.join(publicContentDir, dirName);
  await ensureDirectoryExists(publicPostDir);

  const items = await fs.readdir(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = await fs.stat(itemPath);

    if (stat.isFile()) {
      let destPath = path.join(publicPostDir, item);

      if (isOptimizableImage(itemPath)) {
          destPath = destPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      }

      await processFile(itemPath, destPath);

      if (isImageFile(itemPath)) {
        // Also copy to public/images for backward compatibility
        let imagesDestPath = path.join(publicImagesDir, item);
        if (isOptimizableImage(itemPath)) {
            imagesDestPath = imagesDestPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        await processFile(itemPath, imagesDestPath);
      }
    }
  }
}

// Function to check if a file is an image that can be optimized
function isOptimizableImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
}

// Function to check if a file is an image
function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext);
}

// Main execution function
async function main() {
  console.log('Cleaning public content directories...');
  await cleanDirectory(publicContentDir);

    
  console.log(`Processing content from ${contentDir}`);
  await ensureDirectoryExists(publicContentDir);
  await ensureDirectoryExists(publicImagesDir);
  await processContentDirectories(contentDir);
  await updateMarkdownReferences();
  console.log('Content processed successfully!');
}

async function updateMarkdownReferences() {
    console.log('Updating markdown references...');
    const contentFiles = await findMarkdownFiles(path.join(__dirname, '..', 'content'));

    for (const file of contentFiles) {
        let content = await fs.readFile(file, 'utf8');
        const originalContent = content;

        content = content.replace(/\.(jpg|jpeg|png)/g, '.webp');

        if (content !== originalContent) {
            await fs.writeFile(file, content, 'utf8');
            console.log(`Updated references in: ${file}`);
        }
    }
}

async function findMarkdownFiles(dir) {
    let files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files = files.concat(await findMarkdownFiles(fullPath));
        } else if (item.isFile() && item.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }

    return files;
}

main().catch(err => {
  console.error('Error processing content:', err);
  process.exit(1);
});
