import React from 'react';

// Define leadership item data structure
interface LeadershipItem {
  title: string;
  description: string;
  date: string;
  type: "company" | "personal-branding";
  organization?: string;
  url?: string;
}

// Leadership data
const leadershipItems: LeadershipItem[] = [
  {
  title: "AI Council — Workshops and Presentations on AI/LLM",
  description: "Organized and led a series of workshops and presentations aimed at educating internal teams about Artificial Intelligence, Large Language Models (LLM)and AI-powered developer tools. Covered topics included machine learning, context windows, statelessnessand agent-based AI, with hands-on sessions using tools like GitHub Copilot, RooCode, AnythingLLM and Ollama.",
  date: "2025 - Present",
  type: "company",
  organization: "Aucatne",
},
  {
    title: "Knowledge Sharing on LinkedIn",
    description: "Publish articles about practical AI applications, focusing on real-world use cases, implementation detailsand insights gained from software development experience. Share knowledge to help professionals effectively leverage AI in their work.",
    date: "2024 - Present",
    type: "personal-branding",
    organization: "LinkedIn",
    url: "https://linkedin.com/in/szymonpacholski"
  }
];

// Item card component
const ItemCard = ({ item }: { item: LeadershipItem }) => {
  // Icon based on type
  const getIcon = () => {
    switch(item.type) {
      case "company":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case "personal-branding":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="leadership-card">
      <div className="leadership-date">{item.date}</div>
      <div className="leadership-content">
        <div className="leadership-type">
          {getIcon()}
          <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
        </div>
        <h3 className="leadership-title">{item.title}</h3>
        {item.organization && <div className="leadership-organization">{item.organization}</div>}
        <p className="leadership-description">{item.description}</p>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="leadership-link">
            View {item.type === "personal-branding" ? "Profile" : "More"}
          </a>
        )}
      </div>
    </div>
  );
};

// Main component
const LeadershipKnowledgeSharing = () => {
  return (
    <div className="portfolio-section leadership-section">
      <h2 className="section-title">Leadership & Knowledge Sharing</h2>
      
      <div className="leadership-items">
        {leadershipItems.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LeadershipKnowledgeSharing;