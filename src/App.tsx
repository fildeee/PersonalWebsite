import { useEffect, useRef, useState } from 'react'
import './App.css'
import sunrisePreview from './assets/SunrisePreview.mov'
import gremlinPreview from './assets/gremlinpreview.mov'
import GremlinGrove from './components/GremlinGrove'

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function GithubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function GlobeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function DownloadIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <polyline points="7,10 12,15 17,10" />
      <path d="M5 19h14" />
    </svg>
  )
}

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  )
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

function ChevronIcon({ direction, size = 20 }: { direction: 'left' | 'right' | 'down'; size?: number }) {
  const points = direction === 'left' ? '15,6 9,12 15,18' : direction === 'right' ? '9,6 15,12 9,18' : '6,9 12,15 18,9'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={points} />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const navItems = ['about', 'experience', 'projects', 'contact']

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Django', 'Node.js',
  'Firebase', 'Supabase', 'SQL', 'REST APIs', 'AWS', 'Git / CI/CD', 'OpenAI API',
]

const experience = [
  {
    role: 'Programming & Robotics Instructor',
    date: 'Aug 2023 — present',
    company: 'Skill Samurai',
    desc: "Designed and delivered programming and robotics workshops with a focus on software engineering best practices, analytical thinking and problem solving across a diverse range of ages and experience levels.",
  },
  {
    role: 'Software Engineer / Consultant (Internship)',
    date: 'Nov 2024 — Feb 2025',
    company: 'IT Pals',
    desc: 'Delivered a production web application across a 9 week sprint by working across the full stack in React, Node.js and Firebase within an Agile team of 5 engineers, contributing to code reviews, CI/CD processes and structured delivery.',
  },
  {
    role: 'Software Engineer (Capstone)',
    date: 'Aug 2024 — Nov 2024',
    company: 'ASIGA',
    desc: "Developed algorithms for automatic support structure generation for 3D models across both STL and SLC file formats by researching Python 3D processing libraries and designing modular, reusable components.",
  },
]

