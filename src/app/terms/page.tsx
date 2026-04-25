import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Scale } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { editorialTheme } from '@/overrides/editorial-ui'

const sections = [
  { title: 'Account Usage', body: 'Keep your account secure and follow community guidelines.' },
  {
    title: 'Content Ownership',
    body: 'You own the content you publish and grant the platform a license to display it.',
  },
  { title: 'Acceptable Use', body: 'No spam, harassment, or illegal content.' },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules and guidelines for using ${SITE_CONFIG.name} as a reader, contributor, or account holder.`}
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <div className={`rounded-[1.5rem] p-5 sm:p-6 ${editorialTheme.paperSoft}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className={editorialTheme.badge}>
              <Scale className="h-3.5 w-3.5" />
              Legal
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#8d6e5d]">Last updated · March 16, 2026</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#715a4c]">
            These terms set expectations for use of the site. The underlying rules are unchanged; this is a clearer, publication-style presentation.
          </p>
        </div>

        <Card className={`overflow-hidden border-0 shadow-none ${editorialTheme.paperPanel}`}>
          <CardContent className="space-y-5 p-6 sm:p-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.25rem] border border-[#e4d2c0] bg-[rgba(255,252,248,0.9)] p-5 transition hover:border-[#d4b89a]"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#241612]">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#715a4c]">{section.body}</p>
              </div>
            ))}
            <p className="border-t border-[#ddcab4] pt-6 text-sm leading-7 text-[#715a4c]">
              Need help interpreting these terms?{' '}
              <Link href="/contact" className="font-semibold text-[#9c6b4b] underline decoration-[#c9a082] underline-offset-4 hover:text-[#241612]">
                Get in touch
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
