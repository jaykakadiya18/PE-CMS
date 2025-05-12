export default {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'industrySector',
      title: 'Industry Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Finance', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Energy', value: 'energy' },
          { title: 'Consumer Goods', value: 'consumerGoods' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'statusLabel',
      title: 'Status Label',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      validation: Rule => Rule.integer().min(1800).max(new Date().getFullYear()),
    },
    {
      name: 'headquartersLocation',
      title: 'Headquarters Location',
      type: 'string',
    },
    {
      name: 'numberOfEmployees',
      title: 'Number of Employees',
      type: 'number',
      validation: Rule => Rule.integer().min(0),
    },
    {
      name: 'latestValuation',
      title: 'Latest Valuation',
      type: 'number',
      description: 'Valuation in USD',
      validation: Rule => Rule.min(0),
    },
    {
      name: 'investmentStatus',
      title: 'Investment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Expired', value: 'expired' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'isPublic',
      title: 'Is Public/Private',
      type: 'boolean',
      description: 'True for public, false for private',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'Needs Approval',
      readOnly: true
    },
  ],
}
