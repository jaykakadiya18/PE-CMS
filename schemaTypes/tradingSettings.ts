export default {
  name: 'tradingSettings',
  title: 'Trading Settings',
  type: 'document',
  fields: [
    { name: 'assetId', title: 'Asset ID', type: 'string' },
    { name: 'internalPaidPrice', title: 'Internal Paid Price', type: 'number' },
    { name: 'secondaryMarketEnabled', title: 'Secondary Market Enabled', type: 'boolean' },
    { name: 'ipoLockEnabled', title: 'IPO Lock Enabled', type: 'boolean' },
    { name: 'ipoLockCountdown', title: 'IPO Lock Countdown', type: 'datetime' },
    { name: 'scheduledPublishTime', title: 'Scheduled Publish Time', type: 'datetime' },
    { name: 'countdownTimer', title: 'Countdown Timer', type: 'datetime' },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: ['high_demand', 'new_offering', 'hot', 'new', 'coming_soon', 'live', 'closed']
        }
      }]
    },
    {
      name: 'shareTranches',
      title: 'Share Tranche History',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'trancheId', title: 'Tranche ID', type: 'string' },
          { name: 'quantity', title: 'Share Quantity', type: 'number' },
          { name: 'pricePerShare', title: 'Price Per Share', type: 'number' },
          { name: 'dateAdded', title: 'Date Added', type: 'datetime' },
          { name: 'marketType', title: 'Market Type', type: 'string' }
        ]
      }]
    }
  ]
};
