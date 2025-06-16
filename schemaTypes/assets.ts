// export default {
//   name: 'asset',
//   title: 'Asset',
//   type: 'document',
//   fields: [
//     { name: 'companyName', title: 'Company Name', type: 'string' },
//     { name: 'industrySector', title: 'Industry Sector', type: 'string' },
//     { name: 'statusLabel', title: 'Status Label', type: 'string' },
//     { name: 'foundedYear', title: 'Founded Year', type: 'number' },
//     { name: 'headquartersLocation', title: 'Headquarters Location', type: 'string' },
//     { name: 'numberOfEmployees', title: 'Number of Employees', type: 'number' },
//     { name: 'latestValuation', title: 'Latest Valuation', type: 'string' },
//     { name: 'investmentStatus', title: 'Investment Status', type: 'string' },
//     { name: 'isPublic', title: 'Is Public', type: 'boolean' },
//     { name: 'companyOverview', title: 'Company Overview', type: 'text' },
//     { name: 'website', title: 'Website', type: 'url' },
//     { name: 'market_type', title: 'Market Type', type: 'string' },
//     { name: 'logo_url', title: 'Logo URL', type: 'url' },
//     { 
//       name: 'management', 
//       title: 'Management Team', 
//       type: 'array', 
//       of: [{ type: 'string' }] 
//     },
//     { 
//       name: 'valuation_records', 
//       title: 'Valuation Records', 
//       type: 'array', 
//       of: [
//         {
//           type: 'object',
//           fields: [
//             { name: 'date', title: 'Date', type: 'string' },
//             { name: 'value', title: 'Value', type: 'number' }
//           ]
//         }
//       ]
//     },
//     { name: 'status', title: 'Status', type: 'string' }
//   ]
// }



