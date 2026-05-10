import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactCta = defineType({
  name: 'contactCta',
  title: 'Contact CTA',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'email',
    },
  },
})
