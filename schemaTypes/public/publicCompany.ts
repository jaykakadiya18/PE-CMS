export default {
  name: 'publicCompany',
  title: 'Public Company',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'details', title: 'Company Details' },
    { name: 'financial', title: 'Financial Info' },
    { name: 'content', title: 'Content' }
  ],
  fields: [
    // ===== BASIC FIELDS =====
    {
      name: 'assetId',
      title: 'Asset ID',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
      description: 'Unique identifier for the company'
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
      description: 'Company logo image'
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'basic',
      description: 'Industry classification'
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Technology', value: 'tech' },
          { title: 'Finance', value: 'finance' },
          { title: 'AI/ML', value: 'ai_ml' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Green Energy', value: 'green_energy' },
          { title: 'SaaS', value: 'saas' },
          { title: 'Space', value: 'space' },
          { title: 'AI', value: 'ai' },
          { title: 'Software', value: 'software' },
          { title: 'Gaming', value: 'gaming' },
          { title: 'Messaging', value: 'messaging' },
          { title: 'Communities', value: 'communities' }
        ]
      },
      description: 'Business sector'
    },

    // ===== COMPANY DETAILS =====
    {
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      group: 'details',
      description: 'Year the company was founded'
    },
    {
      name: 'headquarters',
      title: 'Headquarters',
      type: 'string',
      group: 'details',
      description: 'Company headquarters location'
    },
    {
      name: 'employees',
      title: 'Number of Employees',
      type: 'string',
      group: 'details',
      description: 'Employee count or range (e.g., "1,001-5,000")'
    },
    {
      name: 'description',
      title: 'Company Description',
      type: 'text',
      group: 'details',
      description: 'Brief description of the company'
    },
    {
      name: 'management',
      title: 'Management Team',
      type: 'array',
      group: 'details',
      of: [{
        type: 'object',
        name: 'manager',
        title: 'Manager',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'title',
            title: 'Job Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'title'
          }
        }
      }],
      description: 'Key management team members'
    },
    {
      name: 'companyStage',
      title: 'Company Stage',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Early', value: 'early' },
          { title: 'Mid', value: 'mid' },
          { title: 'Late', value: 'late' }
        ]
      },
      description: 'Current stage of company development'
    },
    {
      name: 'cbRank',
      title: 'Crunchbase Rank',
      type: 'string',
      group: 'details',
      description: 'Crunchbase ranking (e.g., "#5")'
    },
    {
      name: 'companyType',
      title: 'Company Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'For Profit', value: 'for_profit' },
          { title: 'Non Profit', value: 'non_profit' },
          { title: 'Government', value: 'government' }
        ]
      },
      description: 'Type of organization'
    },

    // ===== FINANCIAL INFO =====
    {
      name: 'estimatedRevenue',
      title: 'Estimated Revenue Range',
      type: 'string',
      group: 'financial',
      description: 'Estimated annual revenue range (e.g., "$1B to $10B")'
    },
    {
      name: 'hubTags',
      title: 'Hub Tags',
      type: 'string',
      group: 'financial',
      description: 'Tags that describe the company\'s focus area'
    },
    {
      name: 'fundingHistory',
      title: 'Funding History',
      type: 'array',
      group: 'financial',
      of: [{
        type: 'object',
        name: 'fundingRound',
        title: 'Funding Round',
        fields: [
          {
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'Date of funding round (e.g., "Mar 2023")'
          },
          {
            name: 'amount',
            title: 'Amount',
            type: 'string',
            description: 'Funding amount (e.g., "$775M")'
          },
          {
            name: 'roundType',
            title: 'Round Type',
            type: 'string',
            description: 'Type of funding round (e.g., "Series A")'
          }
        ],
        preview: {
          select: {
            title: 'roundType',
            subtitle: 'amount',
            date: 'date'
          },
          prepare({ title, subtitle, date }: { title: string; subtitle: string; date: string }) {
            return {
              title: title || 'Funding Round',
              subtitle: `${subtitle} - ${date}`
            }
          }
        }
      }],
      description: 'Historical funding rounds'
    },

    // ===== CONTENT =====
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'faq',
        title: 'FAQ',
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
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'displayOrder'
          },
          prepare({ title, subtitle }: { title: string; subtitle: number }) {
            return {
              title: title || 'Question',
              subtitle: `Order: ${subtitle}`
            }
          }
        }
      }],
      description: 'Frequently asked questions'
    },

    // ===== METADATA =====
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'basic',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'basic',
      initialValue: true
    }
  ],

  preview: {
    select: {
      title: 'companyName',
      subtitle: 'sector',
      media: 'companyLogo'
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
      return {
        title: title || 'Untitled Company',
        subtitle: subtitle || 'No sector',
        media
      }
    }
  }
}