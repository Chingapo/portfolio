import projectsData from '../data/projects.json'

const { meta } = projectsData

const LEGEND = [
  { color: 'var(--node-l1)', label: 'RAG' },
  { color: 'var(--node-l2)', label: 'Tool Use' },
  { color: 'var(--node-l3)', label: 'Multi-Agent' },
]

export default function Hero() {
  return (
    <>
      <header className="hero" aria-label="Portfolio introduction">
        <p className="hero__name">{meta.name}</p>
        <p className="hero__thesis">{meta.thesis}</p>
        <p className="hero__stat">
          <span className="hero__stat-value">{meta.keyStat.value}</span>
          <span className="hero__stat-label">{meta.keyStat.label}</span>
        </p>
        <nav className="hero__legend" aria-label="Node color key">
          {LEGEND.map(({ color, label }) => (
            <span key={label} className="hero__legend-item">
              <span
                className="hero__legend-dot"
                style={{ background: color }}
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </nav>
      </header>

      <footer className="contact" aria-label="Contact links">
        {meta.links.github && !meta.links.github.startsWith('VERIFY') && (
          <a href={meta.links.github} target="_blank" rel="noopener noreferrer" className="contact__link">
            GitHub
          </a>
        )}
        {meta.links.linkedin && !meta.links.linkedin.startsWith('VERIFY') && (
          <a href={meta.links.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link">
            LinkedIn
          </a>
        )}
        {meta.links.x && !meta.links.x.startsWith('VERIFY') && (
          <a href={meta.links.x} target="_blank" rel="noopener noreferrer" className="contact__link">
            X
          </a>
        )}
        {meta.links.email && !meta.links.email.startsWith('VERIFY') && (
          <a href={`mailto:${meta.links.email}`} className="contact__link">
            Email
          </a>
        )}
        <a href="/resume.pdf" download className="contact__link">
          The Resume
        </a>
      </footer>
    </>
  )
}
