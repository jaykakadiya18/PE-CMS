export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'author', title: 'Author Name', type: 'string' },
    { name: 'publishedDate', title: 'Published Date', type: 'datetime' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'category', title: 'Category', type: 'string' }, // Changed to plain text
    { name: 'label', title: 'Label', type: 'text' } // New label field
  ]
};
