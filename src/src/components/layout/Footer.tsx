import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#121212',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      borderTop: '1px solid #2a2a2a',
      marginTop: '3rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          
          {/* Left Column - Brand */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#6c63ff',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>szymonpacholski.com</h3>
            <p style={{
              color: '#eeeeee',
              opacity: 0.7,
              marginBottom: '1rem'
            }}>
              My personal blog and portfolio focused on modern software development, AI applications and backend architecture.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#eeeeee'
            }}>Quick Links</h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link href="/" style={{
                color: '#eeeeee',
                opacity: 0.7,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </Link>
              <Link href="/blog" style={{
                color: '#eeeeee',
                opacity: 0.7,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                Blog
              </Link>
              <Link href="/portfolio" style={{
                color: '#eeeeee',
                opacity: 0.7,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Portfolio
              </Link>
            </div>
          </div>
          
          {/* Connect */}
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#eeeeee'
            }}>Connect</h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <a href="https://github.com/spacholski1225" target="_blank" rel="noopener noreferrer" style={{
                color: '#eeeeee',
                opacity: 0.7,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/szymonpacholski" target="_blank" rel="noopener noreferrer" style={{
                color: '#eeeeee',
                opacity: 0.7,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #2a2a2a',
          color: '#eeeeee',
          opacity: 0.5,
          fontSize: '0.875rem'
        }}>
          <p>© 2025 szymonpacholski.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;