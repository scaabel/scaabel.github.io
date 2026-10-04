import { X } from 'lucide-react'
import { useOS } from '../store/os'
import { DOCK_ICONS } from '../lib/apps'
import type { AppId } from '../types'

interface Mini {
  id: string
  app: string
  min: boolean
  z: number
  title: string
}

export default function Dock() {
  const encoded = useOS((s) =>
    s.windows
      .map(
        (w) =>
          `${w.id}~${w.app}~${w.minimized ? 1 : 0}~${w.z}~${w.title}`,
      )
      .join('|'),
  )
  const openApp = useOS((s) => s.openApp)
  const focus = useOS((s) => s.focus)
  const close = useOS((s) => s.close)

  const wins: Mini[] = encoded
    ? encoded.split('|').map((row) => {
        const parts = row.split('~')
        return {
          id: parts[0],
          app: parts[1],
          min: parts[2] === '1',
          z: Number(parts[3]),
          title: parts.slice(4).join('~'),
        }
      })
    : []

  const onShortcut = (app: AppId) => {
    const appWins = wins.filter((w) => w.app === app).sort((a, b) => b.z - a.z)
    if (!appWins.length) openApp(app)
    else focus(appWins[0].id)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 flex h-[64px] items-end justify-center gap-3 px-3 pb-2 sm:h-[78px] sm:pb-3">
      {/* open windows tray (desktop) */}
      {wins.length > 0 && (
        <div className="mb-1 hidden max-w-[34vw] items-center gap-1.5 overflow-x-auto rounded-xl border border-blue-muted/30 bg-midnight/70 p-1.5 backdrop-blur-md sm:flex">
          {wins.map((w) => (
            <div
              key={w.id}
              className="group flex items-center gap-1 rounded-lg px-2 py-1 text-[11.5px] text-subtext hover:bg-hover/70 hover:text-text"
            >
              <button
                type="button"
                className="max-w-[150px] truncate"
                title={w.title}
                onClick={() => focus(w.id)}
              >
                {w.min ? `▁ ${w.title}` : w.title}
              </button>
              <button
                type="button"
                aria-label={`Close ${w.title}`}
                onClick={() => close(w.id)}
                className="text-dim opacity-0 transition group-hover:opacity-100 hover:text-coral"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* app shortcuts */}
      <div className="flex items-center gap-1.5 rounded-2xl border border-blue-muted/35 bg-surface/80 p-2 shadow-2xl shadow-black/50 backdrop-blur-md">
        {DOCK_ICONS.map(({ app, label, icon: Icon }) => {
          const running = wins.some((w) => w.app === app)
          return (
            <button
              key={app}
              type="button"
              onClick={() => onShortcut(app)}
              title={label}
              aria-label={label}
              className={`relative grid h-10 w-10 place-items-center rounded-xl border transition hover:-translate-y-0.5 sm:h-11 sm:w-11 ${
                running
                  ? 'border-green/40 bg-green-dark/40 text-green'
                  : 'border-blue-muted/40 bg-raised/70 text-subtext hover:border-green/40 hover:text-green'
              }`}
            >
              <Icon size={19} strokeWidth={1.7} />
              {running && (
                <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
