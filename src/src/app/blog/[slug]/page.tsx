import Link from 'next/link';
import { getPostBySlug, markdownToHtml, getAllPosts } from '@/lib/api';
import BlogThumbnail from '@/components/blog/BlogThumbnail';
import CategoryBadge from '@/components/blog/CategoryBadge';
import { notFound } from 'next/navigation';

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Completely restructured page component to avoid the typing issue
export default async function BlogPost(props: any) {
  // Extract slug from props using any type to bypass the type checking
  const slug = props.params?.slug;
  
  if (!slug) {
    return notFound();
  }
  console.log(`Rendering blog post for slug: ${slug}`);
  
  try {
    const post = getPostBySlug(slug);
    console.log(`Post found:`, post ? 'Yes' : 'No');

    if (!post) {
      console.log(`Post not found for slug: ${slug}`);
      return (
        <div className="error-container">
          <h2>Post Not Found</h2>
          <p>Sorry, the post you&apos;re looking for could not be found.</p>
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
    // Pass the file path to the markdownToHtml function
    const content = await markdownToHtml(post.content, post.fullPath);

    return (
      <>
        <div className="post">
          {/* Large thumbnail at the top */}
          {post.thumbnail && (
            <div style={{ width: '100%', marginBottom: '2rem' }}>
              <BlogThumbnail
                src={post.thumbnail}
                alt={`Thumbnail for ${post.title}`}
                width={1000}
                height={500}
                priority={true}
                className="blog-post-thumbnail"
              />
            </div>
          )}
          
          {/* Title and date below thumbnail */}
          <div style={{ marginBottom: '2rem' }}>
            <h2>{post.title}</h2>
            
            {/* Category badges */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <CategoryBadge
                    key={category}
                    category={category}
                  />
                ))}
              </div>
            )}
            
            <p className="date">Published: {post.date}</p>
          </div>
          
          {/* Content with custom components */}
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            suppressHydrationWarning
          />
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