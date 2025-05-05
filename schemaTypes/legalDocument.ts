export default {
    name: 'legalDocument',
    type: 'document',
    title: 'Legal Document',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'file', type: 'file' },
      { name: 'tags', type: 'array', of: [{ type: 'string' }] },
      { name: 'linkedAsset', type: 'reference', to: [{ type: 'asset' }] },
      { name: 'version', type: 'string' },
      { name: 'publishedAt', type: 'datetime' },
    ]
  }