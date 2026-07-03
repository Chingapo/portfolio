# Portfolio Build Plan — "The Agent Graph"

> **How to use this file:** This is the single source of truth for the build. Drop it in the repo root.
> Start every Claude Code session with: *"Read BUILD_PLAN.md. We are on Session N. Do only that session's scope, one step at a time, confirm with me before each file you create."*
> Any Claude model can execute from this file cold. Do not let a session expand scope beyond its Definition of Done — new ideas go in the LATER.md list, not into code.

---

## 1. Concept (the one-paragraph brief)

The portfolio **is** an agent orchestration graph. Projects are nodes floating in 3D space, connected by animated edges. The Layer 1 → Layer 2 → Layer 3 progression forms the spine; hackathons and client work branch off it. Hovering a node pulses it and shows a tagline; clicking flies the camera in and opens a 2D detail panel. Small particles flow along edges (data moving through the pipeline). Every project added to `projects.json` becomes a new node automatically — the graph visibly grows with the career. Audience: recruiters and hiring managers for AI engineering roles. The page's single job: make "this person architects agentic systems" undeniable within 10 seconds.

**Signature element:** the graph itself, with particle flow along edges. Everything else stays quiet and disciplined.

---

## 2. Requirements (install before Session 1)

| Requirement | Check command | Notes |
|---|---|---|
| Node.js LTS (v20+) | `node -v` | Install from nodejs.org if missing |
| npm | `npm -v` | Ships with Node |
| Git | `git --version` | Already have |
| GitHub account | — | Already have (Chingapo) |
| Vercel account | — | Sign up free with GitHub login at vercel.com (2 min) |
| Modern browser | — | Chrome/Edge, WebGL2 enabled (default) |

**Windows/PowerShell notes:**
- If npm scripts fail with execution policy errors: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- UTF-8: `$OutputEncoding = [Text.Encoding]::UTF8` if any console text renders wrong (known issue from hackathon prep).

**Core dependencies (installed in Session 1, listed here so nothing is guessed later):**
```
npm create vite@latest agent-graph-portfolio -- --template react
npm i three @react-three/fiber @react-three/drei
```
`@react-three/drei` provides OrbitControls, camera fly-to helpers, Html overlays, and Line — do not hand-roll these.

---

## 3. Architecture

**Principle: content and rendering are separate layers.** The frontend is a pure function of `src/data/projects.json`. Adding a project must never require touching a component.

```
agent-graph-portfolio/
├── BUILD_PLAN.md              ← this file
├── LATER.md                   ← scope parking lot (create in Session 1)
├── src/
│   ├── data/
│   │   └── projects.json      ← THE source of truth
│   ├── scene/
│   │   ├── GraphScene.jsx     ← Canvas, camera, lights, controls
│   │   ├── ProjectNode.jsx    ← one node: sphere/geometry + label + hover state
│   │   ├── Edge.jsx           ← curve between two nodes + particle flow
│   │   └── layout.js          ← pure function: projects.json → node positions
│   ├── ui/
│   │   ├── Hero.jsx           ← name, thesis line, key stat
│   │   ├── DetailPanel.jsx    ← 2D overlay, renders selected project from JSON
│   │   └── FallbackGrid.jsx   ← 2D grid for weak devices / reduced-motion
│   ├── App.jsx
│   └── styles.css             ← design tokens as CSS variables
```

**Key architectural decisions (rationale included so any model understands, not just obeys):**

1. **`layout.js` is a pure function** `(projects) → positions`. Positions derive from `layer` (x-axis progression) and `branch` (y/z spread). No hardcoded coordinates. This is why adding JSON entries "just works." Same principle as the June hackathon: structural guarantees beat manual placement.
2. **Selection state lives in React (App-level `useState`), not in the 3D scene.** The scene reads state; the panel reads state. One source of truth — same reasoning as `state_sync.py` in CareerBot.
3. **Edges are declared in data**, not inferred: each project lists `connects: ["id", ...]`. Explicit beats clever.
4. **Reduced motion / weak GPU:** respect `prefers-reduced-motion`; provide a visible "Grid view" toggle that swaps GraphScene for FallbackGrid. Recruiters on old laptops still get the content.

---

## 4. Design tokens (do not improvise new colors/fonts mid-build)

**Palette — color encodes information, not decoration.** Node color = capability layer, so the graph itself reads as a progression:

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B0E14` | Deep graphite-indigo background (space the graph floats in) |
| `--node-l1` | `#4FD6BE` | Layer 1 nodes (RAG) — cool teal |
| `--node-l2` | `#7C8CF8` | Layer 2 nodes (tool use) — periwinkle violet |
| `--node-l3` | `#FFB454` | Layer 3 nodes (multi-agent) — signal amber |
| `--edge` | `#3B4261` | Edges at rest — muted slate |
| `--text` | `#E6E8EF` | Primary text |
| `--text-dim` | `#8A91A8` | Secondary text, labels |

