export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Vue', 'Next.js', 'SvelteKit', 'Inertia.js', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'NestJS', 'Laravel', 'Temporal', 'Zod'],
  },
  {
    label: 'Data & Infra',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Mongoose',
      'Redis',
      'Elasticsearch',
      'AWS',
      'Docker',
      'Nginx',
      'Kubernetes',
    ],
  },
  {
    label: 'Practices',
    items: ['TDD', 'DDD', 'SOLID', 'REST', 'CI/CD', 'Multi-tenancy'],
  },
]
