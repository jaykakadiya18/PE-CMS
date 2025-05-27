export default {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'foundingYear', type: 'number' },
    { name: 'valuation', type: 'number' },
    { name: 'sector', type: 'string' },
    { name: 'status', type: 'string', options: { list: ['Needs Approval', 'Published'] }},
  ],
}


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
