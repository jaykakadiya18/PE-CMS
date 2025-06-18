export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'financial', title: 'Financial' },
    { name: 'trading', title: 'Trading' },
    { name: 'management', title: 'Management' }
  ],
  fields: [
    // Basic Information
    {
      name: 'assetId',
      title: 'Asset ID',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'name',
      title: 'Display Name',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'isin',
      title: 'ISIN',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'tickerSymbol',
      title: 'Ticker Symbol',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      group: 'basic'
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'basic',
      of: [{ type: 'string' }]
    },

    // Financial Information
    {
      name: 'valuationCurrency',
      title: 'Valuation Currency',
      type: 'string',
      group: 'financial',
      options: {
        list: ['USD', 'EUR', 'GBP', 'INR']
      }
    },
    {
      name: 'valuation',
      title: 'Current Valuation',
      type: 'number',
      group: 'financial'
    },
    {
      name: 'pricePerShare',
      title: 'Price Per Share',
      type: 'number',
      group: 'financial',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'minInvestmentShares',
      title: 'Minimum Investment Shares',
      type: 'number',
      group: 'financial'
    },
    {
      name: 'totalSharesOffered',
      title: 'Total Shares Offered',
      type: 'number',
      group: 'financial'
    },
    {
      name: 'sharesRemaining',
      title: 'Shares Remaining',
      type: 'number',
      group: 'financial'
    },

    // Trading Information
    {
      name: 'offeringStartDate',
      title: 'Offering Start Date',
      type: 'datetime',
      group: 'trading'
    },
    {
      name: 'offeringEndDate',
      title: 'Offering End Date',
      type: 'datetime',
      group: 'trading'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'trading',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Closed', value: 'closed' },
          { title: 'Coming Soon', value: 'coming_soon' }
        ]
      }
    },
    {
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      group: 'trading',
      options: {
        list: ['equity', 'debt', 'hybrid']
      }
    },
    {
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      group: 'trading',
      initialValue: false
    },
    {
      name: 'allowSecondaryTrading',
      title: 'Allow Secondary Trading',
      type: 'boolean',
      group: 'trading',
      initialValue: false
    },

    // Management & Timestamps
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      group: 'management',
      readOnly: true
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'management',
      readOnly: true
    },

    // References
    {
      name: 'media',
      title: 'Company Media',
      type: 'reference',
      to: [{ type: 'companyMedia' }]
    },
    {
      name: 'workflow',
      title: 'Workflow Status',
      type: 'reference',
      to: [{ type: 'workflow' }]
    }
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tickerSymbol',
      status: 'status',
      media: 'media.companyLogo'
    },
    prepare({ title, subtitle, status, media }: { title: string; subtitle: string; status: string; media: any }) {
      return {
        title,
        subtitle: `${subtitle || 'No Symbol'} - ${status || 'No Status'}`,
        media
      }
    }
  }
}