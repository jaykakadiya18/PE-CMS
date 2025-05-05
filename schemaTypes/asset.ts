export default {
    name: 'asset',
    type: 'document',
    title: 'Asset Listing',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'text' },
      { name: 'valuation', type: 'number' },
      { name: 'foundingDate', type: 'datetime' },
      { name: 'videoUrl', type: 'url' },
      { name: 'documents', type: 'array', of: [{ type: 'file' }] },
      { name: 'isVisiblePrimary', type: 'boolean' },
      { name: 'isVisibleSecondary', type: 'boolean' },
      { name: 'ipoLockoutCountdown', type: 'datetime' },
    ]
  }