import RecordStatuses from '../../../data/records/RecordStatuses';
import RecordSet from '../../../data/records/RecordSet';

test('RecordSet empty', () => {

    const recordSet = new RecordSet();

    expect(recordSet.records.length).toBe(0);
});

test('RecordSet operations', () => {

    const recordSet = new RecordSet({
        recordKey: 'id'
    });

    recordSet.load([
        {
            id: 1,
            name: 'Moshe'
        },
        {
            id: 2,
            name: 'Dafni'
        },
        {
            id: 3,
            name: 'Jorgito'
        }
    ]);

    let records = recordSet.records;

    expect(records.length).toBe(3);

    let record = records[0];

    expect(record.status).toBe(RecordStatuses.Initial);

    let data = record.data;

    expect(data.id).toBe(1);

    expect(data.name).toBe('Moshe');

    record = records[1];

    expect(record.status).toBe(RecordStatuses.Initial);

    data = record.data;

    expect(data.id).toBe(2);

    expect(data.name).toBe('Dafni');

    record = records[2];

    expect(record.status).toBe(RecordStatuses.Initial);

    data = record.data;

    expect(data.id).toBe(3);

    expect(data.name).toBe('Jorgito');

    recordSet.merge([
        // Unchanged
        {
            id: 1,
            name: 'Moshe'
        },
        // Unchanged no need to be provided
        //{
        //    id: 2,
        //    name: 'Dafni'
        //},
        // Changed
        {
            id: 3,
            name: 'Jorge'
        },
        // New (added)
        {
            id: 4,
            name: 'Shaul'
        }
    ]);

    records = recordSet.records;

    expect(records.length).toBe(4);

    // Unchanged
    record = records[0];

    expect(record.status).toBe(RecordStatuses.Initial);

    data = record.data;

    expect(data.id).toBe(1);

    expect(data.name).toBe('Moshe');

    // Changed
    record = records[1];
    
    expect(record.status).toBe(RecordStatuses.Initial);

    data = record.data;

    expect(data.id).toBe(2);

    expect(data.name).toBe('Dafni');

    // Unchanged
    record = records[2];

    expect(record.status).toBe(RecordStatuses.Changed);

    data = record.data;

    expect(data.id).toBe(3);

    expect(data.name).toBe('Jorge');

    // Added
    record = records[3];

    expect(record.status).toBe(RecordStatuses.Added);

    data = record.data;

    expect(data.id).toBe(4);

    expect(data.name).toBe('Shaul');

    // Remove two records
    recordSet.remove([3, 4]);

    records = recordSet.records;

    expect(records.length).toBe(4);

    // Unchanged
    record = records[0];

    expect(record.status).toBe(RecordStatuses.Initial);

    data = record.data;

    expect(data.id).toBe(1);

    expect(data.name).toBe('Moshe');

    // Unchanged
    record = records[1];

    expect(record.status).toBe(RecordStatuses.Initial);

    data = record.data;

    expect(data.id).toBe(2);

    expect(data.name).toBe('Dafni');

    // Removed records are actually kept in the record set, just marked as removed
    // Removed
    record = records[2];

    expect(record.status).toBe(RecordStatuses.Removed);

    data = record.data;

    expect(data.id).toBe(3);

    expect(data.name).toBe('Jorge');

    // Removed
    record = records[3];

    expect(record.status).toBe(RecordStatuses.Removed);

    data = record.data;

    expect(data.id).toBe(4);

    expect(data.name).toBe('Shaul');
});

