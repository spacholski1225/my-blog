import Image from 'next/image';

interface MdImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const MdImage = ({ src, alt, width = 800, height = 400 }: MdImageProps) => {
  // Determine if the image path is relative to content directory
  const isRelativePath = src.startsWith('./') || (!src.startsWith('/') && !src.startsWith('http'));
  
  // Build the correct image path
  let imageSrc = src;
  if (isRelativePath) {
    // For images within the content directory, we need to adjust the path
    imageSrc = `/content/${src.replace('./', '')}`;
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