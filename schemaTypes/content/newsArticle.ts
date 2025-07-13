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
      initialValue: 'Private Equity',
      options: {
        list: [
          'Market News',
          'Technology',
          'Platform Update',
          'Finance',
          'Private Equity'
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