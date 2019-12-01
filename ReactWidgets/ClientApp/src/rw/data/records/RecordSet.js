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

        // Find a record that matches that id
        const records = this._records.filter(r => r.data[this._recordKey] === id);

        switch (records.length) {
            case 0: return null; // Not found;
            case 1: return records[0];
            default: throw new Error(`Duplicate records with ${this._recordKey} = ${id}`);
        }
    }

    mergeRecord(data) {

        const id = data[this._recordKey];

        if (!id) {

            throw new Error('Unable to find the identifier for the record. Please verify the recordKey matches the identifier field of the record');
        }

        const record = this.getById(id);

        if (record) {

            record.update(data);
        }
        else {

            this._records.push(
                new Record(data, RecordStatuses.Added)
            );
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

            record.remove();
        }
    }

    remove(ids) {

        ids.forEach(id => {

            this.removeRecord(id);
        });
    }
}