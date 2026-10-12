function Row({
  label,
  value,
  pct,
  tone = 'bg-green',
}: {
  label: string
  value: string
  pct: number
  tone?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[62px] shrink-0 font-mono text-[10px] tracking-[0.12em] text-muted">
        {label}
      </span>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-blueblack">
        <span
          className={`block h-full rounded-full ${tone}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-9 shrink-0 text-right font-mono text-[10.5px] text-subtext">
        {value}
      </span>
    </div>
  )
}

export default function SystemWidget() {
  return (
    <div className="widget w-[224px] p-3">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green-muted">
          System status
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Row label="CPU" value="12%" pct={12} />
        <Row label="MEMORY" value="34%" pct={34} />
        <Row label="PROJECTS" value="4" pct={33} />
        <Row label="COFFEE" value="8/10" pct={80} tone="bg-warmyellow" />
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-blue-muted/25 pt-2.5 text-[11px] text-subtext">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
        Building things…
      </div>
    </div>
  )
}
