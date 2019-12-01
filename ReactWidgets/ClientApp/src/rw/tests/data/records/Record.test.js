import RecordStatuses from '../../../data/records/RecordStatuses';
import Record from '../../../data/records/Record';

test('Record empty', () => {

    const record = new Record();

    expect(record.data).toBe(undefined);
});

test('Record operations', () => {

    const record = new Record();

    let data =
    {
        id: 1,
        name: 'Jorge',
        dob: new Date(1966, 10, 20)
    };

    record.load(data);

    expect(record.status).toBe(RecordStatuses.Initial);

    expect(record.data).toBe(data);

    let changedFields = record.changedFields;

    expect(changedFields.length).toBe(0);

    record.update({
        name: 'Ernesto',
        dob: new Date(1968, 0, 8)
    });

    expect(record.status).toBe(RecordStatuses.Changed);

    data = record.data;

    expect(data.name).toBe('Ernesto');

    expect(data.dob.toString()).toBe(new Date(1968, 0, 8).toString());

    // The changed fields should contain the key and values of the changed ones after load
    changedFields = record.changedFields;

    expect(changedFields.length).toBe(2);

    let changedField = changedFields[0];

    expect(changedField.key).toBe('name');

    expect(changedField.value).toBe('Jorge');

    changedField = changedFields[1];

    expect(changedField.key).toBe('dob');

    expect(changedField.value.toString()).toBe(new Date(1966, 10, 20).toString());

    // Update the record again
    record.update({
        name: 'Gonzalo',
        dob: new Date(1989, 10, 11)
    });

    expect(record.status).toBe(RecordStatuses.Changed);

    // The changed fields should contain the key and values of the changed ones after load
    changedFields = record.changedFields;

    expect(changedFields.length).toBe(2);

    changedField = changedFields[0];

    expect(changedField.key).toBe('name');

    expect(changedField.value).toBe('Jorge');

    changedField = changedFields[1];

    expect(changedField.key).toBe('dob');

    expect(changedField.value.toString()).toBe(new Date(1966, 10, 20).toString());

    // Revert back to original record
    record.update({
        name: 'Jorge',
        dob: new Date(1966, 10, 20)
    });

    //expect(record.status).toBe(RecordStatuses.Initial);

    changedFields = record.changedFields;

    expect(changedFields.length).toBe(0);

    // Remove the record
    record.remove();

    expect(record.status).toBe(RecordStatuses.Removed);

});