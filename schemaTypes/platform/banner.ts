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
      name: 'targetLocation',
      title: 'Target Location',
      type: 'string',
      options: {
        list: [
          'Dashboard',
          'Asset Detail',
          'Watchlist',
          'Market Overview'
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When the banner should start displaying'
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When the banner should stop displaying'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to activate/deactivate this banner'
    },
    // Legacy fields (keeping for backwards compatibility)
    {
      name: 'displayStart',
      title: 'Display Start Date (Legacy)',
      type: 'datetime',
      hidden: true
    },
    {
      name: 'displayEnd',
      title: 'Display End Date (Legacy)',
      type: 'datetime',
      hidden: true
    },
    {
      name: 'bannerType',
      title: 'Banner Type (Legacy)',
      type: 'string',
      options: {
        list: [
          'Homepage',
          'Dashboard',
          'Asset Page',
          'Global'
        ]
      },
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'targetLocation',
      media: 'bannerImage',
      isActive: 'isActive'
    },
    prepare({ title, subtitle, media, isActive }: { title: string; subtitle: string; media: any; isActive: boolean }) {
      return {
        title: title,
        subtitle: `${subtitle} ${isActive ? '(Active)' : '(Inactive)'}`,
        media
      }
    }
  }
}
