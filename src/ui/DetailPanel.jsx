const PANEL_STYLES = `
  .detail-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 380px;
    height: 100%;
    z-index: 150;
    background: rgba(11, 14, 20, 0.96);
    border-left: 1px solid var(--edge);
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .detail-panel.open {
    transform: translateX(0);
  }

  .detail-panel__close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--edge);
    border-radius: 6px;
    color: var(--text-dim);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }

  .detail-panel__close:hover {
    color: var(--text);
    border-color: var(--text-dim);
  }

  .detail-panel__close:focus-visible {
    color: var(--text);
    border-color: var(--node-l1);
    outline: 2px solid var(--node-l1);
    outline-offset: 2px;
  }

  .detail-panel__header {
    padding-right: 40px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .detail-panel__title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--text);
    line-height: 1.2;
  }

  .detail-panel__tagline {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-dim);
    line-height: 1.5;
  }

  .detail-panel__badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    color: #0B0E14;
    width: fit-content;
  }

  .detail-panel__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .detail-panel__tag {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-dim);
    border: 1px solid var(--edge);
    border-radius: 4px;
    padding: 2px 8px;
  }

  .detail-panel__section-label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 8px;
  }

  .detail-panel__highlights {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 0;
    list-style: none;
  }

  .detail-panel__highlight {
    display: flex;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--text);
    line-height: 1.5;
  }

  .detail-panel__highlight::before {
    content: '—';
    color: var(--text-dim);
    flex-shrink: 0;
  }

  .detail-panel__story {
    font-family: var(--font-body);
    font-size: 13px;
    font-style: italic;
    color: var(--text-dim);
    line-height: 1.65;
  }

  .detail-panel__actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 4px;
  }

  .detail-panel__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 18px;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.15s;
    width: 100%;
  }

  .detail-panel__btn:hover {
    opacity: 0.85;
  }

  .detail-panel__btn--primary {
    background: var(--node-l3);
    color: #0B0E14;
    border: none;
  }

  .detail-panel__btn--secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--edge);
  }

  .detail-panel__btn--secondary:hover {
    border-color: var(--text-dim);
    opacity: 1;
  }

  .detail-panel__btn:focus-visible {
    outline: 2px solid var(--node-l1);
    outline-offset: 2px;
  }

  .detail-panel__divider {
    border: none;
    border-top: 1px solid var(--edge);
    margin: 0;
  }
`;

const LAYER_COLORS = {
  1: 'var(--node-l1)',
  2: 'var(--node-l2)',
  3: 'var(--node-l3)',
};

const LAYER_LABELS = {
  1: 'RAG',
  2: 'Tool Use',
  3: 'Multi-Agent',
};

export default function DetailPanel({ project, onClose }) {
  const layerColor = project ? (LAYER_COLORS[project.layer] || 'var(--text-dim)') : 'var(--text-dim)';

  return (
    <>
      <style>{PANEL_STYLES}</style>
      <div
        className={`detail-panel${project ? ' open' : ''}`}
        role="complementary"
        aria-label="Project details"
        aria-hidden={!project}
      >
        {project && (
          <>
            <button
              className="detail-panel__close"
              onClick={onClose}
              aria-label="Close panel"
            >
              ×
            </button>

            {/* Header: title + tagline */}
            <div className="detail-panel__header">
              <h2 className="detail-panel__title">{project.title}</h2>
              <p className="detail-panel__tagline">{project.tagline}</p>
            </div>

            {/* Layer badge */}
            <div>
              <span
                className="detail-panel__badge"
                style={{ background: layerColor }}
              >
                {LAYER_LABELS[project.layer] ?? `Layer ${project.layer}`}
              </span>
            </div>

            <hr className="detail-panel__divider" />

            {/* Stack tags */}
            {project.stack && project.stack.length > 0 && (
              <div>
                <p className="detail-panel__section-label">Stack</p>
                <div className="detail-panel__stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="detail-panel__tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <p className="detail-panel__section-label">Highlights</p>
                <ul className="detail-panel__highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="detail-panel__highlight">{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Story */}
            {project.story && (
              <div>
                <p className="detail-panel__section-label">Story</p>
                <p className="detail-panel__story">{project.story}</p>
              </div>
            )}

            {/* Action buttons — status-gated */}
            {project.status === 'live' && project.liveUrl && (
              <div className="detail-panel__actions">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-panel__btn detail-panel__btn--primary"
                >
                  Open live app
                </a>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-panel__btn detail-panel__btn--secondary"
                  >
                    View code
                  </a>
                )}
              </div>
            )}

            {project.status === 'repo-only' && project.repoUrl && (
              <div className="detail-panel__actions">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-panel__btn detail-panel__btn--primary"
                >
                  View code
                </a>
              </div>
            )}

            {/* case-study: no buttons rendered */}
          </>
        )}
      </div>
    </>
  );
}
