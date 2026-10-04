import type { ReactNode } from 'react'

export function AppShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`stagger p-5 sm:p-6 ${className}`}>{children}</div>
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-green-muted">
      {children}
    </div>
  )
}

export function PageTitle({
  kicker,
  title,
  sub,
}: {
  kicker: string
  title: string
  sub?: string
}) {
  return (
    <div>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {sub && (
        <p className="mt-1.5 max-w-[62ch] text-[13px] leading-relaxed text-subtext">
          {sub}
        </p>
      )}
    </div>
  )
}
