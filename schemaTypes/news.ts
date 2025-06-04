// schemas/newsArticle.js
export default {
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Short summary of the article'
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'source',
      title: 'Source Name',
      type: 'string',
    },
    {
      name: 'url',
      title: 'External URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Market', 'Technology', 'Platform Update', 'Finance', 'PE News']
      }
    },
    {
      name: 'autoFetched',
      title: 'Auto Fetched from API?',
      type: 'boolean',
      initialValue: false
    }
  ]
}
