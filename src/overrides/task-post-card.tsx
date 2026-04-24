import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import Link from 'next/link'
import { ArrowUpRight, FileText, Layers3, MapPin } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Badge } from '@/components/ui/badge'
import { editorialTheme, formatPostDate, getPostCategory, getPostExcerpt, getPostImage, getPostLocation, getReadingTime } from '@/overrides/editorial-ui'

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
        className={`group flex h-full flex-col overflow-hidden rounded-[1.8rem] transition duration-300 hover:-translate-y-1 ${editorialTheme.paperPanel}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#201411]">
          <ContentImage
            src={getPostImage(post)}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            intrinsicWidth={1200}
            intrinsicHeight={760}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.38))]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <Badge className="rounded-full border-0 bg-[rgba(255,245,232,0.92)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b4a2f] shadow-none">
              {category}
            </Badge>
            <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              {getReadingTime(post)}
            </span>
          </div>
        </div>

        <div className={`flex flex-1 flex-col p-5 ${compact ? 'gap-2' : ''}`}>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#8b6d5a]">
            <span>{formatPostDate(post.publishedAt) || 'Current issue'}</span>
          </div>
          <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[#241612] transition group-hover:text-[#8d5335]">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#735c4f]">
            {getPostExcerpt(post, compact ? 110 : 165)}
          </p>
          <div className="mt-auto flex items-center justify-between pt-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#5a4338]">
              <FileText className="h-4 w-4 text-[#bf7b50]" />
              Story
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#9b6b49] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.45rem] border transition duration-300 hover:-translate-y-1 ${
        variant === 'image'
          ? 'border-[#d5bfab] bg-[#f7efe6]'
          : 'border-[#d8c5b0] bg-[rgba(255,251,245,0.9)]'
      } shadow-[0_18px_48px_rgba(69,38,20,0.08)]`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eadbcf]">
        <ContentImage
          src={getPostImage(post)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
          intrinsicWidth={900}
          intrinsicHeight={700}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#916c58]">
          <Layers3 className="h-3.5 w-3.5" />
          <span>{category}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-tight text-[#241612] transition group-hover:text-[#8d5335]">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-[#735c4f]">{getPostExcerpt(post, 112)}</p>
        <div className="mt-auto pt-4 text-xs text-[#866a5b]">
          {location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
          ) : (
            <span>Archive route available</span>
          )}
        </div>
      </div>
    </Link>
  )
}
