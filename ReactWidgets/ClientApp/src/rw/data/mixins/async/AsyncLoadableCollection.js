import AsyncLoadable from './AsyncLoadable';
import CollectionLoader from '../../../data/loaders/CollectionLoader';
import LogicalOperators from '../../../data/LogicalOperators';

const AsyncLoadableCollection = Base => class extends AsyncLoadable(Base) {

    state = {
        ...this.state,
        data: []
    };

    constructor(cfg) {

        super(cfg);

        // Other filters might be added for paging, etc but the initial filter must be set all the time
        this.initialFilter = cfg.initialFilter;

        this.loader = new CollectionLoader({
            url: cfg.loadUrl
        });

        this.onLoaderCreated();
    }

    load() {

        if (!this.loader) {

            throw new Error('Loader must be configured');
        }

        if (this.onBeforeLoad &&
            this.onBeforeLoad() === false) {

            return;
        }

        this.onLoaderLoading();

        const {
            currentPage,
            pageSize,
            sorters
        } = this.state;

        this.loader.load({
            top: pageSize,
            skip: pageSize * (currentPage - 1),
            select: this.select,
            filter: this.mergeFilter(),
            sorters: sorters,
            params: this.params
        });
    }

    // Merges the initial filter with the dynamic one
    // The initial filter must remain unchanged
    mergeFilter() {

        const {
            filter
        } = this.state;

        if (this.initialFilter && filter) {
            return {
                operator: LogicalOperators.And,
                filters: [
                    this.initialFilter,
                    filter
                ]
            }
        }
        else if (this.initialFilter) {

            return this.initialFilter;
        }
        else {

            return filter;
        }
    }

    updateData() {

        //if (this.requiresRefresh) {

        this.load();
        //}
        //else {

        //    const {
        //        state
        //    } = this;

        //    const data = this.updateDataLocally(this.cachedData); // Process the data locally

        //    this.setState({ ...state, data: data, loading: false, error: null }); // Update state
        //}
    }

    getData() {

        return this.state.data;
    }
};

export default AsyncLoadableCollection;