import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface ImageNode extends Node {
  type: 'image';
  url: string;
  title: string | null;
  alt: string | null;
  data?: {
    hName?: string;
    hProperties?: {
      dataIsMarkdownImage?: boolean;
      dataSrc?: string;
      dataPostSlug?: string;
      dataRelativePath?: string;
      [key: string]: any;
    };
  };
}

/**
 * A remark plugin that processes image paths and prepares them 
 * to be rendered with the MdImage component
 */
export function remarkImages(options: { relativePath?: string } = {}) {
  return (tree: Node) => {
    visit(tree, 'image', (node: ImageNode) => {
      // Add custom data to the node to indicate it should use MdImage
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      
      // Mark this image for special handling
      node.data.hName = 'img';
      node.data.hProperties.dataIsMarkdownImage = true;
      
      // Pass original URL for path processing
      node.data.hProperties.dataSrc = node.url;
      
      // Store post's relative path for path resolution if provided
      if (options.relativePath) {
        // Extract the post slug from the path
        const pathParts = options.relativePath.split(/[\/\\]/);
        const postSlug = pathParts[pathParts.length - 1] === ''
          ? pathParts[pathParts.length - 2]
          : pathParts[pathParts.length - 1];
          
        node.data.hProperties.dataPostSlug = postSlug;
        node.data.hProperties.dataRelativePath = options.relativePath;
      }
    });
  };
}