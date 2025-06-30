// Create this as: schemaTypes/core/testCompany.ts
export default {
  name: 'testCompany',
  title: 'Test Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'primary', title: 'Primary Market' },
    { name: 'secondary', title: 'Secondary Market' }
  ],
  fields: [
    // ===== BASIC INFO =====
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required()
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

    // ===== PRIMARY MARKET =====
    {
      name: 'primaryMarketEnabled',
      title: 'Primary Market Enabled',
      type: 'boolean',
      group: 'primary',
      initialValue: false
    },
    {
      name: 'primaryCountdownTimer',
      title: 'Primary Countdown Timer',
      type: 'datetime',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: '🕒 Set future date for "Coming Soon" mode'
    },
    {
      name: 'primaryStatus',
      title: 'Primary Status',
      type: 'string',
      group: 'primary',
      options: {
        list: [
          { title: 'Live', value: 'live' },
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
          return '🔒 Auto-set to "Coming Soon" (future date)'
        } else {
          return '🔓 Countdown passed - Manual control'
        }
      },
      initialValue: ({ document }: { document: any }) => {
        if (!document?.primaryCountdownTimer) return undefined;
        const now = new Date();
        const countdown = new Date(document.primaryCountdownTimer);
        return now < countdown ? 'coming_soon' : undefined;
      },
      readOnly: false
    },
    {
      name: 'primaryCtaEnabled',
      title: 'Primary CTA Enabled',
      type: 'boolean',
      group: 'primary',
      hidden: ({ document }: { document: any }) => !document?.primaryMarketEnabled,
      description: ({ document }: { document: any }) => {
        const status = document?.primaryStatus
        return status === 'live' ? 
          '✅ CTA will be ENABLED (Status: Live)' : 
          '🔒 CTA will be DISABLED (Status not Live)'
      },
      initialValue: ({ document }: { document: any }) => {
        if (!document?.primaryCountdownTimer) return false;
        const now = new Date();
        const countdown = new Date(document.primaryCountdownTimer);
        return now < countdown ? false : (document?.primaryStatus === 'live');
      },
      validation: (Rule: any) => Rule.required().custom((val: any) => typeof val === 'boolean' ? true : 'Must be a boolean'),
      readOnly: false
    },

    // ===== SECONDARY MARKET =====
    {
      name: 'secondaryMarketEnabled',
      title: 'Secondary Market Enabled',
      type: 'boolean',
      group: 'secondary',
      initialValue: false
    },
    {
      name: 'secondaryCountdownTimer',
      title: 'Secondary Countdown Timer',
      type: 'datetime',
      group: 'secondary',
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled,
      description: '🕒 Set future date for "Coming Soon" mode'
    },
    {
      name: 'secondaryStatus',
      title: 'Secondary Status',
      type: 'string',
      group: 'secondary',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Coming Soon', value: 'coming_soon' },
          { title: 'Closed', value: 'closed' }
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
          return '🔒 Auto-set to "Coming Soon" (future date)'
        } else {
          return '🔓 Countdown passed - Manual control'
        }
      },
      initialValue: ({ document }: { document: any }) => {
        if (!document?.secondaryCountdownTimer) return undefined;
        const now = new Date();
        const countdown = new Date(document.secondaryCountdownTimer);
        return now < countdown ? 'coming_soon' : undefined;
      },
      readOnly: false
    },
    {
      name: 'secondaryCtaEnabled',
      title: 'Secondary CTA Enabled',
      type: 'boolean',
      group: 'secondary',
      hidden: ({ document }: { document: any }) => !document?.secondaryMarketEnabled,
      description: ({ document }: { document: any }) => {
        const status = document?.secondaryStatus
        return status === 'live' ? 
          '✅ CTA will be ENABLED (Status: Live)' : 
          '🔒 CTA will be DISABLED (Status not Live)'
      },
      initialValue: ({ document }: { document: any }) => {
        if (!document?.secondaryCountdownTimer) return false;
        const now = new Date();
        const countdown = new Date(document.secondaryCountdownTimer);
        return now < countdown ? false : (document?.secondaryStatus === 'live');
      },
      validation: (Rule: any) => Rule.required().custom((val: any) => typeof val === 'boolean' ? true : 'Must be a boolean'),
      readOnly: false
    }
  ],

  preview: {
    select: {
      title: 'companyName',
      subtitle: 'sector'
    }
  }
}