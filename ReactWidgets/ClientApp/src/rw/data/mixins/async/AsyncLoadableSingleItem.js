import AsyncLoadable from './AsyncLoadable';
import SingleItemLoader from '../../../data/loaders/SingleItemLoader';

const AsyncLoadableSingleItem = Base => class extends AsyncLoadable(Base) {

    state = {
        ...this.state,
        data: {}
    };

    constructor(cfg) {

        super(cfg);

        if (cfg.loadUrl) { // Is loadable

            this.loader = new SingleItemLoader({
                url: cfg.loadUrl
            });

            this.onLoaderCreated();
        }
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

        this.loader.load({
            select: this.select,
            params: this.params
        });
    }
};

export default AsyncLoadableSingleItem;