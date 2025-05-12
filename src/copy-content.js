const fs = require('fs');
const path = require('path');

// Paths
const contentDir = path.join(__dirname, '..', 'content');
const publicContentDir = path.join(__dirname, 'public', 'content');

// Create the public/content directory if it doesn't exist
if (!fs.existsSync(publicContentDir)) {
  fs.mkdirSync(publicContentDir, { recursive: true });
  console.log(`Created directory: ${publicContentDir}`);
}

// Function to copy a file
function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
  console.log(`Copied: ${source} -> ${destination}`);
}

// Function to copy directory recursively
function copyDirectory(source, destination) {
  // Check if source directory exists
  if (!fs.existsSync(source)) {
    console.error(`Source directory does not exist: ${source}`);
    return;
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
    console.log(`Created directory: ${destination}`);
  }

  // Read all files in the source directory
  const files = fs.readdirSync(source);

  // Copy each file/directory
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    // Check if it's a directory or file
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      copyFile(sourcePath, destPath);
    }
  }
}

// Copy the content directory to public/content
console.log(`Copying content from ${contentDir} to ${publicContentDir}`);
copyDirectory(contentDir, publicContentDir);
console.log('Content copied successfully!');