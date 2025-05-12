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
            }}>yourname.dev</h3>
            <p style={{
              color: '#eeeeee',
              opacity: 0.7,
              marginBottom: '1rem'
            }}>
              A personal blog about web development, programming, and technology.
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
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '1.5rem'
            }}>
              <li><Link href="/" style={{color: '#eeeeee', opacity: 0.7, textDecoration: 'none'}}>Home</Link></li>
              <li><Link href="/blog" style={{color: '#eeeeee', opacity: 0.7, textDecoration: 'none'}}>Blog</Link></li>
              <li><Link href="/about" style={{color: '#eeeeee', opacity: 0.7, textDecoration: 'none'}}>About</Link></li>
            </ul>
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
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" style={{
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
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" style={{
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
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" style={{
                color: '#eeeeee',
                opacity: 0.7,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-7.6 7.5-4.5.8-.5 1.5-1 2.5-1.5z"></path>
                </svg>
                Twitter
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
          <p>© 2025 yourname.dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;