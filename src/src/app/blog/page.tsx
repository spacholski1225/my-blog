import BlogCard from "../../components/blog/BlogCard";

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-6 text-text">Blog</h1>
        <p className="text-text opacity-90 text-lg">
          All my blog posts in one place.
        </p>
      </section>

      <section>
        <div className="grid gap-8">
          <BlogCard 
            title="hi from my blog"
            excerpt="This is my first blog post. Welcome to my personal blog with Dark Neumorphism design."
            date="May 10, 2025"
            slug="hi-from-my-blog"
          />
        </div>
      </section>
    </div>
  );
}