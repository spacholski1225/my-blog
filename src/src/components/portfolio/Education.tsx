import React from 'react';

// Define education data structure
interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

// Define certification data structure
interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

const educationHistory: EducationItem[] = [
  {
    institution: "University of Technology",
    degree: "Master's in Computer Science",
    period: "2018 - 2020",
    description: "Specialized in Software Engineering with focus on distributed systems and cloud computing."
  },
  {
    institution: "University of Technology",
    degree: "Bachelor's in Computer Science",
    period: "2014 - 2018",
    description: "Foundations in programming, algorithms, data structures, and software development methodologies."
  }
];

const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2022",
    url: "https://aws.amazon.com/certification/"
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "2021",
    url: "https://learn.microsoft.com/en-us/certifications/"
  },
  {
    name: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "2020",
    url: "https://www.scrum.org/professional-scrum-certifications"
  }
];

const EducationCard = ({ item }: { item: EducationItem }) => {
  return (
    <div className="education-card">
      <div className="education-period">{item.period}</div>
      <div className="education-content">
        <h3 className="education-degree">{item.degree}</h3>
        <div className="education-institution">{item.institution}</div>
        {item.description && <p className="education-description">{item.description}</p>}
      </div>
    </div>
  );
};

const CertificationCard = ({ cert }: { cert: Certification }) => {
  return (
    <div className="certification-card">
      <div className="certification-date">{cert.date}</div>
      <div className="certification-content">
        <h3 className="certification-name">{cert.name}</h3>
        <div className="certification-issuer">Issued by {cert.issuer}</div>
        {cert.url && (
          <a 
            href={cert.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="certification-link"
          >
            Verify
          </a>
        )}
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <div className="portfolio-section education-section">
      <h2 className="section-title">Education & Certifications</h2>
      
      <div className="education-container">
        <div className="education-history">
          <h3 className="subsection-title">Education</h3>
          <div className="education-timeline">
            {educationHistory.map((item, index) => (
              <EducationCard key={index} item={item} />
            ))}
          </div>
        </div>
        
        <div className="certifications">
          <h3 className="subsection-title">Certifications</h3>
          <div className="certifications-list">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;