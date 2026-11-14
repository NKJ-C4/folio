import React, { Component } from 'react';





import './App.css';
import resumeData from './resumeData';
import ElectronPortrait from './components/ElectronPortrait';

const Arrow = () => <span aria-hidden="true">↗</span>;

const ExternalLink = ({ href, children, className = '' }) => (
  <a className={className} href={href} target="_blank" rel="noopener noreferrer">
    {children} <Arrow />
  </a>
);

class App extends Component {
  state = { menuOpen: false };

  closeMenu = () => this.setState({ menuOpen: false });

  render() {
    const data = resumeData;

    return (
      <div className="site-shell">
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="site-header">
          <div className="container nav-wrap">
            <a className="brand" href="#top" onClick={this.closeMenu} aria-label="Nishant Jha, home">
              NKJ<span>.</span>
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={this.state.menuOpen}
              onClick={() => this.setState({ menuOpen: !this.state.menuOpen })}
            >
              <span />
              <span />
            </button>

            <nav className={this.state.menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
              <a href="#work" onClick={this.closeMenu}>Work</a>
              <a href="#experience" onClick={this.closeMenu}>Experience</a>
              <a href="#capabilities" onClick={this.closeMenu}>Capabilities</a>
              <a href="#projects" onClick={this.closeMenu}>Projects</a>
            </nav>

            <ExternalLink className="nav-cta" href={data.linkedinId}>Let's connect</ExternalLink>
          </div>
        </header>

        <main id="main">
          <section className="hero container" id="top">
            <div className="hero-copy">
              <div className="availability"><i /> Full stack &amp; cloud engineer · Pune, India</div>
              <h1>I build the<br /><em>whole system.</em></h1>
              <p className="hero-lead">{data.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
                <ExternalLink className="button button-secondary" href={data.resumeLink}>View résumé</ExternalLink>
              </div>
            </div>

            <ElectronPortrait name={data.name} />

            <div className="hero-current">
              <span className="section-index">NOW</span>
              <p><strong>Building at Optum</strong> — internal platforms, automation, and developer experiences for teams operating at scale.</p>
            </div>
          </section>

          <section className="impact-strip" aria-label="Career impact">
            <div className="container metrics-grid">
              {data.metrics.map(metric => (
                <div className="metric" key={metric.value}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
              <p className="metric-note">Engineering choices matter most when they make someone else's work simpler.</p>
            </div>
          </section>

          <section className="section container" id="work">
            <div className="section-heading">
              <div>
                <span className="section-index">01 / SELECTED WORK</span>
                <h2>Useful software,<br />measurable outcomes.</h2>
              </div>
              <p>Selected problems I’ve helped solve across platforms, products, and emerging technology. Internal work is described without proprietary detail.</p>
            </div>

            <div className="case-grid">
              {data.caseStudies.map((item, index) => (
                <article className={'case-card case-' + (index + 1)} key={item.title}>
                  <div className="case-topline">
                    <span>0{index + 1}</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="case-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <ul className="tag-list" aria-label="Technologies used">
                      {item.technologies.map(technology => <li key={technology}>{technology}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section experience-section" id="experience">
            <div className="container">
              <div className="section-heading compact">
                <div>
                  <span className="section-index">02 / EXPERIENCE</span>
                  <h2>The path so far.</h2>
                </div>
                <p>From frontend foundations to owning systems across application, platform, delivery, and cloud layers.</p>
              </div>

              <div className="timeline">
                {data.experience.map((job, index) => (
                  <article className="timeline-row" key={job.company}>
                    <div className="timeline-number">0{index + 1}</div>
                    <time>{job.period}</time>
                    <div className="job-summary">
                      <h3>{job.company}</h3>
                      <span>{job.role}</span>
                    </div>
                    <p>{job.summary}</p>
                  </article>
                ))}
              </div>

              <div className="education-note">
                <span>EDUCATION</span>
                <p><strong>B.Tech, Information Technology</strong> · Gautam Buddha University, School of ICT · 2022</p>
              </div>
            </div>
          </section>

          <section className="section container" id="capabilities">
            <div className="section-heading compact">
              <div>
                <span className="section-index">03 / CAPABILITIES</span>
                <h2>Across the stack.</h2>
              </div>
              <p>I’m at my best where product thinking and engineering depth overlap.</p>
            </div>

            <div className="capability-grid">
              {data.capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.skills.join(' · ')}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section projects-section" id="projects">
            <div className="container">
              <div className="section-heading compact">
                <div>
                  <span className="section-index">04 / PERSONAL PROJECTS</span>
                  <h2>Built to keep learning.</h2>
                </div>
                <ExternalLink className="text-link" href={data.githubUrl}>More on GitHub</ExternalLink>
              </div>

              <div className="project-grid">
                {data.projects.map(project => (
                  <article className="project-card" key={project.name}>
                    <div className="project-image">
                      <img src={project.image} alt="" loading="lazy" />
                      <span>{project.type}</span>
                    </div>
                    <div className="project-copy">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div>
                        <ExternalLink href={project.url}>Live site</ExternalLink>
                        <ExternalLink href={project.repo}>Source</ExternalLink>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="contact-section container" id="contact">
            <div className="contact-panel">
              <span className="section-index">05 / GET IN TOUCH</span>
              <h2>Have an interesting<br />engineering problem?</h2>
              <p>I’m always open to thoughtful conversations about products, platforms, and collaboration.</p>
              <ExternalLink className="button contact-button" href={data.linkedinId}>Start a conversation</ExternalLink>
            </div>
          </section>
        </main>

        <footer className="site-footer container">
          <div><a className="brand" href="#top">NKJ<span>.</span></a><p>Full stack thinking.<br />Cloud-scale delivery.</p></div>
          <div className="footer-links">
            <ExternalLink href={data.linkedinId}>LinkedIn</ExternalLink>
            <ExternalLink href={data.githubUrl}>GitHub</ExternalLink>
            <ExternalLink href={data.stackOverflowUrl}>Stack Overflow</ExternalLink>
          </div>
          <div className="footer-meta">
            <a href="#top">Back to top ↑</a>
            <span>© {new Date().getFullYear()} Nishant Kumar Jha</span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
