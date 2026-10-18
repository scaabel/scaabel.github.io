// src/data/projects.ts (interface + exported array), rendered by src/apps/Read.tsx.
export interface Writing {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  link?: string
  body: string[]
  diagram?: { before: string; after: string }
  snippets?: { label: string; file: string; code: string }[]
}

export const writings: Writing[] = [
  {
    slug: 'temporal-cron-misconceptions',
    title: 'Temporal cron misconceptions',
    date: '2024',
    excerpt:
      'One Temporal cron Schedule per user overloaded our roster worker, and the sleep() based workflow that replaced it.',
    tags: ['Temporal', 'Cron', 'Scheduling', 'Workflows'],
    body: [
      "During development of the recurring weekly/bi-weekly AI rostering feature, we chose Temporal cron to handle generating the upcoming week's (or two weeks') rosters. Users pick a preferred day and time, say Saturday 5pm, and the cron runs at that exact day and time each week.",
      'The setup was straightforward: a user sets their recurring day and time, and we update a Temporal scheduler (cron) accordingly, timezone-aware. It worked fine at first. But once users started adopting the feature, the server running the worker took on serious load. We were creating one scheduler per user instead of a single scheduler that handles every user\u2019s roster generation based on their settings.',
      'The next iteration dropped cron for a normal Temporal workflow with a delay via sleep(). Each user gets a workflow tied to them; the workflow fires at the right day and time based on the sleep() duration. Inside the workflow it checks leaves, holidays, availability and the rest. Once rosters are generated it spawns another workflow for the next upcoming schedule. If the user changes their settings, the existing workflow is deleted and a new one is spawned.',
    ],
    diagram: {
      before: '/diagrams/temporal-cron-before.svg',
      after: '/diagrams/temporal-cron-after.svg',
    },
    snippets: [
      {
        label: 'before: one cron Schedule per user',
        file: 'sync-user-schedule.ts',
        code: `import { Client, Connection } from '@temporalio/client'
import { generateRoster } from './workflows'

const client = new Client({ connection: await Connection.connect() })

// N users -> N cron Schedules, all feeding one worker
export async function syncUserSchedule(user: User) {
  const handle = client.schedule.getHandle(\`roster-\${user.id}\`)
  await handle.delete() // "update" = delete + recreate

  await client.schedule.create({
    scheduleId: \`roster-\${user.id}\`,
    spec: {
      cronExpressions: [user.cronExpression], // e.g. '0 17 * * SAT'
      timezone: user.timezone,
    },
    action: {
      type: 'startWorkflow',
      workflowType: generateRoster,
      taskQueue: 'roster',
      args: [user.id],
    },
  })
}`,
      },
      {
        label: 'after: self-continuing workflow via sleep()',
        file: 'roster-schedule.ts',
        code: `import { sleep, executeChild } from '@temporalio/workflow'

// one workflow per user: sleep until the chosen day/time, then chain the next run
export async function rosterSchedule(userId: string, nextRunAt: Date) {
  await sleep(nextRunAt.getTime() - Date.now())

  const leaves = await checkLeaves(userId)
  const holidays = await checkHolidays(userId)
  const availability = await checkAvailability(userId)

  await generateRoster(userId, { leaves, holidays, availability })

  // spawn the next run for the upcoming schedule
  await executeChild(rosterSchedule, {
    args: [userId, computeNextRunAt(userId)],
  })
}`,
      },
      {
        label: 'after: settings change',
        file: 'update-user-schedule.ts',
        code: `import { Client, Connection } from '@temporalio/client'
import { rosterSchedule } from './workflows'

const client = new Client({ connection: await Connection.connect() })

export async function onSettingsChanged(user: User) {
  const workflowId = \`roster-\${user.id}\`

  // kill the sleeping run, then start a fresh one from the new day/time
  await client.workflow.getHandle(workflowId).terminate()
  await client.workflow.start(rosterSchedule, {
    workflowId,
    taskQueue: 'roster',
    args: [user.id, computeNextRunAt(user)],
  })
}`,
      },
    ],
  },
  {
    slug: 'kerb-bluetooth-car-detection',
    title: 'Kerb: from Android Auto to Bluetooth detection',
    date: '2026',
    excerpt:
      'Why Kerb moved from Android Auto disconnect signals to Bluetooth, and how onboarding solves telling your car apart from your smartwatch.',
    tags: ['Kerb', 'Android', 'Bluetooth', 'Android Auto', 'UX'],
    body: [
      'Kerb started with a simple goal, fire a reminder the moment I leave the car. My first idea was to use Android Auto. When the head unit disconnects, it means the driver has left. That assumption did not hold up for long.',
      'Not all head units provide Android Auto. Some only offer CarPlay, or need an app like Zlink as a proxy to bridge the gap. On the head units that do provide it, the disconnect is also quite late. It usually fires a few minutes after I have already left the car, which is too late for a “don’t forget your bags” reminder.',
      'So I decided to use Bluetooth instead. It is universal, and most people connect their phones to their car’s Bluetooth anyway.',
      'The problem is telling one Bluetooth connection apart from another. Users might have other devices connected at the same time, like a smartwatch or earbuds. Android has a few ways to identify the connection using the Advanced Audio Distribution Profile (A2DP), Hands-Free Profile (HFP), and Bluetooth Low Energy (BLE), but it is too complicated for what the feature needs.',
      'The easiest way turned out to be the user. During onboarding, Kerb shows the list of Bluetooth devices already synced to the phone and asks the user to pick their car. From then on, it only listens to that specific connection for connect and disconnect events. No profile guessing, no figuring out which connected device is the car.',
      'It is a small bit of setup, but it turns a vague signal into a clear one. The user tells Kerb which device is the car, and Kerb does not have to infer it.',
    ],
  },
]
