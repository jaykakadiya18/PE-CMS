export default {
  name: 'shareTranche',
  title: 'Share Tranche',
  type: 'document',
  fields: [
    {
      name: 'trancheId',
      title: 'Tranche ID (Auto-generated)',
      type: 'string',
      readOnly: true,
      initialValue: () => {
        // Generate a tranche ID with format: TR-YYYYMMDD-XXXX
        const date = new Date();
        const dateStr = date.getFullYear().toString() + 
                       (date.getMonth() + 1).toString().padStart(2, '0') + 
                       date.getDate().toString().padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        return `TR-${dateStr}-${randomNum}`;
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Automatically generated tranche ID'
    },
    {
      name: 'linkedCompany',
      title: 'Linked Company',
      type: 'reference',
      to: [{ type: 'company' }],
      validation: (Rule: any) => Rule.required(),
      description: 'Reference to the company document'
    },
    {
      name: 'quantity',
      title: 'Share Quantity',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
      description: 'Number of shares in this tranche'
    },
    {
      name: 'pricePerShare',
      title: 'Price Per Share',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
      description: 'Price per share for this tranche'
    },
    {
      name: 'dateAdded',
      title: 'Date Added',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      description: 'Date when this tranche was created'
    },
    {
      name: 'trancheStatus',
      title: 'Tranche Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Sold Out', value: 'sold_out' },
          { title: 'Closed', value: 'closed' },
          { title: 'Pending', value: 'pending' }
        ]
      },
      initialValue: 'pending',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'terms',
      title: 'Tranche Terms',
      type: 'text',
      description: 'Specific terms and conditions for this tranche'
    },
    {
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
      description: 'User who created this tranche'
    },
    {
      name: 'lastModifiedBy',
      title: 'Last Modified By',
      type: 'string',
      description: 'User who last modified this tranche'
    }
  ],
  preview: {
    select: {
      title: 'trancheId',
      companyName: 'companyName',
      quantity: 'quantity',
      pricePerShare: 'pricePerShare',
      status: 'trancheStatus'
    },
    prepare({ title, companyName, quantity, pricePerShare, status }: { 
      title: string; 
      companyName: string; 
      quantity: number; 
      pricePerShare: number; 
      status: string 
    }) {
      return {
        title: `${title} - ${companyName}`,
        subtitle: `${quantity} shares @ $${pricePerShare} each (${status})`
      }
    }
  }
}