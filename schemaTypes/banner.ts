export default {
    name: 'banner',
    type: 'document',
    title: 'Banner',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'image', type: 'image' },
      { name: 'ctaText', type: 'string' },
      { name: 'ctaUrl', type: 'url' },
      { name: 'isActive', type: 'boolean' },
      { name: 'displayStart', type: 'datetime' },
      { name: 'displayEnd', type: 'datetime' },
    ]
  }