Amber deliberately marks the highest layer AND human-approval markers in the CareerBot node detail — the human-in-the-loop is the warm element in the machine. That's the story told in color.

**Typography:**
- Display: **Clash Display** (via Fontshare, free) — headings, hero. Used with restraint.
- Body: **Inter** — panel prose.
- Utility: **JetBrains Mono** — node labels, stack tags, metrics. The terminal is part of the identity; mono type carries it.

**Motion budget:** particle flow on edges (ambient), node hover pulse, camera fly-to on click. That's all. No scroll-jacking, no intro animation in v1 (parked in LATER.md).

---

## 5. Data schema + real content (paste-ready)

`src/data/projects.json` — v1 ships with these five entries. **Verify URLs/repo links before shipping; placeholders are marked.**

```json
{
  "meta": {
    "name": "Arjun Pareek",
    "thesis": "I architect agentic AI systems — multi-agent pipelines with human-in-the-loop control.",
    "keyStat": { "value": "#14 / 1,773", "label": "HackerRank Orchestrate, June 2026 (top 0.8%)" },
    "links": { "github": "https://github.com/Chingapo", "linkedin": "VERIFY_URL", "x": "VERIFY_URL", "email": "VERIFY" }
  },
  "projects": [
    {
      "id": "rag-interview-assistant",
      "title": "RAG Interview Assistant",
      "tagline": "Retrieval-augmented interview prep grounded in your own resume",
      "layer": 1,
      "branch": "spine",
      "status": "repo-only",
      "repoUrl": "VERIFY_GITHUB_URL",
      "liveUrl": null,
      "stack": ["ChromaDB", "all-MiniLM-L6-v2", "Anthropic API", "Python"],
      "connects": ["interview-prep-orchestrator"],
      "highlights": [
        "~500-char chunking strategy — sharper vectors than full-document embeddings",
        "Local embedding model chosen for zero training-data privacy exposure"
      ],
      "story": "Layer 1 of a deliberate capability ladder: retrieval before orchestration. Markdown case study here — what it does, one architecture decision, one thing learned."
    },
    {
      "id": "interview-prep-orchestrator",
      "title": "Multi-Agent Interview Prep",
      "tagline": "Tool-using agents built on raw Anthropic tool use — no framework",
      "layer": 2,
      "branch": "spine",
      "status": "live",
      "repoUrl": "VERIFY_GITHUB_URL",
      "liveUrl": "https://interview-agent-22.streamlit.app",
      "stack": ["Anthropic tool use", "Tavily", "Streamlit", "Python"],
      "connects": ["careerbot"],
      "highlights": [
        "Orchestration loop hand-built: model signals tool_use and stops; my layer executes and returns results",
        "Full message-history management across every API call"
      ],
      "story": "Built without LangChain on purpose — to understand the stop_reason mechanics frameworks hide."
    },
    {
      "id": "careerbot",
      "title": "CareerBot",
      "tagline": "Multi-agent job pipeline with human-in-the-loop approval gates",
      "layer": 3,
      "branch": "spine",
      "status": "case-study",
      "repoUrl": null,
      "liveUrl": null,
      "stack": ["LangGraph", "Anthropic API", "Playwright", "SQLite", "GitHub API", "Streamlit"],
      "connects": [],
      "highlights": [
        "Three cooperating agents: resume management, ATS job discovery (Greenhouse/Lever/Ashby), per-job tailoring",
        "interrupt/Command(resume) approval gates; two-node split so expensive work never re-fires on resume",
        "SQLite-backed checkpointing; centralized state restoration layer"
      ],
      "story": "Layer 3: the system that applies architecture lessons from Layers 1–2. Human approval is a first-class graph node, not an afterthought."
    },
    {
      "id": "claim-verifier",
      "title": "Damage Claim Verifier",
      "tagline": "Multi-modal claim verification — #14 of 1,773 (top 0.8%)",
      "layer": 3,
      "branch": "hackathon",
      "status": "case-study",
      "repoUrl": null,
      "liveUrl": null,
      "stack": ["Claude (vision)", "Pydantic", "Python"],
      "connects": ["careerbot"],
      "highlights": [
        "Two-stage perception/decision architecture — model observes, Python decides",
        "Schema-enforced structured output via Pydantic tool calls",
        "Truth hierarchy enforced architecturally: history is not a parameter to the verdict function",
        "A/B-tested prompting; single-pass beat reasoning-first on both accuracy and speed"
      ],
      "story": "HackerRank Orchestrate, June 2026. Highest Judge Interview score in the top 8."
    },
    {
      "id": "support-triage-agent",
      "title": "RAG Support Triage Agent",
      "tagline": "Modular support triage — ranked 234 / 1,349",
      "layer": 1,
      "branch": "hackathon",
      "status": "case-study",
      "repoUrl": null,
      "liveUrl": null,
      "stack": ["ChromaDB", "sentence-transformers", "Claude Haiku", "Python"],
      "connects": ["claim-verifier"],
      "highlights": ["Escalation routing: similarity threshold + LLM self-assessment signal"],
      "story": "HackerRank Orchestrate, May 2026. The run that set up June's top-1% finish — include the delta between the two as the narrative."
    }
  ]
}
```

