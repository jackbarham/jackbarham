import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'
import { resolve } from './presentation/resolve'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Jack Barham',
  projectId: 'wc9rahco',
  dataset: 'production',
  plugins: [
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
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
