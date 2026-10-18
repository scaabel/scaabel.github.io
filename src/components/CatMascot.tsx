import { useEffect, useState } from 'react'
import { useOS, DOCK_H } from '../store/os'

const LINES = [
  'mrrp?',
  'I knocked your bugs off the table.',
  'psst, try the konami code.',
  'I left something in the terminal.',
  'purring at 60fps.',
  "you're hired. - the cat",
]

const REACTIONS = [
  'that command looked important.',
  "I'd have written it in Rust. just kidding.",
  'meow.',
  'logged it. purr-ocessing.',
  'noted, human.',
]

const HIDDEN = [
  'the terminal remembers. try `cat secrets.txt`.',
  'you seem nice. type `play` sometime.',
  'there is a fake crash waiting to happen. type `crash`.',
  'someone left a `neofetch` lying around.',
]

function Cat({ happy }: { happy: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="54"
      height="54"
      aria-hidden="true"
      className="cat-bob drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
    >
      <path
        d="M50 44 C60 40 60 28 52 26"
        fill="none"
        stroke="#355477"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M15 24 L19 7 L30 18 Z"
        fill="#111e2d"
        stroke="#355477"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M49 24 L45 7 L34 18 Z"
        fill="#111e2d"
        stroke="#355477"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M19 20 L21 11 L27 17 Z" fill="#66567d" opacity="0.5" />
      <path d="M45 20 L43 11 L37 17 Z" fill="#66567d" opacity="0.5" />
      <ellipse
        cx="32"
        cy="34"
        rx="18"
        ry="15.5"
        fill="#111e2d"
        stroke="#355477"
        strokeWidth="2"
      />
      <ellipse
        cx="25"
        cy="33"
        rx="2.6"
        ry={happy ? 1.2 : 3}
        fill="#b7e85b"
      />
      <ellipse
        cx="39"
        cy="33"
        rx="2.6"
        ry={happy ? 1.2 : 3}
        fill="#b7e85b"
      />
      <path d="M32 38 L30 40 L34 40 Z" fill="#c989a0" />
      <path
        d="M32 40 Q29 44 26 41 M32 40 Q35 44 38 41"
        fill="none"
        stroke="#687988"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 33 H20 M12 37 H20 M52 33 H44 M52 37 H44"
        stroke="#465563"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function CatMascot() {
  const mascot = useOS((s) => s.mascot)
  const say = useOS((s) => s.say)
  const clearSay = useOS((s) => s.clearSay)
  const findEgg = useOS((s) => s.findEgg)
  const termLen = useOS((s) => s.terminal.length)
  const lastKind = useOS(
    (s) => s.terminal[s.terminal.length - 1]?.kind ?? 'out',
  )
  const [happy, setHappy] = useState(false)

  useEffect(() => {
    if (!mascot) return
    const t = window.setTimeout(clearSay, 6500)
    return () => window.clearTimeout(t)
  }, [mascot, clearSay])

  useEffect(() => {
    const t = window.setInterval(() => {
      say(HIDDEN[Math.floor(Math.random() * HIDDEN.length)])
    }, 42000)
    return () => window.clearInterval(t)
  }, [say])

  useEffect(() => {
    if (lastKind !== 'in') return
    if (Math.random() < 0.4) {
      setHappy(true)
      say(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])
      window.setTimeout(() => setHappy(false), 1400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termLen, lastKind, say])

  const pet = () => {
    findEgg('cat-pet')
    setHappy(true)
    say(LINES[Math.floor(Math.random() * LINES.length)])
    window.setTimeout(() => setHappy(false), 1400)
  }

  return (
    <div className="absolute z-40" style={{ right: 18, bottom: DOCK_H + 6 }}>
      {mascot && (
        <div className="absolute bottom-[62px] right-0 w-max max-w-[230px] rounded-xl border border-green/40 bg-midnight/95 px-3 py-2 text-[11.5px] leading-snug text-subtext shadow-lg shadow-black/50 backdrop-blur-md">
          {mascot.msg}
        </div>
      )}
      <button
        type="button"
        onClick={pet}
        aria-label="Pet the ScaliaOS cat"
        title="pet the cat"
        className="block cursor-pointer"
      >
        <Cat happy={happy} />
      </button>
    </div>
  )
}
