export const featureSamples = [
  {
    type: 'switch',
    name: 'Whiteboard',
    description: 'This feature type has 2 entitlement levels - "available" and "notavailable"',
    status: [true],
  },
  {
    type: 'range',
    name: 'API Call',
    description: 'This feature supports range based entitlements. For example: Customer’s access can be between 100 and 300 API/minute',
    unit: 'License',
    status: [true],
    levels: [
      { value: '10', name: 'License' },
      { value: '20', name: 'License' },
    ],
  },
  {
    type: 'quantity',
    name: 'API Call',
    description: 'This feature type has numbered entitlement levels. For example: 2, 3, 4, or 10 user licenses.',
    unit: 'License',
    status: [true],
    levels: [
      { value: '3', name: 'License' },
      { value: '10', name: 'License' },
      { value: '20', name: 'License' },
    ],
  },
  {
    type: 'custom',
    name: 'Email Support',
    description: 'This feature supports custom entitlements. For example: Customer’s access can be between 100 and 300 API/minute',
    status: [true],
    levels: [
      { value: '12', name: 'Working hours' },
      { value: '24', name: 'Weekdays' },
      { value: '20', name: 'Month' },
    ],
  },
];
