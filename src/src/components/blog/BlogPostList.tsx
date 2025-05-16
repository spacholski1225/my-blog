import Link from 'next/link';
import BlogThumbnail from './BlogThumbnail';
import CategoryBadge from './CategoryBadge';
import { Post } from '@/lib/api';

interface BlogPostListProps {
  posts: Post[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <div className="post">
              <div className="post-content">
                {/* Thumbnail container */}
                <div className="post-thumbnail-container">
                  <BlogThumbnail
                    src={post.thumbnail}
                    alt={`Thumbnail for ${post.title}`}
                    height={112}
                    width={112}
                    className="post-thumbnail"
                  />
                </div>
                
                {/* Content container */}
                <div className="post-text-container">
                  <h2>{post.title}</h2>
                  
                  {/* Category badges */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {post.categories.map((category) => (
                        <CategoryBadge
                          key={category}
                          category={category}
                          size="small"
                          insideLink={true}
                        />
                      ))}
                    </div>
                  )}
                  
                  <p className="date">Published: {post.date}</p>
                  <p>{post.excerpt}</p>
                  <div className="read-more">
                    Read more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="post">
          <h2>No posts found</h2>
          <p>No posts found in this category.</p>
        </div>
      )}
    </>
  );
}