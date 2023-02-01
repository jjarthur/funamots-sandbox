import { DynamoDB } from 'aws-sdk';
import { tableBuilder } from 'funamots';

type T = { HashKey: string; RangeKey: string; IndexKey: string };
const dynamoDB = new DynamoDB({
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
});

describe('fromSortKey', () => {
  it('should return object', async () => {
    await dynamoDB
      .putItem({
        TableName: 'table',
        Item: {
          HashKey: { S: 'hash_key' },
          RangeKey: { S: 'range_key' },
          IndexKey: { S: 'index_key' },
        },
      })
      .promise();

    const table = tableBuilder<T>('table')
      .withKey<'HashKey', 'RangeKey'>('HashKey', 'RangeKey')
      .withGlobalIndex('Gsi', 'IndexKey', 'RangeKey')
      .build({ client: dynamoDB });
    const res = table.indexes.Gsi.query('index_key', { fromSortKey: 'range_key' });

    const expected = {
      HashKey: 'hash_key',
      RangeKey: 'range_key',
      IndexKey: 'index_key',
    };
    expect(res).toBe([expected]);
  });
});
