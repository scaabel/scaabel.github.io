import { skills } from '../data/skills'
import { AppShell, Kicker } from './shared'

export default function Skills() {
  return (
    <AppShell className="flex flex-col gap-5">
      <div>
        <Kicker>skills.json</Kicker>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text">
          Tools I reach for
        </h2>
      </div>

      {skills.map((group) => (
        <div key={group.label}>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-[11px] text-green-muted">
              {group.label.toLowerCase()}
            </span>
            <span className="h-px flex-1 bg-blue-muted/30" />
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </AppShell>
  )
}
