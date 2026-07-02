import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const sortedProjects = [...projects].sort((a, b) => {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }
  return b.priority - a.priority;
});

export default function Projects() {
  return (
    <div className="projects">
      <div className="projects-header">
        <h1>Projects</h1>
        <p className="projects-intro">
          A collection of things I've built, from AI-driven tools to
          full-stack applications and data processing systems.
        </p>
      </div>

      <div className="project-grid">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}