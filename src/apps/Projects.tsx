import { ExternalLink, FolderGit2 } from 'lucide-react'
import { projects } from '../data/projects'
import { useOS } from '../store/os'
import { AppShell, Kicker } from './shared'

export default function Projects() {
  const openApp = useOS((s) => s.openApp)
  return (
    <AppShell className="flex flex-col gap-5">
      <div>
        <Kicker>~/projects</Kicker>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text">
          Things I've built
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() =>
              openApp('case', { payload: p.slug, title: p.name })
            }
            className="card group flex flex-col gap-2 p-4 text-left transition hover:-translate-y-0.5 hover:border-green/40"
          >
            <div className="flex items-center gap-2 text-green">
              <FolderGit2 size={15} />
              <span className="text-[13.5px] font-semibold text-text">
                {p.name}
              </span>
              <span className="ml-auto font-mono text-[10.5px] text-dim">
                {p.status ?? p.year}
              </span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-subtext">
              {p.tagline}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {p.stack.slice(0, 4).map((t) => (
                <span key={t} className="chip !text-[10.5px]">
                  {t}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-green-muted opacity-0 transition group-hover:opacity-100">
              open case study <ExternalLink size={11} />
            </span>
          </button>
        ))}
      </div>
    </AppShell>
  )
}
