import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { resolve } from './presentation/resolve'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Jack Barham',
  projectId: 'wc9rahco',
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewOrigin,
        preview: '/',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    media(),
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
  },
})
