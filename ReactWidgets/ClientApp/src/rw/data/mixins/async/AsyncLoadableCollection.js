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

    async load() {

        this.onLoaderLoading();

        const {
            currentPage,
            pageSize,
            filter,
            sorters
        } = this.state;

        await this.loader.load({
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