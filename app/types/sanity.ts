export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SocialLink {
  _key: string
  name: string
  url: string
}

export interface MainMenu {
  title: string
  url: string
}

export interface Settings {
  _id: string
  _type: 'settings'
  siteTitle?: string
  mainMenu?: MainMenu[]
  defaultMeta?: {
    image?: SanityImage
    imageUrl?: string // Resolved from GROQ: image.asset->url
    description?: string
  }
  socialMedia?: {
    socialLinks?: SocialLink[]
  }
  footer?: {
    tagline?: string
  }
}

// Base type for all page builder blocks
export interface BlockBase {
  _type: string
  _key: string
}

// Block types
export interface ArticleBlock extends BlockBase {
  _type: 'articleBlock'
  content?: PortableTextBlock[]
}

export type Block = ArticleBlock | PortfolioFeedBlock

// Portable Text block type (simplified)
export interface PortableTextBlock {
  _type: string
  _key: string
  children?: Array<{ text: string }>
  [key: string]: unknown
}

export interface Page {
  _id: string
  title: string
  slug: { current: string }
  pageMeta?: {
    image?: {
      asset?: {
        url: string
      }
    }
    description?: string
  }
  components?: Block[]
}

export interface Portfolio {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  previewImage?: {
    asset?: {
      url: string
    }
  }
  tagline?: string
  vimeoId?: string
  gallery?: Array<{
    _key: string
    alt?: string
    asset?: {
      _ref: string
    }
  }>
  intro?: string
  client?: PortableTextBlock[]
  scope?: PortableTextBlock[]
  technology?: string
  role?: string
  published?: string
}

// Portfolio preview for grid/feed display
export interface PortfolioPreview {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  previewImage?: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
}

// Portfolio Feed block type
export interface PortfolioFeedBlock extends BlockBase {
  _type: 'portfolioFeed'
  heading?: string
  intro?: string
  buttonCta?: {
    text?: string
    link?: {
      _ref?: string
      slug?: { current: string }
    }
  }
  feedType?: 'latest' | 'manual'
  selectedItems?: PortfolioPreview[]
  displayCount?: '3' | '6' | 'all'
}