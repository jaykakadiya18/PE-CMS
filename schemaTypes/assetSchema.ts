// 1. Core Asset Schema (main document)
export const assetSchema = {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    // Essential fields only
    { name: 'companyName', title: 'Company Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'symbol', title: 'Asset Symbol/Ticker', type: 'string', validation: Rule => Rule.required() },
    { name: 'assetId', title: 'Asset ID', type: 'string', validation: Rule => Rule.required() },
    { name: 'companyOverview', title: 'Company Overview', type: 'text' },
    
    // Status & Market
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
    
    // Core pricing
    { name: 'pricePerShare', title: 'Price Per Share', type: 'number', validation: Rule => Rule.required().min(0) },
    { name: 'availableVolume', title: 'Available Volume', type: 'number', validation: Rule => Rule.required().min(0) },
    
    // Controls
    { name: 'isVisible', title: 'Visible to Users', type: 'boolean', initialValue: false },
    { name: 'ctaEnabled', title: 'CTA Enabled', type: 'boolean', initialValue: false },
    { name: 'tradingEnabled', title: 'Trading Enabled', type: 'boolean', initialValue: false },
    
    // Client info
    { name: 'clientGroup', title: 'Client Group', type: 'string', options: { list: ['stapleton', 'rgi', 'other'] } },
    
    // References to other documents
    { 
      name: 'companyProfile', 
      title: 'Company Profile', 
      type: 'reference', 
      to: [{ type: 'companyProfile' }] 
    },
    { 
      name: 'tradingSettings', 
      title: 'Trading Settings', 
      type: 'reference', 
      to: [{ type: 'tradingSettings' }] 
    },
    { 
      name: 'assetMedia', 
      title: 'Asset Media', 
      type: 'reference', 
      to: [{ type: 'assetMedia' }] 
    }
  ]
};
