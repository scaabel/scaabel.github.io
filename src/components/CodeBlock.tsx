import type { ReactNode } from 'react'

const TOKEN =
  /(\/\/.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(import|export|default|from|const|let|var|return|function|if|else|await|async|new|type|interface|for|of)\b|\b(\d+)\b/g

function highlight(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const cls = m[1]
      ? 'text-dim italic'
      : m[2]
        ? 'text-warmyellow'
        : m[3]
          ? 'text-green'
          : 'text-peach'
    parts.push(
      <span key={i++} className={cls}>
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export default function CodeBlock({
  code,
  showLineNumbers = true,
  className = '',
}: {
  code: string
  showLineNumbers?: boolean
  className?: string
}) {
  const lines = code.replace(/\n$/, '').split('\n')
  return (
    <pre
      className={`overflow-auto rounded-lg border border-blue-muted/35 bg-term/90 p-3 font-mono text-[12px] leading-[1.75] text-subtext ${className}`}
    >
      <code>
        {lines.map((line, n) => (
          <div key={n} className="flex">
            {showLineNumbers && (
              <span className="mr-3 w-6 shrink-0 select-none text-right text-dim/70">
                {n + 1}
              </span>
            )}
            <span className="min-w-0 whitespace-pre">{highlight(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  )
}
