import { useEffect, useState } from 'react'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import WindowManager from './components/WindowManager'
import TopBar from './components/TopBar'
import Dock from './components/Dock'
import CatMascot from './components/CatMascot'
import CrashOverlay from './components/CrashOverlay'
import { useEasterEggs } from './hooks/useEasterEggs'
import { useOS } from './store/os'

const bootedKey = 'scaliaos-booted'

export default function App() {
  const [booting, setBooting] = useState(() => {
    try {
      return !sessionStorage.getItem(bootedKey)
    } catch {
      return true
    }
  })
  const openApp = useOS((s) => s.openApp)

  useEasterEggs()

  useEffect(() => {
    if (booting) return
    if (useOS.getState().windows.length === 0) openApp('home')
  }, [booting, openApp])

  const done = () => {
    try {
      sessionStorage.setItem(bootedKey, '1')
    } catch {
      /* ignore */
    }
    setBooting(false)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-midnight">
      <div className="wallpaper" aria-hidden="true" />
      <Desktop />
      <WindowManager />
      <CatMascot />
      <TopBar />
      <Dock />
      <CrashOverlay />
      {booting && <BootScreen onDone={done} />}
    </div>
  )
}