**Status → rendering contract:**
- `"live"` → primary button "Open live app" + repo link
- `"repo-only"` → primary button "View code"
- `"case-study"` → panel shows the story + highlights, no dead links. Never show a disabled/broken button.

---

## 6. Sessions (one Claude Code session each; do not merge sessions)

### Session 1 — Scaffold + de-risk (one evening)
1. `npm create vite@latest` scaffold (React template), install three/R3F/drei.
2. Create `LATER.md`, commit `BUILD_PLAN.md` into repo root. `.gitignore` includes `.env`, `node_modules`, `dist`.
3. Render one spinning cube in a Canvas with OrbitControls. Run `npm run dev`, confirm in browser.
4. Push to GitHub (public repo: `agent-graph-portfolio`), import to Vercel, confirm the cube is live on a vercel.app URL.
5. Add `src/data/projects.json` with the content above; fill every `VERIFY_*` field.

**Definition of Done:** spinning cube deployed on Vercel + final projects.json committed. *Deploying the toy first means every later session ships to a working pipeline.*

### Session 2 — Static graph (one evening)
1. Write `layout.js`: x = layer (1→3 left-to-right), spine on center axis, `branch: "hackathon"` offset below, deterministic small jitter for organic feel.
2. `ProjectNode.jsx`: sphere (or icosahedron) colored by layer token, JetBrains Mono label via drei `Html`.
3. `Edge.jsx`: drei `Line` or `QuadraticBezierCurve3` between connected nodes, `--edge` color.
4. Replace cube with `GraphScene`. All five nodes + edges visible, orbitable.

**Definition of Done:** the full static graph deployed. No animation yet. Resist adding it — that's Session 3.

### Session 3 — Life (the "cool" session, 2–3 hours)
1. Hover: node scales ~1.3× with spring (drei/`useFrame` lerp), label brightens, cursor pointer.
2. Particles: 3–5 small dots per edge animating along the curve via `useFrame`. Subtle. This is ambient, not fireworks.
3. Click: camera flies to frame the node (drei `CameraControls.setLookAt` with transition), sets `selectedProject` state.
4. `prefers-reduced-motion`: particles off, camera cuts instead of flies.

**Definition of Done:** hover pulse + particle flow + camera fly-to, deployed. **Highest scope-creep risk of the whole build is here.** Physics, sound, shader effects → LATER.md.

### Session 4 — Detail panel + fallback (one evening)
1. `DetailPanel.jsx`: slides in from the right when `selectedProject` set. Renders title, tagline, stack tags (mono), highlights, story, buttons per the status contract. Close = camera returns to overview.
2. `FallbackGrid.jsx`: plain responsive card grid from the same JSON. Toggle button "Grid view" top-right; auto-default to grid if WebGL unavailable.
3. Keyboard: Esc closes panel, focus states visible.

**Definition of Done:** click any node → panel with correct content and working links; grid view functional. Deployed.

### Session 5 — Hero + ship (one evening)
1. `Hero.jsx` overlaid on the scene top-left: name (Clash Display), thesis line, keyStat in mono. Small legend: three colored dots = Layer 1/2/3 — teaches the graph's color language in one glance.
2. Contact/links row (GitHub, LinkedIn, X, email) bottom-left.
3. Meta tags: title, description, OG image (screenshot of the graph), favicon.
4. Pass over mobile: graph still orbits via touch; grid view offered prominently on small screens.
5. Final deploy. Share URL on LinkedIn/X per your content rules (hashtags on final post only).

**Definition of Done:** the URL is in your resume header and `resume.json`.

---

## 7. Adding a future project (the plug-and-play contract)

1. Add one entry to `projects.json` (schema in §5). Choose `layer`, `branch`, `connects`, `status`.
2. Commit, push. Vercel auto-deploys.
3. That's it. If step 3 ever requires editing a component, that's an architecture bug — fix the component, not the data.

## 8. Explicitly out of scope for v1 (pre-seeded LATER.md)

Blog, CMS, physics simulation, custom shaders, intro animation, analytics, custom domain, dark/light toggle (it's dark, that's the design), Kubera/family-business nodes (add when shippable).
