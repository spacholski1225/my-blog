import { notFound } from "next/navigation";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostParams) {
  const { slug } = params;

  // For now, we only have one blog post
  if (slug !== "hi-from-my-blog") {
    notFound();
  }

  return (
    <article className="prose prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4 text-text">hi from my blog</h1>
        <time className="text-sm text-text opacity-70">May 10, 2025</time>
      </div>
      
      <div className="p-6 rounded-lg neumorphic-inset">
        <p className="text-text mb-4">
          Welcome to my personal blog with Dark Neumorphism design!
        </p>
        
        <p className="text-text mb-4">
          This is my first blog post. I'm excited to share my thoughts and ideas with you.
        </p>
        
        <p className="text-text">
          Stay tuned for more content coming soon!
        </p>
      </div>
    </article>
  );
}