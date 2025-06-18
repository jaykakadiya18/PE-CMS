export default {
    name: 'adminSettings',
    title: 'Admin Settings',
    type: 'document',
    fields: [
      {
        name: 'settingKey',
        title: 'Setting Key',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'settingValue',
        title: 'Setting Value',
        type: 'string'
      },
      {
        name: 'settingType',
        title: 'Setting Type',
        type: 'string',
        options: {
          list: [
            'Auto Tag Generation',
            'FAQ Generation',
            'Validation Rules',
            'Upload Templates',
            'System Config'
          ]
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'isActive',
        title: 'Is Active',
        type: 'boolean',
        initialValue: true
      }
    ]
  }