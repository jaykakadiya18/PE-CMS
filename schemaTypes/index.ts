import { coreSchemas } from './core'
import { contentSchemas } from './content'
import { platformSchemas } from './platform'
import { sharedSchemas } from './shared'
import { publicSchemaTypes } from './public'

// For production dataset - all schemas
export const schemaTypes = [
  ...coreSchemas,
  ...sharedSchemas,
  ...contentSchemas,
  ...platformSchemas
]

// Export public schemas separately
export { publicSchemaTypes }

// Individual exports
export * from './core'
export * from './content'
export * from './platform'
export * from './shared'
export * from './public'