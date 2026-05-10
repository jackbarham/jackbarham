import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const headingIntro = defineType({
  name: 'headingIntro',
  title: 'Heading Intro',
  type: 'object',
  icon: BlockContentIcon,
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
        title: 'Heading Intro',
        subtitle: heading,
      }
    },
  },
})
