export default {
    name: 'course',
    type: 'document',
    title: 'Course',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'text' },
      { name: 'category', type: 'string' },
      { name: 'videoUrl', type: 'url' },
      { name: 'content', type: 'array', of: [{ type: 'block' }] },
      { name: 'prerequisites', type: 'array', of: [{ type: 'reference', to: [{ type: 'course' }] }] },
      { name: 'badges', type: 'array', of: [{ type: 'string' }] },
      { name: 'isPublic', type: 'boolean' },
      { name: 'metaTitle', type: 'string' },
      { name: 'metaDescription', type: 'text' },
      { name: 'ogImage', type: 'image' },
    ]
  }