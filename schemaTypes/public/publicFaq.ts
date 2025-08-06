export default {
  name: 'affiliateFaq',
  title: 'Affiliate FAQ',
  type: 'document',
  groups: [
    { name: 'content', title: 'FAQ Content', default: true },
    { name: 'categorization', title: 'Category & Targeting' },
    { name: 'display', title: 'Display Settings' }
  ],
  fields: [
    // ===== FAQ CONTENT =====
    {
      name: 'question',
      title: 'FAQ Question',
      type: 'string',
      group: 'content',
      validation: (Rule: any) => Rule.required().min(10).max(250),
      description: 'The FAQ question for affiliate page'
    },
    {
      name: 'answer',
      title: 'FAQ Answer',
      type: 'text',
      group: 'content',
      validation: (Rule: any) => Rule.required().min(20),
      rows: 6,
      description: 'Detailed answer for the affiliate question'
    },

    // ===== CATEGORIZATION & TARGETING =====
    {
      name: 'affiliateCategory',
      title: 'Affiliate FAQ Category',
      type: 'string',
      group: 'categorization',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Getting Started', value: 'getting_started' },
          { title: 'Commission & Earnings', value: 'commission_earnings' },
          { title: 'Referral Process', value: 'referral_process' },
          { title: 'Marketing Materials', value: 'marketing_materials' },
          { title: 'Payment & Payouts', value: 'payment_payouts' },
          { title: 'Program Requirements', value: 'program_requirements' },
          { title: 'Tracking & Analytics', value: 'tracking_analytics' },
          { title: 'Terms & Conditions', value: 'terms_conditions' },
          { title: 'Support & Contact', value: 'support_contact' },
          { title: 'General Questions', value: 'general' }
        ]
      },
      description: 'Category for organizing FAQs on affiliate page'
    },
    {
      name: 'affiliateSection',
      title: 'Affiliate Page Section',
      type: 'string',
      group: 'categorization',
      options: {
        list: [
          { title: 'Main FAQ Section', value: 'main_faq' },
          { title: 'Program Overview', value: 'program_overview' },
          { title: 'Commission Structure', value: 'commission_structure' },
          { title: 'Getting Started Guide', value: 'getting_started_guide' },
          { title: 'Marketing Resources', value: 'marketing_resources' },
          { title: 'Footer FAQ', value: 'footer_faq' }
        ]
      },
      initialValue: 'main_faq',
      description: 'Specific section on affiliate page where this FAQ appears'
    },
    {
      name: 'audienceType',
      title: 'Target Audience',
      type: 'string',
      group: 'categorization',
      options: {
        list: [
          { title: 'New Affiliates', value: 'new_affiliates' },
          { title: 'Existing Affiliates', value: 'existing_affiliates' },
          { title: 'Potential Partners', value: 'potential_partners' },
          { title: 'All Visitors', value: 'all_visitors' }
        ]
      },
      initialValue: 'all_visitors',
      description: 'Who this FAQ is primarily intended for'
    },

    // ===== DISPLAY SETTINGS =====
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'display',
      initialValue: 1,
      validation: (Rule: any) => Rule.required().min(1),
      description: 'Order within the category (1 = first)'
    },
    {
      name: 'isHighPriority',
      title: 'High Priority FAQ',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Mark as high priority to show prominently'
    },
    {
      name: 'showInQuickAccess',
      title: 'Show in Quick Access',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Include in quick access/most common FAQs section'
    },
    {
      name: 'relatedLinks',
      title: 'Related Links',
      type: 'array',
      group: 'display',
      of: [{
        type: 'object',
        name: 'relatedLink',
        title: 'Related Link',
        fields: [
          {
            name: 'linkText',
            title: 'Link Text',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'linkUrl',
            title: 'Link URL',
            type: 'url',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'isExternal',
            title: 'External Link',
            type: 'boolean',
            initialValue: false
          }
        ],
        preview: {
          select: {
            title: 'linkText',
            subtitle: 'linkUrl'
          }
        }
      }],
      description: 'Related links to show with this FAQ'
    },

    // ===== METADATA =====
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'display',
      initialValue: true,
      description: 'Show/hide this FAQ on the affiliate page'
    },
    {
      name: 'createdAt',
      title: 'Created Date',
      type: 'datetime',
      group: 'display',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      group: 'display',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
      group: 'display',
      description: 'Admin who created this FAQ'
    }
  ],

  // ===== PREVIEW CONFIGURATION =====
  preview: {
    select: {
      title: 'question',
      category: 'affiliateCategory',
      section: 'affiliateSection',
      isActive: 'isActive',
      isHighPriority: 'isHighPriority',
      displayOrder: 'displayOrder'
    },
    prepare({ title, category, section, isActive, isHighPriority, displayOrder }: { 
      title: string; 
      category: string; 
      section: string;
      isActive: boolean; 
      isHighPriority: boolean;
      displayOrder: number;
    }) {
      const statusIcon = isActive ? '✅' : '❌';
      const priorityIcon = isHighPriority ? '🔥' : '';
      const categoryDisplay = category ? category.replace('_', ' ').toUpperCase() : 'GENERAL';
      
      return {
        title: `${statusIcon} ${title}` || 'Untitled FAQ',
        subtitle: `${categoryDisplay} | Order: ${displayOrder} ${priorityIcon}`
      }
    }
  },

  // ===== ORDERING =====
  orderings: [
    {
      title: 'Category & Order',
      name: 'categoryOrder',
      by: [
        { field: 'affiliateCategory', direction: 'asc' },
        { field: 'displayOrder', direction: 'asc' }
      ]
    },
    {
      title: 'Recently Created',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }]
    },
    {
      title: 'High Priority First',
      name: 'priorityFirst',
      by: [
        { field: 'isHighPriority', direction: 'desc' },
        { field: 'displayOrder', direction: 'asc' }
      ]
    }
  ]
}