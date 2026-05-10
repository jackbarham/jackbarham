import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wc9rahco',
    dataset: 'production',
  },
  studioHost: 'jackbarham',
  autoUpdates: true,
})
