export default {
    name: 'assetUpload',
    title: 'Asset Upload',
    type: 'document',
    fields: [
      {
        name: 'uploadId',
        title: 'Upload ID',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'uploadedFile',
        title: 'Excel File',
        type: 'file',
        options: {
          accept: '.xlsx,.xls,.csv'
        }
      },
      {
        name: 'uploadedBy',
        title: 'Uploaded By',
        type: 'string'
      },
      {
        name: 'uploadDate',
        title: 'Upload Date',
        type: 'datetime',
        initialValue: () => new Date().toISOString()
      },
      {
        name: 'processingStatus',
        title: 'Processing Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Processing', value: 'processing' },
            { title: 'Completed', value: 'completed' },
            { title: 'Failed', value: 'failed' }
          ]
        },
        initialValue: 'pending'
      },
      {
        name: 'validationResults',
        title: 'Validation Results',
        type: 'array',
        of: [{ type: 'string' }],
        readOnly: true
      },
      {
        name: 'createdAssets',
        title: 'Created Assets',
        type: 'array',
        of: [{
          type: 'reference',
          to: [{ type: 'company' }]
        }],
        readOnly: true
      },
      {
        name: 'errorLog',
        title: 'Error Log',
        type: 'text',
        readOnly: true
      }
    ],
    preview: {
      select: {
        title: 'uploadId',
        status: 'processingStatus',
        date: 'uploadDate'
      },
      prepare({ title, status, date }: { title: any; status: any; date: any }) {
        return {
          title: `Upload: ${title}`,
          subtitle: `${status} - ${new Date(date).toLocaleDateString()}`
        }
      }
    }
  }