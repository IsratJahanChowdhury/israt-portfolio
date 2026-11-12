import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import './App.css'
import heroImage from './assets/hero.png'
import { portfolio } from './data/portfolio'

const cvPdfUrl = '/Israt_Jahan_Chowdhury_CV.pdf'
const cvFileName = 'Israt_Jahan_Chowdhury_CV.pdf'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

const skillLabels: Record<string, string> = {
  programming: 'Programming',
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  ai: 'AI / Machine Learning',
  tools: 'Tools',
  dataAndOffice: 'Data & Office',
  networkingAndOperatingSystems: 'Networking & OS',
  softSkills: 'Soft skills',
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false)
  const cvMenuRef = useRef<HTMLDivElement>(null)
  const cvTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isCvMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !cvMenuRef.current?.contains(event.target)) {
        setIsCvMenuOpen(false)
      }
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCvMenuOpen(false)
        cvTriggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCvMenuOpen])

  useEffect(() => {
    if (isCvMenuOpen) {
      cvMenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
    }
  }, [isCvMenuOpen])

  const handleCvMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return

    event.preventDefault()
    const menuItems = [...(cvMenuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])]
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement)
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? menuItems.length - 1
        : (currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + menuItems.length) % menuItems.length

    menuItems[nextIndex]?.focus()
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)

    window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a href="#home" className="brand" aria-label="Israt Jahan Chowdhury, home">
          <span className="brand-mark">IJC</span>
          <span className="brand-name">{portfolio.name}</span>
        </a>
        <nav id="primary-navigation" className={`nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="hero-index">PORTFOLIO <span>01 — 06</span></p>
            <p className="eyebrow">{portfolio.title}</p>
            <h1>Israt Jahan <span>Chowdhury</span></h1>
            <p className="summary">{portfolio.summary}</p>
            <div className="cta-row">
              <a href="#projects" className="button primary-button">
                Explore projects <span aria-hidden="true">↗</span>
              </a>
              <a href="#contact" className="button secondary-button">
                Contact me
              </a>
            </div>
            <div className="hero-meta">
              <span className="hero-location">{portfolio.location}</span>
              <span className="availability"><span className="status-dot" aria-hidden="true" />{portfolio.contact.availability}</span>
            </div>
          </div>

          <figure className="hero-visual" aria-label="Abstract layered technology visual with the initials IJC">
            <div className="hero-visual-grid" aria-hidden="true" />
            <span className="hero-visual-index">SYSTEMS / 01</span>
            <img src={heroImage} alt="" className="hero-stack" />
            <div className="hero-monogram" aria-hidden="true">
              <span>IJC</span>
              <small>SOFTWARE · AI/ML</small>
            </div>
            <figcaption className="hero-visual-footer">
              <span>Research-led engineering</span>
              <span>Dhaka · Bangladesh</span>
            </figcaption>
          </figure>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="eyebrow">A little about my work</p>
            <h2>Building useful things, grounded in engineering.</h2>
          </div>

          <div className="about-copy">
            <p className="about-lead">{portfolio.intro}</p>
            <div className="about-detail">
              <p>Across academic team projects, I have worked on backend reservation flows, patient-facing systems, rental workflows, and relational database design.</p>
              <p>My research interests span computer vision, climate-informed prediction, and healthcare AI. I am currently exploring graph-based methods for software vulnerability detection.</p>
            </div>
          </div>
        </section>

        <section className="section skills-section" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="eyebrow">Technical range</p>
            <h2 id="skills-title">Tools for thoughtful engineering.</h2>
          </div>

          <div className="skills-grid">
            {Object.entries(portfolio.skills).map(([category, items]) => (
              <article key={category} className="skill-row">
                <h3>{skillLabels[category] ?? category}</h3>
                <p>{items.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Project work, research, and service.</h2>
          </div>

          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <article key={item.role} className="timeline-item">
                <span className="timeline-index">0{index + 1}</span>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <p className="role-company">{item.company}</p>
                    <span>{item.period}</span>
                  </div>
                  <h3>{item.role}</h3>
                  <ul>
                    {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
              </article>
            ))}
            <article className="timeline-item volunteer-item">
              <span className="timeline-index">03</span>
              <div className="timeline-content">
                <div className="timeline-header">
                  <p className="role-company">Volunteer experience</p>
                  <span>2026</span>
                </div>
                <h3>{portfolio.volunteer.role} — AIMD Symposium 2026</h3>
                <p>{portfolio.volunteer.details}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="section project-section">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Projects with a practical point of view.</h2>
          </div>

          <div className="project-showcase">
            {portfolio.projects.map((project, index) => (
              <article key={project.name} className={`project-entry${index === 0 ? ' project-featured' : ''}`}>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-copy">
                  <p className="project-kicker">{index === 0 ? 'Featured project · Backend' : 'Academic · Team project'}</p>
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-contributions">
                    {project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                  </ul>
                  <p className="project-stack">{project.stack.join(' · ')}</p>
                </div>
                {index === 0 && (
                  <div className="project-diagram" aria-label="Reservation workflow: request, validate, persist">
                    <span className="diagram-label">RESERVATION FLOW</span>
                    <div className="diagram-step"><span>01</span> Request</div>
                    <div className="diagram-connector" />
                    <div className="diagram-step"><span>02</span> Validate</div>
                    <div className="diagram-connector" />
                    <div className="diagram-step"><span>03</span> Persist</div>
                    <span className="diagram-foot">NESTJS / TYPEORM / POSTGRESQL</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="section research-section">
          <div className="section-heading">
            <p className="eyebrow">Research & publications</p>
            <h2>Questions explored through data and systems.</h2>
          </div>

          <div className="research-layout">
            <div className="research-card">
              <p className="research-aside-label">AREAS OF INTEREST</p>
              <h3>Applied AI/ML</h3>
              <p>Computer vision, machine learning, climate-informed prediction, healthcare AI, and graph-based software analysis.</p>
              <a className="text-link" href={portfolio.contact.researchgate} target="_blank" rel="noreferrer">ResearchGate <span aria-hidden="true">↗</span></a>
            </div>

            <div className="research-list">
              {portfolio.research.map((item, index) => (
                <article key={item.title} className="research-entry">
                  <span className="research-index">0{index + 1}</span>
                  <div className="research-entry-content">
                    <div className="research-meta">
                      <span className={`research-status status-${item.status.toLowerCase().replaceAll(' ', '-')}`}>{item.status}</span>
                      {item.authorPosition && <span>{item.authorPosition}</span>}
                      <span>{item.venue}</span>
                    </div>
                    <h3>
                      {item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.title}<span aria-hidden="true"> ↗</span></a> : item.title}
                    </h3>
                    <p>{item.summary}</p>
                    {item.detail && (
                      <details className="research-details">
                        <summary>Methods and evaluation</summary>
                        <p>{item.detail}</p>
                      </details>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="section-heading">
            <p className="eyebrow">Education & recognition</p>
            <h2>Academic foundations.</h2>
          </div>

          <div className="education-editorial">
            <div className="education-records">
              {portfolio.education.map((item) => (
                <article key={item.institution} className="education-record">
                  <p className="education-date">Expected graduation · {item.expectedGraduation}</p>
                  <h3>{item.degree}</h3>
                  <p className="institution">{item.institution}</p>
                  <dl>
                    <div><dt>Major</dt><dd>{item.major}</dd></div>
                    <div><dt>Minor</dt><dd>{item.minor}</dd></div>
                    <div><dt>CGPA</dt><dd>{item.cgpa}</dd></div>
                  </dl>
                </article>
              ))}
            </div>

            <div className="foundations-column">
              <div>
                <p className="research-aside-label">PROFESSIONAL FOUNDATIONS</p>
                <ul className="foundation-list">
                  {portfolio.certifications.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="research-aside-label">OUTSIDE WORK</p>
                <p>{portfolio.interests.join(' · ')}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Have a thoughtful challenge in mind?</h2>
          </div>

          <div className="contact-layout">
            <div className="contact-card">
              <p className="contact-lead">I’m open to collaboration, internships, and software engineering opportunities.</p>
              <a className="contact-email" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}<span aria-hidden="true">↗</span></a>
              <a className="contact-phone" href={`tel:${portfolio.contact.phone}`}>{portfolio.contact.phone}</a>
              <p className="contact-location">{portfolio.contact.location}</p>

              <div className="social-row" aria-label="Social links">
                <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" className="link-button">
                  LinkedIn
                </a>
                <a href={portfolio.contact.github} target="_blank" rel="noreferrer" className="link-button">
                  GitHub
                </a>
                <a href={portfolio.contact.researchgate} target="_blank" rel="noreferrer" className="link-button">
                  ResearchGate
                </a>
                <div className="cv-menu-wrap" ref={cvMenuRef}>
                  <button
                    type="button"
                    className="link-button cv-trigger"
                    ref={cvTriggerRef}
                    aria-controls="cv-menu"
                    aria-expanded={isCvMenuOpen}
                    aria-haspopup="menu"
                    onClick={() => setIsCvMenuOpen((isOpen) => !isOpen)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setIsCvMenuOpen(true)
                      }
                    }}
                  >
                    CV
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="cv-chevron">
                      <path d="m4 6 4 4 4-4" />
                    </svg>
                  </button>
                  <div
                    id="cv-menu"
                    className="cv-menu"
                    role="menu"
                    aria-label="CV options"
                    hidden={!isCvMenuOpen}
                    onKeyDown={handleCvMenuKeyDown}
                  >
                    <a href={cvPdfUrl} target="_blank" rel="noreferrer" role="menuitem" tabIndex={-1} onClick={() => setIsCvMenuOpen(false)}>
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="cv-option-icon">
                        <path d="M11 3h6v6M17 3l-8 8" />
                        <path d="M15 11v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                      </svg>
                      <span>View CV</span>
                    </a>
                    <a href={cvPdfUrl} download={cvFileName} role="menuitem" tabIndex={-1} onClick={() => setIsCvMenuOpen(false)}>
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="cv-option-icon">
                        <path d="M10 3v10m0 0 4-4m-4 4-4-4" />
                        <path d="M4 13v4h12v-4" />
                      </svg>
                      <span>Download CV</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Tell me about your project or opportunity" rows={5} required />
              </label>
              <button type="submit" className="button primary-button">
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 {portfolio.name}</p>
        <p className="footer-note">{portfolio.interests.join(' · ')}</p>
        <div className="footer-links">
          <a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={cvPdfUrl} download={cvFileName}>Download CV ↓</a>
        </div>
      </footer>
    </div>
  )
}

export default App
