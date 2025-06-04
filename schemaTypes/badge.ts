export default {
  name: 'badge',
  title: 'Badge',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string'
    },
    {
      name: 'iconUrl',
      title: 'Icon URL',
      type: 'url'
    },
    {
      name: 'criteria',
      title: 'Criteria',
      type: 'object',
      fields: [
        {
          name: 'condition',
          title: 'Condition',
          type: 'string'
        },
        {
          name: 'details',
          title: 'Details',
          type: 'text'
        }
      ]
    },
    {
      name: 'points',
      title: 'Points',
      type: 'number'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true
    }
  ]
}
