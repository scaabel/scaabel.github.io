import CodeBlock from '../components/CodeBlock'
import { projects } from '../data/projects'

const FILE = 'src/store/os.ts'
const CODE = projects.find((p) => p.slug === 'scaliaos')?.snippet?.code ?? ''

export default function Editor() {
  return (
    <div className="flex h-full flex-col bg-term">
      {/* tabline */}
      <div className="flex items-center border-b border-blue-muted/30 bg-raised/60 font-mono text-[11.5px]">
        <span className="flex items-center gap-2 border-r border-blue-muted/30 bg-term px-3 py-1.5 text-subtext">
          <span className="h-1.5 w-1.5 rounded-full bg-green" /> {FILE}
        </span>
        <span className="px-3 py-1.5 text-dim">projects.ts</span>
        <span className="ml-auto pr-3 text-dim">nvim</span>
      </div>

      {/* code */}
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <CodeBlock code={CODE} />
      </div>

      {/* statusline */}
      <div className="flex items-center gap-3 border-t border-blue-muted/40 bg-green-dark/30 px-3 py-1.5 font-mono text-[11px]">
        <span className="rounded bg-green px-2 py-0.5 font-semibold text-[#08120a]">
          NORMAL
        </span>
        <span className="text-subtext">main</span>
        <span className="text-green-muted">±{projects.length} files</span>
        <span className="ml-auto text-dim">{FILE}</span>
        <span className="text-dim">ts</span>
        <span className="text-dim">utf-8</span>
        <span className="text-green-muted">Ln 1, Col 1</span>
      </div>
    </div>
  )
}
