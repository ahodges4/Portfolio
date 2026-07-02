import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../data/projects";

export default function Home() {
  const featuredProjects = projects.filter(
    (project: Project) => project.featured
  );

  const skills = [
    "Python",
    "TypeScript",
    "React",
    "Flask",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Node.js",
    "Machine Learning",
    "Computer Vision",
    "REST APIs",
    "WebSockets",
    "Docker",
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <span className="hero-tagline">
          Software Engineer · AI · Full Stack
        </span>

        <h1>Adam Hodges</h1>

        <p className="hero-description">
          I build AI-driven systems, full-stack applications, and data
          processing tools with a focus on real-world impact.
        </p>

        <div className="cta-group">
          <a className="btn btn-primary" href="/projects">
            View Projects
          </a>
          <a className="btn btn-secondary" href="#contact">
            Contact Me
          </a>
        </div>
      </section>

      <hr className="home-divider" />

      {/* FEATURED PROJECTS */}
      <section className="home-section">
        <h2>Featured Projects</h2>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <hr className="home-divider" />

      {/* SKILLS / STACK */}
      <section className="home-section">
        <h2>Skills</h2>

        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <hr className="home-divider" />

      {/* QUICK CONTACT */}
      <section className="home-section" id="contact">
        <h2>Contact</h2>

        <ul className="contact-list">
          <li>
            Email: <a href="mailto:adamhodges02@yahoo.co.uk">adamhodges02@yahoo.co.uk</a>
          </li>
          <li>
            GitHub:{" "}
            <a href="https://github.com/ahodges4" target="_blank" rel="noopener noreferrer">
              github.com/ahodges4
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/a-hodges4/" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/a-hodges4
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}