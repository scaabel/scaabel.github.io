import WindowView from './Window'
import { useOS } from '../store/os'

export default function WindowManager() {
  const ids = useOS((s) => s.windows.map((w) => w.id).join('|'))
  if (!ids) return null
  return (
    <>
      {ids.split('|').map((id) => (
        <WindowView key={id} id={id} />
      ))}
    </>
  )
}
