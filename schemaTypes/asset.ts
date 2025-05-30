// export default {
//   name: 'asset',
//   title: 'Asset',
//   type: 'document',
//   fields: [
//     { name: 'companyName', title: 'Company Name', type: 'string' },
//     { name: 'industrySector', title: 'Industry Sector', type: 'string' },
//     { name: 'statusLabel', title: 'Status Label', type: 'string' },
//     { name: 'foundedYear', title: 'Founded Year', type: 'number' },
//     { name: 'headquartersLocation', title: 'Headquarters Location', type: 'string' },
//     { name: 'numberOfEmployees', title: 'Number of Employees', type: 'number' },
//     { name: 'latestValuation', title: 'Latest Valuation', type: 'string' }, // or 'number' if you parse "$1.00 billion"
//     { name: 'investmentStatus', title: 'Investment Status', type: 'string' },
//     { name: 'isPublic', title: 'Is Public', type: 'boolean' },
//     {
//       name: 'status',
//       title: 'Status',
//       type: 'string',
//       options: {
//         list: ['Needs Approval', 'Published'],
//       },
//     },
//   ],
// };


export default {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    { name: 'companyName', title: 'Company Name', type: 'string' },
    { name: 'industrySector', title: 'Industry Sector', type: 'string' },
    { name: 'statusLabel', title: 'Status Label', type: 'string' },
    { name: 'foundedYear', title: 'Founded Year', type: 'number' },
    { name: 'headquartersLocation', title: 'Headquarters Location', type: 'string' },
    { name: 'numberOfEmployees', title: 'Number of Employees', type: 'number' },
    { name: 'latestValuation', title: 'Latest Valuation', type: 'string' },
    { name: 'investmentStatus', title: 'Investment Status', type: 'string' },
    { name: 'isPublic', title: 'Is Public', type: 'boolean' },
    { name: 'companyOverview', title: 'Company Overview', type: 'text' },
    { name: 'website', title: 'Website', type: 'url' },
    { name: 'market_type', title: 'Market Type', type: 'string' },
    { name: 'logo_url', title: 'Logo URL', type: 'url' },
    { 
      name: 'management', 
      title: 'Management Team', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { 
      name: 'valuation_records', 
      title: 'Valuation Records', 
      type: 'array', 
      of: [
        {
          type: 'object',
          fields: [
            { name: 'date', title: 'Date', type: 'string' },
            { name: 'value', title: 'Value', type: 'number' }
          ]
        }
      ]
    },
    { name: 'status', title: 'Status', type: 'string' }
  ]
}
