const ACTIVITY = [
  'Shipped AI roster scheduler (+25% retention)',
  'Rebuilt pi-workflow around Pi',
  'Cracking custom-recurrence date math',
  'Built ScaliaOS — this portfolio',
]

export default function ActivityWidget() {
  return (
    <div className="widget w-[224px] p-3">
      <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-green-muted">
        Recent activity
      </div>
      <ul className="flex flex-col gap-1.5 text-[11.5px] leading-snug text-subtext">
        {ACTIVITY.map((a) => (
          <li key={a} className="flex gap-2">
            <span className="text-green">✓</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
