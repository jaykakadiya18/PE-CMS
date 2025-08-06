export default {
  name: 'publicQuickGuide',
  title: 'Public Quick Guide',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'categorization', title: 'Categories & Tags' }
  ],
  fields: [
    // ===== BASIC INFO =====
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Clear name of the lesson (e.g., "Primary vs Secondary Markets Explained")'
    },
    {
      name: 'subtitle',
      title: 'Sub Title',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.max(200),
      description: 'Brief description or context of what the lesson covers (e.g., "Understanding where securities are first issued and subsequently traded")'
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      group: 'basic',
      validation: (Rule: any) => Rule.required().min(1).max(120),
      description: 'Estimated learning time in minutes (e.g., 15)'
    },

    // ===== CONTENT =====
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
      description: 'Detailed summary of the lesson\'s content'
    },
    {
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text'
            }
          ]
        }
      ],
      description: 'Main lesson content using rich text editor'
    },
    {
      name: 'importantNote',
      title: 'Important Note',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ],
      description: 'Key concepts or warnings to pay attention to (e.g., "Remember: Primary markets involve new securities, Secondary markets involve existing securities!")'
    },
    {
      name: 'highlightPoints',
      title: 'Highlight Points',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'highlightPoint',
          title: 'Highlight Point',
          fields: [
            {
              name: 'point',
              title: 'Point',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' }
                    ]
                  }
                }
              ],
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              point: 'point'
            },
            prepare({ point }: { point: any[] }) {
              const block = (point || []).find((block: any) => block._type === 'block')
              return {
                title: block
                  ? block.children
                      ?.filter((child: any) => child._type === 'span')
                      ?.map((span: any) => span.text)
                      ?.join('')
                  : 'No content'
              }
            }
          }
        }
      ],
      description: 'Quick list of main takeaways or learning objectives'
    },

    // ===== CATEGORIZATION =====
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'categorization',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Keywords that help organize the lesson (e.g., Markets, IPO, Trading, Liquidity, Investment Basics)'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'categorization',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Market Fundamentals', value: 'market_fundamentals' },
          { title: 'Trading Concepts', value: 'trading_concepts' },
          { title: 'Investment Basics', value: 'investment_basics' },
          { title: 'Risk Management', value: 'risk_management' },
          { title: 'Portfolio Management', value: 'portfolio_management' },
          { title: 'Financial Planning', value: 'financial_planning' },
          { title: 'Alternative Assets', value: 'alternative_assets' }
        ]
      },
      description: 'Topic level the lesson belongs to'
    },

    // ===== METADATA =====
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'basic',
      options: { 
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      description: 'Cover image for the quick guide'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      group: 'basic',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Toggle to publish/unpublish guide'
    },
    {
      name: 'isFeatured',
      title: 'Featured Guide',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Mark as featured for homepage promotion'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
      published: 'isPublished',
      featured: 'isFeatured',
      duration: 'duration'
    },
    prepare({ title, subtitle, media, published, featured, duration }: { 
      title: string; 
      subtitle: string; 
      media: any; 
      published: boolean;
      featured: boolean;
      duration: number;
    }) {
      const status = published ? '✅' : '📝'
      const featuredIndicator = featured ? '⭐' : ''
      const durationText = duration ? `${duration}min` : ''
      
      return {
        title: `${status}${featuredIndicator} ${title || 'Untitled Guide'}`,
        subtitle: `${subtitle || 'No category'} ${durationText ? `• ${durationText}` : ''}`,
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
      title: 'Duration, Short to Long',
      name: 'durationAsc',
      by: [
        { field: 'duration', direction: 'asc' }
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