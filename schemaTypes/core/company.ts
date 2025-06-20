export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'financial', title: 'Financial' },
    { name: 'primary', title: 'Primary Market' },
    { name: 'secondary', title: 'Secondary Market' },
    { name: 'tranches', title: 'Share Tranches' },
    { name: 'automation', title: 'Automation & Tags' },
    { name: 'content', title: 'Content & Media' },
    { name: 'workflow', title: 'Workflow & QA' }
  ],
  fields: [
    // ===== BASIC INFORMATION =====
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
      title: 'Company Description',
      type: 'blockContent',
      group: 'basic'
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Tech', value: 'tech' },
          { title: 'Finance', value: 'finance' },
          { title: 'AI/ML', value: 'ai_ml' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Green Energy', value: 'green_energy' },
          { title: 'SaaS', value: 'saas' },
          { title: 'Space', value: 'space' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'clientGroup',
      title: 'Client Group',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Stapleton', value: 'stapleton' },
          { title: 'RGI', value: 'rgi' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'marketType',
      title: 'Available Markets',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Primary Market Only', value: 'primary' },
          { title: 'Secondary Market Only', value: 'secondary' },
          { title: 'Both Primary & Secondary', value: 'both' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: '⚠️ This controls which market sections are available below'
    },
    {
      name: 'isVisible',
      title: 'Visible to Users',
      type: 'boolean',
      group: 'basic',
      initialValue: false
    },
    {
      name: 'isFeatured',
      title: 'Featured Asset',
      type: 'boolean',
      group: 'basic',
      initialValue: false
    },
    {
      name: 'scheduledPublishTime',
      title: 'Scheduled Publish Time',
      type: 'datetime',
      group: 'basic',
      hidden: ({ document }: any) => !document?.isVisible,
      description: 'Only available when "Visible to Users" is enabled'
    },

    // ===== FINANCIAL =====
    {
      name: 'valuationCurrency',
      title: 'Valuation Currency',
      type: 'string',
      group: 'financial',
      options: {
        list: ['USD', 'EUR', 'GBP', 'INR']
      },
      initialValue: 'USD'
    },
    {
      name: 'latestValuation',
      title: 'Latest Company Valuation',
      type: 'number',
      group: 'financial'
    },
    {
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      group: 'financial',
      options: {
        list: [
          { title: 'Equity', value: 'equity' },
          { title: 'Debt', value: 'debt' },
          { title: 'Hybrid', value: 'hybrid' }
        ]
      }
    },

    // ===== PRIMARY MARKET =====
    {
      name: 'primaryMarketEnabled',
      title: 'Enable Primary Market',
      type: 'boolean',
      group: 'primary',
      initialValue: false,
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        return marketType === 'secondary';
      },
      description: '🔧 Toggle this to show/hide all primary market fields below'
    },
    {
      name: 'primaryCountdownTimer',
      title: 'Primary Coming Soon Countdown',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'primaryStatus',
      title: 'Primary Market Status',
      type: 'string',
      group: 'primary',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Coming Soon', value: 'coming_soon' },
          { title: 'Closed', value: 'closed' }
        ]
      },
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      },
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const document = context.document;
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        
        if ((marketType === 'primary' || marketType === 'both') && enabled && !value) {
          return 'Primary status is required when primary market is enabled';
        }
        return true;
      })
    },
    {
      name: 'primaryCtaEnabled',
      title: 'Primary CTA Enabled',
      type: 'boolean',
      group: 'primary',
      initialValue: false,
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'primaryPricePerShare',
      title: 'Primary Market Price Per Share',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0),
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'primaryInternalPrice',
      title: 'Primary Market Internal Price',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0),
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'totalSharesOffered',
      title: 'Total Shares Offered (Primary)',
      type: 'number',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'sharesRemaining',
      title: 'Shares Remaining (Primary)',
      type: 'number',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'minInvestmentShares',
      title: 'Minimum Investment Shares (Primary)',
      type: 'number',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'fundingProgress',
      title: 'Funding Progress (%)',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0).max(100),
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'primaryOfferingStartDate',
      title: 'Primary Offering Start Date',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'primaryOfferingEndDate',
      title: 'Primary Offering End Date',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },

    // ===== SECONDARY MARKET =====
    {
      name: 'secondaryMarketEnabled',
      title: 'Enable Secondary Market',
      type: 'boolean',
      group: 'secondary',
      initialValue: false,
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        return marketType === 'primary';
      },
      description: '🔧 Toggle this to show/hide all secondary market fields below'
    },
    {
      name: 'secondaryCountdownTimer',
      title: 'Secondary Coming Soon Countdown',
      type: 'datetime',
      group: 'secondary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      }
    },
    {
      name: 'secondaryStatus',
      title: 'Secondary Market Status',
      type: 'string',
      group: 'secondary',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Paused', value: 'paused' },
          { title: 'IPO Locked', value: 'ipo_locked' },
          { title: 'Closed', value: 'closed' },
          { title: 'Coming Soon', value: 'coming_soon' }
        ]
      },
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      },
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const document = context.document;
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        
        if ((marketType === 'secondary' || marketType === 'both') && enabled && !value) {
          return 'Secondary status is required when secondary market is enabled';
        }
        return true;
      })
    },
    {
      name: 'secondaryCtaEnabled',
      title: 'Secondary CTA Enabled',
      type: 'boolean',
      group: 'secondary',
      initialValue: false,
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      }
    },
    {
      name: 'ipoLockEnabled',
      title: 'IPO Lock Enabled',
      type: 'boolean',
      group: 'secondary',
      initialValue: false,
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      }
    },
    {
      name: 'ipoLockCountdown',
      title: 'IPO Lock Countdown',
      type: 'datetime',
      group: 'secondary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        const ipoLockEnabled = document?.ipoLockEnabled;
        return marketType === 'primary' || !enabled || !ipoLockEnabled;
      },
      description: 'Only shown when IPO Lock is enabled'
    },
    {
      name: 'corporateActions',
      title: 'Corporate Actions',
      type: 'array',
      group: 'secondary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      },
      of: [{
        type: 'object',
        name: 'corporateAction',
        title: 'Corporate Action',
        fields: [
          {
            name: 'actionType',
            title: 'Action Type',
            type: 'string',
            options: {
              list: [
                { title: 'Stock Split', value: 'split' },
                { title: 'Reverse Split', value: 'reverse_split' },
                { title: 'Dividend', value: 'dividend' },
                { title: 'Rights Issue', value: 'rights_issue' }
              ]
            }
          },
          {
            name: 'ratio',
            title: 'Split Ratio',
            type: 'string',
            hidden: ({ parent }: any) => {
              return !['split', 'reverse_split'].includes(parent?.actionType);
            }
          },
          {
            name: 'effectiveDate',
            title: 'Effective Date',
            type: 'datetime'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          }
        ]
      }]
    },

    // ===== SHARE TRANCHES =====
    {
      name: 'shareTranches',
      title: 'Share Tranche History',
      type: 'array',
      group: 'tranches',
      of: [{
        type: 'object',
        name: 'tranche',
        title: 'Share Tranche',
        fields: [
          {
            name: 'trancheId',
            title: 'Tranche ID',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'quantity',
            title: 'Share Quantity',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(1)
          },
          {
            name: 'publicPricePerShare',
            title: 'Public Price Per Share',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0)
          },
          {
            name: 'internalPaidPrice',
            title: 'Internal Paid Price',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0)
          },
          {
            name: 'dateAdded',
            title: 'Date Added',
            type: 'datetime',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'marketType',
            title: 'Market Type for this Tranche',
            type: 'string',
            options: {
              list: [
                { title: 'Primary', value: 'primary' },
                { title: 'Secondary', value: 'secondary' }
              ]
            },
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'trancheStatus',
            title: 'Tranche Status',
            type: 'string',
            options: {
              list: [
                { title: 'Active', value: 'active' },
                { title: 'Sold Out', value: 'sold_out' },
                { title: 'Closed', value: 'closed' },
                { title: 'Pending', value: 'pending' }
              ]
            },
            initialValue: 'pending'
          },
          {
            name: 'terms',
            title: 'Tranche Terms',
            type: 'text'
          }
        ]
      }]
    },

    // ===== AUTOMATION & TAGS =====
    {
      name: 'manualTags',
      title: 'Manual Tags',
      type: 'array',
      group: 'automation',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'High Demand', value: 'high_demand' },
            { title: 'New Offering', value: 'new_offering' },
            { title: 'Coming Soon', value: 'coming_soon' },
            { title: 'Limited Time', value: 'limited_time' },
            { title: 'Exclusive', value: 'exclusive' },
            { title: 'Hot', value: 'hot' },
            { title: 'Trending', value: 'trending' },
            { title: 'Closed', value: 'closed' }
          ]
        }
      }]
    },
    {
      name: 'autoGeneratedTags',
      title: 'Auto-Generated Tags',
      type: 'array',
      group: 'automation',
      of: [{ type: 'string' }],
      readOnly: true
    },
    {
      name: 'primaryActivityLevel',
      title: 'Primary Market Activity Level',
      type: 'string',
      group: 'automation',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' }
        ]
      },
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      }
    },
    {
      name: 'secondaryActivityLevel',
      title: 'Secondary Market Activity Level',
      type: 'string',
      group: 'automation',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' }
        ]
      },
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      }
    },
    {
      name: 'lastActivityDate',
      title: 'Last Activity Date',
      type: 'datetime',
      group: 'automation',
      readOnly: true
    },

    // ===== CONTENT & MEDIA =====
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'faq',
        title: 'FAQ Item',
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
            name: 'isAutoGenerated',
            title: 'Auto-Generated',
            type: 'boolean',
            initialValue: false,
            readOnly: true
          },
          {
            name: 'generatedAt',
            title: 'Generated Date',
            type: 'datetime',
            readOnly: true,
            hidden: ({ parent }: any) => !parent?.isAutoGenerated
          },
          {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            initialValue: 1
          }
        ]
      }]
    },
    {
      name: 'media',
      title: 'Company Media',
      type: 'reference',
      group: 'content',
      to: [{ type: 'companyMedia' }]
    },

    // ===== WORKFLOW & QA =====
    {
      name: 'validationErrors',
      title: 'Validation Errors',
      type: 'array',
      group: 'workflow',
      of: [{ type: 'string' }],
      readOnly: true
    },
    {
      name: 'qaChecked',
      title: 'QA Checked',
      type: 'boolean',
      group: 'workflow',
      initialValue: false
    },
    {
      name: 'qaCheckDate',
      title: 'QA Check Date',
      type: 'datetime',
      group: 'workflow',
      hidden: ({ document }: any) => !document?.qaChecked
    },
    {
      name: 'qaCheckedBy',
      title: 'QA Checked By',
      type: 'string',
      group: 'workflow',
      hidden: ({ document }: any) => !document?.qaChecked
    },
    {
      name: 'qaComments',
      title: 'QA Comments',
      type: 'text',
      group: 'workflow',
      hidden: ({ document }: any) => !document?.qaChecked
    },
    {
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      group: 'workflow',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Pending QA', value: 'pending_qa' },
          { title: 'QA Approved', value: 'qa_approved' },
          { title: 'Ready to Publish', value: 'ready_publish' },
          { title: 'Published', value: 'published' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
      group: 'workflow'
    },
    {
      name: 'lastModifiedBy',
      title: 'Last Modified By',
      type: 'string',
      group: 'workflow'
    },
    {
      name: 'approvedBy',
      title: 'Approved By',
      type: 'string',
      group: 'workflow',
      hidden: ({ document }: any) => {
        const status = document?.approvalStatus;
        return !['qa_approved', 'ready_publish', 'published'].includes(status);
      }
    },
    {
      name: 'approvalDate',
      title: 'Approval Date',
      type: 'datetime',
      group: 'workflow',
      hidden: ({ document }: any) => {
        const status = document?.approvalStatus;
        return !['qa_approved', 'ready_publish', 'published'].includes(status);
      }
    }
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'sector',
      media: 'media.companyLogo'
    }
  }
}
