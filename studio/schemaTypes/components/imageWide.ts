import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const imageWide = defineType({
  name: 'imageWide',
  title: 'Image Wide',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      alt: 'image.alt',
      media: 'image',
    },
    prepare({ alt, media }) {
      return {
        title: 'Image Wide',
        subtitle: alt,
        media,
      }
    },
  },
})
