import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

type PostContent = Record<string, unknown>

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const editorialTheme = {
  backdrop: 'bg-[radial-gradient(circle_at_top,rgba(196,118,55,0.18),transparent_0,transparent_38%),linear-gradient(180deg,#160f0f_0%,#1d1413_28%,#241916_48%,#f5ecdf_48.05%,#f7efe5_100%)]',
  masthead:
    'border-b border-white/8 bg-[rgba(19,13,12,0.9)] text-[#f5ead9] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(19,13,12,0.72)]',
  darkPanel:
    'border border-white/10 bg-[linear-gradient(180deg,rgba(34,22,20,0.9),rgba(22,14,13,0.96))] shadow-[0_28px_90px_rgba(0,0,0,0.35)]',
  darkSoft: 'border border-white/10 bg-white/[0.04]',
  paperPanel:
    'border border-[#d6c2aa] bg-[linear-gradient(180deg,rgba(255,251,245,0.97),rgba(251,244,235,0.96))] shadow-[0_28px_90px_rgba(69,38,20,0.10)]',
  paperSoft: 'border border-[#ddcab4] bg-[#fbf2e7]',
  copperButton:
    'bg-[linear-gradient(135deg,#d8874d,#f1b06c)] text-[#1f130f] shadow-[0_18px_40px_rgba(216,135,77,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(216,135,77,0.34)]',
  inkButton:
    'border border-[#3a2a24] bg-[#201513] text-[#f6ead7] transition duration-300 hover:bg-[#2b1c18]',
  copperText: 'text-[#d99057]',
  mutedDark: 'text-[#d5c1af]',
  mutedLight: 'text-[#7b6456]',
  titleDark: 'text-[#fff1e1]',
  titleLight: 'text-[#241612]',
  line: 'border-[#d9c4ac]',
  badge:
    'inline-flex items-center gap-2 rounded-full border border-[rgba(217,144,87,0.25)] bg-[rgba(217,144,87,0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d99057]',
} as const

export const emphasizedTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
export const archiveTasks = SITE_CONFIG.tasks.filter((task) => !task.enabled)

export function getPostContent(post: SitePost): PostContent {
  return post.content && typeof post.content === 'object' ? (post.content as PostContent) : {}
}

export function getPostImage(post: SitePost) {
  const content = getPostContent(post)
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof content.image === 'string' ? content.image : null
  const contentImages = Array.isArray(content.images) ? content.images.find((value) => typeof value === 'string' && value) : null
  const logo = typeof content.logo === 'string' ? content.logo : null
  return mediaUrl || contentImage || contentImages || logo || '/placeholder.svg?height=900&width=1400'
}

export function getPostExcerpt(post: SitePost, maxLength = 180) {
  const content = getPostContent(post)
  const description =
    typeof content.description === 'string'
      ? content.description
      : typeof content.body === 'string'
        ? content.body
        : typeof content.excerpt === 'string'
          ? content.excerpt
          : post.summary || ''
  const text = stripHtml(description)
  if (!text) return 'A considered piece designed for slower reading and stronger context.'
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}

export function getPostCategory(post: SitePost, fallback = 'Feature') {
  const content = getPostContent(post)
  const raw = typeof content.category === 'string' ? content.category : post.tags?.[0] || fallback
  const normalized = normalizeCategory(raw)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || raw
}

export function getPostLocation(post: SitePost) {
  const content = getPostContent(post)
  return typeof content.address === 'string'
    ? content.address
    : typeof content.location === 'string'
      ? content.location
      : ''
}

export function getPostAuthor(post: SitePost) {
  const content = getPostContent(post)
  return typeof content.author === 'string' && content.author.trim()
    ? content.author.trim()
    : post.authorName?.trim() || SITE_CONFIG.name
}

export function formatPostDate(value?: string | null) {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getReadingTime(post: SitePost) {
  const content = getPostContent(post)
  const raw =
    typeof content.body === 'string'
      ? content.body
      : typeof content.description === 'string'
        ? content.description
        : typeof content.excerpt === 'string'
          ? content.excerpt
          : post.summary || ''
  const words = stripHtml(raw).split(/\s+/).filter(Boolean).length
  return `${Math.max(3, Math.ceil(words / 180) || 3)} min read`
}

export function getTaskRoute(taskKey: TaskKey) {
  return SITE_CONFIG.taskViews[taskKey] || `/${taskKey}`
}
