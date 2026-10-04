import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import {
  House,
  FolderGit2,
  Cpu,
  User,
  Mail,
  Terminal,
  FolderTree,
  Gamepad2,
  Briefcase,
  type LucideIcon,
} from 'lucide-react'
import type { AppId, AppProps } from '../types'

export const APP_COMPONENTS: Record<
  AppId,
  LazyExoticComponent<ComponentType<AppProps>>
> = {
  home: lazy(() => import('../apps/Home')),
  about: lazy(() => import('../apps/About')),
  skills: lazy(() => import('../apps/Skills')),
  experience: lazy(() => import('../apps/Experience')),
  projects: lazy(() => import('../apps/Projects')),
  contact: lazy(() => import('../apps/Contact')),
  terminal: lazy(() => import('../apps/Terminal')),
  explorer: lazy(() => import('../apps/ProjectExplorer')),
  case: lazy(() => import('../apps/CaseStudy')),
  game: lazy(() => import('../apps/Game')),
}

export interface Shortcut {
  app: AppId
  label: string
  icon: LucideIcon
}

export const DESKTOP_ICONS: Shortcut[] = [
  { app: 'home', label: 'Home', icon: House },
  { app: 'projects', label: 'Projects', icon: FolderGit2 },
  { app: 'skills', label: 'Skills', icon: Cpu },
  { app: 'experience', label: 'Experience', icon: Briefcase },
  { app: 'about', label: 'About', icon: User },
  { app: 'contact', label: 'Contact', icon: Mail },
]

export const DOCK_ICONS: Shortcut[] = [
  { app: 'terminal', label: 'Terminal', icon: Terminal },
  { app: 'explorer', label: 'Project Explorer', icon: FolderTree },
  { app: 'projects', label: 'Projects', icon: FolderGit2 },
  { app: 'skills', label: 'Skills', icon: Cpu },
  { app: 'contact', label: 'Contact', icon: Mail },
  { app: 'game', label: 'Bug Hunter', icon: Gamepad2 },
]
