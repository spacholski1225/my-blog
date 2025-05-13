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
}

const projects: Project[] = [
  {
    title: "Personal Blog",
    description: "A modern, responsive blog built with Next.js and TailwindCSS featuring dark mode, markdown support, and a clean design.",
    motivation: "I wanted to create a platform to share my technical knowledge and showcase my writing while experimenting with the latest web technologies.",
    techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Markdown"],
    repoUrl: "https://github.com/yourusername/blog",
    demoUrl: "https://yourblog.com",
    image: "/images/blog-project.png"
  },
  {
    title: "Task Management App",
    description: "A full-stack task management application with features like task categorization, due dates, priority levels, and user authentication.",
    motivation: "I built this to solve my own productivity challenges and to demonstrate my ability to create a complete application from frontend to backend.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    repoUrl: "https://github.com/yourusername/task-app",
    demoUrl: "https://yourtaskapp.com",
    image: "/images/task-app.png"
  },
  {
    title: "E-commerce Platform",
    description: "A scalable e-commerce solution with product catalog, shopping cart, payment processing, and order management.",
    motivation: "I wanted to challenge myself with a complex project that involves multiple integrations and real-world business logic.",
    techStack: [".NET", "SQL Server", "React", "Redux", "Azure"],
    repoUrl: "https://github.com/yourusername/ecommerce",
    demoUrl: "https://yourecommerce.com",
    image: "/images/ecommerce.png"
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
          {project.repoUrl && (
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link repo">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Repository
            </Link>
          )}
          
          {project.demoUrl && (
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
      
      {project.image && (
        <div className="project-image">
          <Image 
            src={project.image} 
            alt={`${project.title} screenshot`} 
            width={300} 
            height={200}
            className="project-screenshot"
          />
        </div>
      )}
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