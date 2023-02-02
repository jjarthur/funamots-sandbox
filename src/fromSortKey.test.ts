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
    const tObject: T = {
      HashKey: 'hash_key',
      RangeKey: 'range_key',
      IndexKey: 'index_key',
    };

    const table = tableBuilder<T>('table')
      .withKey<'HashKey', 'RangeKey'>('HashKey', 'RangeKey')
      .withGlobalIndex('Gsi', 'IndexKey', 'RangeKey')
      .build({ client: dynamoDB });

    await table.put(tObject);

    const res = await table.indexes.Gsi.query('index_key', { fromSortKey: 'range_key' });

    expect(res.records).toStrictEqual([tObject]);
  });
});
