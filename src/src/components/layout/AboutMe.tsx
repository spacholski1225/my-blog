import Image from 'next/image';
import Link from 'next/link';

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <div className="avatar-container">
          <Image 
            src="/images/avatar.png" 
            alt="Profile Avatar" 
            width={112} 
            height={112} 
            className="avatar"
          />
        </div>
        <div className="bio-container">
          <h2>About Me</h2>
          <p>
            Hello! I'm a passionate developer with experience in web development, 
            particularly using React, Next.js, and TypeScript.
            I enjoy building modern, responsive web applications and exploring new technologies.
          </p>
          <div className="social-links">
            <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-button github">
              {/* GitHub Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </Link>
            <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </Link>
            <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-button twitter">
              {/* Twitter Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-7.6 7.5-4.5.8-.5 1.5-1 2.5-1.5z"></path>
              </svg>
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;