import { create } from 'zustand'
import type { AppId, TerminalLine, WinState } from '../types'

export const TOPBAR_H = 30
export const DOCK_H = 78

interface AppMeta {
  title: string
  w: number
  h: number
}

const APP_META: Record<Exclude<AppId, 'case'>, AppMeta> = {
  home: { title: 'Home', w: 760, h: 540 },
  about: { title: 'About — Scalia Abel', w: 700, h: 540 },
  skills: { title: 'Skills', w: 760, h: 560 },
  experience: { title: 'Experience', w: 860, h: 620 },
  projects: { title: 'Projects', w: 880, h: 620 },
  contact: { title: 'Contact', w: 560, h: 440 },
  terminal: { title: 'sca@scaliaOS: ~', w: 720, h: 440 },
  explorer: { title: 'Project Explorer', w: 900, h: 620 },
  game: { title: 'bug-hunter.exe', w: 660, h: 540 },
}

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

export const viewport = () => {
  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight
  const availH = vh - TOPBAR_H - (isMobile() ? 64 : DOCK_H)
  return { vw, vh, availH }
}

let seq = 0
const uid = (app: AppId) => `${app}-${++seq}`

export type SnapDir = 'left' | 'right' | 'max'

interface OSStore {
  windows: WinState[]
  topZ: number
  terminal: TerminalLine[]
  mascot: { msg: string; t: number } | null
  found: string[]
  crash: boolean
  snapHint: SnapDir | null
  openApp: (app: AppId, opts?: { payload?: string; title?: string }) => string
  close: (id: string) => void
  focus: (id: string) => void
  minimize: (id: string) => void
  toggleMax: (id: string) => void
  move: (id: string, x: number, y: number) => void
  resize: (id: string, w: number, h: number, x?: number, y?: number) => void
  snap: (id: string, dir: SnapDir) => void
  pushLine: (line: TerminalLine) => void
  clearTerminal: () => void
  say: (msg: string) => void
  clearSay: () => void
  findEgg: (egg: string) => void
  setCrash: (on: boolean) => void
  setSnapHint: (dir: SnapDir | null) => void
}

export const useOS = create<OSStore>((set, get) => ({
  windows: [],
  topZ: 10,
  terminal: [
    { kind: 'out', text: 'ScaliaOS terminal — type `help` to get started.' },
  ],
  mascot: null,
  found: [],
  crash: false,
  snapHint: null,

  openApp: (app, opts) => {
    const state = get()
    const existing = state.windows.find(
      (w) => w.app === app && (opts?.payload === undefined || w.payload === opts.payload),
    )
    if (existing) {
      state.focus(existing.id)
      return existing.id
    }
    const meta =
      app === 'case'
        ? { title: opts?.title ?? 'Case Study', w: 840, h: 620 }
        : APP_META[app]
    const { vw, availH } = viewport()
    const mobile = isMobile()
    const w = mobile ? vw : Math.min(meta.w, vw - 40)
    const h = mobile ? availH : Math.min(meta.h, availH - 20)
    const offset = (state.windows.length % 6) * 26
    const x = mobile ? 0 : Math.max(16, Math.round((vw - w) / 2) + offset - 65)
    const y = mobile
      ? TOPBAR_H
      : Math.max(TOPBAR_H + 14, Math.round((availH - h) / 2) + offset - 40)
    const z = state.topZ + 1
    const win: WinState = {
      id: uid(app),
      app,
      title: meta.title,
      x,
      y,
      w,
      h,
      z,
      minimized: false,
      maximized: mobile,
      payload: opts?.payload,
    }
    set({ windows: [...state.windows, win], topZ: z })
    return win.id
  },

  close: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focus: (id) =>
    set((s) => {
      if (!s.windows.some((w) => w.id === id)) return s
      const z = s.topZ + 1
      return {
        topZ: z,
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, z, minimized: false } : w,
        ),
      }
    }),

  minimize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    })),

  toggleMax: (id) =>
    set((s) => {
      const { vw, availH } = viewport()
      return {
        windows: s.windows.map((w) => {
          if (w.id !== id) return w
          if (w.maximized && w.restore) {
            return { ...w, maximized: false, ...w.restore }
          }
          return {
            ...w,
            maximized: true,
            restore: { x: w.x, y: w.y, w: w.w, h: w.h },
            x: 0,
            y: TOPBAR_H,
            w: vw,
            h: availH,
          }
        }),
      }
    }),

  move: (id, x, y) =>
    set((s) => {
      const { vw, availH } = viewport()
      return {
        windows: s.windows.map((w) => {
          if (w.id !== id || w.maximized) return w
          const nx = Math.min(Math.max(x, 96 - w.w), vw - 96)
          const ny = Math.min(Math.max(y, TOPBAR_H), TOPBAR_H + availH - 38)
          return { ...w, x: nx, y: ny }
        }),
      }
    }),

  resize: (id, w, h, x, y) =>
    set((s) => ({
      windows: s.windows.map((win) => {
        if (win.id !== id || win.maximized) return win
        return {
          ...win,
          w: Math.max(340, Math.round(w)),
          h: Math.max(240, Math.round(h)),
          x: x === undefined ? win.x : Math.round(x),
          y: y === undefined ? win.y : Math.round(y),
        }
      }),
    })),

  snap: (id, dir) =>
    set((s) => {
      const { vw, availH } = viewport()
      return {
        windows: s.windows.map((w) => {
          if (w.id !== id) return w
          const restore = w.restore ?? { x: w.x, y: w.y, w: w.w, h: w.h }
          if (dir === 'max') {
            return { ...w, maximized: true, restore, x: 0, y: TOPBAR_H, w: vw, h: availH }
          }
          return {
            ...w,
            maximized: false,
            restore,
            x: dir === 'left' ? 0 : Math.round(vw / 2),
            y: TOPBAR_H,
            w: Math.round(vw / 2),
            h: availH,
          }
        }),
      }
    }),

  pushLine: (line) => set((s) => ({ terminal: [...s.terminal, line] })),
  clearTerminal: () => set({ terminal: [] }),

  say: (msg) => set({ mascot: { msg, t: Date.now() } }),
  clearSay: () => set({ mascot: null }),

  findEgg: (egg) =>
    set((s) => (s.found.includes(egg) ? s : { found: [...s.found, egg] })),

  setCrash: (on) => set({ crash: on }),
  setSnapHint: (dir) => set({ snapHint: dir }),
}))
