import { useState } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
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

type Tab = 'overview' | 'architecture'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
]

export default function CaseStudy({ payload }: AppProps) {
  const openApp = useOS((s) => s.openApp)
  const [tab, setTab] = useState<Tab>('overview')
  const project = projects.find((p) => p.slug === payload)

  if (!project) {
    return (
      <AppShell className="text-[13px] text-subtext">
        case study not found.
      </AppShell>
    )
  }

  const tabs = project.diagram
    ? TABS
    : TABS.filter((t) => t.id !== 'architecture')

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
        <Kicker>case study / {project.status ?? project.year}</Kicker>
        {project.link && (
          <a
            className="btn btn-ghost ml-auto"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            {project.linkLabel ?? 'GitHub'} <ExternalLink size={14} />
          </a>
        )}
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

      <div
        role="tablist"
        className="flex items-center border-b border-blue-muted/30 bg-raised/40 font-mono text-[11.5px]"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 transition ${
              tab === t.id
                ? 'bg-term text-subtext'
                : 'text-dim hover:text-subtext'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <div role="tabpanel" className="flex flex-col gap-5">
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

          {project.snippet && (
            <section>
              <Kicker>code</Kicker>
              <div className="mt-2 mb-1 font-mono text-[11px] text-muted">
                {project.snippet.file}
              </div>
              <CodeBlock code={project.snippet.code} showLineNumbers />
            </section>
          )}
        </div>
      ) : (
        <div role="tabpanel" className="flex flex-col gap-4">
          <Kicker>architecture</Kicker>
          <img
            src={`/diagrams/${project.diagram}.svg`}
            alt={`${project.name} architecture`}
            className="mx-auto block h-auto w-full max-w-[720px] rounded-lg border border-blue-muted/35"
          />
          <p className="mx-auto max-w-[46ch] text-center text-[12px] leading-relaxed text-muted">
            Each node and arrow reflects the real flow — including parallel
            branches and feedback loops.
          </p>
        </div>
      )}
    </AppShell>
  )
}
