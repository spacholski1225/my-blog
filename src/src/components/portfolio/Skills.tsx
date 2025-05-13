import React from 'react';

// Define skill data structure
interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'devops';
}

const skills: Skill[] = [
  // Frontend skills
  { name: 'React', level: 5, category: 'frontend' },
  { name: 'Next.js', level: 5, category: 'frontend' },
  { name: 'TypeScript', level: 4, category: 'frontend' },
  { name: 'TailwindCSS', level: 5, category: 'frontend' },
  { name: 'HTML/CSS', level: 5, category: 'frontend' },
  { name: 'JavaScript', level: 5, category: 'frontend' },
  
  // Backend skills
  { name: 'Node.js', level: 4, category: 'backend' },
  { name: '.NET', level: 4, category: 'backend' },
  { name: 'Express', level: 4, category: 'backend' },
  { name: 'SQL', level: 3, category: 'backend' },
  { name: 'MongoDB', level: 3, category: 'backend' },
  
  // DevOps skills
  { name: 'Git', level: 4, category: 'devops' },
  { name: 'Docker', level: 3, category: 'devops' },
  { name: 'CI/CD', level: 3, category: 'devops' },
  { name: 'AWS', level: 3, category: 'devops' },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}/5</span>
      </div>
      <div className="skill-bar-bg">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${(level / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const devopsSkills = skills.filter(skill => skill.category === 'devops');

  return (
    <div className="portfolio-section skills-section">
      <h2 className="section-title">Skills</h2>
      
      <div className="skills-container">
        <div className="skill-category">
          <h3 className="category-title">Frontend</h3>
          <div className="skills-list">
            {frontendSkills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
        
        <div className="skill-category">
          <h3 className="category-title">Backend</h3>
          <div className="skills-list">
            {backendSkills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
        
        <div className="skill-category">
          <h3 className="category-title">DevOps</h3>
          <div className="skills-list">
            {devopsSkills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;