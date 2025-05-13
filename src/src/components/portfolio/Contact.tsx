import React from 'react';

const Contact = () => {
  return (
    <div className="portfolio-section contact-section">
      <h2 className="section-title">Contact</h2>
      
      <div className="contact-container">
        <p className="contact-intro">
          I'm always open to new opportunities and collaborations. Feel free to reach out to me!
        </p>
        
        <div className="contact-placeholder">
          <div className="placeholder-text">
            <p>Email contact form coming soon!</p>
            <p>In the meantime, you can reach me at:</p>
            <a href="mailto:your.email@example.com" className="contact-email">
              your.email@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;