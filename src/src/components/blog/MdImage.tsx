import Image from 'next/image';

interface MdImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  postSlug?: string;
}

const MdImage = ({ src, alt, width = 800, height = 400, postSlug }: MdImageProps) => {
  // Determine if the image path is relative to content directory
  const isRelativePath = src.startsWith('./') || (!src.startsWith('/') && !src.startsWith('http'));
  
  // Build the correct image path
  let imageSrc = src;
  if (isRelativePath) {
    // Remove the leading './' if present
    const cleanSrc = src.replace(/^\.\//g, '');
    
    // Construct path to the image using the post slug if available
    if (postSlug) {
      imageSrc = `/content/${postSlug}/${cleanSrc}`;
    } else {
      imageSrc = `/content/${cleanSrc}`;
    }
  }

  console.log(`Rendering image with src: ${src}, adjusted to: ${imageSrc}`);

  return (
    <div className="my-6">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg mx-auto"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default MdImage;