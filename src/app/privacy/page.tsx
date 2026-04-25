import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import { editorialTheme } from '@/overrides/editorial-ui'

const sections = [
  { title: 'Data We Collect', body: 'Account information, usage analytics, and content you submit.' },
  { title: 'How We Use Data', body: 'To personalize your experience, improve search, and keep the platform secure.' },
  { title: 'Your Choices', body: 'You can manage email preferences and delete your account at any time.' },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we collect, use, and protect your information on this publication."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <div className={`rounded-[1.5rem] p-5 sm:p-6 ${editorialTheme.paperSoft}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className={editorialTheme.badge}>
              <Shield className="h-3.5 w-3.5" />
              Legal
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#8d6e5d]">Last updated · March 16, 2026</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#715a4c]">
            This page summarizes how we handle personal data in plain language. It uses the same legal substance as before, presented in a calmer, reading-friendly layout.
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
              Questions about this policy?{' '}
              <Link href="/contact" className="font-semibold text-[#9c6b4b] underline decoration-[#c9a082] underline-offset-4 hover:text-[#241612]">
                Contact us
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
