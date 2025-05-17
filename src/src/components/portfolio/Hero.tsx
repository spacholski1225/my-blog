"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="portfolio-hero">
      <div className="portfolio-hero-content md:flex-row md:items-start flex flex-col items-center">
        <div className="avatar-container mb-6 md:mb-0 md:mr-8 flex justify-center md:justify-start w-full md:w-auto">
          <Image
            src="/images/avatar.png"
            alt="Profile Avatar"
            width={225}
            height={300}
            className="portfolio-avatar rounded-lg"
            style={{ borderRadius: '8px', objectFit: 'cover' }}
          />
        </div>
        <div className="bio-container text-center md:text-left w-full">
          <h1 className="portfolio-title">My Portfolio</h1>
          <p className="portfolio-bio">
            I&apos;m Szymon, a solution-oriented software engineer with experience in building scalable backend systems. Passionate about AI and system architecture, I contribute to our internal AI Council and develop tools integrating AI with enterprise systems.
          </p>
          <p className="portfolio-bio">
            As a naturally curious and collaborative engineer, I thrive on understanding how systems work holistically and connecting with others. My career goals include advancing in AI integration, software architecture, and leadership. I&apos;m committed to open knowledge sharing that benefits the entire tech community.
          </p>
          <div className="social-links justify-center md:justify-start">
            <Link href="https://github.com/spacholski1225" target="_blank" rel="noopener noreferrer" className="social-button github">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </Link>
            <Link href="https://linkedin.com/in/szymonpacholski" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </Link>
            <a
              href="#"
              onClick={scrollToContact}
              className="social-button contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;