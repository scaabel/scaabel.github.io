import { BookOpen, ExternalLink } from 'lucide-react'
import { writings, type Writing } from '../data/writings'
import { useOS } from '../store/os'
import { AppShell, Kicker } from './shared'

function WritingCard({ writing }: { writing: Writing }) {
  const openApp = useOS((s) => s.openApp)
  return (
    <button
      type="button"
      onClick={() =>
        openApp('read', { payload: writing.slug, title: writing.title })
      }
      className="card group flex flex-col gap-2 p-4 text-left transition hover:-translate-y-0.5 hover:border-green/40"
    >
      <div className="flex items-center gap-2 text-green">
        <BookOpen size={15} />
        <span className="text-[13.5px] font-semibold text-text">
          {writing.title}
        </span>
        <span className="ml-auto font-mono text-[10.5px] text-dim">
          {writing.date}
        </span>
      </div>
      <p className="text-[12.5px] leading-relaxed text-subtext">
        {writing.excerpt}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        {writing.tags.map((t) => (
          <span key={t} className="chip !text-[10.5px]">
            {t}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-green-muted opacity-0 transition group-hover:opacity-100">
          read <ExternalLink size={11} />
        </span>
      </div>
    </button>
  )
}

export default function Writings() {
  return (
    <AppShell className="flex flex-col gap-5">
      <div>
        <Kicker>~/writings</Kicker>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text">
          Writings
        </h2>
      </div>

      {writings.length === 0 ? (
        <p className="text-[13px] text-subtext">nothing here yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {writings.map((w) => (
            <WritingCard key={w.slug} writing={w} />
          ))}
        </div>
      )}
    </AppShell>
  )
}
