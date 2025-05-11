import { notFound } from "next/navigation";
import Link from 'next/link';
import { getPostBySlug, markdownToHtml, getAllPosts } from '@/lib/api';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostParams) {
  // Fix the warning about params.slug needing to be awaited
  const { slug } = params;
  console.log(`Rendering blog post for slug: ${slug}`);
  
  try {
    const post = getPostBySlug(slug);
    console.log(`Post found:`, post ? 'Yes' : 'No');

    if (!post) {
      console.log(`Post not found for slug: ${slug}`);
      return (
        <div className="error-container">
          <h2>Post Not Found</h2>
          <p>Sorry, the post you're looking for could not be found.</p>
          <p>Slug: {slug}</p>
          <div style={{marginTop: '2rem'}}>
            <Link href="/blog" className="socials">
              Back to Blog
            </Link>
          </div>
        </div>
      );
    }

    console.log(`Converting markdown to HTML for post: ${post.title}`);
    const content = await markdownToHtml(post.content);

    return (
      <>
        <div className="post">
          <h2>{post.title}</h2>
          <p className="date">Published: {post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        
        <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-start'}}>
          <Link href="/blog" className="socials" style={{display: 'inline-block'}}>
            Back to Blog
          </Link>
        </div>
      </>
    );
  } catch (error) {
    console.error(`Error rendering blog post:`, error);
    return (
      <div className="error-container">
        <h2>Error Loading Post</h2>
        <p>Sorry, there was an error loading this post.</p>
        <p>Slug: {slug}</p>
        <div style={{marginTop: '2rem'}}>
          <Link href="/blog" className="socials">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
}