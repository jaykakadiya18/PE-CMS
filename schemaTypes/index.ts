import { coreSchemas } from './core'
import { contentSchemas } from './content'
import { platformSchemas } from './platform'
import { sharedSchemas } from './shared'

export const schemaTypes = [
  ...coreSchemas,      // Core business schemas  
  ...sharedSchemas,    // Load shared schemas
  ...contentSchemas,   // Content management
  ...platformSchemas   // Platform features
]

// Individual exports for direct imports
export * from './core'
export * from './content'
export * from './platform'
export * from './shared'