export interface Role {
  company: string
  title: string
  period: string
  location: string
  stack: string[]
  bullets: string[]
  current?: boolean
}

export const summary =
  'Self-taught software engineer with 7+ years building scalable web applications across the full stack — from Laravel and Vue monoliths to Node.js, TypeScript, and React services. I specialize in server architecture, API performance (query optimization, caching, queuing), and refactoring legacy codebases using SOLID, TDD, and DDD. I care about clean, decoupled, well-tested code, and I like mentoring teams and raising coding standards.'

export const experience: Role[] = [
  {
    company: 'Bookipi',
    title: 'Full Stack Engineer',
    period: 'Sep 2023 — Present',
    location: 'Remote',
    stack: [
      'Node.js',
      'TypeScript',
      'React',
      'Python',
      'MongoDB',
      'Temporal',
      'OpenAI'
    ],
    current: true,
    bullets: [
      'Involved in the migration of the codebase from AngularJS to React, improving maintainability and scalability.',
      "Shipped the company's first AI roster scheduler on OpenAI's API, lifting customer retention by 25%.",
      'Improved the AI tool by benchmarking models on cost, token usage, and accuracy, and by strengthening prompts with structured JSON output validated via Zod — reducing cost and response time.',
      'Built cron and background jobs as Temporal workflows with signaling for reliable scheduled processing.',
      'Completed "custom recurrence", a feature previously stalled for 6+ months across 3 developers, and became sole maintainer of the scheduling package.',
      'Increased onboarding adoption by 50% with a 7-step flow and a reusable "highlight overlay" component.',
      'Cut TTI by 10% through loading states, server rendering, and lazy loading, after removing unnecessary React rerenders found with Chrome/React DevTools.',
      'Partnering cross-team on subscription handling and integrating the app with the internal auth module.',
      'Held a 95% QA pass rate, wrote e2e tests, and surfaced at least two edge cases per feature during grooming.',
      'Developed and integrated with the payments team to handle monetization with all critical scenarios covered.',
      "Built a recurring roster scheduling workflow through Temporal's cron"
    ]
  },
  {
    company: 'Deux Alpha Tech',
    title: 'Tech Lead',
    period: 'Jun 2023 — Sep 2023',
    location: 'Remote',
    stack: ['Vue 3', 'TypeScript', 'NestJS', 'Laravel'],
    bullets: [
      'Refactored Laravel 7 → 10 and PHP 7.4 → 8.2 with little to no breaking changes.',
      'Set up Vue 3 with TypeScript and Inertia.js; migrated jQuery/Blade views to Vue 3.',
      'Built an encryption/decryption microservice with NestJS + jose, deployed on Vercel.',
      'Set up CI/CD with Bitbucket Pipelines to run unit tests and verify frontend bundling.',
      'Reduced the JavaScript bundle via Vue 3 dynamic imports and lazy loading.',
      'Hardened security by enforcing HSTS and upgrading all apps to TLS 1.3 (Cloudflare + Runcloud).',
      'Documented a feature-branching and atomic-commit Git workflow; ran standups and unblocked the team.',
      'Coordinated an outsourced team and 3rd-party integrations to ship within the given timeline.',
      'Reported blockers and solutions to the CTO and kept affected departments updated.',
      'Improve user experience throughout the whole 8 hours of Potong Royong by being on standby to fix bugs reported by users during the event.'
    ]
  },
  {
    company: 'Vin Asia',
    title: 'Senior Software Engineer',
    period: 'Jun 2022 — Jun 2023',
    location: 'Cyberjaya',
    stack: ['React', 'Next.js', 'Laravel', 'Nx', 'Docker'],
    bullets: [
      'Set up a monorepo with Nx, React, Tailwind, Storybook, and Laravel.',
      'Built a shared React + Tailwind UI library to improve code reuse.',
      'Introduced Next.js with React Query, React Hook Form, Zustand, and Zod.',
      'Containerized the Laravel and Next.js apps with Docker/docker-compose and a shared-network shell script.',
      'Set up CI/CD with GitHub Actions and pm2-based deployment.',
      'Trained the team on Laravel and on sustainable Git usage.'
    ]
  },
  {
    company: 'WorkSmartly',
    title: 'Software Engineer',
    period: 'Jul 2021 — May 2022',
    location: 'Bandar Sri Damansara',
    stack: ['SvelteKit', 'Laravel', 'MySQL'],
    bullets: [
      "Planned and executed a server-architecture improvement that cut the server's cost by 45%.",
      'Optimized SQL queries, reducing API response time from 20 seconds to ~100–200 ms.',
      'Implemented CI/CD with GitHub Actions for linting, static analysis, and unit testing.',
      'Removed hard-coded secrets and updated outdated packages, reducing security risk.',
      'Set up a multi-tenant Laravel project and deployed it to production.',
      'Introduced unit testing, ran code reviews, and documented the coding standard.',
      'Trained the team on Scrum and set up Jira projects and workflows.'
    ]
  },
  {
    company: 'Supplycart Technology',
    title: 'Junior Software Engineer',
    period: 'Feb 2020 — Jul 2021',
    location: 'Petaling Jaya',
    stack: ['Vue', 'Laravel', 'Elasticsearch', 'Inertia.js'],
    bullets: [
      'Migrated the frontend framework from AngularJS to Vue.',
      'Implemented test-driven development while building features.',
      'Applied DDD, SOLID, KISS, and DRY for easier maintenance and decoupling.',
      'Implemented multi-tenancy and event sourcing for versioning and audit trails.',
      'Worked with Elasticsearch to improve search across large datasets.',
      'Adopted Inertia.js, maintained team open-source projects, and helped refactor for regional expansion.',
      'Ran daily standups, sprint reviews, and retrospectives with the Product Owner.'
    ]
  },
  {
    company: 'Supplycart Technology',
    title: 'Software Engineer Intern',
    period: 'Jul 2019 — Feb 2020',
    location: 'Petaling Jaya',
    stack: ['Laravel', 'Vue'],
    bullets: [
      'Helped the team meet sprint goals by fixing bugs and shipping features.',
      'Documented sprint goals and set up the development-environment guide.',
      'Liaised with customer service and the Product Owner to clarify requirements.',
      'Proposed implementation improvements and removed impediments during sprint planning.'
    ]
  }
]