const projects = [
  {
    name: 'Sunrise',
    desc: 'A conversation trainer, which helps people improve their eye contact and vocal projection by talking to avatars in different contexts.',
    stack: ['React', 'Node.js', 'Firebase', 'CSS'],
    site: 'https://sunshineapplication.pages.dev/',
    video: sunrisePreview,
  },
  {
    name: 'Gremlin Grove',
    desc: 'A dungeon crawler originally built in Java, ported to p5.js. Dodge gremlins, break bricks, and find the exit.',
    stack: ['p5.js', 'TypeScript', 'Java (original)'],
    playable: true,
    video: gremlinPreview,
  },
  {
    name: 'KirchhoffNet Toolbox',
    desc: 'A foundational platform for the research of KirchhoffNet neural networks, built around a physics-based device model. ',
    stack: ['Python', 'PyTorch', 'SciPy', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/fildeee/KirchoffNetToolbox',
  },
  {
    name: 'DOLMA',
    desc: 'An AI powered personal assistant with natural language calendar management, schedule optimisation and conflict resolution',
    stack: ['Python', 'React', 'OpenAI API', 'REST APIs'],
    repo: 'https://github.com/fildeee/ELEC5620_DOLMA',
  },
]

const EMAIL = 'masroor.muntasir@gmail.com'

function App() {
  const [active, setActive] = useState('about')
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [resumeJustClicked, setResumeJustClicked] = useState(false)
  const [resumeEverClicked, setResumeEverClicked] = useState(false)
  const [trackIndex, setTrackIndex] = useState(1)
  const [trackTransition, setTrackTransition] = useState(true)
  const [showGame, setShowGame] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const extendedProjects = [projects[projects.length - 1], ...projects, projects[0]]
  const activeProjectIndex = ((trackIndex - 1) % projects.length + projects.length) % projects.length

  const prevProject = () => setTrackIndex((i) => i - 1)
  const nextProject = () => setTrackIndex((i) => i + 1)

  const handleTrackTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (trackIndex === extendedProjects.length - 1) {
      setTrackTransition(false)
      setTrackIndex(1)
    } else if (trackIndex === 0) {
      setTrackTransition(false)
      setTrackIndex(projects.length)
    }
  }

  useEffect(() => {
    if (trackTransition) return
    const raf = requestAnimationFrame(() => setTrackTransition(true))
    return () => cancelAnimationFrame(raf)
  }, [trackTransition])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  useEffect(() => {
    if (!showGame) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGame(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showGame])

  useEffect(() => {
    const dot = cursorRef.current
    if (!dot) return
    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      dot.style.opacity = '1'
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = !!target.closest('a, button, [role="button"]')
      dot.classList.toggle('cursor-dot--pointer', isClickable)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      // clipboard permission denied — nothing to fall back to
    }
  }

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('section').forEach((el) => revealObserver.observe(el))

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    navItems.forEach((id) => {
      const el = document.getElementById(id)
      if (el) spyObserver.observe(el)
    })

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? scrollTop / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      revealObserver.disconnect()
      spyObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="site">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="cursor-dot" ref={cursorRef} />

      <nav>
        <div className="nav-inner">
          <span className="nav-logo">Masroor Muntasir</span>
          <div className="nav-links">
            {navItems.map((id) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
                {id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container">
      <div className="hero">
        <h1>Hi, I'm <span>Masroor</span>.<br />I build stuff.</h1>
        <p>I'm a software engineer who loves tinkering with things, and most days I'm somewhere between a React component and a Python script trying to make something work.</p>
        <div className="scroll-cue" aria-hidden="true">
          <ChevronIcon direction="down" size={26} />
        </div>
      </div>

      <section id="about">
        <p className="section-label">about</p>
        <p className="about-text">I graduated from the University of Sydney in January 2026 with Honours in Software Engineering, though most of what stuck came from actually building things and figuring out what makes them break. Outside of work, I like to train MMA, and mess around at the gym.</p>
        <div className="skills">
          {skills.map((skill, i) => (
            <span className="skill-tag" key={skill} style={{ transitionDelay: `${i * 35}ms` }}>
              {skill}
            </span>
          ))}
        </div>
        <div className="project-links">
          <span className="project-link-wrap" onMouseLeave={() => setResumeJustClicked(false)}>
            <a
              className="project-link"
              href="/Masroor-Muntasir-Resume.pdf"
              download
              aria-label="Download resume"
              onClick={() => {
                setResumeJustClicked(true)
                setResumeEverClicked(true)
              }}
            >
              <DownloadIcon size={16} />
            </a>
            <span className="copy-toast link-tooltip">
              {resumeJustClicked ? 'downloaded' : resumeEverClicked ? 'download resume again' : 'download resume'}
            </span>
          </span>
        </div>
      </section>

      <section id="experience">
        <p className="section-label">experience</p>
        {experience.map((job, i) => (
          <div className="exp-item" key={job.role} style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="exp-header">
              <span className="exp-role">{job.role}</span>
              <span className="exp-date">{job.date}</span>
            </div>
            <p className="exp-company">{job.company}</p>
            <p className="exp-desc">{job.desc}</p>
          </div>
        ))}
      </section>

      <section id="projects">
        <p className="section-label">projects</p>
        <div className="projects-carousel">
          <div className="carousel-stage">
            <button type="button" className="carousel-arrow carousel-arrow--prev" onClick={prevProject} aria-label="Previous project">
              <ChevronIcon direction="left" />
            </button>

            <div className="carousel-viewport">
              <div
                className="projects-track"
                style={{
                  transform: `translateX(-${trackIndex * 100}%)`,
                  transition: trackTransition ? undefined : 'none',
                }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {extendedProjects.map((project, i) => (
                  <div
                    className={`project-card${project.video ? ' project-card--media' : ''}`}
                    key={`${project.name}-${i}`}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    {project.video && (
                      <video className="project-video" src={project.video} autoPlay loop muted playsInline />
                    )}
                    <div className="project-card-content">
                      <p className="project-name">{project.name}</p>
                      <p className="project-desc">{project.desc}</p>
                      <div className="project-stack">
                        {project.stack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      {(project.site || project.repo || project.playable) && (
                        <div className="project-links">
                          {project.site && (
                            <a className="project-link" href={project.site} target="_blank" rel="noreferrer" aria-label={`${project.name} website`}>
                              <GlobeIcon size={16} />
                            </a>
                          )}
                          {project.repo && (
                            <a className="project-link" href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}>
                              <GithubIcon size={16} />
                            </a>
                          )}
                          {project.playable && (
                            <button type="button" className="project-link" onClick={() => setShowGame(true)} aria-label={`Play ${project.name}`}>
                              <PlayIcon size={16} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" className="carousel-arrow carousel-arrow--next" onClick={nextProject} aria-label="Next project">
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div className="carousel-dots">
            {projects.map((project, i) => (
              <button
                type="button"
                key={project.name}
                className={`carousel-dot${i === activeProjectIndex ? ' active' : ''}`}
                onClick={() => setTrackIndex(i + 1)}
                aria-label={`Go to ${project.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <p className="section-label">contact</p>
        <p className="contact-text">Always happy to talk about a project, work, or anything really. Reach out any time.</p>
        <div className="contact-links">
          <span className="contact-link-wrap">
            <button type="button" className="contact-link" onClick={handleCopyEmail} aria-label="Copy email address">
              <MailIcon />
            </button>
            <span className={`copy-toast${copied ? ' show' : ''}`}>copied</span>
          </span>
          <a className="contact-link" href="https://github.com/fildeee" target="_blank" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="contact-link" href="https://linkedin.com/in/masroormuntasir" target="_blank" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </section>

      </div>

      <footer>
        <div className="footer-inner">
          <p>designed & built by masroor | 2026</p>
        </div>
      </footer>

      {showGame && (
        <div className="game-modal-overlay" onClick={() => setShowGame(false)}>
          <div className="game-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="game-modal-close" onClick={() => setShowGame(false)} aria-label="Close game">
              <XIcon />
            </button>
            <GremlinGrove />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
