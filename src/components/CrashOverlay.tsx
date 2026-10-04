import { useEffect } from 'react'
import { Bug } from 'lucide-react'
import { useOS } from '../store/os'

export default function CrashOverlay() {
  const crash = useOS((s) => s.crash)
  const setCrash = useOS((s) => s.setCrash)

  useEffect(() => {
    if (!crash) return
    const t = window.setTimeout(() => setCrash(false), 2800)
    return () => window.clearTimeout(t)
  }, [crash, setCrash])

  if (!crash) return null

  return (
    <div
      className="absolute inset-0 z-[90] grid place-items-center bg-black/60 backdrop-blur-sm"
      onClick={() => setCrash(false)}
      role="alertdialog"
      aria-label="System error"
    >
      <div className="w-[min(420px,88vw)] rounded-xl border border-coral/40 bg-midnight/95 p-5 shadow-2xl">
        <div className="flex items-center gap-2 text-coral">
          <Bug size={16} />
          <span className="font-mono text-[12px] tracking-wider">
            KERNEL PANIC (sort of)
          </span>
        </div>
        <h2 className="mt-3 text-[15px] font-semibold text-text">
          ScaliaOS has stopped responding.
        </h2>
        <p className="mt-1 text-[12.5px] text-subtext">
          A wild bug appeared. Don't worry — it's part of the portfolio.
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-blueblack">
          <div
            className="h-full w-0 bg-green"
            style={{ animation: 'crash-progress 2.4s linear forwards' }}
          />
        </div>
        <div className="mt-3 text-[11px] text-dim">
          recovering automatically…
        </div>
      </div>
    </div>
  )
}
