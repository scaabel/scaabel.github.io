const NOTES = [
  'Build useful things',
  'Learn something difficult',
  'Keep things simple',
  'Ship often',
  "Don't forget the cats 🐈",
]

export default function NotesWidget() {
  return (
    <div className="sticky-note w-[224px] p-3.5">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warmyellow">
          Quick notes
        </span>
        <span className="text-warmyellow/70" aria-hidden="true">
          ✎
        </span>
      </div>
      <ul className="flex flex-col gap-1.5 text-[11.5px] leading-snug text-subtext">
        {NOTES.map((n) => (
          <li key={n} className="flex gap-2">
            <span className="text-warmyellow/80">•</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
