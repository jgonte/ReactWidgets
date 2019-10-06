import AsyncLoadable from './AsyncLoadable';
import CollectionFetchLoader from '../../data/loaders/CollectionFetchLoader';
import MetadataHeaderMetadataMapper from '../../data/mappers/MetadataHeaderMetadataMapper';

const AsyncLoadableCollection = (Base) => class extends AsyncLoadable(Base) {

    filters = [];

    sorters = [];

    constructor(props) {

        super(props);

        this.state = this.state || {};

        if (!props.loader) {

            this.loader = new CollectionFetchLoader();
        }

        if (!props.metadataMapper) {

            this.metadataMapper = new MetadataHeaderMetadataMapper();
        }
    }

    componentDidMount() {

        super.componentDidMount();

        let {
            filters,
            sorters
        } = this.props;

        this.filters = filters || this.filters;

        this.sorters = sorters || this.sorters;
    }

    updateFilters(fieldName, filterOperator, value) {

        if (!fieldName) {

            throw new Error('Field name is required.');
        }

        let { filters } = this;

        let selectedFilters = filters.filter(f => f.fieldName === fieldName && f.operator === filterOperator);

        switch (selectedFilters.length) {
            case 0: { // Filter does not exist

                if (value) {

                    this.filters.push({
                        fieldName: fieldName,
                        operator: filterOperator,
                        value: value
                    });
                }

            }
                break;
            case 1: { // Update value of existing filter

                if (!value) { // Remove the filter when the value is empty

                    this.filters = filters.filter(f => f.fieldName !== fieldName && f.operator !== filterOperator);
                }
                else {

                    let filter = selectedFilters[0];

                    filter.value = value;
                }
            }
                break;
            default: // Duplicate filter
                throw new Error(`Duplicated filters for field: '${fieldName}' and operator: '${filterOperator}'.`);
        }
    }

    createReaderParams() {

        const {
            state,
            filters,
            sorters,
            paginable
        } = this;

        let params = {
            url: this.url
        };

        const {
            columns,
            pageIndex,
            pageSize
        } = state;

        if (filters) {

            // Transform the filters to properties where the key is the name of the field 
            // and the value is an special construct based on the operator of the filter
            filters.forEach((filter) => {

                if (filter.value) {

                    params[filter.fieldName] = this.getFilterConstruct(filter.operator, filter.value)
                }
            });
        }

        if (columns) {

            const sortingColumn = columns.find(c => c.sortDirection);

            if (sortingColumn) {

                params.sorters = [
                    {
                        field: sortingColumn.name,
                        direction: sortingColumn.sortDirection
                    }
                ];
            }
        }

        if (paginable) {

            params.pageIndex = pageIndex;

            params.pageSize = pageSize;
        }

        return params;
    }

    getFilterConstruct(filterOperator, filterValue) {

        switch (filterOperator) {
            case "equals": return filterValue;
            case "contains": return `contains(${filterValue})`;
            default: throw Error(`The function getFilterConstruct is not implemented for filter operator: '${filterOperator}'.`);
        }
    }

    // Called when a new data needs to be fetched or refreshed
    updateData() {

        if (this.requiresRefresh) {

            this.load();
        }
        else {

            const {
                state
            } = this;

            const data = this.updateDataLocally(this.cachedData); // Process the data locally

            this.setState({ ...state, data: data, loading: false, error: null }); // Update state
        }
    }

    // Called when the server is returning cached data or 304 response so we process the cached data locally
    updateDataLocally(cachedData) {

        let data = this.filterDataLocally(cachedData);

        data = this.sortDataLocally(data);

        data = this.paginateDataLocally(data);

        return data;
    }

    filterDataLocally(data) {

        const {
            filters
        } = this;

        if (filters && filters.length) {

            const predicate = this.createFiltersCriteria(filters);

            return data.filter(predicate);
        }
        else {

            return data;
        }
    }

    // Creates a function with a javascript body according to the filters
    createFiltersCriteria(filters) {

        const clauses = filters.map((filter) => this.createFilterClause(filter));

        return new Function('item', `return ${clauses.join(' && ')};`);
    }

    createFilterClause(filter) {

        switch (filter.operator) {
            case "equals": return `item.${filter.fieldName} == '${filter.value}'`; // String comparison
            case "contains": return `item.${filter.fieldName}.toLowerCase().indexOf('${filter.value.toLowerCase()}') > -1`;
            default: throw Error(`The function createFilterClause is not implemented for filter operator: '${filter.operator}'.`);
        }
    }

    sortDataLocally(data) {

        const {
            sorters
        } = this;

        if (sorters && sorters.length) {

            return data;
        }
        else {

            return data;
        }
    }

    paginateDataLocally(data) {

        const {
            paginable
        } = this;

        if (paginable) {

            return data;
        }
        else {

            return data;
        }
    }
};

export default AsyncLoadableCollection;