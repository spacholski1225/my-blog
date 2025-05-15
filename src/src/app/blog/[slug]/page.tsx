import { notFound } from "next/navigation";
import Link from 'next/link';
import { getPostBySlug, markdownToHtml, getAllPosts } from '@/lib/api';
import BlogThumbnail from '@/components/blog/BlogThumbnail';

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
            <Link href="/blog" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Thumbnail on the left */}
            {post.thumbnail && (
              <div style={{ flexShrink: 0 }}>
                <BlogThumbnail
                  src={post.thumbnail}
                  alt={`Thumbnail for ${post.title}`}
                  width={112}
                  height={112}
                  priority={true}
                />
              </div>
            )}
            
            {/* Title and date on the right */}
            <div>
              <h2>{post.title}</h2>
              <p className="date">Published: {post.date}</p>
            </div>
          </div>
          
          {/* Content below */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        
        <div style={{marginTop: '2rem'}}>
          <Link href="/blog" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
          <Link href="/blog" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
}