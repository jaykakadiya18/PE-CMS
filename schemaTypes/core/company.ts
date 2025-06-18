export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'financial', title: 'Financial' },
    { name: 'trading', title: 'Trading & Market' },
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
      group: 'basic'
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'basic'
    },

    // ===== CLIENT & PARTNERSHIP =====
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

    // ===== FINANCIAL INFORMATION =====
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
      title: 'Latest Valuation',
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
    {
      name: 'minInvestmentShares',
      title: 'Minimum Investment Shares',
      type: 'number',
      group: 'financial'
    },

    // ===== TRADING & MARKET LOGIC =====
    {
      name: 'marketType',
      title: 'Market Type',
      type: 'string',
      group: 'trading',
      options: {
        list: [
          { title: 'Primary Market Only', value: 'primary' },
          { title: 'Secondary Market Only', value: 'secondary' },
          { title: 'Both Primary & Secondary', value: 'both' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Determines which markets this asset appears in'
    },
    {
      name: 'status',
      title: 'Trading Status',
      type: 'string',
      group: 'trading',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Coming Soon', value: 'coming_soon' },
          { title: 'Closed', value: 'closed' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      group: 'trading',
      options: {
        list: [
          { title: 'Equity', value: 'equity' },
          { title: 'Debt', value: 'debt' },
          { title: 'Hybrid', value: 'hybrid' }
        ]
      }
    },

    // ===== CTA & INTERACTION CONTROLS =====
    {
      name: 'ctaEnabled',
      title: 'CTA Button Enabled',
      type: 'boolean',
      group: 'trading',
      initialValue: false,
      description: 'Controls if users can interact with this asset'
    },
    {
      name: 'tradingEnabled',
      title: 'Trading Enabled',
      type: 'boolean',
      group: 'trading',
      initialValue: false
    },
    {
      name: 'isVisible',
      title: 'Visible to Users',
      type: 'boolean',
      group: 'trading',
      initialValue: false
    },
    {
      name: 'isFeatured',
      title: 'Featured Asset',
      type: 'boolean',
      group: 'trading',
      initialValue: false
    },

    // ===== SECONDARY MARKET SPECIFIC =====
    {
      name: 'secondaryMarketEnabled',
      title: 'Secondary Market Access',
      type: 'boolean',
      group: 'trading',
      initialValue: false,
      description: 'Admin control for secondary market access'
    },
    {
      name: 'ipoLockEnabled',
      title: 'IPO Lock Enabled',
      type: 'boolean',
      group: 'trading',
      initialValue: false,
      description: 'Only applicable for secondary market'
    },
    {
      name: 'ipoLockCountdown',
      title: 'IPO Lock Countdown',
      type: 'datetime',
      group: 'trading',
      hidden: ({ document }: { document: any }) => !document?.ipoLockEnabled,
      description: 'When IPO lock expires'
    },

    // ===== PRICING (DUAL PRICING SYSTEM) =====
    {
      name: 'currentPublicPrice',
      title: 'Current Public Price Per Share',
      type: 'number',
      group: 'financial',
      validation: (Rule: any) => Rule.min(0),
      description: 'Price shown to users'
    },
    {
      name: 'currentInternalPrice',
      title: 'Current Internal Paid Price',
      type: 'number',
      group: 'financial',
      validation: (Rule: any) => Rule.min(0),
      description: 'Internal platform price (admin only)'
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
      description: 'Track multiple share offerings and tranches'
    },

    // ===== SCHEDULING & TIMING =====
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
      name: 'scheduledPublishTime',
      title: 'Scheduled Publish Time',
      type: 'datetime',
      group: 'trading',
      description: 'When this asset becomes visible'
    },
    {
      name: 'countdownTimer',
      title: 'Coming Soon Countdown',
      type: 'datetime',
      group: 'trading',
      hidden: ({ document }: { document: any }) => document?.status !== 'coming_soon',
      description: 'Countdown timer for coming soon assets'
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
            { title: 'Exclusive', value: 'exclusive' }
          ]
        }
      }],
      description: 'Manually assigned tags'
    },
    {
      name: 'autoGeneratedTags',
      title: 'Auto-Generated Tags (Hot/New)',
      type: 'array',
      group: 'automation',
      of: [{ type: 'string' }],
      readOnly: true,
      description: 'System generates these based on activity and recency'
    },
    {
      name: 'activityLevel',
      title: 'Activity Level',
      type: 'string',
      group: 'automation',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' }
        ]
      },
      description: 'Used for auto-generating Hot tags'
    },
    {
      name: 'lastActivityDate',
      title: 'Last Activity Date',
      type: 'datetime',
      group: 'automation',
      readOnly: true
    },

    // ===== FAQ MANAGEMENT =====
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

    // ===== VALIDATION & QA =====
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

    // ===== WORKFLOW & APPROVAL =====
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
    },

    // ===== REFERENCES =====
    {
      name: 'media',
      title: 'Company Media',
      type: 'reference',
      group: 'content',
      to: [{ type: 'companyMedia' }]
    }
  ],

  // ===== PREVIEW CONFIGURATION =====
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tickerSymbol',
      status: 'status',
      marketType: 'marketType',
      clientGroup: 'clientGroup',
      media: 'media.companyLogo'
    },
    prepare({ title, subtitle, status, marketType, clientGroup, media }: { title: any; subtitle: any; status: any; marketType: any; clientGroup: any; media: any }) {
      const symbolDisplay = subtitle ? ` (${subtitle})` : '';
      const statusDisplay = status || 'No Status';
      const marketDisplay = marketType || 'No Market';
      const clientDisplay = clientGroup || 'No Client';
      
      return {
        title: `${title}${symbolDisplay}`,
        subtitle: `${clientDisplay} • ${marketDisplay} • ${statusDisplay}`,
        media
      }
    }
  },

  // ===== ORDERINGS =====
  orderings: [
    {
      title: 'Status (Live First)',
      name: 'statusPriority',
      by: [
        { field: 'status', direction: 'asc' },
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
      title: 'Market Type',
      name: 'marketType',
      by: [
        { field: 'marketType', direction: 'asc' },
        { field: 'status', direction: 'asc' }
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