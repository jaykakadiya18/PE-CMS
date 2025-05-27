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
