export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'primary', title: 'Primary Market' },
    { name: 'secondary', title: 'Secondary Market' },
    { name: 'financial', title: 'Financial' },
    { name: 'tranches', title: 'Share Tranches' },
    { name: 'automation', title: 'Automation & Tags' },
    { name: 'content', title: 'Content & Media' },
    { name: 'workflow', title: 'Workflow & QA' }
  ],
  fields: [
    // ===== BASIC INFORMATION =====
    {
      name: 'assetId',
      title: 'Company ID (Auto-generated)',
      type: 'string',
      group: 'basic',
      readOnly: true,
      initialValue: () => {
        // Generate a proper UUID v4
        return crypto.randomUUID();
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Automatically generated UUID for the company'
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'website',
      title: 'Company Website',
      type: 'url',
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
      name: 'yearFounded',
      title: 'Year Founded',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'headquarters',
      title: 'Headquarters',
      type: 'string',
      group: 'basic'
    },
    {
      name: 'numberOfEmployees',
      title: 'Number of Employees',
      type: 'number',
      group: 'basic',
      validation: (Rule: any) => Rule.min(0)
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
          { title: 'Space', value: 'space' },
          { title: 'AI', value: 'ai' },
          { title: 'Software', value: 'software' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'basic',
      description: 'industry sector field'
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
          { title: 'Both Primary & Secondary', value: 'both' },
          { title: 'Private Investment', value: 'PI' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: '⚠️ This controls which market sections are available below'
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
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Live', value: 'live' },
          { title: 'Closed', value: 'closed' }
        ]
      },
      initialValue: 'upcoming',
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
      name: 'totalShares',
      title: 'Total Shares',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(1),
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      },
      description: 'Total number of shares available for this offering'
    },
    {
      name: 'availableShares',
      title: 'Available Shares',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0),
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      },
      description: 'Total Shares - Shares Sold. Can be manually edited.',
      initialValue: ({ document }: any) => {
        const total = document?.totalShares || 0;
        const sold = document?.sharesSold || 0;
        return total - sold;
      }
    },
    {
      name: 'sharesSold',
      title: 'Shares Sold',
      type: 'number',
      group: 'primary',
      validation: (Rule: any) => Rule.min(0),
      initialValue: 0,
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      },
      description: 'Total Shares - Available Shares.  from (BE)'
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
          { title: 'IPO Lock', value: 'ipo_lock' },
          { title: 'Trading', value: 'trading' },
          { title: 'Paused', value: 'paused' }
        ]
      },
      initialValue: 'trading',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.secondaryMarketEnabled;
        return marketType === 'primary' || !enabled;
      }
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

    // ===== FINANCIAL =====
    {
      name: 'valuationCurrency',
      title: 'Valuation Currency',
      type: 'string',
      group: 'financial',
      options: {
        list: ['USD', 'EUR', 'GBP']
      },
      initialValue: 'USD'
    },
    {
      name: 'valuation',
      title: 'Current Valuation Display',
      type: 'string',
      group: 'financial',
      description: 'Current valuation amount for display'
    },
    // In your company schema
    {
      name: 'valuationHistory',
      title: 'Valuation History',
      type: 'array',
      group: 'financial',
      of: [
        {
          type: 'object',
          name: 'valuationRecord',
          title: 'Valuation Record',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Date of the valuation (MM/DD/YY format)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'value',
              title: 'Valuation Amount',
              type: 'number',
              description: 'Valuation amount in USD',
              validation: (Rule: any) => Rule.required().min(0)
            }
          ],
          preview: {
            select: {
              date: 'date',
              value: 'value'
            },
            prepare({ date, value }: { date: string; value: number }) {
              return {
                title: `${date}`,
                subtitle: `$${(value / 1000000000).toFixed(1)}B`
              }
            }
          }
        }
      ],
      description: 'Historical valuation records with dates and amounts',
      options: {
        sortable: true
      }
    },
    {
      name: 'fundingHistory',
      title: 'Funding History',
      type: 'array',
      group: 'financial',
      of: [
        {
          type: 'object',
          name: 'fundingRecord',
          title: 'Funding Record',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Date of the funding round (MM/DD/YY format)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'amount',
              title: 'Funding Amount',
              type: 'number',
              description: 'Funding amount in USD',
              validation: (Rule: any) => Rule.required().min(0)
            },
            {
              name: 'roundType',
              title: 'Funding Round Type',
              type: 'string',
              description: 'Type of funding round (e.g., Seed, Series A, Series B, etc.)',
            }
          ],
          preview: {
            select: {
              date: 'date',
              amount: 'amount',
              roundType: 'roundType'
            },
            prepare({ date, amount, roundType }: { date: string; amount: number; roundType: string }) {
              const formatAmount = (value: number) => {
                if (value >= 1000000000) {
                  return `${(value / 1000000000).toFixed(1)}B`;
                } else if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}K`;
                } else {
                  return `${value}`;
                }
              };
              
              const roundTypeDisplay = roundType?.replace('_', ' ').toUpperCase() || 'Unknown';
              
              return {
                title: `${date} - ${roundTypeDisplay}`,
                subtitle: formatAmount(amount)
              };
            }
          }
        }
      ],
      description: 'Historical funding records with dates, amounts, and round types',
      options: {
        sortable: true
      }
    },
    {
      name: 'companyPerformanceMetrics',
      title: 'Company Performance Metrics',
      type: 'array',
      group: 'financial',
      of: [
        {
          type: 'object',
          name: 'performanceRecord',
          title: 'Performance Record',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'Date of the performance measurement (MM/DD/YY format)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'heatScore',
              title: 'Heat Score',
              type: 'number',
              description: 'Heat score metric',
              validation: (Rule: any) => Rule.required().min(0).max(100)
            },
            {
              name: 'heatTrend',
              title: 'Heat Trend',
              type: 'string',
              description: 'Heat trend direction (e.g., Up, Down, Stable)',
              options: {
                list: [
                  { title: 'Up', value: 'up' },
                  { title: 'Down', value: 'down' },
                  { title: 'Stable', value: 'stable' }
                ]
              }
            },
            {
              name: 'growthScore',
              title: 'Growth Score',
              type: 'number',
              description: 'Growth score metric',
              validation: (Rule: any) => Rule.required().min(0).max(100)
            },
            {
              name: 'growthTrend',
              title: 'Growth Trend',
              type: 'string',
              description: 'Growth trend direction (e.g., Up, Down, Stable)',
              options: {
                list: [
                  { title: 'Up', value: 'up' },
                  { title: 'Down', value: 'down' },
                  { title: 'Stable', value: 'stable' }
                ]
              }
            }
          ],
          preview: {
            select: {
              date: 'date',
              heatScore: 'heatScore',
              heatTrend: 'heatTrend',
              growthScore: 'growthScore',
              growthTrend: 'growthTrend'
            },
            prepare({ date, heatScore, heatTrend, growthScore, growthTrend }: { 
              date: string; 
              heatScore: number; 
              heatTrend: string; 
              growthScore: number; 
              growthTrend: string; 
            }) {
              const formatTrend = (trend: string) => {
                switch(trend) {
                  case 'up': return '↗️';
                  case 'down': return '↘️';
                  case 'stable': return '→';
                  default: return '';
                }
              };
              
              const heatTrendIcon = formatTrend(heatTrend);
              const growthTrendIcon = formatTrend(growthTrend);
              
              return {
                title: `${date}`,
                subtitle: `Heat: ${heatScore} ${heatTrendIcon} | Growth: ${growthScore} ${growthTrendIcon}`
              };
            }
          }
        }
      ],
      description: 'Performance metrics tracking with heat and growth scores and trends over time',
      options: {
        sortable: true
      }
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
    {
      name: 'companyStage',
      title: 'Company Stage',
      type: 'string',
      group: 'financial',
      options: {
        list: [
          { title: 'Early', value: 'early' },
          { title: 'Mid', value: 'mid' },
          { title: 'Late', value: 'late' }
        ]
      },
      initialValue: 'early', // Added default value
      validation: (Rule: any) => Rule.required(),
      description: 'Stage of company development'
    },
    {
      name: 'markupFee',
      title: 'Markup Fee (%)',
      type: 'number',
      group: 'financial',
      validation: (Rule: any) => Rule.min(0).max(100),
      description: 'Markup percentage applied to internal price'
    },
    {
      name: 'platformPrice',
      title: 'Platform Price (Auto-calculated)',
      type: 'number',
      group: 'financial',
      readOnly: true,
      description: 'Auto-calculated: Internal Price + Markup Fee',
      // You'll need to implement the auto-calculation logic in your application
      // This could be done via a webhook, mutation, or computed field
    },

    // ===== SHARE TRANCHES =====
    {
      name: 'shareTranches',
      title: 'Share Tranche History',
      type: 'array',
      group: 'tranches',
      of: [{
        type: 'reference',
        to: [{ type: 'shareTranche' }]
      }],
      description: 'References to share tranches for this company'
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

    // ===== CONTENT & MEDIA =====
    {
      name: 'logoUrl',
      title: 'Logo URL',
      type: 'url',
      group: 'content',
      description: 'Alternative logo URL field'
    },
    {
      name: 'management',
      title: 'Management Team',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Company leadership and management team'
    },
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
