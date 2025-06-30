export default {
  name: 'webScraping',
  title: 'Web Scraping Queue',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'companyWebsite',
      title: 'Company Website',
      type: 'url',
      validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https']
      }),
      placeholder: 'https://example.com'
    },
    {
      name: 'upmarketUrl',
      title: 'Upmarket URL',
      type: 'url',
      validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https']
      }),
      placeholder: 'https://www.upmarket.co/private-markets/pre-ipo/{company-profile}'
    },
    {
      name: 'companyAddedDate',
      title: 'Company Added Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'scrapingStatus',
      title: 'Scraping Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' }
        ]
      },
      initialValue: 'pending'
    }
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'scrapingStatus',
      website: 'companyWebsite'
    },
    prepare({ title, subtitle, website }: { title: string; subtitle: string; website: string }) {
      return {
        title: title || 'Unknown Company',
        subtitle: `${subtitle} • ${website}`
      }
    }
  }
}