import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/blog/BlogCard';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            slug={post.slug}
          />
        ))
      ) : (
        <div className="p-6 mb-8 neumorphic-raised">
          <h2 className="text-2xl font-heading font-bold text-accent-secondary mb-2">No posts found</h2>
          <p className="text-text opacity-90 mb-4">
            No markdown files were found in the content directory. Please add some markdown files to get started.
          </p>
        </div>
      )}
    </>
  );
}