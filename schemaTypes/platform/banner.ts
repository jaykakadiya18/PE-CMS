export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'message',
      title: 'Banner Message',
      type: 'text'
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string'
    },
    {
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'displayStart',
      title: 'Display Start Date',
      type: 'datetime'
    },
    {
      name: 'displayEnd',
      title: 'Display End Date',
      type: 'datetime'
    },
    {
      name: 'bannerType',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          'Homepage',
          'Dashboard',
          'Asset Page',
          'Global'
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'bannerType',
      media: 'bannerImage'
    }
  }
}