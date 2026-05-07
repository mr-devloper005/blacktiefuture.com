import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import Link from 'next/link'
import { ArrowRight, Layers3, MapPin } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { editorialTheme, getPostCategory, getPostExcerpt, getPostImage, getPostLocation, getReadingTime } from '@/overrides/editorial-ui'

export const TASK_POST_CARD_OVERRIDE_ENABLED = true

export function TaskPostCardOverride({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  const variant = taskKey || 'article'
  const isArticle = variant === 'article'
  const category = getPostCategory(post, isArticle ? 'Feature' : 'Archive')
  const location = getPostLocation(post)

  if (isArticle) {
    return (
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8d5c4] bg-[linear-gradient(145deg,#fffbf7_0%,#f9f2e8_100%)] shadow-[0_2px_8px_rgba(139,94,59,0.04)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(139,94,59,0.12)] hover:-translate-y-1"
      >
        {/* Top accent line */}
        <div className="h-1 w-full bg-[linear-gradient(90deg,#c1784a_0%,#d9966a_50%,#c1784a_100%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Horizontal layout: Image left, content right */}
        <div className="flex flex-1 flex-col sm:flex-row">
          {/* Image section - unique angled edge */}
          <div className="relative w-full sm:w-2/5 overflow-hidden">
            <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
              <ContentImage
                src={getPostImage(post)}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 30vw, 280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                intrinsicWidth={600}
                intrinsicHeight={450}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fffbf7]/90 sm:to-[#fffbf7]/95 hidden sm:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fffbf7] via-transparent to-transparent sm:hidden" />
            </div>
            {/* Reading time badge - floating */}
            <div className="absolute bottom-3 left-3 sm:bottom-auto sm:top-3 sm:left-auto sm:right-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a1f1a]/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#f5e6d3] backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-[#d9966a]" />
                {getReadingTime(post)}
              </span>
            </div>
          </div>

          {/* Content section */}
          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div>
              {/* Category with decorative line */}
              <div className="flex items-center gap-2">
                <span className="h-px w-4 bg-[#c1784a]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67c52]">
                  {category}
                </span>
              </div>

              {/* Title - larger, more prominent */}
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.01em] text-[#2d2420] transition-colors duration-300 group-hover:text-[#8d5a3a]">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#6b5a4e]">
                {getPostExcerpt(post, compact ? 90 : 120)}
              </p>
            </div>

            {/* Footer with read link */}
            <div className="mt-4 flex items-center justify-between border-t border-[#e8d5c4]/60 pt-4">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#8d5a3a] transition-all duration-300 group-hover:gap-3">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4b896] bg-[#faf5ef] transition-all duration-300 group-hover:border-[#c1784a] group-hover:bg-[#c1784a]">
                <ArrowRight className="h-3.5 w-3.5 text-[#8d5a3a] transition-colors duration-300 group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Non-article cards - also redesigned with unique style
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0d0c0] bg-[#fdfbf8] shadow-[0_2px_6px_rgba(139,94,59,0.03)] transition-all duration-500 hover:shadow-[0_10px_32px_rgba(139,94,59,0.1)] hover:-translate-y-1"
    >
      {/* Corner accent */}
      <div className="absolute -right-8 -top-8 h-16 w-16 bg-[#c1784a]/10 transition-all duration-500 group-hover:bg-[#c1784a]/20 rotate-45" />

      <div className="relative aspect-[16/10] overflow-hidden">
        <ContentImage
          src={getPostImage(post)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          intrinsicWidth={800}
          intrinsicHeight={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf8] via-transparent to-transparent opacity-40" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a08060]">
          <Layers3 className="h-3.5 w-3.5" />
          <span>{category}</span>
        </div>
        <h3 className="mt-2.5 text-lg font-semibold leading-snug text-[#2d2420] transition-colors duration-300 group-hover:text-[#8d5a3a]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6b5a4e]">
          {getPostExcerpt(post, 100)}
        </p>
        <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#8a7868]">
          {location ? (
            <>
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </>
          ) : (
            <span className="italic opacity-70">Archive route available</span>
          )}
        </div>
      </div>
    </Link>
  )
}
