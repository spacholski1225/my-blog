import Link from "next/link";

export default function CategoryPage() {
  // For now, we only have one category
  const categories = [
    { name: "General", slug: "general", count: 1 }
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-6 text-text">Categories</h1>
        <p className="text-text opacity-90 text-lg">
          Browse blog posts by category.
        </p>
      </section>

      <section>
        <div className="grid gap-4">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/category/${category.slug}`}
              className="p-6 rounded-lg neumorphic-raised hover-rise flex justify-between items-center transition-all duration-300"
            >
              <span className="text-xl font-heading font-medium text-text">{category.name}</span>
              <span className="px-3 py-1 rounded-full bg-surface text-sm text-accent-primary">
                {category.count} post{category.count !== 1 ? 's' : ''}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}