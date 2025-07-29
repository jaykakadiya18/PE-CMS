export default {
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subheadline',
      type: 'string'
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text'
    },
    {
      name: 'content',
      title: 'Article Content',
      type: 'blockContent'
    },
    {
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'imageUrl',
      title: 'Image url',
      type: 'string'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'source',
      title: 'Source Name',
      type: 'string'
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'private_equity',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Finance', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'AI & ML', value: 'ai_ml' },
          { title: 'Green Energy', value: 'green_energy' },
          { title: 'SaaS', value: 'saas' },
          { title: 'Market News', value: 'market_news' },
          { title: 'Platform Update', value: 'platform_update' },
          { title: 'Private Equity', value: 'private_equity' }
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'autoFetched',
      title: 'Auto Fetched from API',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage'
    }
  }
}