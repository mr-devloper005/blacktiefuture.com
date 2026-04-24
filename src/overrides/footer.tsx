import Link from 'next/link'
import { ArrowRight, LibraryBig, Search, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { editorialTheme, emphasizedTasks } from '@/overrides/editorial-ui'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const primaryTask = emphasizedTasks[0]

  return (
    <footer className="border-t border-[#d8c5b0] bg-[linear-gradient(180deg,#f8f1e7_0%,#f1e4d5_100%)] text-[#241612]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${editorialTheme.paperPanel}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfc8b2] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9c6b4b]">
              <Sparkles className="h-3.5 w-3.5" />
              Publication note
            </div>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
            <p className="mt-4 max-w-xl text-sm leading-8 text-[#715a4c]">
              A warmer editorial shell for essays, commentary, and long-form reading. Articles lead the product, while every supporting route remains reachable through archive links, search, and direct URLs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.copperButton}`}>
                Browse articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.inkButton}`}>
                Search archive
                <Search className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <div className={`rounded-[1.8rem] p-6 ${editorialTheme.paperPanel}`}>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9c6b4b]">
                <LibraryBig className="h-3.5 w-3.5" />
                Primary surface
              </div>
              <div className="mt-4 space-y-3">
                <Link href="/" className="block text-base font-semibold hover:text-[#9c6b4b]">Home</Link>
                <Link href="/articles" className="block text-base font-semibold hover:text-[#9c6b4b]">Articles</Link>
                <Link href="/search" className="block text-base font-semibold hover:text-[#9c6b4b]">Search</Link>
                <Link href="/about" className="block text-base font-semibold hover:text-[#9c6b4b]">About</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#d8c5b0] pt-5 text-sm text-[#7a6457] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-[#241612]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#241612]">Terms</Link>
            <Link href="/contact" className="hover:text-[#241612]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
