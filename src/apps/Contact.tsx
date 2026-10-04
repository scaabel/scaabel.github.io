import { Code2, Mail, MapPin, Send } from 'lucide-react'
import { AppShell, PageTitle } from './shared'

const LINKS = [
  {
    icon: Mail,
    label: 'email',
    value: 'ariev.scalia@gmail.com',
    href: 'mailto:ariev.scalia@gmail.com',
  },
  {
    icon: Code2,
    label: 'github',
    value: 'github.com/scaabel',
    href: 'https://github.com/scaabel',
  },
  {
    icon: Send,
    label: 'dev.to',
    value: 'dev.to/scaabel',
    href: 'https://dev.to/scaabel',
  },
]

export default function Contact() {
  return (
    <AppShell className="flex flex-col gap-5">
      <PageTitle
        kicker="contact.txt"
        title="Let's build something"
        sub="Open to senior and full-stack roles, interesting problems, and anything that actually ships."
      />

      <div className="flex flex-col gap-2">
        {LINKS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="card flex items-center gap-3 p-3 transition hover:-translate-y-0.5 hover:border-green/40"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-blue-muted/40 text-green">
              <Icon size={15} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] text-text">{label}</span>
              <span className="block truncate text-[12px] text-muted">
                {value}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[12px] text-muted">
        <MapPin size={13} className="text-green-muted" /> Malaysia · remote-friendly
      </div>
    </AppShell>
  )
}
