export default {
  name: 'company',
  title: 'Company Upload',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'primary', title: 'Primary Market' },
    { name: 'secondary', title: 'Secondary Market' },
    { name: 'financial', title: 'Financial' },
    { name: 'company_insights', title: 'Company Insights' }, // New group
    { name: 'predictions', title: 'Predictions & Analytics' }, // New group
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
      name: 'companyHighlights',
      title: 'Company Highlights',
      type: 'array',
      group: 'basic',
      of: [{ type: 'string' }],
      description: 'Key highlights and achievements of the company'
    },
    {
      name: 'yearFounded',
      title: 'Year Founded',
      type: 'number',
      group: 'basic'
    },
    // Enhanced founding date field
    {
      name: 'foundedDate',
      title: 'Founded Date (Detailed)',
      type: 'string',
      group: 'basic',
      description: 'More specific founding date (e.g., "May 2015")'
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
    // Enhanced employee range field
    {
      name: 'employeeRange',
      title: 'Employee Range',
      type: 'string',
      group: 'basic',
      description: 'Employee count range for the company (e.g., "1,001-5,000")'
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Tech', value: 'Tech' },
          { title: 'Finance', value: 'Finance' },
          { title: 'AI/ML', value: 'AI/ML' },
          { title: 'Healthcare', value: 'Healthcare' },
          { title: 'Green Energy', value: 'Green Energy' },
          { title: 'SaaS', value: 'SaaS' },
          { title: 'Space', value: 'Space' },
          { title: 'AI', value: 'AI' },
          { title: 'Software', value: 'Software' },
          { title: 'Gaming', value: 'Gaming' },
          { title: 'Messaging', value: 'Messaging' },
          { title: 'Communities', value: 'Communities' }
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
    // New hub tags field
    {
      name: 'hubTags',
      title: 'Hub Tags',
      type: 'string',
      group: 'basic',
      description: 'Tag that describe the company\'s focus area'
    },
    // New company status fields
    {
      name: 'operatingStatus',
      title: 'Operating Status',
      type: 'string',
      group: 'basic',
      description: 'Operating status (e.g., "Active", "Inactive", "Acquired")'
    },
    {
      name: 'companyType',
      title: 'Company Type',
      type: 'string',
      group: 'basic',
      description: 'Company type (e.g., "For Profit", "Non Profit", "Government")'
    },
    // New CB Rank field
    {
      name: 'cbRank',
      title: 'Crunchbase Rank',
      type: 'string',
      group: 'basic',
      description: 'Crunchbase ranking (e.g., "#5")'
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
          { title: 'Both Primary & Secondary', value: 'both' }
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
    // Add this field right after the 'isFeatured' field in the BASIC INFORMATION section
    {
      name: 'featureTag',
      title: 'Feature Tag',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'High Demand', value: 'High Demand' },
          { title: 'New Offering', value: 'New Offering' },
          { title: 'Coming Soon', value: 'Coming Soon' },
          { title: 'Limited Time', value: 'Limited Time' },
          { title: 'Exclusive', value: 'Exclusive' },
          { title: 'Hot', value: 'Hot' },
          { title: 'Trending', value: 'Trending' },
          { title: 'Closed', value: 'Closed' }
        ]
      },
      hidden: ({ document }: any) => !document?.isFeatured,
      description: 'Select a feature tag for this asset (only visible when Featured Asset is enabled)',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const document = context.document;
        const isFeatured = document?.isFeatured;
        
        if (isFeatured && !value) {
          return 'Feature tag is required when asset is marked as featured';
        }
        return true;
      })
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
      },
      description: 'Price per share for the primary market offering(odoo trigger automatically, based of Company_stage, Markup fee & Internal Price)'
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
      },
      description: 'Internal price used for calculations, not shown to users'
    },
    {
      name: 'fundingDeadlineDate',
      title: 'Funding Deadline Date',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: any) => {
        const marketType = document?.marketType;
        const enabled = document?.primaryMarketEnabled;
        return marketType === 'secondary' || !enabled;
      },
      description: 'Final deadline for funding participation in the primary market offering'
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
      description: 'Total Shares - Shares Sold. Can be changed automatically (data comes through BE & odoo trigger).',
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
      description: 'Total Shares - Available Shares. Can be changed automatically (data comes through BE & odoo trigger).'
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
      name: 'secondaryCta',
      title: 'Secondary CTA',
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
      name: 'ipoLock',
      title: 'IPO Lock',
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
        const ipoLock = document?.ipoLock;
        return marketType === 'primary' || !enabled || !ipoLock;
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
      initialValue: () => 'USD'
    },
    {
      name: 'valuation',
      title: 'Current Valuation Display',
      type: 'number',
      group: 'financial',
      description: 'Current valuation amount for display'
    },
    // Enhanced revenue range field
    {
      name: 'estimatedRevenueRange',
      title: 'Estimated Revenue Range',
      type: 'string',
      group: 'financial',
      description: 'Estimated annual revenue range (e.g., "$1B to $10B")'
    },
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
      name: 'revenueData',
      title: 'Revenue Data',
      type: 'array',
      group: 'financial',
      of: [
        {
          type: 'object',
          name: 'revenueRecord',
          title: 'Revenue Record',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'Year of the revenue record (YYYY format)',
              validation: (Rule: any) => Rule.required().regex(/^\d{4}$/, {
                name: 'year',
                invert: false
              }).error('Year must be in YYYY format')
            },
            {
              name: 'revenue',
              title: 'Revenue Amount',
              type: 'number',
              description: 'Revenue amount in USD'
            }
          ],
          preview: {
            select: {
              year: 'year',
              revenue: 'revenue'
            },
            prepare({ year, revenue }: { year: string; revenue: number }) {
              const formatRevenue = (value: number) => {
                if (value >= 1000000000) {
                  return `$${(value / 1000000000).toFixed(1)}B`;
                } else if (value >= 1000000) {
                  return `$${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `$${(value / 1000).toFixed(1)}K`;
                } else {
                  return `$${value}`;
                }
              };
              
              return {
                title: `${year}`,
                subtitle: formatRevenue(revenue)
              };
            }
          }
        }
      ],
      description: 'Historical revenue records with years and amounts',
      options: {
        sortable: true
      }
    },
    // Enhanced funding fields
    {
      name: 'totalFundingAmount',
      title: 'Total Funding Amount',
      type: 'string',
      group: 'financial',
      description: 'Total funding raised (e.g., "$995.4M")'
    },
    {
      name: 'numberOfFundingRounds',
      title: 'Number of Funding Rounds',
      type: 'string',
      group: 'financial',
      description: 'Total number of funding rounds'
    },
    {
      name: 'leadInvestors',
      title: 'Lead Investors',
      type: 'array',
      group: 'financial',
      of: [{ type: 'string' }],
      description: 'List of lead investors in the company'
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
              description: 'Heat score metric'
            },
            {
              name: 'heatTrend',
              title: 'Heat Trend',
              type: 'number',
              description: 'Heat trend metric'
            },
            {
              name: 'growthScore',
              title: 'Growth Score',
              type: 'number',
              description: 'Growth score metric'
            },
            {
              name: 'growthTrend',
              title: 'Growth Trend',
              type: 'number',
              description: 'Growth trend metric'
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
      initialValue: 'early',
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
    // ===== COMPANY INSIGHTS GROUP =====
    {
      name: 'investmentBreakdown',
      title: 'Investment Breakdown',
      type: 'object',
      group: 'company_insights',
      fields: [
        {
          name: 'numberOfFunds',
          title: 'Number of Funds',
          type: 'string',
          description: 'Number of funds invested in this company'
        },
        {
          name: 'numberOfInvestments',
          title: 'Number of Investments',
          type: 'string',
          description: 'Number of investment rounds'
        },
        {
          name: 'numberOfAcquisitions',
          title: 'Number of Acquisitions',
          type: 'string',
          description: 'Number of acquisitions made by this company'
        }
      ]
    },
    {
      name: 'growthInsight',
      title: 'Growth Insight',
      type: 'object',
      group: 'company_insights',
      fields: [
        {
          name: 'description',
          title: 'Growth Description',
          type: 'text',
          description: 'Description of the company\'s growth trajectory'
        },
        {
          name: 'topContributingFactors',
          title: 'Top Contributing Factors',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Key factors contributing to growth'
        }
      ]
    },

    // ===== PREDICTIONS & ANALYTICS GROUP =====
    {
      name: 'ipoPrediction',
      title: 'IPO Prediction',
      type: 'object',
      group: 'predictions',
      fields: [
        {
          name: 'predictionTag',
          title: 'IPO Prediction',
          type: 'string',
          description: 'Prediction likelihood for IPO (e.g., "Likely", "Unlikely")'
        },
        {
          name: 'topContributingFactors',
          title: 'IPO Contributing Factors',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Factors that contribute to IPO likelihood'
        }
      ]
    },
    {
      name: 'acquisitionPrediction',
      title: 'Acquisition Prediction',
      type: 'object',
      group: 'predictions',
      fields: [
        {
          name: 'predictionTag',
          title: 'Acquisition Prediction',
          type: 'string',
          description: 'Prediction likelihood for acquisition (e.g., "Likely", "Unlikely")'
        },
        {
          name: 'topContributingFactors',
          title: 'Acquisition Contributing Factors',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Factors that contribute to acquisition likelihood'
        }
      ]
    },
    {
      name: 'growthPrediction',
      title: 'Growth Prediction',
      type: 'object',
      group: 'predictions',
      fields: [
        {
          name: 'predictionNumber',
          title: 'Growth Prediction Score',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(100),
          description: 'Growth prediction score (0-100)'
        },
        {
          name: 'topContributingFactors',
          title: 'Growth Contributing Factors',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Factors that contribute to growth prediction'
        }
      ]
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
            { title: 'High Demand', value: 'High Demand' },
            { title: 'New Offering', value: 'New Offering' },
            { title: 'Coming Soon', value: 'Coming Soon' },
            { title: 'Limited Time', value: 'Limited Time' },
            { title: 'Exclusive', value: 'Exclusive' },
            { title: 'Hot', value: 'Hot' },
            { title: 'Trending', value: 'Trending' },
            { title: 'Closed', value: 'Closed' }
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
      name: 'logoImage',
      title: 'Logo Upload',
      type: 'image',
      group: 'content',
      description: 'Upload company logo image file'
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
      media: 'logoImage'
    }
  }
}