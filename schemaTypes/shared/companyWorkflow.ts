export default {
  name: 'companyWorkflow',
  title: 'companyWorkflow',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'company_name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'company_name',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required().min(1).max(100),
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      }),
      placeholder: 'https://example.com'
    },
    {
      name: 'created_date',
      title: 'Created Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      }
    },
    {
      name: 'news',
      title: 'Enable News Fetching',
      type: 'boolean',
      description: 'Toggle to enable/disable news fetching for this company',
      initialValue: false,
    },
    {
      name: 'fetch_news',
      title: 'News Fetch Frequency',
      type: 'string',
      description: 'How often to fetch news for this company',
      options: {
        list: [
          { title: '2 Hours', value: '2h' },
          { title: '4 Hours', value: '4h' },
          { title: '6 Hours', value: '6h' },
          { title: '12 Hours', value: '12h' },
          { title: 'Daily', value: '1d' },
          { title: 'Weekly', value: '1w' },
          { title: 'Monthly', value: '1m' },
        ],
        layout: 'dropdown'
      },
      initialValue: '1d',
      // Conditional logic: only show if news is true
      hidden: ({ document }) => !document?.news,
      validation: Rule => Rule.custom((value, context) => {
        // Only validate if news is enabled
        if (context.document?.news && !value) {
          return 'Fetch frequency is required when news is enabled'
        }
        return true
      })
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Pending', value: 'pending' },
        ],
        layout: 'radio'
      },
      initialValue: 'active',
      validation: Rule => Rule.required(),
    },
    {
      name: 'last_news_fetch',
      title: 'Last News Fetch',
      type: 'datetime',
      description: 'Timestamp of the last successful news fetch',
      readOnly: true, // This should be updated programmatically
      hidden: ({ document }) => !document?.news,
    },
    {
      name: 'news_sources',
      title: 'News Sources',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sources to fetch news from',
      options: {
        list: [
          { title: 'Google News', value: 'google_news' },
          { title: 'Company Blog', value: 'company_blog' },
          { title: 'Press Releases', value: 'press_releases' },
          { title: 'Tech News Sites', value: 'tech_news' },
          { title: 'Social Media', value: 'social_media' },
        ]
      },
      hidden: ({ document }) => !document?.news,
      validation: Rule => Rule.custom((value, context) => {
        if (context.document?.news && (!value || value.length === 0)) {
          return 'At least one news source is required when news is enabled'
        }
        return true
      })
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords to search for in news articles',
      hidden: ({ document }) => !document?.news,
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'api_endpoints',
      title: 'API Endpoints',
      type: 'object',
      description: 'Company API endpoints for data fetching',
      fields: [
        {
          name: 'primary',
          title: 'Primary Endpoint',
          type: 'url',
        },
        {
          name: 'backup',
          title: 'Backup Endpoint',
          type: 'url',
        },
        {
          name: 'news_feed',
          title: 'News Feed URL',
          type: 'url',
          hidden: ({ parent }) => !parent?.parent?.news,
        }
      ],
      options: {
        collapsible: true,
        collapsed: true,
      }
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Internal notes about this company',
      rows: 3,
    }
  ],
  
  // Preview configuration
  preview: {
    select: {
      title: 'company_name',
      subtitle: 'website',
      media: 'logo',
      news: 'news',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, news, status } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • ${status} • News: ${news ? 'On' : 'Off'}`,
      }
    }
  },

  // Initial value template
  initialValue: {
    status: 'active',
    news: false,
    created_date: new Date().toISOString(),
  }
}
