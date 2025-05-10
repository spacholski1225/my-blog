import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, slug }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <article className="p-6 mb-8 neumorphic-raised hover-rise cursor-pointer transition-all duration-300 glow-accent overflow-hidden">
        <div className="mb-4 relative">
          <h2 className="text-2xl font-heading font-bold text-accent-secondary mb-2 transition-all duration-300 group-hover:text-accent-primary">{title}</h2>
          <time className="text-sm text-text opacity-70 inline-block">{date}</time>
        </div>
        <p className="text-text opacity-90 mb-4">{excerpt}</p>
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