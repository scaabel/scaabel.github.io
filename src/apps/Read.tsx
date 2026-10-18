import { ArrowLeft, ExternalLink } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import { writings } from '../data/writings'
import { useOS } from '../store/os'
import type { AppProps } from '../types'
import { AppShell, Kicker } from './shared'

export default function Read({ payload }: AppProps) {
  const openApp = useOS((s) => s.openApp)
  const writing = writings.find((w) => w.slug === payload)

  if (!writing) {
    return (
      <AppShell className="text-[13px] text-subtext">
        writing not found.
      </AppShell>
    )
  }

  return (
    <AppShell className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => openApp('writings')}
          aria-label="Back to writings"
          className="btn btn-ghost !px-2.5"
        >
          <ArrowLeft size={14} />
        </button>
        <Kicker>{writing.date}</Kicker>
        {writing.link && (
          <a
            className="btn btn-ghost ml-auto"
            href={writing.link}
            target="_blank"
            rel="noreferrer"
          >
            Source <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-text">
          {writing.title}
        </h2>
        <p className="mt-1 text-[13px] text-green">{writing.excerpt}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {writing.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <article className="flex flex-col gap-4">
        {writing.body.map((p, i) => (
          <p
            key={i}
            className="max-w-[68ch] text-[13px] leading-relaxed text-subtext"
          >
            {p}
          </p>
        ))}
      </article>

      {writing.diagram && (
        <section className="flex flex-col gap-4">
          {(['before', 'after'] as const).map((phase) => (
            <div key={phase}>
              <Kicker>{phase}</Kicker>
              <img
                src={writing.diagram![phase]}
                alt={`${writing.title} ${phase} flow`}
                className="mx-auto mt-2 block h-auto w-auto max-h-[420px] max-w-full rounded-lg border border-blue-muted/35"
              />
            </div>
          ))}
        </section>
      )}

      {writing.snippets &&
        writing.snippets.map((snippet) => (
          <section key={snippet.label}>
            <Kicker>{snippet.label}</Kicker>
            <div className="mt-2 mb-1 font-mono text-[11px] text-muted">
              {snippet.file}
            </div>
            <CodeBlock code={snippet.code} showLineNumbers />
          </section>
        ))}
    </AppShell>
  )
}
