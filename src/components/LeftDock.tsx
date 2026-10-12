import { useOS } from '../store/os'
import { LEFT_DOCK } from '../lib/apps'

export default function LeftDock() {
  const active = useOS((s) => {
    const top = [...s.windows]
      .filter((w) => !w.minimized)
      .sort((a, b) => b.z - a.z)[0]
    return top?.app ?? null
  })
  const openApp = useOS((s) => s.openApp)

  return (
    <nav
      aria-label="Launcher"
      className="absolute left-1/2 top-[38px] z-[6] flex max-w-[calc(100vw-16px)] -translate-x-1/2 flex-row items-center gap-1 overflow-x-auto rounded-2xl border border-blue-muted/30 bg-midnight/60 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-md sm:left-3 sm:top-[46px] sm:max-w-none sm:translate-x-0 sm:flex-col sm:overflow-visible"
    >
      {LEFT_DOCK.map(({ app, label, icon: Icon }) => {
        const isActive = active === app
        return (
          <button
            key={app}
            type="button"
            onClick={() => openApp(app)}
            title={label}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className={`group relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition hover:-translate-y-0.5 ${
              isActive
                ? 'border-green/50 bg-green-dark/35 text-green'
                : 'border-transparent text-subtext hover:border-green/40 hover:text-green'
            }`}
          >
            <Icon size={18} strokeWidth={1.7} />
            {isActive && (
              <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green shadow-[0_0_8px_rgba(183,232,91,0.75)] sm:-left-[7px] sm:bottom-auto sm:top-1/2 sm:h-4 sm:w-[3px] sm:-translate-y-1/2 sm:translate-x-0" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
