import { Cat, Sparkles } from 'lucide-react'
import { summary } from '../data/experience'
import { useOS } from '../store/os'
import { AppShell, Kicker, PageTitle } from './shared'

const NOTES = [
  'Self-taught, open-source + enterprise.',
  'Big on SOLID, TDD, DDD, and multi-tenant architecture.',
  'Comfortable refactoring legacy code into something decoupled and testable.',
  'Happiest blending server rendering with client-side interaction for a seamless UX.',
  'Currently exploring Temporal, MongoDB, and AI-assisted workflows.',
]

export default function About() {
  const openApp = useOS((s) => s.openApp)
  return (
    <AppShell className="flex flex-col gap-6">
      <PageTitle
        kicker="about.txt"
        title="The short version"
        sub={summary}
      />

      <div className="flex flex-col gap-2.5">
        {NOTES.map((n) => (
          <div key={n} className="flex gap-2.5 text-[13px] text-subtext">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
            <span>{n}</span>
          </div>
        ))}
      </div>

      <div>
        <Kicker>currently</Kicker>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip chip-accent">
            <Sparkles size={12} /> AI workflows
          </span>
          <span className="chip">Temporal</span>
          <span className="chip">MongoDB / Mongoose</span>
          <span className="chip">Kubernetes</span>
          <span className="chip">NoSQL</span>
        </div>
      </div>

      <div className="divider" />

      <button
        type="button"
        onClick={() => openApp('experience')}
        className="card flex items-center gap-2 p-3 text-left text-[12.5px] text-subtext transition hover:text-text"
      >
        <Cat size={15} className="text-green" />
        there is a cat living on this desktop too. poke around. see full
        experience →
      </button>
    </AppShell>
  )
}
