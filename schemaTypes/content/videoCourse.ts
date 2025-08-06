export default {
  name: 'videoCourse',
  title: 'Video Course',
  type: 'document',
  groups: [
    { name: 'course', title: 'Course Details', default: true },
    { name: 'videos', title: 'Course Videos' },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    // ===== COURSE DETAILS =====
    {
      name: 'courseTitle',
      title: 'Course Title',
      type: 'string',
      group: 'course',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Main title of your course'
    },
    {
      name: 'slug',
      title: 'Course Slug',
      type: 'slug',
      group: 'course',
      options: { 
        source: 'courseTitle', 
        maxLength: 96 
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Course Tags',
      type: 'array',
      group: 'course',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Keywords to help categorize your course'
    },
    {
      name: 'overview',
      title: 'Course Overview',
      type: 'text',
      group: 'course',
      validation: (Rule: any) => Rule.required(),
      rows: 4,
      description: 'Detailed description of what this course covers'
    },
    {
      name: 'importantNote',
      title: 'Important Note',
      type: 'text',
      group: 'course',
      rows: 3,
      description: 'Key instructions or important information students should know'
    },
    {
      name: 'category',
      title: 'Course Category',
      type: 'string',
      group: 'course',
      options: {
        list: [
          { title: 'Beginner Course', value: 'beginner' },
          { title: 'Intermediate Course', value: 'intermediate' },
          { title: 'Advanced Course', value: 'advanced' },
          { title: 'Traffic Generation', value: 'traffic_generation' },
          { title: 'Product Research', value: 'product_research' },
          { title: 'SEO & Marketing', value: 'seo_marketing' },
          { title: 'Email Marketing', value: 'email_marketing' },
          { title: 'Conversion Optimization', value: 'conversion_optimization' },
          { title: 'Affiliate Marketing', value: 'affiliate_marketing' },
          { title: 'Social Media Marketing', value: 'social_media' },
          { title: 'Paid Advertising', value: 'paid_advertising' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Select the main category for this course'
    },
    {
      name: 'courseThumbnail',
      title: 'Course Thumbnail',
      type: 'image',
      group: 'course',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ],
      description: 'Main image representing your course'
    },

    // ===== COURSE VIDEOS =====
    {
      name: 'videos',
      title: 'Course Videos',
      type: 'array',
      group: 'videos',
      of: [{
        type: 'object',
        name: 'courseVideo',
        title: 'Course Video',
        fields: [
          {
            name: 'videoTitle',
            title: 'Video Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
            description: 'Title of this video lesson'
          },
          {
            name: 'videoOrder',
            title: 'Video Order',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(1),
            description: 'Order of this video in the course (1, 2, 3, etc.)'
          },
          {
            name: 'videoDuration',
            title: 'Video Duration',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
            placeholder: '12 minutes',
            description: 'Length of the video (e.g., "12 minutes")'
          },
          {
            name: 'videoFile',
            title: 'Upload Video File',
            type: 'file',
            options: {
              accept: 'video/*'
            },
            description: 'Upload your video file directly to Sanity'
          },
          {
            name: 'videoUrl',
            title: 'Video URL (Alternative)',
            type: 'url',
            description: 'Or provide a video URL if hosted elsewhere (YouTube, Vimeo, etc.)',
            hidden: ({ parent }: any) => !!parent?.videoFile
          },
          {
            name: 'videoThumbnail',
            title: 'Video Thumbnail',
            type: 'image',
            options: { hotspot: true },
            description: 'Custom thumbnail for this video'
          },
          {
            name: 'videoDescription',
            title: 'Video Description',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
            rows: 3,
            description: 'What will students learn in this video?'
          },
          {
            name: 'highlightPoints',
            title: 'Highlight Points',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Main learning outcomes or key takeaways from this course'
            },
          {
            name: 'videoTags',
            title: 'Video Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Tags specific to this video content'
          },
          {
            name: 'videoCategory',
            title: 'Video Category',
            type: 'string',
            options: {
              list: [
                { title: 'Introduction', value: 'Introduction' },
                { title: 'Beginner', value: 'Beginner' },
                { title: 'Intermediate', value: 'Intermediate' },
                { title: 'Advanced', value: 'Advanced' }
              ]
            },
            description: 'Category for this specific video'
          }
        ],
        preview: {
          select: {
            title: 'videoTitle',
            subtitle: 'videoDuration',
            order: 'videoOrder',
            media: 'videoThumbnail'
          },
          prepare({ title, subtitle, order, media }: any) {
            return {
              title: `${order}. ${title}`,
              subtitle: `Duration: ${subtitle}`,
              media
            }
          }
        }
      }],
      description: 'Add all videos for your course here. You can upload video files directly or provide URLs.'
    },

    // ===== COURSE RESOURCES =====
    {
      name: 'resources',
      title: 'Course Resources',
      type: 'array',
      group: 'course',
      of: [{
        type: 'object',
        name: 'courseResource',
        title: 'Course Resource',
        fields: [
          {
            name: 'resourceTitle',
            title: 'Resource Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
            description: 'Name of the resource'
          },
          {
            name: 'resourceDescription',
            title: 'Resource Description',
            type: 'text',
            description: 'Brief description of what this resource provides'
          },
          {
            name: 'resourceType',
            title: 'Resource Type',
            type: 'string',
            options: {
              list: [
                { title: 'PDF Document', value: 'pdf' },
                { title: 'Excel/Spreadsheet', value: 'spreadsheet' },
                { title: 'Word Document', value: 'document' },
                { title: 'External Link', value: 'link' },
                { title: 'Tool/Software', value: 'tool' },
                { title: 'Template', value: 'template' },
                { title: 'Checklist', value: 'checklist' },
                { title: 'Worksheet', value: 'worksheet' }
              ]
            },
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'resourceFile',
            title: 'Upload Resource File',
            type: 'file',
            options: {
              accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip'
            },
            hidden: ({ parent }: any) => parent?.resourceType === 'link' || parent?.resourceType === 'tool',
            description: 'Upload the resource file'
          },
          {
            name: 'resourceUrl',
            title: 'Resource URL',
            type: 'url',
            hidden: ({ parent }: any) => parent?.resourceType !== 'link' && parent?.resourceType !== 'tool',
            description: 'External link to the resource'
          },
          {
            name: 'resourceOrder',
            title: 'Resource Order',
            type: 'number',
            description: 'Display order of this resource'
          },
          {
            name: 'isDownloadable',
            title: 'Allow Download',
            type: 'boolean',
            initialValue: true,
            description: 'Students can download this resource'
          }
        ],
        preview: {
          select: {
            title: 'resourceTitle',
            type: 'resourceType',
            order: 'resourceOrder'
          },
          prepare({ title, type, order }: any) {
            return {
              title: order ? `${order}. ${title}` : title,
              subtitle: type?.replace('_', ' ').toUpperCase()
            }
          }
        }
      }],
      description: 'Additional materials, templates, and resources for your course'
    },

    // ===== SETTINGS =====
    {
      name: 'courseStatus',
      title: 'Course Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      description: 'Make this course visible to users'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
      hidden: ({ document }: any) => !document?.isPublished,
      initialValue: ({ document }: any) => document?.isPublished ? new Date().toISOString() : undefined
    },
    {
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Free Access', value: 'free' },
          { title: 'Premium Only', value: 'premium' },
          { title: 'VIP Only', value: 'vip' }
        ]
      },
      initialValue: 'free',
      description: 'Who can access this course'
    },
    {
      name: 'estimatedDuration',
      title: 'Total Course Duration',
      type: 'string',
      group: 'settings',
      placeholder: '2 hours 30 minutes',
      description: 'Estimated time to complete the entire course'
    },
    {
      name: 'difficultyLevel',
      title: 'Difficulty Level',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' }
        ]
      },
      initialValue: 'beginner'
    },
    {
      name: 'instructor',
      title: 'Course Instructor',
      type: 'string',
      group: 'settings',
      description: 'Name of the course instructor'
    },
    {
      name: 'createdAt',
      title: 'Created Date',
      type: 'datetime',
      group: 'settings',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      group: 'settings',
      readOnly: true
    }
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'courseTitle',
      subtitle: 'category',
      media: 'courseThumbnail',
      status: 'courseStatus',
      videoCount: 'videos'
    },
    prepare({ title, subtitle, media, status, videoCount }: any) {
      const count = Array.isArray(videoCount) ? videoCount.length : 0;
      return {
        title: title || 'Untitled Course',
        subtitle: `${subtitle} • ${count} videos • ${status}`,
        media
      }
    }
  },

  // Initial values
  initialValue: {
    courseStatus: 'draft',
    isPublished: false,
    accessLevel: 'free',
    difficultyLevel: 'beginner'
  }
}