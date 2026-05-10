import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    settings: defineLocations({
      message: 'This document is used everywhere on the site.',
      tone: 'positive',
      locations: [{ title: 'Site (all pages)', href: '/' }],
    }),
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled page', href: `/${doc?.slug || ''}` },
        ],
      }),
    }),
    portfolio: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled portfolio item', href: `/portfolio/${doc?.slug || ''}` },
          { title: 'Portfolio index', href: `/portfolio` },
        ],
      }),
    }),
  },
}
