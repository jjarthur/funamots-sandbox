module.exports = {
  basePort: 8000,
  tables: [
    {
      TableName: 'table',
      AttributeDefinitions: [
        { AttributeName: 'HashKey', AttributeType: 'S' },
        { AttributeName: 'RangeKey', AttributeType: 'S' },
        { AttributeName: 'IndexKey', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'HashKey', KeyType: 'HASH' },
        { AttributeName: 'RangeKey', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'Gsi',
          KeySchema: [
            {
              AttributeName: 'IndexKey',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'RangeKey',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  ],
};
