import Image from 'next/image';

interface BlogThumbnailProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const BlogThumbnail = ({ 
  src, 
  alt, 
  width = 800, 
  height = 400, 
  className = '',
  priority = false
}: BlogThumbnailProps) => {
  // Default image if src is null
  const defaultImage = '/images/default-thumbnail.png';
  
  // Process image path if available
  const imageSrc = src
    ? (src.startsWith('./') || (!src.startsWith('/') && !src.startsWith('http')))
      ? `/content/${src.replace('./', '')}`
      : src
    : defaultImage;

  // Debug image path
  console.log('Thumbnail src:', src);
  console.log('Processed imageSrc:', imageSrc);

  return (
    <div className={`blog-thumbnail ${className}`} style={{overflow: 'hidden'}}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        style={{
          borderRadius: '8px',
          objectFit: 'cover',
          width: `${width}px`,
          height: `${height}px`,
          border: '3px solid var(--accent-primary)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default BlogThumbnail;