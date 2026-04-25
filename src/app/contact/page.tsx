import { Building2, Clock3, FileText, Image as ImageIcon, Mail, MapPin, Phone, Search, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { editorialTheme } from '@/overrides/editorial-ui'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      soft: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${productKind === 'editorial' ? 'bg-[linear-gradient(180deg,#17100f_0%,#241816_22%,#f6eee4_22.05%,#f6eee4_100%)]' : tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className={productKind === 'editorial' ? `rounded-[2rem] p-7 text-white sm:p-8 ${editorialTheme.darkPanel}` : ''}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${productKind === 'editorial' ? 'text-[#c9ac95]' : 'opacity-70'}`}>
                Contact {SITE_CONFIG.name}
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
                A contact page that feels like part of the publication, not an afterthought.
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${productKind === 'editorial' ? 'text-[#d8c3b2]' : tone.muted}`}>
                Tell us what you are trying to publish, fix, sponsor, or launch. The underlying form behavior stays the same, but the page now frames requests more clearly around editorial support, contributor help, and archive-related questions.
              </p>

              {productKind === 'editorial' ? (
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Pitches', 'Essays, columns, and issue ideas'],
                    ['Partnerships', 'Sponsorships, newsletters, campaigns'],
                    ['Archive help', 'Search, access, and publication support'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#caab93]">{label}</p>
                      <p className="mt-2 text-sm leading-7 text-[#efe2d3]">{value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${productKind === 'editorial' ? editorialTheme.paperPanel : tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${productKind === 'editorial' ? 'text-[#715a4c]' : tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${productKind === 'editorial' ? editorialTheme.paperPanel : tone.panel}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${productKind === 'editorial' ? 'text-[#9c6b4b]' : tone.muted}`}>Send a message</p>
                <h2 className="mt-2 text-2xl font-semibold">Tell us what you need.</h2>
              </div>
              {productKind === 'editorial' ? <Mail className="h-5 w-5 text-[#b17248]" /> : null}
            </div>

            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="h-12 rounded-full border border-current/10 bg-transparent px-4 text-sm" placeholder="Your name" />
                <input className="h-12 rounded-full border border-current/10 bg-transparent px-4 text-sm" placeholder="Email address" />
              </div>
              <input className="h-12 rounded-full border border-current/10 bg-transparent px-4 text-sm" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-[1.6rem] border border-current/10 bg-transparent px-4 py-3 text-sm" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${productKind === 'editorial' ? editorialTheme.copperButton : tone.action}`}>Send message</button>
            </form>

            <div className={`mt-8 grid gap-3 border-t pt-6 ${productKind === 'editorial' ? 'border-[#ddcab4]' : 'border-current/10'} sm:grid-cols-3`}>
              <div className={`rounded-[1.3rem] p-4 ${productKind === 'editorial' ? editorialTheme.paperSoft : tone.soft}`}>
                <Clock3 className="h-4 w-4" />
                <p className="mt-3 text-sm font-semibold">Response cadence</p>
                <p className={`mt-2 text-sm leading-7 ${productKind === 'editorial' ? 'text-[#715a4c]' : tone.muted}`}>Use the same contact flow, now framed with clearer expectations and calmer hierarchy.</p>
              </div>
              <div className={`rounded-[1.3rem] p-4 ${productKind === 'editorial' ? editorialTheme.paperSoft : tone.soft}`}>
                <Search className="h-4 w-4" />
                <p className="mt-3 text-sm font-semibold">Archive questions</p>
                <p className={`mt-2 text-sm leading-7 ${productKind === 'editorial' ? 'text-[#715a4c]' : tone.muted}`}>Reach out for help locating pages, content lanes, or publication surfaces across the site.</p>
              </div>
              <div className={`rounded-[1.3rem] p-4 ${productKind === 'editorial' ? editorialTheme.paperSoft : tone.soft}`}>
                <Sparkles className="h-4 w-4" />
                <p className="mt-3 text-sm font-semibold">Editorial fit</p>
                <p className={`mt-2 text-sm leading-7 ${productKind === 'editorial' ? 'text-[#715a4c]' : tone.muted}`}>Use the existing form to pitch, collaborate, or ask how a submission fits the publication tone.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
