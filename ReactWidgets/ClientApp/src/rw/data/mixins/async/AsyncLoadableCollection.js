import AsyncLoadable from './AsyncLoadable';
import CollectionLoader from '../../../data/loaders/CollectionLoader';

const AsyncLoadableCollection = Base => class extends AsyncLoadable(Base) {

    state = {
        ...this.state,
        data: []
    };

    constructor(cfg) {

        super(cfg);

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
            filter,
            sorters
        } = this.state;

        this.loader.load({
            top: pageSize,
            skip: pageSize * (currentPage - 1),
            select: this.select,
            filter: filter,
            sorters: sorters,
            params: this.params
        });
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
};

export default AsyncLoadableCollection;