const BUILDINGS = [
  { x: 30, w: 58, h: 176 },
  { x: 100, w: 46, h: 248 },
  { x: 158, w: 66, h: 150 },
  { x: 236, w: 52, h: 292 },
  { x: 300, w: 74, h: 208 },
  { x: 386, w: 44, h: 168 },
  { x: 442, w: 60, h: 260 },
  { x: 514, w: 50, h: 196 },
  { x: 576, w: 70, h: 320 },
  { x: 660, w: 46, h: 180 },
  { x: 718, w: 58, h: 240 },
  { x: 790, w: 66, h: 158 },
  { x: 868, w: 48, h: 286 },
  { x: 928, w: 62, h: 210 },
  { x: 1002, w: 52, h: 168 },
  { x: 1066, w: 68, h: 254 },
  { x: 1146, w: 46, h: 190 },
  { x: 1204, w: 60, h: 300 },
  { x: 1276, w: 54, h: 176 },
  { x: 1342, w: 66, h: 232 },
]

function Skyline() {
  return (
    <g>
      {BUILDINGS.map((b, i) => (
        <rect
          key={`b${i}`}
          x={b.x}
          y={880 - b.h}
          width={b.w}
          height={b.h}
          fill="#060d17"
          opacity="0.92"
        />
      ))}
      {BUILDINGS.flatMap((b, bi) => {
        const cols = Math.max(2, Math.floor(b.w / 22))
        const rows = Math.max(2, Math.floor(b.h / 42))
        const cells = []
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if ((bi + r * 3 + c * 5) % 4 === 0) continue
            cells.push(
              <rect
                key={`w${bi}-${r}-${c}`}
                x={b.x + 9 + c * 22}
                y={880 - b.h + 13 + r * 42}
                width="6"
                height="8"
                rx="1"
                fill="#e79a70"
                opacity={0.2 + ((bi + r + c) % 4) * 0.08}
              />,
            )
          }
        }
        return cells
      })}
    </g>
  )
}

function Workspace() {
  return (
    <g>
      {/* plant */}
      <g>
        <path d="M118 848l9-34h34l9 34z" fill="#0a1018" opacity="0.96" />
        <rect x="112" y="808" width="62" height="11" rx="3" fill="#0d1622" />
        <g
          fill="none"
          stroke="#2f4a3a"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.85"
        >
          <path d="M143 808q-6-34-26-46" />
          <path d="M143 808q4-40 24-52" />
          <path d="M143 808q-2-26 2-44" />
        </g>
        <g fill="#37584a" opacity="0.85">
          <ellipse cx="114" cy="760" rx="10" ry="16" transform="rotate(-24 114 760)" />
          <ellipse cx="168" cy="754" rx="10" ry="16" transform="rotate(22 168 754)" />
          <ellipse cx="144" cy="762" rx="9" ry="15" />
        </g>
      </g>

      {/* books */}
      <g opacity="0.96">
        <rect x="1168" y="824" width="132" height="15" rx="3" fill="#1b3a52" />
        <rect x="1178" y="809" width="114" height="15" rx="3" fill="#55465f" />
        <rect x="1188" y="794" width="98" height="15" rx="3" fill="#6b5a2e" />
        <rect x="1224" y="794" width="7" height="15" fill="#e6c875" opacity="0.75" />
      </g>

      {/* black-and-white cat */}
      <g>
        <path
          d="M1002 838q34 4 30-22"
          fill="none"
          stroke="#05080e"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <ellipse cx="980" cy="818" rx="20" ry="30" fill="#05080e" />
        <circle cx="976" cy="784" r="15" fill="#05080e" />
        <path d="M964 774l-3-16 13 8z" fill="#05080e" />
        <path d="M986 773l5-15-12 9z" fill="#05080e" />
        <ellipse cx="972" cy="806" rx="8" ry="12" fill="#e8eef2" opacity="0.8" />
        <ellipse cx="970" cy="846" rx="8" ry="4" fill="#e8eef2" opacity="0.8" />
        <ellipse cx="988" cy="846" rx="8" ry="4" fill="#e8eef2" opacity="0.8" />
        <circle cx="970" cy="783" r="1.8" fill="#e6c875" />
        <circle cx="982" cy="783" r="1.8" fill="#e6c875" />
      </g>
    </g>
  )
}

export default function Wallpaper() {
  return (
    <div className="wallpaper" aria-hidden="true">
      <svg
        className="wallpaper-scene"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* distant mountains */}
        <path
          d="M0 604l180-84 150 70 140-92 170 100 160-62 180 72 160-90 140 82 160-56v456H0z"
          fill="#0a1526"
          opacity="0.5"
        />
        <Skyline />
        <rect x="0" y="838" width="1440" height="62" fill="#04080f" opacity="0.96" />
        <Workspace />
      </svg>
      <div className="wallpaper-grain" />
    </div>
  )
}
