import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const portfolioFeatured = defineType({
  name: 'portfolioFeatured',
  title: 'Portfolio Featured',
  type: 'object',
  icon: StarIcon,
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Portfolio Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'portfolio' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Portfolio Featured',
        subtitle: heading,
        media: StarIcon,
      }
    },
  },
})
