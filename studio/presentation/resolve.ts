import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homePage: defineLocations({
      message: 'This document appears on the home page.',
      tone: 'positive',
      locations: [{ title: 'Home', href: '/' }],
    }),
  },
}
