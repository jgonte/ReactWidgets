import AsyncLoadable from './AsyncLoadable';
import SingleItemLoader from '../../../data/loaders/SingleItemLoader';

const AsyncLoadableSingleItem = Base => class extends AsyncLoadable(Base) {

    state = {
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

    async load() {

        if (!this.loader) {

            throw new Error('Loader must be configured');
        }

        this.onLoaderLoading();

        await this.loader.load({
            select: this.select,
            params: this.params
        });
    }
};

export default AsyncLoadableSingleItem;