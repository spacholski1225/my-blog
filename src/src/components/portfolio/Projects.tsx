import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define project data structure
interface Project {
  title: string;
  description: string;
  motivation: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  hideButtons?: boolean; // Flag to hide both repository and demo buttons
}

const projects: Project[] = [
  {
    title: "An app that supports communication for people with autism",
    description: "An advanced AI-based autism support app created in partnership with the non-profit Generado foundation. The app helps with communication and daily activities, offering interactive tools and mechanisms to develop social skills.",
    motivation: "The aim of the project was to create a modern tool to support people with autism and their caregivers in everyday challenges. The project was carried out in cooperation with experts, enabling real support thanks to AI technology. The PoC (Proof of Concept) was positively evaluated by the foundation, which led to the development of the full version of the application.",
    techStack: [".NET 8", "Razor Pages", "PostgreSQL", "Docker", "AWS", "OpenAI", "Llama", "LLM"],
    repoUrl: "https://github.com/spacholski1225/text-grammar",
    demoUrl: "",
    image: "/images/autism-support-app.png",
    hideButtons: true
  },
  {
    title: "AI-Powered Assistant: Centralizing Corporate Data from Confluence, JIRA, GitHub, and Bitbucket with AWS Bedrock",
    description: "An internal RAG (Retrieval-Augmented Generation) system integrating documentation from Confluence, tasks from JIRA, and source code from GitHub and Bitbucket into AWS Bedrock. The solution uses Anthropic's Haiku model for semantic code descriptions and automated documentation.",
    motivation: "The project aimed to streamline the process of retrieving technical information and code documentation by building a centralized RAG system. This enhanced internal knowledge sharing and reduced the time required to understand codebases and documentation.",
    techStack: ["Python", "AWS Lambda", "SQS", "Confluence", "JIRA", "GitHub", "Bitbucket", "AWS Bedrock", "LLM"],
    repoUrl: "",
    demoUrl: "",
    image: "/images/aws-bedrock-rag.png",
    hideButtons: true
  },
  {
    title: "Microservice in .NET + Terraform Template on AWS + CI on TeamCity",
    description: "A microservice extending the internal software ecosystem with real-time integration of client API data. The project included a Terraform template for AWS deployment, Docker-based containerization, and CI/CD automation with TeamCity.",
    motivation: "The aim was to enhance the internal system with seamless API integration and automated infrastructure setup. The Terraform template is now used by multiple teams, accelerating deployment processes.",
    techStack: [".NET 8", "Docker", "AWS", "Terraform", "TeamCity", "NewRelic", "PagerDuty"],
    repoUrl: "",
    demoUrl: "",
    image: "/images/microservice-dotnet.png",
    hideButtons: true
  }
];

const TechBadge = ({ tech }: { tech: string }) => {
  return (
    <span className="tech-badge">
      {tech}
    </span>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  // Default image if src is null or doesn't exist
  const defaultImage = '/images/default-thumbnail.png';
  
  // Process image path if available
  const imageSrc = project.image || defaultImage;

  return (
    <div className="project-card">
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        
        <div className="project-description">
          <p>{project.description}</p>
        </div>
        
        <div className="project-motivation">
          <h4>Motivation</h4>
          <p>{project.motivation}</p>
        </div>
        
        <div className="project-tech">
          <h4>Tech Stack</h4>
          <div className="tech-stack">
            {project.techStack.map((tech, index) => (
              <TechBadge key={index} tech={tech} />
            ))}
          </div>
        </div>
        
        <div className="project-links">
          {!project.hideButtons && project.repoUrl && (
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link repo">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Repository
            </Link>
          )}
          
          {!project.hideButtons && project.demoUrl && (
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link demo">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Live Demo
            </Link>
          )}
        </div>
      </div>
      
      <div className="project-image">
        <Image
          src={imageSrc}
          alt={`${project.title} screenshot`}
          width={300}
          height={200}
          className="project-screenshot"
        />
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="portfolio-section projects-section">
      <h2 className="section-title">Projects</h2>
      
      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;