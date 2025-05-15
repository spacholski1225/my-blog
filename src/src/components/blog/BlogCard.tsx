import Link from 'next/link';
import BlogThumbnail from './BlogThumbnail';
import CategoryBadge from './CategoryBadge';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  thumbnail: string | null;
  categories?: string[]; // New prop
}

const BlogCard = ({ title, excerpt, date, slug, thumbnail, categories = [] }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <article className="p-6 mb-8 bg-surface rounded-xl shadow-neumorphic-light hover:translate-y-[-4px] cursor-pointer transition-all duration-300 overflow-hidden">
        {/* Thumbnail image */}
        <div className="mb-8 -mx-6 -mt-6">
          <BlogThumbnail
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            height={220}
            width={800}
            className="rounded-t-xl"
          />
        </div>
        
        {/* Category badges */}
        {categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryBadge
                key={category}
                category={category}
                size="small"
              />
            ))}
          </div>
        )}
        
        <div className="mb-4 relative">
          <h2 className="text-2xl font-heading font-bold text-accent-secondary mb-2 transition-all duration-300">{title}</h2>
          <time className="text-sm text-gray-300 inline-block">{date}</time>
        </div>
        <p className="text-gray-200 mb-4">{excerpt}</p>
        <div className="mt-4 flex justify-end">
          <span className="text-accent-primary font-medium inline-flex items-center group">
            Read more
            <svg
              className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;