import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageMeta',
      title: 'Page Meta',
      type: 'object',
      description: 'Override the default SEO settings for this page',
      fields: [
        defineField({
          name: 'image',
          title: 'OG Image',
          type: 'image',
          description: 'Social sharing image for this page (overrides default)',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'SEO description for this page (overrides default)',
          validation: (rule) => rule.max(160).warning('Keep under 160 characters for best SEO'),
        }),
      ],
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        { type: 'heroIntro' },
        { type: 'headingIntro' },
        { type: 'articleBlock' },
        { type: 'imageWide' },
        { type: 'portfolioFeed' },
        { type: 'portfolioFeatured' },
        { type: 'testimonials' },
        { type: 'contactCta' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
})
