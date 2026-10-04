# ScaliaOS — scaabel.github.io

My portfolio, disguised as a tiny desktop operating system.

**ScaliaOS** is a fictional, dark, cozy-midnight developer workstation that
presents my resume as an interactive playground: draggable and resizable
windows, a working terminal, a project explorer, and a few hidden easter eggs.
It is built for a near-instant first impression — the desktop shell ships small
and every app lazy-loads on first use.

## Stack

React 19 · Vite · TypeScript · Zustand · Tailwind CSS v4 · lucide-react

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build        # typecheck + production build to dist/
npm run bundle:check # gzipped JS bundle report + budget gate
npm run preview      # preview the build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and deploys `dist/` to GitHub Pages. In the repository settings, set
**Pages → Source** to **GitHub Actions**.

## Try these

- Open the **Terminal** and run `help`.
- Drag a window to the screen edge to snap it; maximise by dragging to the top.
- `sudo hire sca`, `neofetch`, `cat secrets.txt`…
- There may be a cat living on the desktop. It likes attention.
- ↑ ↑ ↓ ↓ ← → ← → B A

Some eggs don't announce themselves.
