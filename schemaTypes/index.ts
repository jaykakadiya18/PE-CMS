import { coreSchemas } from './core'
import { contentSchemas } from './content'
import { platformSchemas } from './platform'
import { sharedSchemas } from './shared'

export const schemaTypes = [
  ...sharedSchemas,    // Load shared first (blockContent, etc.)
  ...coreSchemas,      // Core business schemas
  ...contentSchemas,   // Content management
  ...platformSchemas   // Platform features
]

export * from './core'
export * from './content'
export * from './platform'
export * from './shared'