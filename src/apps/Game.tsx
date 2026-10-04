import { useEffect, useState } from 'react'
import { Bug, RotateCcw, Trophy } from 'lucide-react'
import { AppShell, Kicker } from './shared'

interface ActiveBug {
  id: number
  x: number
  y: number
  born: number
}

const ROUND = 20

export default function Game() {
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(ROUND)
  const [best, setBest] = useState(0)
  const [bugs, setBugs] = useState<ActiveBug[]>([])

  useEffect(() => {
    if (!playing) return
    const spawn = window.setInterval(() => {
      setBugs((b) => [
        ...b,
        {
          id: Date.now() + Math.random(),
          x: 4 + Math.random() * 84,
          y: 6 + Math.random() * 74,
          born: Date.now(),
        },
      ])
    }, 620)
    const tick = window.setInterval(() => setTime((t) => t - 1), 1000)
    const cull = window.setInterval(
      () => setBugs((b) => b.filter((x) => Date.now() - x.born < 1250)),
      280,
    )
    return () => {
      window.clearInterval(spawn)
      window.clearInterval(tick)
      window.clearInterval(cull)
    }
  }, [playing])

  useEffect(() => {
    if (playing && time <= 0) {
      setPlaying(false)
      setBest((b) => Math.max(b, score))
      setBugs([])
    }
  }, [playing, time, score])

  const start = () => {
    setScore(0)
    setTime(ROUND)
    setBugs([])
    setPlaying(true)
  }

  const squash = (id: number) => {
    setBugs((b) => b.filter((x) => x.id !== id))
    setScore((s) => s + 1)
  }

  return (
    <AppShell className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <Kicker>bug-hunter.exe</Kicker>
          <h2 className="mt-1 text-[15px] font-semibold text-text">
            Squash the bugs
          </h2>
        </div>
        <div className="flex items-center gap-3 font-mono text-[12px] text-subtext">
          <span>
            score <span className="text-green">{score}</span>
          </span>
          <span>
            time <span className="text-green">{Math.max(0, time)}</span>
          </span>
          <span className="flex items-center gap-1 text-dim">
            <Trophy size={12} /> {best}
          </span>
        </div>
      </div>

      <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-lg border border-blue-muted/40 bg-terminal">
        {!playing && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="mb-3 text-[12.5px] text-subtext">
                {best > 0 ? `best: ${best}. go again?` : 'click the bugs before they vanish.'}
              </p>
              <button type="button" className="btn btn-green" onClick={start}>
                {best > 0 ? (
                  <>
                    <RotateCcw size={14} /> Play again
                  </>
                ) : (
                  'Start'
                )}
              </button>
            </div>
          </div>
        )}
        {bugs.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-label="Squash bug"
            onClick={() => squash(b.id)}
            className="absolute grid h-8 w-8 place-items-center rounded-full border border-coral/50 bg-coral/10 text-coral transition hover:scale-110 hover:bg-coral/25"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <Bug size={16} />
          </button>
        ))}
      </div>

      <p className="text-[11px] text-dim">
        a hidden terminal command launches this too. find it.
      </p>
    </AppShell>
  )
}
