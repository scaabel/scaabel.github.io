import { experience } from '../data/experience'
import { AppShell, Kicker } from './shared'

export default function Experience() {
  return (
    <AppShell className="flex flex-col gap-5">
      <div>
        <Kicker>experience.log</Kicker>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text">
          Where I've worked
        </h2>
      </div>

      <ol className="relative ml-3 border-l border-blue-muted/40">
        {experience.map((role) => (
          <li key={`${role.company}-${role.title}`} className="relative pb-6 pl-6">
            <span
              className={`absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border ${
                role.current
                  ? 'border-green bg-green shadow-[0_0_10px_rgba(183,232,91,0.6)]'
                  : 'border-blue-muted bg-navy'
              }`}
            />
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-[14px] font-semibold text-text">{role.title}</h3>
              <span className="text-[13px] text-green">{role.company}</span>
              {role.current && (
                <span className="chip chip-accent !py-0">now</span>
              )}
            </div>
            <div className="mt-0.5 font-mono text-[11px] text-muted">
              {role.period} · {role.location}
            </div>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-[12.5px] leading-relaxed text-subtext">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-green-muted" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {role.stack.map((t) => (
                <span key={t} className="chip !text-[10.5px]">
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </AppShell>
  )
}
