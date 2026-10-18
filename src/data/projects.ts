export interface Project {
  slug: string
  name: string
  tagline: string
  year: string
  status?: string
  role?: string
  stack: string[]
  link?: string
  linkLabel?: string
  featured?: boolean
  diagram?: string
  snippet?: { file: string; code: string }
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
    tagline: 'My personal AI workflow, a collection of extensions for the Pi coding agent.',
    year: '2025',
    role: 'Creator & maintainer',
    diagram: 'pi-workflow',
    stack: ['TypeScript', 'Node.js', 'Pi', 'Prompt Engineering'],
    link: 'https://github.com/scaabel/pi-workflow',
    featured: true,
    snippet: {
      file: 'pi-workflow/src/index.ts',
      code: `import type { Extension } from '@pi/core'

export const workflow: Extension = {
  name: 'pi-workflow',
  setup(pi) {
    pi.tool('subagent', subagentTool)
    pi.mode('plan', planMode)
  },
}`,
    },
    context:
      'I kept burning through tokens and hitting usage limits on Claude Code, so I went looking for a sustainable setup. I tried running Qwen 3.5 27b locally with llama.cpp, but tokens-per-second stayed a hardware bottleneck. After ruling out local LLMs for now, I found Pi, a minimal agent harness. I learned what it could do via oh-my-pi, then rebuilt it my way as pi-workflow.',
    approach: [
      'Designed a small extension surface over Pi so workflows stay composable, readable, and easy to unit-test.',
      'Built only the pieces I actually needed: subagents, a planning mode, per-agent models, and a knowledge store.',
      'Structured the workflow around a plan → implement → verify loop so every change is checked, not guessed.',
      'Kept prompts and context deliberately small so the agent stays predictable and cheap to run.',
    ],
    decisions: [
      'Rejected Claude Code after repeatedly hitting token limits; the burn rate made it unsustainable for a daily loop.',
      'Tried Qwen 3.5 27b locally via llama.cpp with CPU/RAM offload, but rejected it when tokens/sec stayed a hardware bottleneck I couldn\u2019t clear.',
      'Deliberately reversed the usual “vanilla first” advice: learned on oh-my-pi first, then rebuilt vanilla with only the DX I wanted.',
      'Kept pi-workflow as extensions over vanilla Pi rather than a fork, so there is no lock-in.',
    ],
    impact: [
      'Went from token-limit burnout to a lean workflow that only runs the tools I use.',
      'My most active open-source project, pinned on GitHub and used daily.',
      'Gives other engineers a minimal base covering subagents, planning, per-agent models, and a knowledge store.',
    ],
    learnings: [
      '“Vanilla first” isn\u2019t always right. A framework taught me what was possible before I committed to building my own.',
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
    diagram: 'ai-roster-scheduler',
    stack: ['Node.js', 'TypeScript', 'OpenAI', 'Zod'],
    featured: true,
    snippet: {
      file: 'ai-roster-scheduler/src/roster.schema.ts',
      code: `import { z } from 'zod'

const Roster = z.object({
  shifts: z.array(z.object({
    staffId: z.string(),
    role: z.string(),
    start: z.string().datetime(),
    end: z.string().datetime(),
  })),
})

// function/tool call keeps the model's output typed
const roster = Roster.parse(await generateRoster(context))`,
    },
    context:
      "Managers were spending 6 to 7 hours a week building rosters by hand, juggling each employee's availability, leaves, weekly hours, and pay rate to stay within compliance and budget. I built Bookipi's first AI roster scheduler to turn that into a one-shot generation.",
    approach: [
      'Integrated OpenAI to generate weekly and bi-weekly rosters from each user\u2019s availability, leaves, holidays, and role assignments.',
      'Kept the model\u2019s context minimal. Operating hours, roles, and assignments went in as bullets, alongside the intended JSON output to stop hallucination.',
      'Validated and parsed every response with Zod, wired as a function/tool call so output was always typed and safe to use.',
      'Built a benchmark script that runs models and prompts and writes results to a markdown file, replacing manual Postman testing.',
    ],
    decisions: [
      'Started on OpenAI 4o-mini since roster generation needs processing, not creativity, then moved to gpt-5o-mini.',
      'Chose structured prompting plus Zod tool-call validation over fine-tuning: faster to ship and easier to keep honest.',
      'Automated benchmarking with a script after realising manual Postman testing was the bottleneck.',
    ],
    impact: [
      'Increased customer retention by 25%.',
      'Cut inference cost ~10% after switching to gpt-5o-mini with a more concise, direct prompt.',
      'Turned a 6 to 7 hour weekly chore into a one-shot generation.',
      'Left a reusable benchmark script that compares models and prompts into a markdown report.',
    ],
    learnings: [
      'Benchmarking LLMs and prompts is tedious. Script it early and keep the output as a reference document.',
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
    diagram: 'custom-recurrence',
    stack: ['TypeScript', 'Node.js', 'React'],
    snippet: {
      file: 'custom-recurrence/src/occurrence.ts',
      code: `import moment from 'moment-timezone'

function occurrence(date: Date, zone: string, startTime: number) {
  return moment
    .tz(date, zone)
    .startOf('day')
    .add(startTime, 'hours')
    .utc()
    .toDate()
}`,
    },
    context:
      "A 'custom recurrence' feature had stalled for more than 6 months. The only developer working on it left, and I inherited it. The core is generating upcoming dates correctly across timezones for daily, weekly, bi-weekly, and monthly rules.",
    approach: [
      'Took over the stalled feature and untangled the existing scheduling model before finishing it.',
      'Built upcoming-date generation for daily / weekly / bi-weekly / monthly frequencies.',
      'Made dates timezone-safe with moment-timezone: compute in the business\u2019s local zone, add the start time, then convert to UTC for storage.',
      'Covered the edge cases earlier attempts missed and wrote e2e tests; became sole maintainer of the scheduling package.',
    ],
    decisions: [
      "Stored timestamps in UTC but reconstructed local wall-clock time with moment-timezone, `moment.tz(date, zone).startOf('day').add(startTime, 'hours')` then converted to UTC, so occurrences land on the correct local day.",
      'Still open: the Nth weekday of the upcoming month (e.g. 2nd Monday). Months vary 28/30/31 days, which makes pinning the exact Nth-week day the one case I have yet to crack cleanly.',
    ],
    impact: [
      'Unblocked a feature that had been stuck for 6+ months after its only developer left.',
      'Became the sole maintainer of the scheduling package.',
      'Internal tool, so success is measured in reliability and test coverage, not vanity metrics.',
    ],
    learnings: [
      'Timezone-safe date math is the hard 20% of scheduling. Reconstruct local wall-clock time, never do math on naive UTC timestamps.',
      'Recurrence rules are only as simple as their calendar: Nth-weekday-of-month gets complicated because months are 28/30/31 days.',
    ],
  },
  {
    slug: 'scaliaos',
    name: 'ScaliaOS',
    tagline: 'This portfolio, a tiny desktop OS in the browser.',
    year: '2026',
    role: 'Designer & developer',
    diagram: 'scaliaos',
    stack: ['React', 'Vite', 'TypeScript', 'Zustand', 'Tailwind CSS'],
    featured: true,
    snippet: {
      file: 'src/store/os.ts',
      code: `openApp: (app, opts) => {
  const existing = get().windows.find((w) => w.app === app)
  if (existing) {
    get().focus(existing.id)
    return existing.id
  }
  const win = makeWindow(app, opts)
  set({ windows: [...get().windows, win] })
  return win.id
}`,
    },
    context:
      "ScaliaOS is this portfolio, a fictional desktop operating system in the browser. I built it to stand out, to dogfood the stack I enjoy, and to make the first impression instant: the shell paints fast and every window is part of the resume.",
    approach: [
      'Built a window manager from scratch in React + Zustand: drag, resize, snap, minimise/maximise, and z-order focus.',
      'Lazy-loaded every app, the terminal registry, and each easter egg so the entry chunk stays around 10 KB gzipped.',
      'Defined a full design system as Tailwind v4 @theme tokens, a cozy-midnight palette with a lime terminal-green accent.',
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
  {
    slug: 'kerb',
    name: 'Kerb',
    tagline:
      'Set a reminder before a trip. It fires the moment you connect or disconnect from your car.',
    year: '2026',
    role: 'Creator & developer',
    diagram: 'kerb',
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Hilt', 'Glance', 'Android Auto'],
    link: 'https://github.com/scaabel/kerb',
    snippet: {
      file: 'app/src/main/kotlin/com/arievscalia/kerb/service/CarConnectionService.kt',
      code: `private fun observeCarConnection() {
    val carConnection = CarConnection(this)
    carConnection.type.observeForever { connectionType ->
        val connected =
            connectionType == CarConnection.CONNECTION_TYPE_PROJECTION
        if (connected && !isConnected) {
            isConnected = true
            onCarConnected()
        } else if (!connected && isConnected) {
            isConnected = false
            onCarDisconnected()
        }
    }
}`,
    },
    context:
      'I kept leaving grocery bags, my wallet, and other things behind in the car. Rather than rely on memory, I built Kerb, an Android app that watches my car connection (Android Auto or a known head-unit pairing) and reminds me of the things I flagged before the trip, at the exact moment I enter or exit.',
    approach: [
      'Built a foreground CarConnectionService that observes the CarConnection API and treats a projection connection as “in the car”.',
      'On connect it starts a Room-backed trip and posts an “Add reminder?” notification; on disconnect it ends the trip, computes the duration, and surfaces pending reminders.',
      'Modeled reminders as trip children with a LEAVING / BOTH trigger, a completion state, and a foreign key with cascade delete.',
      'Surfaced state in three places: a Compose home screen with a live session timer and swipe-to-delete reminders, a trip-history screen, and a Glance home-screen widget.',
    ],
    decisions: [
      'Detected the car through the car-app CarConnection API (CONNECTION_TYPE_PROJECTION) instead of Bluetooth MAC matching. One signal covers both Android Auto and known head-unit connections.',
      'Modeled reminders as trip children with a LEAVING / BOTH trigger so a reminder fires only on the trip it belongs to, and can also fire on entry when useful.',
      'Kept monitoring alive with a foreground service typed connectedDevice, START_STICKY, and a BootReceiver, so it survives backgrounding and reboots.',
      'Chose Glance for the home-screen widget so connected state and pending reminders are visible without opening the app.',
    ],
    impact: [
      'Solves a real daily friction: reminders fire exactly when I connect or disconnect from the car, not on a timer.',
      'Exercises a full Android stack in one app: Hilt DI, Room persistence, Compose UI, and a Glance widget.',
      'Clean single-module codebase that is easy to keep extending, e.g. with location-based triggers later.',
    ],
    learnings: [
      'CarConnection’s projection type gives connect/disconnect events without touching native Android Auto templates.',
      'A foreground service with the right type plus a boot receiver is the reliable way to keep a state monitor alive on Android.',
      'Modeling reminders as children of a trip (with cascade) makes “what did I flag for this drive?” trivial to answer.',
    ],
  },
  {
    slug: 'autonomous-agentic-coding',
    name: 'Autonomous Agentic Coding',
    tagline:
      'A multi-agent AI software development system that coordinates planning, design, implementation, validation, and review.',
    year: '2026',
    status: 'In Progress',
    role: 'Creator & developer',
    stack: ['TypeScript', 'Node.js', 'AI agents', 'Git', 'Playwright'],
    link: 'https://github.com/scaabel/autonomous-agentic-coding',
    context:
      'Developing a multi-agent AI software development system to coordinate feature planning, design, implementation, validation, and review.',
    approach: [
      'Designed a human-in-the-loop workflow that lets developers review and approve plans before implementation.',
      'Structured execution around isolated Git worktrees, static validation, automated testing, and AI-assisted code review.',
      'Modeled task ownership, dependency tracking, and execution artifacts to improve traceability and reduce unintended changes.',
    ],
    decisions: [],
    impact: [],
    learnings: [],
  },
  {
    slug: 'dotfiles',
    name: 'Developer Environment Automation',
    tagline:
      'A portable development environment configuration for macOS, Debian/Ubuntu, and Arch Linux.',
    year: '2026',
    status: 'Ongoing',
    role: 'Creator & maintainer',
    stack: ['Bash', 'Zsh', 'Neovim', 'tmux', 'Ghostty', 'GNU Stow'],
    link: 'https://github.com/scaabel/dotifles',
    context:
      'Maintaining a portable development environment configuration so a new machine is one reproducible setup away.',
    approach: [
      'Created an installation script that detects the operating system and package manager, installs development tools, and links configurations using GNU Stow.',
      'Incorporated backup handling for existing configuration files and reproducible Neovim plugin versions.',
      'Consolidated terminal, shell, editor, and multiplexer configurations to simplify environment setup on new machines.',
    ],
    decisions: [],
    impact: [],
    learnings: [],
  },
  {
    slug: 'receiping',
    name: 'Receip.ing',
    tagline:
      'An expense-tracking PWA with AI-assisted receipt data extraction.',
    year: '2026',
    status: 'Prototype',
    role: 'Creator & developer',
    stack: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'Prisma',
      'OpenAI API',
      'Zod',
      'Tailwind CSS',
    ],
    link: 'http://receip.ing/',
    linkLabel: 'Live site',
    context:
      'Building an expense-tracking progressive web application with AI-assisted receipt data extraction.',
    approach: [
      'Designed structured AI responses using schema validation to support reliable extraction of receipt information.',
      'Planned data persistence and receipt storage using Supabase, with Prisma for database access.',
      'Focused on a mobile-friendly experience and Malaysian Ringgit (MYR) as the default currency.',
    ],
    decisions: [],
    impact: [],
    learnings: [],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
