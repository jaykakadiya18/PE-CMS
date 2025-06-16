export default {
  name: 'assetWorkflow',
  title: 'Asset Workflow',
  type: 'document',
  fields: [
    { name: 'assetId', title: 'Asset ID', type: 'string' },
    {
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: ['draft', 'pending', 'approved', 'rejected']
      },
      initialValue: 'draft'
    },
    { name: 'createdBy', title: 'Created By', type: 'string' },
    { name: 'lastModifiedBy', title: 'Last Modified By', type: 'string' },
    { name: 'approvedBy', title: 'Approved By', type: 'string' },
    { name: 'approvalDate', title: 'Approval Date', type: 'datetime' },
    { name: 'qaChecked', title: 'QA Checked', type: 'boolean' },
    { name: 'qaCheckDate', title: 'QA Check Date', type: 'datetime' },
    { name: 'qaCheckedBy', title: 'QA Checked By', type: 'string' },
    {
      name: 'validationErrors',
      title: 'Validation Errors',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
};
