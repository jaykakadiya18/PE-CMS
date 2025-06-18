export default {
  name: 'userOverride',
  title: 'User Override',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'userEmail',
      title: 'User Email',
      type: 'email'
    },
    {
      name: 'kycStatus',
      title: 'KYC Status Override',
      type: 'string',
      options: {
        list: [
          'Pending',
          'Approved',
          'Rejected',
          'Under Review'
        ]
      }
    },
    {
      name: 'accountStatus',
      title: 'Account Status',
      type: 'string',
      options: {
        list: [
          'Active',
          'Suspended',
          'Blocked',
          'VIP'
        ]
      }
    },
    {
      name: 'badges',
      title: 'Manually Assigned Badges',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'badge' }]
      }]
    },
    {
      name: 'specialPermissions',
      title: 'Special Permissions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Early Access',
          'Beta Features',
          'Premium Support',
          'Higher Investment Limits'
        ]
      }
    },
    {
      name: 'notes',
      title: 'Admin Notes',
      type: 'text'
    },
    {
      name: 'overrideReason',
      title: 'Override Reason',
      type: 'text'
    },
    {
      name: 'createdBy',
      title: 'Created By Admin',
      type: 'string'
    },
    {
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'datetime'
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'userEmail',
      subtitle: 'accountStatus'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Unknown User',
        subtitle: subtitle || 'No Status'
      }
    }
  }
}