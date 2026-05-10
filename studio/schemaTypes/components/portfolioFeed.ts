import { defineType, defineField } from 'sanity'
import { InlineIcon } from '@sanity/icons'

export const portfolioFeed = defineType({
  name: 'portfolioFeed',
  title: 'Portfolio Feed',
  type: 'object',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Portfolio Feed',
        subtitle: heading,
        media: InlineIcon,
      }
    },
  },
})
