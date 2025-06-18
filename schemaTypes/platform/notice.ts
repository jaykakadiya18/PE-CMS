export default {
  name: 'notice',
  title: 'Notice',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Notice Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Notice Content',
      type: 'blockContent'
    },
    {
      name: 'noticeType',
      title: 'Notice Type',
      type: 'string',
      options: {
        list: [
          'System Maintenance',
          'Platform Update',
          'Trading Notice',
          'General Announcement'
        ]
      }
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Critical', value: 'critical' }
        ]
      }
    },
    {
      name: 'targetPage',
      title: 'Target Page',
      type: 'string',
      options: {
        list: [
          'All Pages',
          'Dashboard',
          'Trading Page',
          'Asset Details'
        ]
      }
    },
    {
      name: 'linkedAsset',
      title: 'Linked Asset',
      type: 'reference',
      to: [{ type: 'company' }]
    },
    {
      name: 'isGlobal',
      title: 'Show Globally',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    },
    {
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'noticeType'
    }
  }
}