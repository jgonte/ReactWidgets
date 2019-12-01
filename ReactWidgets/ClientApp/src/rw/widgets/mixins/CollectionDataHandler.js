import DataHandler from './DataHandler';
import Pageable from './Pageable';

// A component that gets built from data and holds the name of the property of the identifier of the item
const CollectionDataHandler = Base => class extends Pageable(DataHandler(Base)) {

    handleChange = (pagination, filters, sorter) => {

        this.updatingData = true;

        //const filter = Object.keys(filters).length ?
        //    filters : // TODO: Process this one into AND if more than one
        //    null;

        const sorters = Object.keys(sorter).length ?
            [{
                fieldName: sorter.field,
                order: sorter.order
            }] :
            null;

        this.setState({
            ...this.state,
            //filter, Uncomment this once we can merge the filters
            sorters
        });
    };

    getSortOrder = (sorters, column) => {

        if (!sorters) {

            return null;
        }

        const columns = sorters.filter(s => s.fieldName === column.name);

        switch (columns.length) {

            case 0: return null;
            case 1: return columns[0].order;
            default: throw new Error(`Multiple columns with same field name: '${column.name}'`);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.updatingData) {

            this.updatingData = false;

            this.updateData();
        }
    }

    mergeRecords(records) {

        let data = this.state.data;

        records.forEach(item => {
            data.push(item);
        });

        this._setState({
            ...this.state,
            data
        });
    }
};

export default CollectionDataHandler;