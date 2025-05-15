import Link from 'next/link';
import { getAllPosts } from '@/lib/api';
import AboutMe from '@/components/layout/AboutMe';

export default function Home() {
  const posts = getAllPosts();
  // Limit to the 3 most recent posts
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <AboutMe />
      {recentPosts.length > 0 ? (
        recentPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <div className="post">
              <h2>{post.title}</h2>
              <p className="date">Published: {post.date}</p>
              <p>{post.excerpt}</p>
              <div className="read-more">
                Read more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="post">
          <h2>No posts found</h2>
          <p>No markdown files were found in the content directory. Please add some markdown files to get started.</p>
        </div>
      )}
      
      {/* View All Posts button */}
      <div className="view-all-container">
        <Link href="/blog">
          <button className="view-all-button">
            View All Posts
          </button>
        </Link>
      </div>
    </>
  );
}
