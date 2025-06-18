export default {
  name: 'podcast',
  title: 'Podcast',
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
      name: 'speaker',
      title: 'Speaker/Host Name',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    },
    {
      name: 'featuredImage',
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
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Upcoming', 'Live', 'Published']
      }
    },
    {
      name: 'podcastUrl',
      title: 'Podcast URL',
      type: 'url'
    },
    {
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number'
    },
    {
      name: 'season',
      title: 'Season',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'speaker',
      media: 'featuredImage'
    }
  }
}