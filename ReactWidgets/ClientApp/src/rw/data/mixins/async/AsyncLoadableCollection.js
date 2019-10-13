import AsyncLoadable from './AsyncLoadable';
import CollectionLoader from '../../../data/loaders/CollectionLoader';

const AsyncLoadableCollection = Base => class extends AsyncLoadable(Base) {

    state = {
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

        await this.loader.load({
            top: this.top,
            skip: this.skip,
            select: this.select,
            filter: this.filter,
            orderby: this.orderby,
            params: this.params
        });
    }
};

export default AsyncLoadableCollection;