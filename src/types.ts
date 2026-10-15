export type AppId =
  | 'home'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'contact'
  | 'terminal'
  | 'explorer'
  | 'case'
  | 'writings'
  | 'read'
  | 'game'

export interface WinState {
  id: string
  app: AppId
  title: string
  x: number
  y: number
  w: number
  h: number
  z: number
  minimized: boolean
  maximized: boolean
  restore?: { x: number; y: number; w: number; h: number }
  payload?: string
}

export interface TerminalLine {
  kind: 'in' | 'out' | 'err' | 'ok'
  text: string
}

export interface AppProps {
  winId: string
  payload?: string
}
