export default {
  name: 'publicKnowledgeLibrary',
  title: 'Public Knowledge Library',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'resource', title: 'Resource Details' },
    { name: 'categorization', title: 'Categories & Tags' }
  ],
  fields: [
    // ===== BASIC INFO =====
    {
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Name of the resource (e.g., "PRIVATE EQUITY Trading Glossary")'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
      description: 'Brief description of what the resource contains (e.g., "Comprehensive glossary of all PRIVATE EQUITY trading terms")'
    },
    {
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: '📄 Document/PDF', value: 'document' },
          { title: '📚 Book/eBook', value: 'book' },
          { title: '📊 Spreadsheet/Template', value: 'spreadsheet' },
          { title: '🎥 Video Collection', value: 'video' },
          { title: '🔧 Tools/Calculator', value: 'tool' },
          { title: '📋 Checklist', value: 'checklist' },
          { title: '📈 Report/Analysis', value: 'report' },
          { title: '🎓 Course/Training', value: 'course' }
        ]
      },
      description: 'Visual icon type for the resource'
    },

    // ===== RESOURCE DETAILS =====
    {
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      group: 'resource',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'eBook', value: 'ebook' },
          { title: 'Spreadsheet', value: 'spreadsheet' },
          { title: 'Video Collection', value: 'video_collection' },
          { title: 'Template', value: 'template' },
          { title: 'Presentation', value: 'presentation' },
          { title: 'Toolkit', value: 'toolkit' },
          { title: 'Course', value: 'course' }
        ]
      },
      description: 'Type of resource being offered'
    },
    {
      name: 'downloadFile',
      title: 'Download File',
      type: 'file',
      group: 'resource',
      description: 'The actual file users will download'
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: 'resource',
      description: 'Alternative: Link to external resource instead of file upload'
    },
    {
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      group: 'resource',
      initialValue: 0,
      description: 'Number of downloads (can be manually set or auto-tracked)'
    },
    {
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      group: 'resource',
      options: { 
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      description: 'Preview image or thumbnail of the resource'
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      group: 'resource',
      of: [{ type: 'string' }],
      description: 'List of key features or contents (e.g., "200+ trading terms", "Detailed explanations")'
    },
    {
      name: 'requiresRegistration',
      title: 'Requires Registration',
      type: 'boolean',
      group: 'resource',
      initialValue: false,
      description: 'Whether users need to register to download'
    },
    {
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      group: 'resource',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Premium', value: 'premium' },
          { title: 'Members Only', value: 'members_only' }
        ]
      },
      initialValue: 'free',
      description: 'Who can access this resource'
    },

    // ===== CATEGORIZATION =====
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'categorization',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Trading & Markets', value: 'trading_markets' },
          { title: 'Private Equity', value: 'private_equity' },
          { title: 'Investment Analysis', value: 'investment_analysis' },
          { title: 'Risk Management', value: 'risk_management' },
          { title: 'Portfolio Management', value: 'portfolio_management' },
          { title: 'Financial Planning', value: 'financial_planning' },
          { title: 'Market Research', value: 'market_research' },
          { title: 'Tools & Templates', value: 'tools_templates' },
          { title: 'Educational Resources', value: 'educational' },
          { title: 'Industry Reports', value: 'industry_reports' }
        ]
      },
      description: 'Main category for the resource'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'categorization',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Keywords for better discoverability'
    },
    {
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      group: 'categorization',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Beginners', value: 'beginners' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Professionals', value: 'professionals' },
          { title: 'Students', value: 'students' },
          { title: 'Analysts', value: 'analysts' },
          { title: 'Fund Managers', value: 'fund_managers' },
          { title: 'Investors', value: 'investors' }
        ]
      },
      description: 'Who this resource is designed for'
    },
    {
      name: 'relatedAssets',
      title: 'Related Assets/Companies',
      type: 'array',
      group: 'categorization',
      of: [{
        type: 'reference',
        to: [{ type: 'publicCompany' }]
      }],
      description: 'Companies or assets related to this resource'
    },

    // ===== METADATA =====
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'basic',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isFeatured',
      title: 'Featured Resource',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Mark as featured for homepage promotion'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'basic',
      description: 'Custom ordering (lower numbers appear first)'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'resourceType',
      media: 'previewImage',
      published: 'isPublished',
      featured: 'isFeatured',
      downloads: 'downloadCount',
      access: 'accessLevel'
    },
    prepare({ title, subtitle, media, published, featured, downloads, access }: { 
      title: string; 
      subtitle: string; 
      media: any; 
      published: boolean;
      featured: boolean;
      downloads: number;
      access: string;
    }) {
      const status = published ? '✅' : '📝'
      const featuredIndicator = featured ? '⭐' : ''
      const downloadText = downloads ? `${downloads} downloads` : '0 downloads'
      const accessIcon = access === 'premium' ? '💎' : access === 'members_only' ? '🔒' : '🆓'
      
      return {
        title: `${status}${featuredIndicator} ${title || 'Untitled Resource'}`,
        subtitle: `${subtitle || 'Resource'} • ${downloadText} ${accessIcon}`,
        media
      }
    }
  },

  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Most Downloaded',
      name: 'downloadsDesc',
      by: [
        { field: 'downloadCount', direction: 'desc' }
      ]
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}