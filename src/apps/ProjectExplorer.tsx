import { FileCode, FileText, Folder, FolderOpen } from 'lucide-react'
import { projects } from '../data/projects'
import { useOS } from '../store/os'
import type { AppId } from '../types'
import { AppShell, Kicker } from './shared'

const FILES: { name: string; app: AppId }[] = [
  { name: 'about.txt', app: 'about' },
  { name: 'resume.txt', app: 'experience' },
  { name: 'skills.json', app: 'skills' },
  { name: 'contact.txt', app: 'contact' },
]

export default function ProjectExplorer() {
  const openApp = useOS((s) => s.openApp)
  return (
    <AppShell className="flex flex-col gap-4">
      <div>
        <Kicker>~/portfolio</Kicker>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text">
          Project Explorer
        </h2>
      </div>

      <div className="font-mono text-[12.5px]">
        <div className="flex items-center gap-2 text-subtext">
          <FolderOpen size={14} className="text-green" /> /home/sca
        </div>
        <div className="ml-4 mt-1.5 flex flex-col gap-0.5">
          {FILES.map((f) => (
            <button
              key={f.name}
              type="button"
              onClick={() => openApp(f.app)}
              className="flex items-center gap-2 rounded px-1.5 py-1 text-left text-subtext transition hover:bg-hover/60 hover:text-text"
            >
              <FileText size={13} className="text-blue-muted" />
              {f.name}
            </button>
          ))}

          <div className="flex items-center gap-2 px-1.5 py-1 text-subtext">
            <Folder size={13} className="text-warmyellow/70" /> projects
          </div>
          <div className="ml-5 flex flex-col gap-0.5">
            {projects.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() =>
                  openApp('case', { payload: p.slug, title: p.name })
                }
                className="flex items-center gap-2 rounded px-1.5 py-1 text-left text-subtext transition hover:bg-hover/60 hover:text-text"
              >
                <FileCode size={13} className="text-green-muted" />
                {p.slug}.md
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[11.5px] text-dim">
        double-click? we're lazy here — a single click is enough.
      </p>
    </AppShell>
  )
}
