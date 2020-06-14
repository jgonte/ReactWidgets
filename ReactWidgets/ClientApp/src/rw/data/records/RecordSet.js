import RecordStatuses from './RecordStatuses';
import Record from './Record';

export default class RecordSet {

    constructor(cfg) {

        this._recordKey = cfg ?
            cfg.recordKey :
            'id';

        this._records = [];
    }

    load(data) {

        this._records.length = 0;

        data.forEach(r => {

            this._records.push(
                new Record(r)
            );
        });
    }

    get records() {

        return this._records;
    }

    getById(id) {

        const recordKey = this._recordKey;

        const predicate = Array.isArray(recordKey) ?
            r => {

                let i = 0;

                for (var key in recordKey) {

                    if (r.data[key] !== id[i++]) {

                        return false;
                    }
                }

                return true;
            } :
            r => r.data[recordKey] === id;

        // Find a record that matches that id
        const records = this._records.filter(predicate);

        switch (records.length) {
            case 0: return null; // Not found;
            case 1: return records[0];
            default: throw new Error(`Duplicate records with ${recordKey} = ${id}`);
        }
    }

    mergeRecord(data) {

        const id = data[this._recordKey];

        if (!id) {

            throw new Error('Unable to find the identifier for the record. Please verify the recordKey matches the identifier field of the record');
        }

        const record = this.getById(id);

        if (record) {

            record.update(data, this.onRecordChanged);
        }
        else {

            const record = new Record(data, RecordStatuses.Added);

            this._records.push(record);

            if (this.onRecordChanged) {

                this.onRecordChanged({
                    record,
                    newState: RecordStatuses.Added
                });
            }
        }
    }

    merge(data, mappingFcn) {

        data.forEach(r => {

            r = mappingFcn ?
                mappingFcn(r) :
                r;

            this.mergeRecord(r);
        });
    }

    removeRecord(id) {

        const record = this.getById(id);

        if (record) {

            record.remove(this.onRecordChanged);
        }
    }

    remove(ids) {

        ids.forEach(id => {

            this.removeRecord(id);
        });
    }
}