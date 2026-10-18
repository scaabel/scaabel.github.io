import { useEffect, useRef, useState } from 'react'

const LINES = [
  'scaliaOS v1.0, cozy midnight build',
  'initializing kernel ............... ok',
  'mounting /dev/portfolio ........... ok',
  'starting window manager ........... ok',
  'loading terminal, projects, cat ... ok',
  'welcome, visitor.',
]

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (done.current) return
      done.current = true
      onDone()
    }
    if (n >= LINES.length) {
      const t = window.setTimeout(finish, 600)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setN((v) => v + 1), 165)
    return () => window.clearTimeout(t)
  }, [n, onDone])

  useEffect(() => {
    const finish = () => {
      if (done.current) return
      done.current = true
      onDone()
    }
    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)
    return () => {
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
  }, [onDone])

  return (
    <div
      className="absolute inset-0 z-[100] grid place-items-center bg-midnight/95"
      role="status"
      aria-label="Booting ScaliaOS"
    >
      <div className="w-[min(440px,86vw)]">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-green/50 font-mono text-green">
            S
          </span>
          <div>
            <div className="font-mono text-lg tracking-[0.25em] text-green">
              ScaliaOS
            </div>
            <div className="text-[11px] text-muted">
              cozy midnight developer build
            </div>
          </div>
        </div>
        <div className="min-h-[140px] font-mono text-[12.5px] leading-6 text-subtext">
          {LINES.slice(0, n).map((l, i) => (
            <div key={i}>
              <span className="text-green-muted">›</span> {l}
            </div>
          ))}
          <span className="caret" />
        </div>
        <div className="mt-4 text-[11px] text-dim">
          click or press any key to skip
        </div>
      </div>
    </div>
  )
}
