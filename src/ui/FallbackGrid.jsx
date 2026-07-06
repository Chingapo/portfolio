import projectsData from '../data/projects.json'

const LAYER_COLORS = {
  1: 'var(--node-l1)',
  2: 'var(--node-l2)',
  3: 'var(--node-l3)',
}

const STYLES = `
  .fg-overlay {
    position: fixed;
    inset: 0;
    background: var(--bg);
    overflow-y: auto;
    z-index: 100;
    transition: padding-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fg-overlay--panel-open {
    padding-right: 380px;
  }

  @media (max-width: 600px) {
    .fg-overlay--panel-open {
      padding-right: 0;
    }
  }

  .fg-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 190px 32px 80px;
  }

  @media (max-width: 600px) {
    .fg-container {
      padding: 160px 16px 110px;
    }
  }

  .fg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .fg-card {
    background: #13161F;
    border: 1px solid var(--edge);
    border-radius: 8px;
    padding: 0;
    cursor: pointer;
    transition: box-shadow 0.2s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .fg-card:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45), 0 1px 6px rgba(0, 0, 0, 0.3);
  }

  .fg-card:focus-visible {
    outline: 2px solid var(--node-l1);
    outline-offset: 2px;
  }

  .fg-layer-bar {
    height: 4px;
    width: 100%;
    flex-shrink: 0;
  }

  .fg-card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
  }

  .fg-title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
  }

  .fg-tagline {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--text-dim);
    line-height: 1.5;
  }

  .fg-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 2px;
  }

  .fg-tag {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-dim);
    background: rgba(59, 66, 97, 0.4);
    border: 1px solid var(--edge);
    border-radius: 4px;
    padding: 2px 8px;
    white-space: nowrap;
  }

  .fg-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 8px;
  }

  .fg-btn {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .fg-btn:hover {
    opacity: 0.82;
  }

  .fg-btn:focus-visible {
    outline: 2px solid var(--node-l1);
    outline-offset: 2px;
  }

  .fg-btn-primary {
    background: var(--node-l2);
    color: #0B0E14;
  }

  .fg-btn-secondary {
    background: transparent;
    color: var(--text-dim);
    border: 1px solid var(--edge);
  }
`

function CardActions({ project }) {
  const { status, liveUrl, repoUrl } = project

  if (status === 'case-study') return null
  if (!liveUrl && !repoUrl) return null

  return (
    <div className="fg-actions" onClick={(e) => e.stopPropagation()}>
      {status === 'live' && liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fg-btn fg-btn-primary"
        >
          Open live app
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`fg-btn ${status === 'repo-only' ? 'fg-btn-primary' : 'fg-btn-secondary'}`}
        >
          View code
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project, onSelectProject }) {
  const layerColor = LAYER_COLORS[project.layer] ?? 'var(--text-dim)'

  return (
    <div
      className="fg-card"
      onClick={() => onSelectProject(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelectProject(project)
        }
      }}
    >
      <div
        className="fg-layer-bar"
        style={{ background: layerColor }}
        aria-hidden="true"
      />
      <div className="fg-card-body">
        <div className="fg-title">{project.title}</div>
        <div className="fg-tagline">{project.tagline}</div>
        {project.stack && project.stack.length > 0 && (
          <div className="fg-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="fg-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
        <CardActions project={project} />
      </div>
    </div>
  )
}

export default function FallbackGrid({ onSelectProject, panelOpen }) {
  const projects = projectsData.projects ?? []

  return (
    <div className={`fg-overlay${panelOpen ? ' fg-overlay--panel-open' : ''}`}>
      <style>{STYLES}</style>
      <div className="fg-container">
        <div className="fg-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
