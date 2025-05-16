---
title: "Test Post with Images"
date: "2025-05-16"
slug: "test-post-with-images"
excerpt: "Testing image support in blog posts with images in the same folder as the markdown file."
thumbnail: "/images/default-thumbnail.png"
categories: ["Test", "Images"]
---

# Test Post with Images

This is a test post to verify that images in the same folder as the markdown file work correctly.

## Image with Relative Path

Here's an image using a relative path:

![Test Image](./test-image.png)

## Image with Absolute Path

Here's an image using an absolute path:

![Default Thumbnail](/images/default-thumbnail.png)

## Testing Different Formats

The system should handle different image formats and paths correctly.

### Image in a Subfolder

If we had an image in a subfolder, it would look like this:

```markdown
![Subfolder Image](./subfolder/another-image.png)
```

### External Image

External images should also work:

![External Image](https://via.placeholder.com/800x400)

## Conclusion

If this post displays all images correctly, then our implementation is working as expected!