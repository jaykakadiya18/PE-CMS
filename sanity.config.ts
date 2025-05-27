import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'FE-CMS',

  projectId: '04138n8r',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // ✅ Disable auto-update to prevent Vercel build prompt
 unstable_noStudioAutoUpdates: true,
})
