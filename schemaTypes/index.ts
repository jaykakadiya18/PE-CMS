import { coreSchemas } from './core'
import { contentSchemas } from './content'
import { platformSchemas } from './platform'
import { sharedSchemas } from './shared'

export const schemaTypes = [
  ...sharedSchemas,    // Load shared schemas first
  ...coreSchemas,      // Core business schemas  
  ...contentSchemas,   // Content management
  ...platformSchemas   // Platform features
]

// Individual exports for direct imports
export * from './core'
export * from './content'
export * from './platform'
export * from './shared'