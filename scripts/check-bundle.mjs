import { readdirSync, readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const dir = 'dist/assets'
const BUDGET = 250 * 1024

let total = 0
const rows = []
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.js')) continue
  const gz = gzipSync(readFileSync(join(dir, f))).length
  total += gz
  rows.push([f, gz])
}

rows.sort((a, b) => b[1] - a[1])
console.log('ScaliaOS bundle report (JS, gzipped):')
for (const [f, gz] of rows) {
  console.log(`${(gz / 1024).toFixed(1).padStart(7)} KB  ${f}`)
}
console.log(`${'-'.repeat(40)}`)
console.log(`${(total / 1024).toFixed(1).padStart(7)} KB  TOTAL`)

if (total > BUDGET) {
  console.error(
    `\n✗ bundle budget exceeded: ${(total / 1024).toFixed(1)} KB > ${BUDGET / 1024} KB`,
  )
  process.exit(1)
}
console.log('\n✓ within budget')
