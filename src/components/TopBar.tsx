import { useEffect, useState } from 'react'
import { Terminal } from 'lucide-react'
import { useOS } from '../store/os'

export default function TopBar() {
  const focusedTitle = useOS((s) => {
    const top = [...s.windows]
      .filter((w) => !w.minimized)
      .sort((a, b) => b.z - a.z)[0]
    return top?.title ?? 'Desktop'
  })
  const eggs = useOS((s) => s.found.length)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 20000)
    return () => window.clearInterval(t)
  }, [])

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <header className="absolute left-0 right-0 top-0 z-50 flex h-[30px] items-center gap-3 border-b border-blue-muted/30 bg-midnight/80 px-3 text-[11.5px] backdrop-blur-md">
      <div className="flex items-center gap-1.5 font-semibold text-text">
        <span className="grid h-4 w-4 place-items-center rounded-[5px] border border-green/50 text-green">
          <Terminal size={10} strokeWidth={2.2} />
        </span>
        ScaliaOS
      </div>
      <span className="hidden font-mono text-dim sm:block">
        sca@scaliaos:~
      </span>
      <span className="mx-auto min-w-0 truncate text-subtext">
        {focusedTitle}
      </span>
      {eggs > 0 && (
        <span className="hidden text-green-muted sm:block">
          {eggs} egg{eggs === 1 ? '' : 's'} found
        </span>
      )}
      <span className="font-mono text-subtext">{time}</span>
    </header>
  )
}
