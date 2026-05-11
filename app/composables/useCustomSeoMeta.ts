// Sets up SEO meta tags with optional title suffix from siteTitle

interface SeoMetaOptions {
  siteTitle?: () => string | undefined
  title?: () => string | undefined
  description?: () => string | undefined
  image?: () => string | undefined
}

export function useCustomSeoMeta(options: SeoMetaOptions) {
  const formatTitle = () => {
    const title = options.title?.()
    const siteTitle = options.siteTitle?.()
    if (title && siteTitle) return `${title} - ${siteTitle}`
    return title || siteTitle
  }

  useSeoMeta({
    title: formatTitle,
    ogTitle: formatTitle,
    description: options.description,
    ogDescription: options.description,
    ogImage: options.image,
    twitterImage: options.image,
    twitterCard: 'summary_large_image',
  })
}
