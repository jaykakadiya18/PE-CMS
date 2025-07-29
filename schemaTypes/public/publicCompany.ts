// ===== REQUIRED FIELDS FOR PUBLIC COMPANY PROFILE PAGE =====

export default {
  name: 'publicCompany',
  title: 'Public Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'financial', title: 'Financial Data' },
    { name: 'metrics', title: 'Company Metrics' },
    { name: 'history', title: 'Historical Data' },
    { name: 'media', title: 'Media & Content' },
    { name: 'qa', title: 'Q&A Section' }
  ],
  fields: [
    // ===== HEADER SECTION =====
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
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      group: 'media',
      options: { hotspot: true }
    },
    {
      name: 'founded',
      title: 'Founded Year',
      type: 'number',
      group: 'basic',
      description: 'e.g., 2015'
    },
    {
      name: 'headquarters',
      title: 'Headquarters',
      type: 'string',
      group: 'basic',
      description: 'e.g., San Francisco, CA'
    },
    {
      name: 'currentValuation',
      title: 'Current Valuation',
      type: 'string',
      group: 'financial',
      description: 'Display valuation (e.g., $32B)'
    },

    // ===== ABOUT SECTION =====
    {
      name: 'description',
      title: 'Company Description',
      type: 'text',
      group: 'basic',
      description: 'Main company description for About section'
    },

    // ===== KEY COMPANY METRICS =====
    {
      name: 'keyMetrics',
      title: 'Key Company Metrics',
      type: 'object',
      group: 'metrics',
      fields: [
        {
          name: 'employees',
          title: 'Employees',
          type: 'string',
          description: 'e.g., "1,001-5,000"'
        },
        {
          name: 'revenue',
          title: 'Revenue Range',
          type: 'string',
          description: 'e.g., "$100M - $500M"'
        },
        {
          name: 'sector',
          title: 'Sector',
          type: 'string',
          options: {
            list: [
              'Technology',
              'Healthcare', 
              'Finance',
              'Energy',
              'Consumer',
              'Industrial'
            ]
          }
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'string'
        }
      ]
    },

    // ===== FUNDING HISTORY =====
    {
      name: 'fundingHistory',
      title: 'Public Funding History',
      type: 'array',
      group: 'history',
      of: [{
        type: 'object',
        name: 'fundingRound',
        title: 'Funding Round',
        fields: [
          {
            name: 'series',
            title: 'Series',
            type: 'string',
            description: 'e.g., Series A, Series B, etc.'
          },
          {
            name: 'amount',
            title: 'Amount',
            type: 'string',
            description: 'e.g., $775 Million'
          },
          {
            name: 'valuation',
            title: 'Valuation',
            type: 'string',
            description: 'e.g., $95 Billion'
          },
          {
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'e.g., Mar 2023'
          }
        ],
        preview: {
          select: {
            title: 'series',
            subtitle: 'amount'
          }
        }
      }],
      description: 'Historical funding rounds to display publicly'
    },

    // ===== LEADERSHIP TEAM =====
    {
      name: 'leadership',
      title: 'Leadership Team',
      type: 'array',
      group: 'basic',
      of: [{
        type: 'object',
        name: 'leader',
        title: 'Leader',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'title',
            title: 'Job Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true }
          },
          {
            name: 'bio',
            title: 'Biography',
            type: 'text'
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'title',
            media: 'photo'
          }
        }
      }],
      description: 'Key leadership team members'
    },

    // ===== PROJECTS/INITIATIVES =====
    {
      name: 'keyProjects',
      title: 'Key Projects',
      type: 'array',
      group: 'basic',
      of: [{
        type: 'object',
        name: 'project',
        title: 'Project',
        fields: [
          {
            name: 'title',
            title: 'Project Title',
            type: 'string'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
              list: [
                'Active',
                'Completed',
                'Upcoming',
                'On Hold'
              ]
            }
          }
        ]
      }]
    },

    // ===== FINANCIAL CHARTS DATA =====
    {
      name: 'performanceChart',
      title: 'Performance Chart Data',
      type: 'object',
      group: 'financial',
      fields: [
        {
          name: 'chartType',
          title: 'Chart Type',
          type: 'string',
          options: {
            list: ['revenue', 'valuation', 'growth', 'users']
          }
        },
        {
          name: 'dataPoints',
          title: 'Data Points',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'period',
                title: 'Period',
                type: 'string',
                description: 'e.g., Q1 2023'
              },
              {
                name: 'value',
                title: 'Value',
                type: 'number'
              }
            ]
          }]
        }
      ]
    },

    // ===== MEDIA GALLERY =====
    {
      name: 'mediaGallery',
      title: 'Media Gallery',
      type: 'array',
      group: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'caption',
            title: 'Caption',
            type: 'string'
          },
          {
            name: 'altText',
            title: 'Alt Text',
            type: 'string'
          }
        ]
      }]
    },

    // ===== FAQ SECTION =====
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'qa',
      of: [{
        type: 'object',
        name: 'faq',
        title: 'FAQ',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 1
          }
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'order'
          }
        }
      }],
      description: 'Public FAQ section'
    },

    // ===== INVESTMENT STATUS =====
    {
      name: 'investmentStatus',
      title: 'Investment Availability',
      type: 'object',
      group: 'financial',
      fields: [
        {
          name: 'isAvailable',
          title: 'Available for Investment',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'marketType',
          title: 'Market Type',
          type: 'string',
          options: {
            list: [
              'Primary Market',
              'Secondary Market',
              'Both Markets',
              'Coming Soon',
              'Closed'
            ]
          }
        },
        {
          name: 'minimumInvestment',
          title: 'Minimum Investment',
          type: 'string',
          description: 'e.g., $1,000'
        }
      ]
    },

    // ===== TAGS & CATEGORIES =====
    {
      name: 'tags',
      title: 'Public Tags',
      type: 'array',
      group: 'basic',
      of: [{
        type: 'string',
        options: {
          list: [
            'Hot',
            'Trending',
            'New',
            'Pre-IPO',
            'Unicorn',
            'AI/ML',
            'Sustainable',
            'High Growth'
          ]
        }
      }]
    },

    // ===== METADATA =====
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'basic',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'basic',
      initialValue: true
    }
  ],

  preview: {
    select: {
      title: 'companyName',
      subtitle: 'keyMetrics.sector',
      media: 'companyLogo'
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
      return {
        title,
        subtitle: subtitle || 'No sector',
        media
      }
    }
  }
}