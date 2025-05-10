import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, slug }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="p-6 mb-8 rounded-lg neumorphic-raised hover-rise cursor-pointer transition-all duration-300">
        <div className="mb-4">
          <h2 className="text-2xl font-heading font-bold text-text mb-2">{title}</h2>
          <time className="text-sm text-text opacity-70">{date}</time>
        </div>
        <p className="text-text opacity-90">{excerpt}</p>
        <div className="mt-4">
          <span className="text-accent-primary font-medium">Read more →</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;