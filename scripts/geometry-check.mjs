// Runnable self-check for the window-manager geometry math.
// Node 24 strips TypeScript types, so the store can be imported directly.
import assert from 'node:assert/strict'

globalThis.window = {
  innerWidth: 1280,
  innerHeight: 800,
  matchMedia: () => ({ matches: false }),
  addEventListener() {},
  removeEventListener() {},
}

const { useOS, viewport, TOPBAR_H } = await import('../src/store/os.ts')
const s = () => useOS.getState()

// open a window
const id = s().openApp('home')
assert.equal(s().windows.length, 1, 'one window opens')
assert.ok(s().windows[0].y >= TOPBAR_H, 'window opens within bounds')

// moving clamps so part of the window stays on screen
s().move(id, -9999, -9999)
let w = s().windows[0]
assert.equal(w.x, 96 - w.w, 'x clamped to right edge')
assert.equal(w.y, TOPBAR_H, 'y clamped to topbar')

s().move(id, 99999, 99999)
w = s().windows[0]
assert.equal(w.x, 1280 - 96, 'x clamped to left edge')

// resize enforces minimums
s().resize(id, 10, 10)
w = s().windows[0]
assert.equal(w.w, 340, 'min width enforced')
assert.equal(w.h, 240, 'min height enforced')

// snap left = half screen, full height
s().snap(id, 'left')
w = s().windows[0]
assert.equal(w.x, 0, 'snap left x')
assert.equal(w.w, 640, 'snap left width = half viewport')

// snap right
s().snap(id, 'right')
assert.equal(s().windows[0].x, 640, 'snap right x')

// maximize fills the working area
s().snap(id, 'max')
const { vw, availH } = viewport()
w = s().windows[0]
assert.equal(w.w, vw, 'max width')
assert.equal(w.h, availH, 'max height')
assert.equal(w.y, TOPBAR_H, 'max y')

// focus raises z-order
const id2 = s().openApp('skills')
const before = s().windows.find((x) => x.id === id2).z
s().focus(id)
assert.ok(
  s().windows.find((x) => x.id === id2).z === before,
  'unfocused window keeps its z',
)
assert.ok(
  s().windows.find((x) => x.id === id).z > before,
  'focused window is raised above the other',
)

// closing removes it
s().close(id)
assert.equal(s().windows.length, 1, 'close removes the window')

console.log('✓ window-manager geometry self-check passed')
