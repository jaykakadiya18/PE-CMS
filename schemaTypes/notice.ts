export default {
    name: 'notice',
    type: 'document',
    title: 'Notice',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'content', type: 'array', of: [{ type: 'block' }] },
      { name: 'targetPage', type: 'string' },
      { name: 'linkedAsset', type: 'reference', to: [{ type: 'asset' }] },
      { name: 'isGlobal', type: 'boolean' },
    ]
  }
  