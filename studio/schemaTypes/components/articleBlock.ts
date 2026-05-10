import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const articleBlock = defineType({
  name: 'articleBlock',
  title: 'Article Block',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Article Block',
        media: BlockContentIcon,
      }
    },
  },
})
