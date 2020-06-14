import RecordStatuses from './RecordStatuses';

/**
 * Keeps track of the data changes
 */
export default class Record {

    constructor(data, status = RecordStatuses.Initial) {

        this._data = data;

        this._status = status;

        this._changedFields = [];
    }

    get status() {

        return this._status;
    }

    get data() {

        return this._data;
    }

    get changedFields() {

        return this._changedFields;
    }

    /**
     * Loads the record
     * @param {any} data
     * @param {any} status
     */
    load(data, status = RecordStatuses.Initial) {

        this._data = data;

        this._status = status;

        this._changedFields.length = 0; // Reset the changed fields
    }

    /**
     * Updates a single field in the record
     * @param {any} key - The key of the field to update
     * @param {any} newValue - The new value of the field to update
     */
    updateField(key, newValue) {

        const oldValue = this._data[key];

        const areDifferent = newValue.getTime ? // hack for Date
            newValue.getTime() !== oldValue.getTime() :
            newValue !== oldValue;

        if (areDifferent) {

            // Update changed fields
            const changedFields = this._changedFields.filter(f => f.key === key);

            switch (changedFields.length) {
                case 0: // Add the changed field
                    {
                        this._changedFields.push({
                            key: key,
                            value: oldValue
                        });
                    }
                    break;
                case 1: // If the new value equals the initial value of the field, then remove that field from the changed ones
                    {
                        const changedField = changedFields[0];

                        const areEqual = newValue.getTime ? // Hack for Date
                            newValue.getTime() === changedField.value.getTime() :
                            newValue === changedField.value;

                        if (areEqual) { // Initial value of the field

                            const index = this._changedFields.indexOf(changedField);

                            this._changedFields.splice(index, 1);
                        }
                    }
                    break;
                default: throw new Error(`Duplicate fields in record for key: '${key}'`);
            }

            this._data[key] = newValue; // Update the value of the field in the record

            const oldStatus = this._status;

            // Update the record status
            if (this._changedFields.length) {

                if (this._status === RecordStatuses.Initial) {

                    this._status = RecordStatuses.Changed;
                }
            }
            else {

                if (this._status === RecordStatuses.Changed) {

                    this._status = RecordStatuses.Initial;
                }
            }

            if (this.onChange) {

                this.onChange({
                    record: this,
                    key,
                    newValue,
                    oldValue,
                    newStatus: this._status,
                    oldStatus
                });
            }

        }
    }

    update(data) {

        for (const key in data) {

            this.updateField(key, data[key]);
        }
    }

    remove() {

        const oldStatus = this._status;

        this._status = RecordStatuses.Removed;

        // Keep the original data and snapshot just in case we decide to undo it

        if (this.onChange) {

            this.onChange({
                record: this,
                newStatus: this._status,
                oldStatus
            });
        }
    }
}
