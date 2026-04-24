import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Independent editorial journal',
  },
  footer: {
    tagline: 'Essays, notes, and a searchable archive',
  },
  hero: {
    badge: 'Latest issue',
    title: ['A publication built for', 'essays, notes, and deliberate reading.'],
    description:
      'Discover crafted articles, commentary, and long-form pieces through a warmer, reading-first editorial experience.',
    primaryCta: {
      label: 'Read the issue',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Search the archive',
      href: '/search',
    },
    searchPlaceholder: 'Search essays, notes, and archive entries',
    focusLabel: 'Issue focus',
    featureCardBadge: 'cover story',
    featureCardTitle: 'Lead stories define the homepage like a current issue, not a generic feed.',
    featureCardDescription:
      'The newest articles stay central to discovery while preserving every underlying route and publishing behavior.',
  },
  home: {
    metadata: {
      title: 'An independent journal for essays and long-form reading',
      description:
        'Read thoughtful articles, commentary, and slower long-form work through a distinctive editorial publication shell.',
      openGraphTitle: 'An independent journal for essays and long-form reading',
      openGraphDescription:
        'Discover essays, cultural notes, and article-led publishing through a warmer, premium reading-first design.',
      keywords: ['independent journal', 'article publication', 'editorial essays', 'long-form reading'],
    },
    introBadge: 'About the publication',
    introTitle: 'Built to feel like a journal issue instead of a recycled multi-task template.',
    introParagraphs: [
      'This site centers article publishing first, with stronger hierarchy for cover stories, cleaner archive discovery, and a calmer reading rhythm across the full experience.',
      'Supporting routes still exist beneath the same system, but the homepage, navigation, and major discovery surfaces now behave like a publication rather than a generic all-tasks product grid.',
      'Visitors can begin with a lead essay, move into the archive, and continue into lower-emphasis routes only when they want to explore beyond the main editorial lane.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Homepage led by cover-story composition and issue-style support columns.',
      'Navbar and CTA surfaces prioritize articles over every other task.',
      'Archive routes remain accessible without competing with the primary editorial focus.',
      'Lighter motion and stronger typography keep the experience fast and readable.',
    ],
    primaryLink: {
      label: 'Browse articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Search archive',
      href: '/search',
    },
  },
  cta: {
    badge: 'Keep reading',
    title: 'Move from the current issue into the full archive without losing the editorial feel.',
    description:
      'Read the newest pieces, search older work, and keep every route accessible through a publication-first visual system.',
    primaryCta: {
      label: 'Open Articles',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Search Archive',
      href: '/search',
    },
  },
  taskSectionHeading: 'Latest from {label}',
  taskSectionDescriptionSuffix: 'Browse the newest work in this archive.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and essays',
    description: 'Read essays, commentary, features, and long-form posts in a publication-first archive.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, essays, and long-form reading',
    paragraphs: [
      'This section is built for essays, reported notes, commentary, and longer reading designed to feel like a deliberate publication archive.',
      'The visual system gives stories more room to breathe, with clearer hierarchy, warmer contrast, and less template repetition than the broader base repo.',
      'Use this archive to move between recent pieces and older work while keeping supporting routes available only when they are actually useful.',
    ],
    links: [],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
