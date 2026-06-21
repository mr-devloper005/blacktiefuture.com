import Link from 'next/link'
import { ArrowRight, Headset, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { editorialTheme, emphasizedTasks } from '@/overrides/editorial-ui'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const primaryTask = emphasizedTasks[0]

  return (
    <footer className="border-t border-[#d8c5b0] bg-[linear-gradient(180deg,#f8f1e7_0%,#f1e4d5_100%)] text-[#241612]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <div className={`rounded-[2rem] p-7 ${editorialTheme.paperPanel}`}>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
            <p className="mt-4 max-w-xl text-sm leading-8 text-[#715a4c]">
              A warmer editorial shell for essays, commentary, and long-form reading. Articles lead the product, while every supporting route remains reachable through archive links, search, and direct URLs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.copperButton}`}>
                Browse articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.inkButton}`}>
                Contact us
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="/help" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.inkButton}`}>
                Help center
                <Headset className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#d8c5b0] pt-5 text-sm text-[#7a6457] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/articles" className="hover:text-[#241612]">Articles</Link>
            <Link href="/about" className="hover:text-[#241612]">About us</Link>
            <Link href="/help" className="hover:text-[#241612]">Help center</Link>
            <Link href="/privacy" className="hover:text-[#241612]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#241612]">Terms</Link>
            <Link href="/contact" className="hover:text-[#241612]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
