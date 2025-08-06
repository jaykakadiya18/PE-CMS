export default {
  name: 'publicAcademy',
  title: 'Public Academy Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media & Visuals' },
    { name: 'categorization', title: 'Categories & Tags' }
  ],
  fields: [
    // ===== CONTENT =====
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'content',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Main title of the academy article'
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required(),
      description: 'URL-friendly version of the title'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
      description: 'Optional subtitle or tagline'
    },
    {
      name: 'excerpt',
      title: 'Article Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (Rule: any) => Rule.max(300),
      description: 'Brief summary for previews and SEO (max 300 characters)'
    },
    {
      name: 'content',
      title: 'Article Content',
      type: 'text',
      group: 'content',
      validation: (Rule: any) => Rule.required(),
      description: 'Main content of the academy article'
    },
    {
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'tocItem',
        title: 'TOC Item',
        fields: [
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'anchor',
            title: 'Anchor Link',
            type: 'string',
            description: 'URL anchor (e.g., #introduction)'
          }
        ],
        preview: {
          select: {
            title: 'heading',
            subtitle: 'anchor'
          }
        }
      }],
      description: 'Article sections for navigation'
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Main points readers should remember'
    },

    // ===== MEDIA & VISUALS =====
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: { 
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      description: 'Main article image'
    },
    {
      name: 'featuredImageAlt',
      title: 'Featured Image Alt Text',
      type: 'string',
      group: 'media',
      description: 'Alt text for accessibility'
    },
    {
      name: 'videoUrl',
      title: 'Educational Video URL',
      type: 'url',
      group: 'media',
      description: 'Optional video content (YouTube, Vimeo, etc.)'
    },
    {
      name: 'infographics',
      title: 'Infographics',
      type: 'array',
      group: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true }
      }],
      description: 'Supporting visual content'
    },

    // ===== CATEGORIZATION =====
    {
      name: 'academyCategory',
      title: 'Academy Category',
      type: 'string',
      group: 'categorization',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Investing Basics', value: 'investing_basics' },
          { title: 'Market Analysis', value: 'market_analysis' },
          { title: 'Private Markets', value: 'private_markets' },
          { title: 'Portfolio Management', value: 'portfolio_management' },
          { title: 'Risk Management', value: 'risk_management' },
          { title: 'Financial Planning', value: 'financial_planning' },
          { title: 'Technology & Innovation', value: 'technology_innovation' },
          { title: 'ESG Investing', value: 'esg_investing' },
          { title: 'Alternative Assets', value: 'alternative_assets' },
          { title: 'Market Trends', value: 'market_trends' }
        ]
      },
      description: 'Primary category for the article'
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      group: 'categorization',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' }
        ]
      },
      description: 'Target audience skill level'
    },
    {
      name: 'readingTime',
      title: 'Estimated Reading Time',
      type: 'number',
      group: 'categorization',
      description: 'Estimated reading time in minutes'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'categorization',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Topic tags for better discoverability'
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isFeatured',
      title: 'Featured Article',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description: 'Mark as featured for homepage promotion'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'academyCategory',
      media: 'featuredImage',
      published: 'isPublished',
      featured: 'isFeatured'
    },
    prepare({ title, subtitle, media, published, featured }: { 
      title: string; 
      subtitle: string; 
      media: any; 
      published: boolean;
      featured: boolean;
    }) {
      const status = published ? '✅' : '📝'
      const featuredIndicator = featured ? '⭐' : ''
      
      return {
        title: `${status}${featuredIndicator} ${title || 'Untitled Article'}`,
        subtitle: subtitle || 'No category',
        media
      }
    }
  },

  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [
        { field: 'publishedAt', direction: 'asc' }
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}