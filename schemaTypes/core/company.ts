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

    // ===== MARKET AVAILABILITY =====
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
      description: 'Controls which markets this asset appears in'
    },

    // ===== GENERAL FINANCIAL =====
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

    // ===== PRIMARY MARKET SECTION =====
    {
      name: 'primaryMarketEnabled',
      title: 'Primary Market Enabled',
      type: 'boolean',
      group: 'primary',
      initialValue: false,
      description: 'Enable primary market listings for this asset'
    },
    {
      name: 'primaryCountdownTimer',
      title: 'Primary Coming Soon Countdown',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: '🕒 Set future date for "Coming Soon" mode. Leave empty for manual status control.'
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
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: ({ document }: { document: any }) => {
        if (!document?.primaryCountdownTimer) {
          return '✏️ Manual control - Select any status'
        }
        
        const now = new Date()
        const countdown = new Date(document.primaryCountdownTimer)
        
        if (now < countdown) {
          return '🔒 Auto-set to "Coming Soon" (future countdown date)'
        } else {
          return '🔓 Countdown passed - You can select any status'
        }
      },
      // Auto-set to "coming_soon" if countdown is in future
      initialValue: ({ document }: { document: any }) => {
        if (!document?.primaryCountdownTimer) return undefined
        
        const now = new Date()
        const countdown = new Date(document.primaryCountdownTimer)
        
        return now < countdown ? 'coming_soon' : undefined
      },
      // Disable field if countdown is in future
      readOnly: ({ document }: { document: any }) => {
        if (!document?.primaryCountdownTimer) return false
        
        const now = new Date()
        const countdown = new Date(document.primaryCountdownTimer)
        
        return now < countdown
      }
    },
    {
      name: 'primaryCtaEnabled',
      title: 'Primary CTA Enabled',
      type: 'boolean',
      group: 'primary',
      initialValue: false,
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: ({ document }: { document: any }) => {
        const status = document?.primaryStatus
        
        if (status === 'live') {
          return '✅ Auto-enabled (Status: Live)'
        } else if (status === 'coming_soon') {
          return '🔒 Auto-disabled (Status: Coming Soon)'
        } else if (status === 'closed') {
          return '🔒 Auto-disabled (Status: Closed)'
        } else {
          return '⚙️ Auto-managed based on status'
        }
      },
      // Auto-set based on status
      initialValue: ({ document }: { document: any }) => {
        return document?.primaryStatus === 'live'
      },
      // Make read-only since it's auto-managed
      readOnly: true
    },
    {
      name: 'primaryPricePerShare',
      title: 'Primary Market Price Per Share',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0),
      description: 'Public-facing price',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled
    },
    {
      name: 'primaryInternalPrice',
      title: 'Primary Market Internal Price',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0),
      description: 'Internal platform price (admin only)',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled
    },
    {
      name: 'totalSharesOffered',
      title: 'Total Shares Offered (Primary)',
      type: 'number',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled
    },
    {
      name: 'sharesRemaining',
      title: 'Shares Remaining (Primary)',
      type: 'number',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled
    },
    {
      name: 'minInvestmentShares',
      title: 'Minimum Investment Shares (Primary)',
      type: 'number',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled
    },
    {
      name: 'fundingProgress',
      title: 'Funding Progress',
      type: 'number',
      group: 'primary',
      description: 'Percentage (0-100) or absolute value',
      validation: (Rule: any) => Rule.min(0).max(100),
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled
    },
    {
      name: 'primaryOfferingStartDate',
      title: 'Primary Offering Start Date',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: 'When the primary offering becomes active'
    },
    {
      name: 'primaryOfferingEndDate',
      title: 'Primary Offering End Date',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: 'When the primary offering closes'
    },

    // ===== SECONDARY MARKET SECTION =====
    {
      name: 'secondaryMarketEnabled',
      title: 'Secondary Market Enabled',
      type: 'boolean',
      group: 'secondary',
      initialValue: false,
      description: 'Enable secondary market trading for this asset'
    },
    {
      name: 'secondaryCountdownTimer',
      title: 'Secondary Coming Soon Countdown',
      type: 'datetime',
      group: 'secondary',
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled,
      description: '🕒 Set future date for "Coming Soon" mode. Leave empty for manual status control.'
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
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled,
      description: ({ document }: { document: any }) => {
        if (!document?.secondaryCountdownTimer) {
          return '✏️ Manual control - Select any status'
        }
        
        const now = new Date()
        const countdown = new Date(document.secondaryCountdownTimer)
        
        if (now < countdown) {
          return '🔒 Auto-set to "Coming Soon" (future countdown date)'
        } else {
          return '🔓 Countdown passed - You can select any status'
        }
      },
      // Auto-set to "coming_soon" if countdown is in future
      initialValue: ({ document }: { document: any }) => {
        if (!document?.secondaryCountdownTimer) return undefined
        
        const now = new Date()
        const countdown = new Date(document.secondaryCountdownTimer)
        
        return now < countdown ? 'coming_soon' : undefined
      },
      // Disable field if countdown is in future
      readOnly: ({ document }: { document: any }) => {
        if (!document?.secondaryCountdownTimer) return false
        
        const now = new Date()
        const countdown = new Date(document.secondaryCountdownTimer)
        
        return now < countdown
      }
    },
    {
      name: 'secondaryCtaEnabled',
      title: 'Secondary CTA Enabled',
      type: 'boolean',
      group: 'secondary',
      initialValue: false,
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled,
      description: ({ document }: { document: any }) => {
        const status = document?.secondaryStatus
        
        if (status === 'live') {
          return '✅ Auto-enabled (Status: Live)'
        } else if (status === 'coming_soon') {
          return '🔒 Auto-disabled (Status: Coming Soon)'
        } else if (status === 'closed') {
          return '🔒 Auto-disabled (Status: Closed)'
        } else {
          return '⚙️ Auto-managed based on status'
        }
      },
      // Auto-set based on status
      initialValue: ({ document }: { document: any }) => {
        return document?.secondaryStatus === 'live'
      },
      // Make read-only since it's auto-managed
      readOnly: true
    },
    {
      name: 'ipoLockEnabled',
      title: 'IPO Lock Enabled',
      type: 'boolean',
      group: 'secondary',
      initialValue: false,
      description: 'Lock trading during IPO period',
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled
    },
    {
      name: 'ipoLockCountdown',
      title: 'IPO Lock Countdown',
      type: 'datetime',
      group: 'secondary',
      hidden: ({ document }: { document: any }) => 
        !document?.secondaryMarketEnabled || !document?.ipoLockEnabled,
      description: 'When IPO lock expires and trading resumes'
    },
    {
      name: 'corporateActions',
      title: 'Corporate Actions',
      type: 'array',
      group: 'secondary',
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
            description: 'e.g., "2:1" for 2-for-1 split',
            hidden: ({ parent }: { parent: any }) => 
              !['split', 'reverse_split'].includes(parent?.actionType)
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
      }],
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled
    },

    // ===== SHARE TRANCHE MANAGEMENT =====
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
            type: 'text',
            description: 'Special terms for this tranche'
          }
        ],
        preview: {
          select: {
            title: 'trancheId',
            subtitle: 'marketType',
            quantity: 'quantity',
            price: 'publicPricePerShare'
          },
          prepare({ title, subtitle, quantity, price }: { title: any; subtitle: any; quantity: any; price: any }) {
            return {
              title: `${title} (${subtitle})`,
              subtitle: `${quantity} shares @ $${price}`
            }
          }
        }
      }],
      description: 'Track multiple share offerings and tranches across both markets'
    },

    // ===== TAGS & AUTOMATION =====
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
      }],
      description: 'Manually assigned tags for both markets'
    },
    {
      name: 'autoGeneratedTags',
      title: 'Auto-Generated Tags',
      type: 'array',
      group: 'automation',
      of: [{ type: 'string' }],
      readOnly: true,
      description: 'System generates these based on activity, recency, and market performance'
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
      description: 'Used for auto-generating Hot tags in primary market'
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
      description: 'Used for auto-generating Hot/Trending tags in secondary market'
    },
    {
      name: 'lastActivityDate',
      title: 'Last Activity Date',
      type: 'datetime',
      group: 'automation',
      readOnly: true
    },

    // ===== VISIBILITY & DISPLAY =====
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
      description: 'When this asset becomes visible'
    },

    // ===== ASSET TYPE =====
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
            hidden: ({ parent }: { parent: any }) => !parent?.isAutoGenerated
          },
          {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            initialValue: 1
          }
        ],
        preview: {
          select: {
            title: 'question',
            isAuto: 'isAutoGenerated'
          },
          prepare({ title, isAuto }: { title: any; isAuto: any }) {
            return {
              title: title,
              subtitle: isAuto ? '🤖 Auto-generated' : '✏️ Manual'
            }
          }
        }
      }],
      description: 'Auto-generates 4 FAQs per company, editable manually'
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
      readOnly: true,
      description: 'System-generated validation issues'
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
      group: 'workflow'
    },
    {
      name: 'qaCheckedBy',
      title: 'QA Checked By',
      type: 'string',
      group: 'workflow'
    },
    {
      name: 'qaComments',
      title: 'QA Comments',
      type: 'text',
      group: 'workflow'
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
      group: 'workflow'
    },
    {
      name: 'approvalDate',
      title: 'Approval Date',
      type: 'datetime',
      group: 'workflow'
    }
  ],

  // ===== PREVIEW CONFIGURATION =====
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tickerSymbol',
      primaryStatus: 'primaryStatus',
      secondaryStatus: 'secondaryStatus',
      marketType: 'marketType',
      clientGroup: 'clientGroup',
      sector: 'sector',
      media: 'media.companyLogo'
    },
    prepare({ title, subtitle, primaryStatus, secondaryStatus, marketType, clientGroup, sector, media }: { 
      title: any; subtitle: any; primaryStatus: any; secondaryStatus: any; marketType: any; clientGroup: any; sector: any; media: any 
    }) {
      const symbolDisplay = subtitle ? ` (${subtitle})` : '';
      const clientDisplay = clientGroup || 'No Client';
      const sectorDisplay = sector ? ` • ${sector}` : '';
      
      let statusDisplay = '';
      if (marketType === 'primary' && primaryStatus) {
        statusDisplay = `Primary: ${primaryStatus}`;
      } else if (marketType === 'secondary' && secondaryStatus) {
        statusDisplay = `Secondary: ${secondaryStatus}`;
      } else if (marketType === 'both') {
        const pStatus = primaryStatus ? `P:${primaryStatus}` : '';
        const sStatus = secondaryStatus ? `S:${secondaryStatus}` : '';
        statusDisplay = [pStatus, sStatus].filter(Boolean).join(' | ');
      }
      
      return {
        title: `${title}${symbolDisplay}`,
        subtitle: `${clientDisplay}${sectorDisplay} • ${statusDisplay || 'No Status'}`,
        media
      }
    }
  },

  // ===== ORDERINGS =====
  orderings: [
    {
      title: 'Primary Market Status',
      name: 'primaryStatus',
      by: [
        { field: 'primaryStatus', direction: 'asc' },
        { field: 'companyName', direction: 'asc' }
      ]
    },
    {
      title: 'Secondary Market Status',
      name: 'secondaryStatus',
      by: [
        { field: 'secondaryStatus', direction: 'asc' },
        { field: 'companyName', direction: 'asc' }
      ]
    },
    {
      title: 'Market Type',
      name: 'marketType',
      by: [
        { field: 'marketType', direction: 'asc' },
        { field: 'companyName', direction: 'asc' }
      ]
    },
    {
      title: 'Client Group',
      name: 'clientGroup',
      by: [
        { field: 'clientGroup', direction: 'asc' },
        { field: 'companyName', direction: 'asc' }
      ]
    },
    {
      title: 'Sector',
      name: 'sector',
      by: [
        { field: 'sector', direction: 'asc' },
        { field: 'companyName', direction: 'asc' }
      ]
    },
    {
      title: 'Last Modified',
      name: 'lastModified',
      by: [{ field: '_updatedAt', direction: 'desc' }]
    },
    {
      title: 'Approval Status',
      name: 'approvalStatus',
      by: [
        { field: 'approvalStatus', direction: 'asc' },
        { field: '_updatedAt', direction: 'desc' }
      ]
    }
  ]
}
