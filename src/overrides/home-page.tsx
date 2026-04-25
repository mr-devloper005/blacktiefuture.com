import Link from 'next/link'
import { ArrowRight, BookOpenText, Search, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { editorialTheme, emphasizedTasks, formatPostDate, getPostAuthor, getPostCategory, getPostExcerpt, getPostImage, getReadingTime } from '@/overrides/editorial-ui'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  const articlePosts = await fetchTaskPosts('article', 7, { fresh: true })
  const lead = articlePosts[0]
  const features = articlePosts.slice(1, 4)
  const digest = articlePosts.slice(4, 7)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className={`min-h-screen ${editorialTheme.backdrop}`}>
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className={`overflow-hidden rounded-[2rem] p-6 text-white sm:p-8 lg:p-10 ${editorialTheme.darkPanel}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className={editorialTheme.badge}>
                  <Sparkles className="h-3.5 w-3.5" />
                  Black Tie Journal
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d8c3af]">
                  {emphasizedTasks[0]?.label || 'Articles'} first
                </span>
              </div>

              <div className="mt-8 max-w-4xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c9ac95]">
                  Independent publication
                </p>
                <h1 className={`mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${editorialTheme.titleDark}`}>
                  Write with heat. Publish with taste. Read without the clutter.
                </h1>
                <p className={`mt-6 max-w-2xl text-base leading-8 ${editorialTheme.mutedDark}`}>
                  {SITE_CONFIG.name} is an article-led publication built for essays, cultural notes, opinion, and crafted long-form work. The homepage highlights the current issue while the wider archive stays fully searchable and URL-accessible.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/articles" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.copperButton}`}>
                  Read the latest issue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <form action="/search" method="GET" className="mt-6 flex w-full max-w-2xl flex-col gap-3 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-3 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-black/10 px-4 py-3">
                  <Search className="h-4 w-4 text-[#d8c3af]" />
                  <input
                    name="q"
                    type="search"
                    placeholder="Search essays, people, and archive entries"
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#fff1e1] placeholder:text-[#c9ac95] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.inkButton}`}
                >
                  Search the archive
                  <Search className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {[
                  ['Cover stories', 'Lead with editorial hierarchy, not generic cards'],
                  ['Archive access', 'All routes stay available through search and archive links'],
                  ['Reading rhythm', 'Warmer contrast, calmer pacing, stronger typography'],
                ].map(([title, copy]) => (
                  <div key={title} className={`rounded-[1.4rem] p-4 ${editorialTheme.darkSoft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#caab93]">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#efe2d3]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className={`rounded-[2rem] p-5 sm:p-6 ${editorialTheme.paperPanel}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f6e5d]">From the desk</p>
                  <h2 className={`mt-2 text-2xl font-semibold ${editorialTheme.titleLight}`}>This issue</h2>
                </div>
                <BookOpenText className="h-5 w-5 text-[#b17248]" />
              </div>

              <div className="mt-5 space-y-5">
                {features.length ? features.map((post) => (
                  <Link
                    key={post.id}
                    href={`/articles/${post.slug}`}
                    className="block border-b border-[#e1d0bd] pb-5 last:border-b-0 last:pb-0"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b17248]">
                      {getPostCategory(post)}
                    </p>
                    <h3 className={`mt-2 text-xl font-semibold leading-tight ${editorialTheme.titleLight}`}>{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${editorialTheme.mutedLight}`}>{getPostExcerpt(post, 118)}</p>
                  </Link>
                )) : (
                  <div className={`rounded-[1.5rem] p-5 ${editorialTheme.paperSoft}`}>
                    <p className={`text-sm leading-7 ${editorialTheme.mutedLight}`}>Fresh articles will appear here as soon as the publication feed updates.</p>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {lead ? (
            <div className={`mt-8 overflow-hidden rounded-[2.2rem] ${editorialTheme.paperPanel}`}>
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <Link href={`/articles/${lead.slug}`} className="relative min-h-[320px] overflow-hidden bg-[#201411] lg:min-h-[520px]">
                  <ContentImage
                    src={getPostImage(lead)}
                    alt={lead.title}
                    fill
                    priority
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                    intrinsicWidth={1600}
                    intrinsicHeight={1000}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
                </Link>

                <div className="flex flex-col justify-between p-7 sm:p-8 lg:p-10">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a16a47]">Cover story</p>
                    <h2 className={`mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-[3rem] ${editorialTheme.titleLight}`}>
                      {lead.title}
                    </h2>
                    <div className={`mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${editorialTheme.mutedLight}`}>
                      <span>{getPostAuthor(lead)}</span>
                      {lead.publishedAt ? <span>{formatPostDate(lead.publishedAt)}</span> : null}
                      <span>{getReadingTime(lead)}</span>
                    </div>
                    <p className={`mt-6 max-w-2xl text-base leading-8 ${editorialTheme.mutedLight}`}>
                      {getPostExcerpt(lead, 220)}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/articles/${lead.slug}`} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.copperButton}`}>
                      Read feature
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${editorialTheme.inkButton}`}>
                      About the publication
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <h2 className={`mt-5 text-4xl font-semibold tracking-[-0.05em] ${editorialTheme.titleLight}`}>
                The homepage spotlights articles, while the wider system stays quietly accessible.
              </h2>
              <p className={`mt-5 max-w-xl text-sm leading-8 ${editorialTheme.mutedLight}`}>
                Article publishing remains the primary discovery surface. Search, archive links, and direct routes keep every supported task reachable without turning the homepage into a cluttered multi-product grid.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {digest.length ? digest.map((post) => (
                <TaskPostCard key={post.id} post={post} href={`/articles/${post.slug}`} taskKey="article" />
              )) : (
                <div className={`col-span-full rounded-[1.8rem] p-8 ${editorialTheme.paperPanel}`}>
                  <p className={`text-sm leading-7 ${editorialTheme.mutedLight}`}>New article cards will populate here automatically from the existing feed.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
