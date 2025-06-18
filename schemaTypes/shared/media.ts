export default {
  name: 'companyMedia',
  title: 'Company Media',
  type: 'document',
  fields: [
    {
      name: 'assetId',
      title: 'Asset ID',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'mediaGallery',
      title: 'Media Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'caption', type: 'string', title: 'Caption' },
          { name: 'altText', type: 'string', title: 'Alt Text' }
        ]
      }]
    },
    {
      name: 'documents',
      title: 'Documents (PDFs)',
      type: 'array',
      of: [{
        type: 'file',
        options: { accept: '.pdf,.doc,.docx' },
        fields: [
          { name: 'title', type: 'string', title: 'Document Title' },
          { name: 'category', type: 'string', title: 'Category' }
        ]
      }]
    }
  ],
  preview: {
    select: {
      title: 'assetId',
      media: 'companyLogo'
    }
  }
}