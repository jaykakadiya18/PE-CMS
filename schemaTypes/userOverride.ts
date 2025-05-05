export default {
    name: 'userOverride',
    type: 'document',
    title: 'User Override',
    fields: [
      { name: 'userId', type: 'string' },
      { name: 'kycStatus', type: 'string' },
      { name: 'badges', type: 'array', of: [{ type: 'string' }] },
      { name: 'rewards', type: 'array', of: [{ type: 'string' }] },
    ]
  }
  