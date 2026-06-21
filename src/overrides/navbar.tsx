'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { archiveTasks, editorialTheme } from '@/overrides/editorial-ui'

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={`sticky top-0 z-50 w-full ${editorialTheme.masthead}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[rgba(217,144,87,0.24)] bg-[rgba(217,144,87,0.08)] p-0.5">
              <img
                src="/favicon.png?v=20260401"
                alt={`${SITE_CONFIG.name} logo`}
                width="44"
                height="44"
                className="h-full w-full min-h-0 min-w-0 origin-center scale-150 object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xl font-semibold tracking-[-0.03em] text-[#f7ebda]">{SITE_CONFIG.name}</span>
            </div>
          </Link>

        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <form action="/search" method="GET" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2">
            <Search className="ml-2 h-4 w-4 text-[#c6b09f]" />
            <input
              name="q"
              type="search"
              placeholder="Search the archive"
              className="w-52 bg-transparent text-sm text-[#f6ebd7] placeholder:text-[#c6b09f] outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[rgba(217,144,87,0.16)] px-4 py-2 text-sm font-semibold text-[#ffe7d2] transition hover:bg-[rgba(217,144,87,0.24)]"
            >
              Search
            </button>
          </form>
          <Button asChild className={`rounded-full px-5 ${editorialTheme.copperButton}`}>
            <Link href="/articles">Start reading</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" asChild className="rounded-full text-[#f6ebd7] hover:bg-white/8 hover:text-white">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#f6ebd7] hover:bg-white/8 hover:text-white"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/8 bg-[rgba(16,11,10,0.96)] lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <form action="/search" method="GET" className="mb-4 flex items-center gap-2 rounded-[1.2rem] border border-white/8 bg-white/[0.04] p-2">
              <Search className="ml-2 h-4 w-4 text-[#d8c4b3]" />
              <input
                name="q"
                type="search"
                placeholder="Search the archive"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#f6ebd7] placeholder:text-[#c6b09f] outline-none"
              />
              <button
                type="submit"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[rgba(217,144,87,0.24)] bg-[rgba(217,144,87,0.12)] px-4 py-2 text-sm font-semibold text-[#ffe7d2]"
              >
                Go
              </button>
            </form>
            <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#b79680]">Archive routes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {archiveTasks.map((task) => (
                  <Link
                    key={task.key}
                    href={task.route}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#d7c4b4]"
                  >
                    {task.label}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
