// 4. Asset Media Schema (media and documents)
export const assetMediaSchema = {
  name: 'assetMedia',
  title: 'Asset Media',
  type: 'document',
  fields: [
    { name: 'assetId', title: 'Asset ID', type: 'string' },
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
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'documents',
      title: 'Documents (PDFs)',
      type: 'array',
      of: [{ type: 'file', options: { accept: '.pdf' } }]
    },
    // Legacy support
    { name: 'logo_url', title: 'Logo URL (Legacy)', type: 'url' }
  ]
};
