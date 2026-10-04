import { ArrowLeft, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { useOS } from '../store/os'
import type { AppProps } from '../types'
import { AppShell, Kicker } from './shared'

function CaseSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section>
      <Kicker>{title}</Kicker>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {items.map((it) => (
          <li
            key={it}
            className="flex gap-2 text-[12.5px] leading-relaxed text-subtext"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-green-muted" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function CaseStudy({ payload }: AppProps) {
  const openApp = useOS((s) => s.openApp)
  const project = projects.find((p) => p.slug === payload)

  if (!project) {
    return (
      <AppShell className="text-[13px] text-subtext">
        case study not found.
      </AppShell>
    )
  }

  return (
    <AppShell className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => openApp('projects')}
          aria-label="Back to projects"
          className="btn btn-ghost !px-2.5"
        >
          <ArrowLeft size={14} />
        </button>
        <Kicker>case study / {project.year}</Kicker>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-text">
          {project.name}
        </h2>
        <p className="mt-1 text-[13px] text-green">{project.tagline}</p>
        {project.role && (
          <p className="mt-1 text-[12px] text-muted">
            role: <span className="text-subtext">{project.role}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <section>
        <Kicker>context</Kicker>
        <p className="mt-2 text-[13px] leading-relaxed text-subtext">
          {project.context}
        </p>
      </section>

      <CaseSection title="approach" items={project.approach} />
      <CaseSection title="decisions & tradeoffs" items={project.decisions} />
      <CaseSection title="impact" items={project.impact} />
      <CaseSection title="learnings" items={project.learnings} />

      {project.link && (
        <a
          className="btn btn-green w-max"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub <ExternalLink size={14} />
        </a>
      )}
    </AppShell>
  )
}
