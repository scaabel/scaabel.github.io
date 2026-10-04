import { useOS, viewport, TOPBAR_H } from '../store/os'
import { DESKTOP_ICONS } from '../lib/apps'

export default function Desktop() {
  const openApp = useOS((s) => s.openApp)
  const snapHint = useOS((s) => s.snapHint)
  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth
  const { availH } = viewport()

  const hintStyle = snapHint
    ? {
        left: snapHint === 'right' ? vw / 2 : 0,
        top: TOPBAR_H,
        width: snapHint === 'max' ? vw : vw / 2,
        height: availH,
      }
    : undefined

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* desktop icons */}
      <div
        className="pointer-events-auto absolute left-4 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-1 sm:gap-y-3"
        style={{ top: TOPBAR_H + 16 }}
      >
        {DESKTOP_ICONS.map(({ app, label, icon: Icon }) => (
          <button
            key={app}
            type="button"
            onClick={() => openApp(app)}
            className="group flex w-16 flex-col items-center gap-1.5 text-center sm:w-[74px]"
            title={`Open ${label}`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-blue-muted/40 bg-raised/70 text-subtext shadow-lg shadow-black/40 transition group-hover:-translate-y-0.5 group-hover:border-green/50 group-hover:text-green group-hover:shadow-black/60">
              <Icon size={19} strokeWidth={1.7} />
            </span>
            <span className="text-[11px] leading-tight text-subtext group-hover:text-text">
              {label}
            </span>
          </button>
        ))}
      </div>

      {snapHint && <div className="snap-hint" style={hintStyle} />}
    </div>
  )
}
