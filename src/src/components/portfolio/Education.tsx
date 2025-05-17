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
  description?: string;
}

const educationHistory: EducationItem[] = [
  {
    institution: "University of Zielona Gora",
    degree: "Master's in Computer Science",
    period: "2024 - 2025",
    description: "Specialized in Software Engineering with focus on distributed systems and cloud computing."
  },
  {
    institution: "University of Zielona Gora",
    degree: "Bachelor of Engineering in Automation Control and Robotics",
    period: "2019 - 2023",
    description: "Foundations in programming, algorithms, and software development, combined with core knowledge of control systems, automation technologies, and robotics."
  }
];

const certifications: Certification[] = [
  {
    name: "AWS Certified Associate Developer",
    issuer: "Amazon Web Services",
    date: "2025",
    url: "https://www.credly.com/badges/83e585cd-9443-476f-8d9a-e6b5601b18e1/linked_in_profile",
    description: "Validates technical expertise in developing and maintaining applications on the AWS platform. Covers core AWS services, architecture best practices, and application development."
  },
  {
    name: "Ai_devs 3 Agents",
    issuer: "AI_devs",
    date: "2024",
    url: "https://credsverse.com/credentials/de59643a-5116-4f59-9da3-4cbcf4308305",
    description: "Validates skills in building, optimizing, and deploying agent-based AI systems. Covers working with language models, tool integration, and maintaining production-ready applications."
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
        {cert.description && (
          <p className="certification-description">{cert.description}</p>
        )}
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