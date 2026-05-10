import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The website title displayed in the header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainMenu',
      title: 'Main Menu',
      type: 'array',
      description: 'Pages to display in the main navigation',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'page' }],
        }),
      ],
    }),
    defineField({
      name: 'defaultMeta',
      title: 'Default Meta',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Default Meta Image',
          type: 'image',
          description: 'Default image used for social sharing when no page-specific image is set',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'description',
          title: 'Default Website Description',
          type: 'text',
          rows: 3,
          description: 'Default description used for SEO when no page-specific description is set',
          validation: (rule) => rule.max(160).warning('Keep under 160 characters for best SEO'),
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'socialLink',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (rule) =>
                    rule.required().uri({
                      scheme: ['http', 'https'],
                    }),
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'url',
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Footer Tagline',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
