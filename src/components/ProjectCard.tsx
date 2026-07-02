import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

const statusClass: Record<Project["status"], string> = {
  Completed: "status-completed",
  "In Progress": "status-in-progress",
  Archived: "status-archived",
};

export default function ProjectCard({ project }: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = project.images ?? [];
  const hasMultiple = images.length > 1;

  const showPrev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const showNext = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // Escape closes the lightbox, arrow keys cycle images, and the page
  // behind it stops scrolling while it's open.
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft" && hasMultiple) showPrev();
      if (e.key === "ArrowRight" && hasMultiple) showNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, hasMultiple]);

  return (
    <div className={`project-card${project.featured ? " featured" : ""}`}>
      {images.length > 0 && (
        <>
          <div className="project-card-image-wrapper">
            <button
              className="project-card-image-button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label={`View larger image of ${project.title}`}
            >
              <img
                className="project-card-image"
                src={images[currentIndex]}
                alt={`${project.title} screenshot ${currentIndex + 1} of ${images.length}`}
                loading="lazy"
              />
            </button>

            {hasMultiple && (
              <div className="project-card-image-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`project-card-image-dot${index === currentIndex ? " active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    aria-label={`Show image ${index + 1} of ${images.length}`}
                  />
                ))}
              </div>
            )}
          </div>

          {isLightboxOpen && (
            <div
              className="image-lightbox-overlay"
              onClick={() => setIsLightboxOpen(false)}
            >
              <button
                className="image-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              {hasMultiple && (
                <button
                  className="image-lightbox-arrow image-lightbox-arrow-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}

              <img
                className="image-lightbox-image"
                src={images[currentIndex]}
                alt={`${project.title} screenshot ${currentIndex + 1} of ${images.length}`}
                onClick={(e) => e.stopPropagation()}
              />

              {hasMultiple && (
                <button
                  className="image-lightbox-arrow image-lightbox-arrow-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>
              )}

              {hasMultiple && (
                <div className="image-lightbox-dots">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`image-lightbox-dot${index === currentIndex ? " active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      aria-label={`Show image ${index + 1} of ${images.length}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <h2>{project.title}</h2>

      <p className="project-description">{project.shortDescription}</p>

      <div className="project-meta">
        <span className={`project-status ${statusClass[project.status]}`}>
          {project.status}
        </span>
        <span className="project-year">{project.year}</span>
      </div>

      <ul className="project-tech">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="project-links">
        {project.demoType === "interactive" && project.demoUrl && (
          <>
            <Link to={project.demoUrl}>Try the Demo</Link>
            {project.links.length > 0 && (
              <span className="project-link-separator">·</span>
            )}
          </>
        )}
        {project.links.map((link, index) => (
          <span key={link.url} style={{ display: "contents" }}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {index < project.links.length - 1 && (
              <span className="project-link-separator">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}