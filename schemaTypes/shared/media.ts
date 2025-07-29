export default {
  name: 'companyMedia',
  title: 'Company Media',
  type: 'document',
  fields: [
    {
      name: 'assetId',
      title: 'Asset Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Links to company asset'
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
      }],
      description: 'Images showcasing the company information displayed in the dashboard\'s about section',
    },
    {
      name: 'documents',
      title: 'Company Documents',
      type: 'array',
      of: [{
        type: 'file',
        options: { accept: '.pdf,.doc,.docx,.xlsx,.xls' },
        fields: [
          { 
            name: 'title', 
            type: 'string', 
            title: 'Document Title',
            validation: (Rule: any) => Rule.required()
          },
          { 
            name: 'category', 
            type: 'string', 
            title: 'Category',
            options: {
              list: [
                'Financial Statement',
                'Legal Document',
                'Pitch Deck',
                'Due Diligence',
                'Compliance',
                'Other'
              ]
            }
          },
          {
            name: 'uploadDate',
            type: 'datetime',
            title: 'Upload Date',
            initialValue: () => new Date().toISOString()
          },
          {
            name: 'isPublic',
            type: 'boolean',
            title: 'Public Access',
            initialValue: false,
            description: 'Can users download this document?'
          }
        ]
      }],
      description: 'Upload PDFs and other documents for this company'
    },
    {
      name: 'videoContent',
      title: 'Video Content',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Video Title' },
          { name: 'videoUrl', type: 'url', title: 'Video URL' },
          { name: 'thumbnail', type: 'image', title: 'Video Thumbnail' },
          { name: 'duration', type: 'string', title: 'Duration' },
          { name: 'description', type: 'text', title: 'Description' }
        ]
      }],
      description: 'Upload Video file for this company'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*'
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ],
      description: 'Upload Featured Image for this company'
    }
  ],
  preview: {
    select: {
      title: 'assetId',
      media: 'companyLogo'
    },
    prepare({ title, media }: { title: any; media: any }) {
      return {
        title: `Media for ${title}`,
        media
      }
    }
  }
}