import './App.css'

function App() {
  return (
    <div className="site">
      <nav>
        <span className="nav-logo">Masroor Muntasir</span>
        <div className="nav-links">
          <a href="#about">about</a>
          <a href="#experience">experience</a>
          <a href="#projects">projects</a>
          <a href="#contact">contact</a>
        </div>
      </nav>

      <div className="hero">
        <h1>Hi, I'm <span>Masroor</span>.<br />I build things for the web.</h1>
        <p>Full-stack developer focused on building clean, fast, and user-friendly applications. I love turning ideas into real products.</p>
        <div className="hero-btns">
        </div>
      </div>

      <section id="about">
        <p className="section-label">about</p>
        <p className="about-text">I'm a developer with a passion for writing clean code and building things that people actually enjoy using. When I'm not coding, I'm probably exploring new tech, contributing to open source, or obsessing over keyboard shortcuts.</p>
        <div className="skills">
          <span className="skill-tag">React</span>
          <span className="skill-tag">TypeScript</span>
          <span className="skill-tag">Node.js</span>
          <span className="skill-tag">Python</span>
          <span className="skill-tag">PostgreSQL</span>
          <span className="skill-tag">Docker</span>
          <span className="skill-tag">AWS</span>
        </div>
      </section>

      <section id="experience">
        <p className="section-label">experience</p>
        <div className="exp-item">
          <div className="exp-header">
            <span className="exp-role">Frontend Developer</span>
            <span className="exp-date">2023 — present</span>
          </div>
          <p className="exp-company">Some Company</p>
          <p className="exp-desc">Built and maintained React applications, improved performance by 40%, and led the migration to TypeScript.</p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <span className="exp-role">Junior Developer</span>
            <span className="exp-date">2022 — 2023</span>
          </div>
          <p className="exp-company">Another Place</p>
          <p className="exp-desc">Developed internal tools and APIs, worked with Node.js and PostgreSQL, collaborated in an agile team.</p>
        </div>
      </section>

      <section id="projects">
        <p className="section-label">projects</p>
        <div className="projects-grid">
          <div className="project-card">
            <p className="project-name">Project One</p>
            <p className="project-desc">A short description of what this project does and why it's cool.</p>
            <div className="project-stack">
              <span>React</span><span>Node.js</span><span>Postgres</span>
            </div>
          </div>
          <div className="project-card">
            <p className="project-name">Project Two</p>
            <p className="project-desc">Another project with a short punchy description of the problem it solves.</p>
            <div className="project-stack">
              <span>Python</span><span>FastAPI</span><span>Docker</span>
            </div>
          </div>
          <div className="project-card">
            <p className="project-name">Project Three</p>
            <p className="project-desc">Something you built that you're proud of — keep it short and impactful.</p>
            <div className="project-stack">
              <span>TypeScript</span><span>AWS</span>
            </div>
          </div>
          <div className="project-card">
            <p className="project-name">Project Four</p>
            <p className="project-desc">Maybe an open source tool, a CLI, or a fun side project worth showing off.</p>
            <div className="project-stack">
              <span>Go</span><span>Redis</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <p className="section-label">contact</p>
        <p className="contact-text">I'm always open to new opportunities, collaborations, or just a chat. Feel free to reach out.</p>
        <div className="contact-links">
          <a className="contact-link" href="mailto:you@email.com">email</a>
          <a className="contact-link" href="https://github.com/fildeee" target="_blank">github</a>
          <a className="contact-link" href="#">linkedin</a>
          <a className="contact-link" href="#">twitter</a>
        </div>
      </section>

      <footer>
        <p>designed & built by masroor — 2026</p>
      </footer>
    </div>
  )
}

export default App