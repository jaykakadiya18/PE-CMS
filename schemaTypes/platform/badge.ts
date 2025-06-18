export default {
  name: 'badge',
  title: 'Badge',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Badge Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'badgeType',
      title: 'Badge Type',
      type: 'string',
      options: {
        list: [
          'Achievement',
          'Milestone',
          'Special Event',
          'VIP Status'
        ]
      }
    },
    {
      name: 'icon',
      title: 'Badge Icon',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'criteria',
      title: 'Earning Criteria',
      type: 'object',
      fields: [
        {
          name: 'condition',
          title: 'Condition',
          type: 'string'
        },
        {
          name: 'details',
          title: 'Detailed Requirements',
          type: 'text'
        },
        {
          name: 'threshold',
          title: 'Threshold Value',
          type: 'number'
        }
      ]
    },
    {
      name: 'points',
      title: 'Points Awarded',
      type: 'number'
    },
    {
      name: 'rarity',
      title: 'Rarity Level',
      type: 'string',
      options: {
        list: [
          'Common',
          'Uncommon',
          'Rare',
          'Epic',
          'Legendary'
        ]
      }
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'badgeType',
      media: 'icon'
    }
  }
}