export default {
  name: 'legalDocument',
  title: 'Legal Document',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'documentFile',
      title: 'Document File',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' }
    },
    {
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          'Terms & Conditions',
          'Privacy Policy',
          'Investment Agreement',
          'Disclosure Document',
          'Compliance Document'
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'linkedAsset',
      title: 'Linked Asset',
      type: 'reference',
      to: [{ type: 'company' }]
    },
    {
      name: 'version',
      title: 'Version',
      type: 'string'
    },
    {
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date'
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
      subtitle: 'documentType'
    }
  }
}