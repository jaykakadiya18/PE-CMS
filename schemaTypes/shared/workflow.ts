export default {
  name: 'workflow',
  title: 'Workflow',
  type: 'document',
  fields: [
    {
      name: 'entityType',
      title: 'Entity Type',
      type: 'string',
      options: {
        list: [
          { title: 'Company', value: 'company' },
          { title: 'News Article', value: 'newsArticle' },
          { title: 'Academy Content', value: 'academy' },
          { title: 'Podcast', value: 'podcast' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'entityId',
      title: 'Entity ID',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Published', value: 'published' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'createdBy',
      title: 'Created By',
      type: 'string'
    },
    {
      name: 'lastModifiedBy',
      title: 'Last Modified By',
      type: 'string'
    },
    {
      name: 'approvedBy',
      title: 'Approved By',
      type: 'string'
    },
    {
      name: 'approvalDate',
      title: 'Approval Date',
      type: 'datetime'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    },
    {
      name: 'scheduledFor',
      title: 'Scheduled Publish',
      type: 'datetime'
    },
    {
      name: 'validationErrors',
      title: 'Validation Errors',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ],
  preview: {
    select: {
      title: 'entityType',
      subtitle: 'approvalStatus',
      entityId: 'entityId'
    },
    prepare({ title, subtitle, entityId }) {
      return {
        title: `${title} - ${entityId}`,
        subtitle: subtitle
      }
    }
  }
}