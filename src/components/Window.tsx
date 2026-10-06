import { Suspense, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { Minus, Square, X } from 'lucide-react'
import { useOS, isMobile } from '../store/os'
import type { SnapDir } from '../store/os'
import { APP_COMPONENTS } from '../lib/apps'

const EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as const
type Edge = (typeof EDGES)[number]

export default function WindowView({ id }: { id: string }) {
  const win = useOS((s) => s.windows.find((w) => w.id === id))
  const topZ = useOS((s) => s.topZ)
  const focus = useOS((s) => s.focus)
  const close = useOS((s) => s.close)
  const minimize = useOS((s) => s.minimize)
  const toggleMax = useOS((s) => s.toggleMax)
  const move = useOS((s) => s.move)
  const resize = useOS((s) => s.resize)
  const snap = useOS((s) => s.snap)
  const setSnapHint = useOS((s) => s.setSnapHint)

  const dragRef = useRef<{ px: number; py: number; x: number; y: number } | null>(
    null,
  )

  if (!win) return null

  const focused = win.z === topZ
  const isMax = win.maximized

  const onTitleDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    focus(id)
    if (isMax || isMobile()) return
    const start = { px: e.clientX, py: e.clientY, x: win.x, y: win.y }
    dragRef.current = start
    const onMoveP = (ev: PointerEvent) => {
      if (!dragRef.current) return
      move(id, start.x + ev.clientX - start.px, start.y + ev.clientY - start.py)
      const vw = window.innerWidth
      let hint: SnapDir | null = null
      if (ev.clientX < 24) hint = 'left'
      else if (ev.clientX > vw - 24) hint = 'right'
      else if (ev.clientY < 6) hint = 'max'
      setSnapHint(hint)
    }
    const onUpP = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMoveP)
      window.removeEventListener('pointerup', onUpP)
      dragRef.current = null
      setSnapHint(null)
      const vw = window.innerWidth
      if (ev.clientX < 24) snap(id, 'left')
      else if (ev.clientX > vw - 24) snap(id, 'right')
      else if (ev.clientY < 6) snap(id, 'max')
    }
    window.addEventListener('pointermove', onMoveP)
    window.addEventListener('pointerup', onUpP)
  }

  const startResize = (edge: Edge) => (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    focus(id)
    if (isMax || isMobile()) return
    const s = {
      px: e.clientX,
      py: e.clientY,
      x: win.x,
      y: win.y,
      w: win.w,
      h: win.h,
    }
    const minW = 340
    const minH = 240
    const onMoveP = (ev: PointerEvent) => {
      const dx = ev.clientX - s.px
      const dy = ev.clientY - s.py
      let { x, y, w, h } = s
      if (edge.includes('e')) w = s.w + dx
      if (edge.includes('s')) h = s.h + dy
      if (edge.includes('w')) {
        w = s.w - dx
        x = s.x + dx
      }
      if (edge.includes('n')) {
        h = s.h - dy
        y = s.y + dy
      }
      if (w < minW) {
        if (edge.includes('w')) x -= minW - w
        w = minW
      }
      if (h < minH) {
        if (edge.includes('n')) y -= minH - h
        h = minH
      }
      resize(id, w, h, x, y)
    }
    const onUpP = () => {
      window.removeEventListener('pointermove', onMoveP)
      window.removeEventListener('pointerup', onUpP)
    }
    window.addEventListener('pointermove', onMoveP)
    window.addEventListener('pointerup', onUpP)
  }

  const App = APP_COMPONENTS[win.app]

  return (
    <section
      className={`win ${isMax ? 'is-max' : ''} ${focused ? 'is-focused' : ''}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
      }}
      role="dialog"
      aria-label={win.title}
      onPointerDown={() => focus(id)}
    >
      <div
        className="win-titlebar"
        onPointerDown={onTitleDown}
        onDoubleClick={() => toggleMax(id)}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="win-btn close"
            aria-label="Close window"
            onClick={() => close(id)}
          >
            <X size={8} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="win-btn min"
            aria-label="Minimize window"
            onClick={() => minimize(id)}
          >
            <Minus size={8} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="win-btn max"
            aria-label="Maximize window"
            onClick={() => toggleMax(id)}
          >
            <Square size={7} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        <div className="min-w-0 flex-1 truncate text-[12.5px] tracking-wide text-subtext">
          {win.title}
        </div>
        <div className="hidden font-mono text-[10.5px] text-dim sm:block">
          {win.app}
        </div>
      </div>

      <div className="win-body">
        <Suspense
          fallback={
            <div className="grid h-full place-items-center font-mono text-xs text-muted">
              loading {win.app}…
            </div>
          }
        >
          <App winId={id} payload={win.payload} />
        </Suspense>
      </div>

      {!isMax && !isMobile() && (
        <>
          {EDGES.map((edge) => (
            <div
              key={edge}
              className={`rs rs-${edge}`}
              onPointerDown={startResize(edge)}
            />
          ))}
        </>
      )}
    </section>
  )
}
