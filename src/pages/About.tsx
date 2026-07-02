export default function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About Me</h1>
        <p className="about-role">Junior Software Engineer</p>
      </div>

      <div className="about-summary">
        <p>
          I'm a software engineer with a background in Computer Science from
          Brunel University and hands-on experience across web development,
          game development, and applied machine learning. I work primarily in
          Java and Python, building with React, Flask, and Spring Boot to
          deliver robust, user-focused solutions.
        </p>
        <p>
          I'm particularly interested in applying AI and machine learning to
          real-world problems, from computer vision to language models, and
          enjoy working in agile teams to ship reliable software efficiently.
        </p>
      </div>

      <section className="about-section">
        <h2>Skills</h2>
        <div className="skill-groups">
          <div className="skill-group">
            <h3>Software Development</h3>
            <ul className="skill-tags">
              <li>Java</li>
              <li>Python</li>
              <li>JavaScript</li>
              <li>Git & GitHub</li>
              <li>Unit Testing</li>
              <li>Refactoring</li>
            </ul>
          </div>

          <div className="skill-group">
            <h3>Web Development</h3>
            <ul className="skill-tags">
              <li>React</li>
              <li>HTML/CSS</li>
              <li>Spring Boot</li>
              <li>Flask</li>
              <li>REST APIs</li>
              <li>Microservices</li>
            </ul>
          </div>

          <div className="skill-group">
            <h3>Databases</h3>
            <ul className="skill-tags">
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>SQL</li>
              <li>Data Modelling</li>
            </ul>
          </div>

          <div className="skill-group">
            <h3>AI & Machine Learning</h3>
            <ul className="skill-tags">
              <li>LLMs & NLP</li>
              <li>Hugging Face</li>
              <li>Transformers</li>
              <li>T5 Model</li>
            </ul>
          </div>

          <div className="skill-group">
            <h3>Game Development</h3>
            <ul className="skill-tags">
              <li>Unity</li>
              <li>2D Game Design</li>
              <li>Scripting</li>
            </ul>
          </div>

          <div className="skill-group">
            <h3>Ways of Working</h3>
            <ul className="skill-tags">
              <li>Agile</li>
              <li>Team Collaboration</li>
              <li>Client Communication</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Experience</h2>
        <div className="experience-list">
          <article className="experience-item">
            <div className="experience-header">
              <h3>
                Data Science / Machine Learning Intern{" "}
                <span>· Propmarker</span>
              </h3>
              <span className="experience-period">Jun – Sep 2025</span>
            </div>
            <ul className="experience-points">
              <li>
                Built a computer vision pipeline with Detectron2 to identify
                and analyse room layouts in floorplan images.
              </li>
              <li>
                Developed time series forecasting models to predict property
                prices from historical data.
              </li>
              <li>
                Fine-tuned a large language model for domain-specific
                analysis and information extraction.
              </li>
            </ul>
          </article>

          <article className="experience-item">
            <div className="experience-header">
              <h3>
                Gardener <span>· GP Garden Services</span>
              </h3>
              <span className="experience-period">Aug 2023 – Jun 2025</span>
            </div>
            <ul className="experience-points">
              <li>
                Delivered garden maintenance services for a diverse client
                base, building strong customer relationships.
              </li>
              <li>
                Coordinated logistics between the yard and customer
                properties to ensure punctual delivery.
              </li>
            </ul>
          </article>

          <article className="experience-item">
            <div className="experience-header">
              <h3>
                Car Garage Assistant <span>· K-Max Ltd</span>
              </h3>
              <span className="experience-period">Summer 2021 & 2022</span>
            </div>
            <ul className="experience-points">
              <li>Supported vehicle servicing, diagnostics, and repairs.</li>
              <li>
                Set up and configured internet routers to improve garage
                connectivity.
              </li>
              <li>Managed invoicing and estimates using Excel.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="about-section about-education">
        <h2>Education</h2>
        <p>BSc in Computer Science (2.1) — Brunel University London, 2023</p>
      </section>
    </div>
  );
}