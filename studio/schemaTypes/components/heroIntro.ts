import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroIntro = defineType({
  name: 'heroIntro',
  title: 'Hero Intro',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'tagline',
      media: 'image',
    },
  },
})
