import { defineType, defineField, defineArrayMember } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Testimonial Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
          icon: CommentIcon,
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              name: 'name',
              company: 'company',
              quote: 'quote',
            },
            prepare({ name, company, quote }) {
              return {
                title: name || 'Untitled',
                subtitle: company ? `${company} — "${quote?.slice(0, 40)}..."` : quote?.slice(0, 50),
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const count = items?.length || 0
      return {
        title: 'Testimonials',
        subtitle: `${count} testimonial${count === 1 ? '' : 's'}`,
        media: CommentIcon,
      }
    },
  },
})
