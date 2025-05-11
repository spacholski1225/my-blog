import { notFound } from "next/navigation";
import BlogCard from "../../../components/blog/BlogCard";

interface CategoryPageParams {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category } = await params;

  // For now, we only support the "general" category
  if (category !== "general") {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-6 text-text capitalize">
          {category} Category
        </h1>
        <p className="text-text opacity-90 text-lg">
          Blog posts in the {category} category.
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