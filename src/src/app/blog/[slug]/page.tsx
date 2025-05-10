import { notFound } from "next/navigation";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostParams) {
  const { slug } = params;

  // Mock data for our two blog posts
  const blogPosts = {
    "building-secure-dotnet-api": {
      title: "Building a Secure .NET API",
      date: "May 10, 2025",
      content: [
        "In this post, we'll explore how to build a secure API with .NET 8 using the latest security best practices.",
        "Authentication and authorization are critical components of any modern API. We'll look at how to implement JWT authentication and role-based access control.",
        "We'll also cover input validation, output encoding, and other security measures to protect against common vulnerabilities like SQL injection and XSS attacks."
      ]
    },
    "smolai-agents-in-action": {
      title: "SmolAI Agents in Action",
      date: "May 3, 2025",
      content: [
        "Small, efficient AI agents are transforming development workflows and automating repetitive tasks.",
        "In this post, we'll look at how to create and deploy SmolAI agents that can help with code generation, refactoring, and documentation.",
        "We'll also explore how these agents can be integrated into your existing development pipeline to boost productivity and reduce errors."
      ]
    }
  };

  // Check if the slug exists in our mock data
  if (!blogPosts[slug as keyof typeof blogPosts]) {
    notFound();
  }

  const post = blogPosts[slug as keyof typeof blogPosts];

  return (
    <>
      <div className="post">
        <h2>{post.title}</h2>
        <p className="date">Published: {post.date}</p>
        {post.content.map((paragraph, index) => (
          <p key={index} style={{marginBottom: '1rem'}}>{paragraph}</p>
        ))}
      </div>
      
      <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-start'}}>
        <a href="/blog" className="socials" style={{display: 'inline-block'}}>
          Back to Blog
        </a>
      </div>
    </>
  );
}