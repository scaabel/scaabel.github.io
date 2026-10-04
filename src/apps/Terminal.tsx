import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useOS } from '../store/os'
import { skills } from '../data/skills'
import { projects } from '../data/projects'
import type { AppId, AppProps, TerminalLine } from '../types'

const FILES = [
  'about.txt',
  'contact.txt',
  'experience.txt',
  'resume.txt',
  'secrets.txt',
  'projects/',
]

const HELP = [
  'help          show this list',
  'whoami        who is behind this desktop',
  'skills        list skill groups',
  'experience    open the experience window',
  'projects      open the projects window',
  'about         open the about window',
  'contact       open the contact window',
  'ls            list files in ~',
  'cat <file>    read a file (try about.txt)',
  'open <app>    open an app window',
  'sudo hire sca open a suspiciously good offer letter',
  'clear         clear the terminal',
]

const OPEN_MAP: Record<string, AppId> = {
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  resume: 'experience',
  projects: 'projects',
  contact: 'contact',
  terminal: 'terminal',
  explorer: 'explorer',
  game: 'game',
}

export default function Terminal({ winId }: AppProps) {
  const terminal = useOS((s) => s.terminal)
  const pushLine = useOS((s) => s.pushLine)
  const clearTerminal = useOS((s) => s.clearTerminal)
  const openApp = useOS((s) => s.openApp)
  const close = useOS((s) => s.close)
  const setCrash = useOS((s) => s.setCrash)
  const findEgg = useOS((s) => s.findEgg)

  const [input, setInput] = useState('')
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const histRef = useRef<string[]>([])
  const hIdx = useRef(0)

  useEffect(() => {
    const el = boxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [terminal])

  const out = (text: string, kind: TerminalLine['kind'] = 'out') =>
    pushLine({ kind, text })

  const run = (raw: string) => {
    const line = raw.trim()
    pushLine({ kind: 'in', text: line })
    if (!line) return
    histRef.current.push(line)
    hIdx.current = histRef.current.length
    const [cmd, ...args] = line.split(/\s+/)
    const c = cmd.toLowerCase()

    switch (c) {
      case 'help':
        out('available commands:')
        HELP.forEach((h) => out('  ' + h))
        break
      case 'whoami':
        out('Scalia Abel — Full Stack Engineer')
        out('7+ years · scalable systems · clean code')
        break
      case 'about':
        openApp('about')
        out('opening about.txt …')
        break
      case 'skills':
        openApp('skills')
        skills.forEach((g) => out(`${g.label}: ${g.items.join(', ')}`))
        break
      case 'experience':
      case 'resume':
        openApp('experience')
        out('opening experience.log …')
        break
      case 'projects':
        openApp('projects')
        projects.forEach((p) => out(`  - ${p.name} — ${p.tagline}`))
        break
      case 'contact':
        openApp('contact')
        out('ariev.scalia@gmail.com · github.com/scaabel · dev.to/scaabel')
        break
      case 'ls':
        out(FILES.join('   '))
        break
      case 'pwd':
        out('/home/sca')
        break
      case 'date':
        out(new Date().toString())
        break
      case 'echo':
        out(args.join(' '))
        break
      case 'clear':
        clearTerminal()
        return
      case 'open': {
        const target = (args[0] ?? '').toLowerCase()
        const app = OPEN_MAP[target]
        if (app) {
          openApp(app)
          out(`opening ${target} …`)
        } else {
          out(`no such app: ${target || '(none)'}`, 'err')
        }
        break
      }
      case 'cat': {
        const f = (args[0] ?? '').toLowerCase()
        if (f === 'about.txt') {
          openApp('about')
          out('opening about.txt …')
        } else if (f === 'contact.txt') {
          openApp('contact')
          out('opening contact.txt …')
        } else if (f === 'experience.txt' || f === 'resume.txt') {
          openApp('experience')
          out('opening experience.log …')
        } else if (f === 'secrets.txt') {
          findEgg('secrets')
          out("you found the cat's stash: 🐟 — the cat approves.", 'ok')
        } else if (f === 'projects' || f === 'projects/') {
          out('cat: projects: Is a directory', 'err')
        } else {
          out(`cat: ${f || '(none)'}: No such file or directory`, 'err')
        }
        break
      }
      case 'sudo': {
        if (args[0] === 'hire' && (args[1] === 'sca' || args[1] === 'ariev')) {
          findEgg('hire')
          out('permission granted. drafting offer letter…', 'ok')
          out('  ✓ 7+ years shipping production software')
          out('  ✓ owns the scheduling package')
          out('  ✓ cut API response 20s → ~100ms')
          out('  ✓ has a cat on the payroll')
          out('run `contact` to make it official.', 'ok')
        } else {
          out(
            'sca is not in the sudoers file. this incident has been reported. 🐈',
            'err',
          )
          out('hint: try `sudo hire sca`.', 'ok')
        }
        break
      }
      case 'neofetch': {
        findEgg('neofetch')
        out('        ▄▄▄▄▄        sca@scaliaos')
        out('      ▄█████████▄     ------------------')
        out('     ██████████████   OS: ScaliaOS 1.0 (cozy midnight)')
        out('     ██████████████   Shell: sca-shell')
        out('      ▀█████████▀     Uptime: 7+ years of shipping')
        out('        ▀▀▀▀▀         Stack: TS · React · Node · Laravel')
        out('                       Cat: yes')
        break
      }
      case 'crash':
        findEgg('crash')
        out('uh oh…', 'err')
        window.setTimeout(() => setCrash(true), 250)
        break
      case 'play':
      case 'game':
        findEgg('game')
        openApp('game')
        out('launching bug-hunter.exe …')
        break
      case 'coffee':
        out("☕ brewing… 418 I'm a teapot.")
        break
      case 'rm':
        out('nice try — this filesystem is read-only.', 'err')
        break
      case 'konami':
        out('the real konami code works on the desktop: ↑↑↓↓←→←→BA')
        break
      case 'exit':
        close(winId)
        break
      default:
        out(`command not found: ${cmd} — type 'help'`, 'err')
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = histRef.current
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!h.length) return
      hIdx.current = Math.max(0, hIdx.current - 1)
      setInput(h[hIdx.current] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      hIdx.current = Math.min(h.length, hIdx.current + 1)
      setInput(h[hIdx.current] ?? '')
    }
  }

  return (
    <div
      className="flex h-full flex-col bg-term font-mono text-[12.5px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={boxRef} className="min-h-0 flex-1 overflow-auto px-3.5 py-3">
        {terminal.map((l, i) => (
          <div key={i} className="leading-[1.7]">
            {l.kind === 'in' ? (
              <>
                <span className="text-green">sca@scaliaos</span>
                <span className="text-green-muted">:~$ </span>
                <span className="text-text">{l.text}</span>
              </>
            ) : (
              <span
                className={
                  l.kind === 'ok'
                    ? 'text-green'
                    : l.kind === 'err'
                      ? 'text-coral'
                      : 'text-subtext'
                }
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {l.text}
              </span>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="flex items-center gap-2 border-t border-blue-muted/30 px-3.5 py-2.5"
      >
        <span className="text-green">sca@scaliaos</span>
        <span className="text-green-muted">:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
          placeholder="type help"
          className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-dim"
        />
      </form>
    </div>
  )
}
