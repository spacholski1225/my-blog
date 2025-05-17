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
  width = 1000,
  height = 500,
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
    <div
      className={`blog-thumbnail ${className}`}
      style={{
        borderRadius: className.includes('blog-post-thumbnail') ? '12px' : '8px',
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className.includes('blog-post-thumbnail') ? 'w-full h-auto' : ''}
        style={{
          objectFit: 'cover',
          aspectRatio: className.includes('blog-post-thumbnail') ? `${width}/${height}` : undefined,
          border: className.includes('blog-post-thumbnail') ? '4px solid var(--accent-primary)' : '2px solid var(--accent-primary)',
          display: 'block'
        }}
      />
    </div>
  );
};

export default BlogThumbnail;