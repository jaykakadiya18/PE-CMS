export default {
    name: 'podcast',
    title: 'Podcast',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (Rule:any) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'speaker', title: 'Speaker/Host Name', type: 'string' },
      { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      { name: 'duration', title: 'Duration', type: 'string' },
      { name: 'publishedDate', title: 'Published Date', type: 'datetime' },
      { 
        name: 'statusLabel', 
        title: 'Status Label', 
        type: 'string', 
        options: { list: ['Upcoming', 'Live', 'Finished'], layout: 'dropdown' } 
      },
      { name: 'podcastUrl', title: 'Podcast URL', type: 'url' },
      { name: 'description', title: 'Description', type: 'text' }
    ]
  };