export default {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'foundingDate', type: 'datetime' },
    { name: 'valuation', type: 'number' },
    { name: 'sector', type: 'string' },
    { name: 'status', type: 'string', options: { list: ['Needs Approval', 'Published'] }},
  ],
}
