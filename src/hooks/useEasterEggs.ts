import { useEffect } from 'react'
import { useOS } from '../store/os'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useEasterEggs() {
  const say = useOS((s) => s.say)
  const findEgg = useOS((s) => s.findEgg)

  useEffect(() => {
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[i]) {
        i += 1
        if (i === KONAMI.length) {
          i = 0
          findEgg('konami')
          say(
            '↑↑↓↓←→←→ B A — you found the konami egg. Type `play` in the terminal.',
          )
        }
      } else {
        i = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [say, findEgg])
}
