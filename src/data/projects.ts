export interface Project {
  slug: string
  name: string
  tagline: string
  year: string
  role?: string
  stack: string[]
  link?: string
  featured?: boolean
  context: string
  approach: string[]
  decisions: string[]
  impact: string[]
  learnings: string[]
}

export const projects: Project[] = [
  {
    slug: 'pi-workflow',
    name: 'pi-workflow',
    tagline: 'My personal AI workflow — a collection of extensions for the Pi coding agent.',
    year: '2025',
    role: 'Creator & maintainer',
    stack: ['TypeScript', 'Node.js', 'Pi', 'Prompt Engineering'],
    link: 'https://github.com/scaabel/pi-workflow',
    featured: true,
    context:
      'I kept burning through tokens and hitting usage limits on Claude Code, so I went looking for a sustainable setup. I tried running Qwen 3.5 27b locally with llama.cpp, but tokens-per-second stayed a hardware bottleneck. After ruling out local LLMs for now, I found Pi — a minimal agent harness — learned what it could do via oh-my-pi, then rebuilt it my way as pi-workflow.',
    approach: [
      'Designed a small extension surface over Pi so workflows stay composable, readable, and easy to unit-test.',
      'Built only the pieces I actually needed: subagents, a planning mode, per-agent models, and a knowledge store.',
      'Structured the workflow around a plan → implement → verify loop so every change is checked, not guessed.',
      'Kept prompts and context deliberately small so the agent stays predictable and cheap to run.',
    ],
    decisions: [
      'Rejected Claude Code after repeatedly hitting token limits; the burn rate made it unsustainable for a daily loop.',
      'Tried Qwen 3.5 27b locally via llama.cpp with CPU/RAM offload — rejected when tokens/sec stayed a hardware bottleneck I couldn\u2019t clear.',
      'Deliberately reversed the usual “vanilla first” advice: learned on oh-my-pi first, then rebuilt vanilla with only the DX I wanted.',
      'Kept pi-workflow as extensions over vanilla Pi rather than a fork, so there is no lock-in.',
    ],
    impact: [
      'Went from token-limit burnout to a lean workflow that only runs the tools I use.',
      'My most active open-source project — pinned on GitHub and used daily.',
      'Gives other engineers a minimal base covering subagents, planning, per-agent models, and a knowledge store.',
    ],
    learnings: [
      '“Vanilla first” isn\u2019t always right — a framework taught me what was possible before I committed to building my own.',
      'Local LLMs are gated by hardware; measure tokens/sec before sinking time into optimization.',
      'Know exactly what you need (subagents, planning, per-agent models, knowledge) before writing extensions.',
    ],
  },
  {
    slug: 'ai-roster-scheduler',
    name: 'AI Roster Scheduler',
    tagline: 'First AI roster scheduler at Bookipi, built on OpenAI.',
    year: '2024',
    role: 'Full Stack Engineer (feature lead)',
    stack: ['Node.js', 'TypeScript', 'OpenAI', 'Zod'],
    featured: true,
    context:
      "Managers were spending 6–7 hours a week building rosters by hand — juggling each employee's availability, leaves, weekly hours, and pay rate to stay within compliance and budget. I built Bookipi's first AI roster scheduler to turn that into a one-shot generation.",
    approach: [
      'Integrated OpenAI to generate weekly and bi-weekly rosters from each user\u2019s availability, leaves, holidays, and role assignments.',
      'Kept the model\u2019s context minimal — operating hours, roles, and assignments as bullets — alongside the intended JSON output to stop hallucination.',
      'Validated and parsed every response with Zod, wired as a function/tool call so output was always typed and safe to use.',
      'Built a benchmark script that runs models and prompts and writes results to a markdown file, replacing manual Postman testing.',
    ],
    decisions: [
      'Started on OpenAI 4o-mini — roster generation needs processing, not creativity — then moved to gpt-5o-mini.',
      'Chose structured prompting plus Zod tool-call validation over fine-tuning: faster to ship and easier to keep honest.',
      'Automated benchmarking with a script after realising manual Postman testing was the bottleneck.',
    ],
    impact: [
      'Increased customer retention by 25%.',
      'Cut inference cost ~10% after switching to gpt-5o-mini with a more concise, direct prompt.',
      'Turned a 6–7 hour weekly chore into a one-shot generation.',
      'Left a reusable benchmark script that compares models and prompts into a markdown report.',
    ],
    learnings: [
      'Benchmarking LLMs and prompts is tedious — script it early and keep the output as a reference document.',
      'Minimal, bulleted context plus an explicit JSON schema is the cheapest way to prevent hallucination.',
      'A schema validator like Zod as the tool call turns an opaque model into a typed, trusted API.',
    ],
  },
  {
    slug: 'custom-recurrence',
    name: 'Custom Recurrence',
    tagline: 'A long-stalled scheduling feature with a genuinely hard date problem.',
    year: '2024',
    role: 'Full Stack Engineer',
    stack: ['TypeScript', 'Node.js', 'React'],
    context:
      "A 'custom recurrence' feature had stalled for more than 6 months — the only developer working on it left, and I inherited it. The core is generating upcoming dates correctly across timezones for daily, weekly, bi-weekly, and monthly rules.",
    approach: [
      'Took over the stalled feature and untangled the existing scheduling model before finishing it.',
      'Built upcoming-date generation for daily / weekly / bi-weekly / monthly frequencies.',
      'Made dates timezone-safe with moment-timezone: compute in the business\u2019s local zone, add the start time, then convert to UTC for storage.',
      'Covered the edge cases earlier attempts missed and wrote e2e tests; became sole maintainer of the scheduling package.',
    ],
    decisions: [
      "Stored timestamps in UTC but reconstructed local wall-clock time with moment-timezone — `moment.tz(date, zone).startOf('day').add(startTime, 'hours')` then converted to UTC — so occurrences land on the correct local day.",
      'Still open: the Nth weekday of the upcoming month (e.g. 2nd Monday). Months vary 28/30/31 days, which makes pinning the exact Nth-week day the one case I have yet to crack cleanly.',
    ],
    impact: [
      'Unblocked a feature that had been stuck for 6+ months after its only developer left.',
      'Became the sole maintainer of the scheduling package.',
      'Internal tool — success measured in reliability and test coverage, not vanity metrics.',
    ],
    learnings: [
      'Timezone-safe date math is the hard 20% of scheduling — reconstruct local wall-clock time, never do math on naive UTC timestamps.',
      'Recurrence rules are only as simple as their calendar: Nth-weekday-of-month gets complicated because months are 28/30/31 days.',
    ],
  },
  {
    slug: 'scaliaos',
    name: 'ScaliaOS',
    tagline: 'This portfolio — a tiny desktop OS in the browser.',
    year: '2026',
    role: 'Designer & developer',
    stack: ['React', 'Vite', 'TypeScript', 'Zustand', 'Tailwind CSS'],
    featured: true,
    context:
      "ScaliaOS is this portfolio — a fictional desktop operating system in the browser. I built it to stand out, to dogfood the stack I enjoy, and to make the first impression instant: the shell paints fast and every window is part of the resume.",
    approach: [
      'Built a window manager from scratch in React + Zustand: drag, resize, snap, minimise/maximise, and z-order focus.',
      'Lazy-loaded every app, the terminal registry, and each easter egg so the entry chunk stays around 10 KB gzipped.',
      'Defined a full design system as Tailwind v4 @theme tokens — a cozy-midnight palette with a lime terminal-green accent.',
      'Added personality: a working terminal, a project explorer, a cat mascot, and hidden easter eggs.',
    ],
    decisions: [],
    impact: [
      'Near-instant first paint: ~10 KB gz entry chunk, ~93 KB gz total JS.',
      'The portfolio is itself a live demo of my React/TypeScript/architecture skills.',
      'A playground I can keep extending with new windows and easter eggs.',
    ],
    learnings: [],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
