import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <Link href="/blog/building-secure-dotnet-api" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
        <div className="post">
          <h2>Building a Secure .NET API</h2>
          <p className="date">Published: May 10, 2025</p>
          <p>Learn how to build a secure API with .NET 8 using the latest security best practices and authentication methods.</p>
          <div className="read-more">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
      
      <Link href="/blog/smolai-agents-in-action" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
        <div className="post">
          <h2>SmolAI Agents in Action</h2>
          <p className="date">Published: May 3, 2025</p>
          <p>Exploring how small, efficient AI agents can transform your development workflow and automate repetitive tasks.</p>
          <div className="read-more">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
    </>
  );
}