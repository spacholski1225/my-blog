import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface Element extends Node {
  type: 'element';
  tagName: string;
  properties: Record<string, any>;
  children: Node[];
}

/**
 * A rehype plugin that transforms specially marked images to MdImage component syntax
 */
export function rehypeMdImage() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'img' &&
        node.properties &&
        node.properties.dataIsMarkdownImage
      ) {
        // Create a component representation
        node.tagName = 'mdimage';
        
        // Map properties to component props
        if (node.properties.dataSrc) {
          node.properties.src = node.properties.dataSrc;
          delete node.properties.dataSrc;
        }
        
        if (node.properties.dataPostSlug) {
          node.properties.postSlug = node.properties.dataPostSlug;
          delete node.properties.dataPostSlug;
        }
        
        if (node.properties.alt) {
          node.properties.alt = node.properties.alt;
        } else {
          node.properties.alt = ''; // Ensure alt is always present
        }
        
        // Remove custom properties
        delete node.properties.dataIsMarkdownImage;
        delete node.properties.dataRelativePath;
      }
    });
  };
}