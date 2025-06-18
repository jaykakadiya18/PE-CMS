export default {
  name: 'academy',
  title: 'Academy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Video Tutorial',
          'Article',
          'Webinar',
          'Interactive Tutorial'
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url'
    },
    {
      name: 'articleContent',
      title: 'Article Content',
      type: 'blockContent'
    },
    {
      name: 'speakers',
      title: 'Speakers/Instructors',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Expert']
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'string'
    },
    {
      name: 'reviewsCount',
      title: 'Number of Reviews',
      type: 'number'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image'
    }
  }
}