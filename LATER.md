# LATER.md — Scope Parking Lot

Ideas and features explicitly deferred from v1. Add here freely; never add to code until a new session is planned for it.

## Deferred from BUILD_PLAN.md §8

- Blog / CMS
- Physics simulation
- Custom shaders / GLSL effects
- Intro animation (graph assembles on load)
- Analytics
- Custom domain
- Dark/light toggle (it's dark — that's the design)
- Kubera / family-business nodes (add when shippable)

## Session overflow (add as sessions run)

- **Reactive prefers-reduced-motion** — `prefersReducedMotion` is currently a static module-level check. Replace with a `useReducedMotion` hook (drei or react-spring) so toggling the OS setting after page load takes effect without a reload. (`Edge.jsx`, `GraphScene.jsx`)
- **Cursor flicker between adjacent nodes** — `onPointerOut` resets cursor to `default` before the next node's `onPointerOver` fires; causes a brief flash. Fix with a canvas-level pointer handler or ref-counted approach rather than per-mesh cursor management. (`ProjectNode.jsx`)
