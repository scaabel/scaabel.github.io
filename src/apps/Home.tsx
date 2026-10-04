import { Terminal, Code2, Send, Mail, ArrowUp } from 'lucide-react'
import { useOS } from '../store/os'
import { AppShell, Kicker } from './shared'

const STATS = [
  { k: '7+', v: 'years shipping' },
  { k: '6', v: 'teams & roles' },
  { k: '25%', v: 'retention lift' },
  { k: '45%', v: 'infra cost cut' },
]

export default function Home() {
  const openApp = useOS((s) => s.openApp)
  return (
    <AppShell className="flex flex-col gap-6">
      <div>
        <div className="font-mono text-[12px] text-green">
          <span className="text-green-muted">sca@scaliaos</span>:~$ whoami
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Scalia Abel
        </h1>
        <p className="mt-1 text-[15px] text-green">Full Stack Engineer</p>
        <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-subtext">
          Welcome to <span className="text-text">ScaliaOS</span> — my portfolio,
          disguised as a tiny desktop. I build scalable web applications with a
          bias for clean, decoupled, well-tested code. Look around: every window
          is a part of the resume.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-green" onClick={() => openApp('experience')}>
          View experience
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => openApp('projects')}>
          See projects
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => openApp('terminal')}>
          <Terminal size={14} /> Open terminal
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.k} className="card p-3">
            <div className="font-mono text-lg text-green">{s.k}</div>
            <div className="mt-0.5 text-[11.5px] text-muted">{s.v}</div>
          </div>
        ))}
      </div>

      <div>
        <Kicker>elsewhere</Kicker>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            className="chip"
            href="https://github.com/scaabel"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={13} /> github/scaabel
          </a>
          <a
            className="chip"
            href="https://dev.to/scaabel"
            target="_blank"
            rel="noreferrer"
          >
            <Send size={13} /> dev.to/scaabel
          </a>
          <a className="chip" href="mailto:ariev.scalia@gmail.com">
            <Mail size={13} /> ariev.scalia@gmail.com
          </a>
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-[11.5px] text-dim">
        <ArrowUp size={12} /> hint: the terminal does more than it looks. there
        may be eggs hidden around here.
      </p>
    </AppShell>
  )
}