export default {
  name: 'assets',
  title: 'Assets',
  type: 'document',
  fields: [
    // Basic Asset Information (merged from existing schema)
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'symbol',
      title: 'Asset Symbol/Ticker',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'assetId',
      title: 'Asset ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'companyOverview',
      title: 'Company Overview',
      type: 'text',
      rows: 4
    },
    {
      name: 'industrySector',
      title: 'Industry Sector',
      type: 'string'
    },
    {
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number'
    },
    {
      name: 'headquartersLocation',
      title: 'Headquarters Location',
      type: 'string'
    },
    {
      name: 'numberOfEmployees',
      title: 'Number of Employees',
      type: 'number'
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url'
    },
    {
      name: 'isPublic',
      title: 'Is Public',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'latestValuation',
      title: 'Latest Valuation',
      type: 'string'
    },
    {
      name: 'investmentStatus',
      title: 'Investment Status',
      type: 'string'
    },
    {
      name: 'management',
      title: 'Management Team',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'valuation_records',
      title: 'Valuation Records',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'date', title: 'Date', type: 'string' },
            { name: 'value', title: 'Value', type: 'number' }
          ]
        }
      ]
    },

    // Market Status & Visibility (merged statusLabel with status)
    {
      name: 'marketType',
      title: 'Market Type',
      type: 'string',
      options: {
        list: [
          { title: 'Primary Market', value: 'primary' },
          { title: 'Secondary Market', value: 'secondary' },
          { title: 'Both Markets', value: 'both' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'market_type',
      title: 'Market Type (Legacy)',
      type: 'string',
      description: 'Legacy field - use marketType instead'
    },
    {
      name: 'status',
      title: 'Asset Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Closed', value: 'closed' },
          { title: 'Coming Soon', value: 'coming_soon' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'statusLabel',
      title: 'Status Label (Legacy)',
      type: 'string',
      description: 'Legacy field - use status instead'
    },
    {
      name: 'isVisible',
      title: 'Visible to Users',
      type: 'boolean',
      initialValue: false
    },

    // Pricing & Share Information
    {
      name: 'pricePerShare',
      title: 'Public Price Per Share',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'internalPaidPrice',
      title: 'Internal Paid Price (Platform Only)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'availableVolume',
      title: 'Available Share Volume',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'totalShares',
      title: 'Total Shares',
      type: 'number'
    },

    // Share Tranche Management
    {
      name: 'shareTranches',
      title: 'Share Tranche History',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'trancheId',
            title: 'Tranche ID',
            type: 'string'
          },
          {
            name: 'quantity',
            title: 'Share Quantity',
            type: 'number'
          },
          {
            name: 'pricePerShare',
            title: 'Price Per Share',
            type: 'number'
          },
          {
            name: 'dateAdded',
            title: 'Date Added',
            type: 'datetime'
          },
          {
            name: 'marketType',
            title: 'Market Type',
            type: 'string',
            options: {
              list: ['primary', 'secondary']
            }
          }
        ]
      }]
    },

    // Client & Partner Information
    {
      name: 'clientGroup',
      title: 'Client Group',
      type: 'string',
      options: {
        list: [
          { title: 'Stapleton', value: 'stapleton' },
          { title: 'RGI', value: 'rgi' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },

    // Tags & Labels
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'High Demand', value: 'high_demand' },
            { title: 'New Offering', value: 'new_offering' },
            { title: 'Hot', value: 'hot' },
            { title: 'New', value: 'new' },
            { title: 'Coming Soon', value: 'coming_soon' },
            { title: 'Live', value: 'live' },
            { title: 'Closed', value: 'closed' }
          ]
        }
      }]
    },
    {
      name: 'autoGeneratedTags',
      title: 'Auto-Generated Tags (Hot/New)',
      type: 'array',
      of: [{ type: 'string' }],
      readOnly: true
    },

    // CTA & Interaction Controls
    {
      name: 'ctaEnabled',
      title: 'CTA Button Enabled',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'tradingEnabled',
      title: 'Trading Enabled',
      type: 'boolean',
      initialValue: false
    },

    // Secondary Market Specific
    {
      name: 'secondaryMarketEnabled',
      title: 'Secondary Market Access',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'ipoLockEnabled',
      title: 'IPO Lock Enabled',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'ipoLockCountdown',
      title: 'IPO Lock Countdown',
      type: 'datetime',
      hidden: ({ document }) => !document?.ipoLockEnabled
    },

    // Scheduling & Timing
    {
      name: 'scheduledPublishTime',
      title: 'Scheduled Publish Time',
      type: 'datetime'
    },
    {
      name: 'countdownTimer',
      title: 'Countdown Timer',
      type: 'datetime'
    },

    // Media & Documentation (merged logo handling)
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'logo_url',
      title: 'Logo URL (Legacy)',
      type: 'url',
      description: 'Legacy field - use companyLogo instead'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'mediaGallery',
      title: 'Media Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true
        }
      }]
    },
    {
      name: 'documents',
      title: 'Documents (PDFs)',
      type: 'array',
      of: [{
        type: 'file',
        options: {
          accept: '.pdf'
        }
      }]
    },

    // FAQ Management
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string'
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text'
          },
          {
            name: 'isAutoGenerated',
            title: 'Auto-Generated',
            type: 'boolean',
            initialValue: false
          }
        ]
      }]
    },

    // Activity & Analytics
    {
      name: 'activityLevel',
      title: 'Activity Level',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' }
        ]
      }
    },
    {
      name: 'lastActivityDate',
      title: 'Last Activity Date',
      type: 'datetime'
    },

    // Metadata & Tracking
    {
      name: 'createdBy',
      title: 'Created By',
      type: 'string'
    },
    {
      name: 'lastModifiedBy',
      title: 'Last Modified By',
      type: 'string'
    },
    {
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Pending Approval', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'approvedBy',
      title: 'Approved By',
      type: 'string'
    },
    {
      name: 'approvalDate',
      title: 'Approval Date',
      type: 'datetime'
    },

    // Validation & QA
    {
      name: 'validationErrors',
      title: 'Validation Errors',
      type: 'array',
      of: [{ type: 'string' }],
      readOnly: true
    },
    {
      name: 'qaChecked',
      title: 'QA Checked',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'qaCheckDate',
      title: 'QA Check Date',
      type: 'datetime'
    },
    {
      name: 'qaCheckedBy',
      title: 'QA Checked By',
      type: 'string'
    },

    // Additional Metadata
    {
      name: 'riskScore',
      title: 'Risk Score',
      type: 'number',
      validation: Rule => Rule.min(1).max(10)
    },
    {
      name: 'maturityDate',
      title: 'Maturity Date',
      type: 'date'
    },
    {
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      options: {
        list: [
          { title: 'Equity', value: 'equity' },
          { title: 'Debt', value: 'debt' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Other', value: 'other' }
        ]
      }
    }
  ],

  preview: {
    select: {
      title: 'companyName',
      symbol: 'symbol',
      status: 'status',
      marketType: 'marketType',
      media: 'companyLogo'
    },
    prepare(selection) {
      const { title, symbol, status, marketType, media } = selection;
      const symbolDisplay = symbol ? ` (${symbol})` : '';
      const statusDisplay = status || 'No Status';
      const marketDisplay = marketType || 'No Market';
      return {
        title: `${title}${symbolDisplay}`,
        subtitle: `${marketDisplay} - ${statusDisplay}`,
        media: media
      };
    }
  },

  orderings: [
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }]
    },
    {
      title: 'Last Modified',
      name: 'lastModifiedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }]
    },
    {
      title: 'Company Name',
      name: 'companyNameAsc',
      by: [{ field: 'companyName', direction: 'asc' }]
    }
  ]
};
