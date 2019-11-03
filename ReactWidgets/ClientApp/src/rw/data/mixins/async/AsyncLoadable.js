import getMetadata from '../../getMetadata';

const AsyncLoadable = Base => class extends Base {

    // Private actions to be implemented by the components when loaded so we leave the onLoad method is free for the user to extend
    _onLoadActions = []; 

    constructor(cfg) {

        super(cfg);

        if (cfg.onLoading) {

            this.onLoading = cfg.onLoading.bind(this);
        }

        if (cfg.onLoadData) {

            this.onLoadData = cfg.onLoadData.bind(this);
        }

        if (cfg.onLoadError) {

            this.onLoadError = cfg.onLoadError.bind(this);
        }
    }

    onLoaderCreated() {

        this.loader.onData = this.onLoaderData.bind(this);

        this.loader.onError = this.onLoaderError.bind(this);
    }

    // Handles the loaded data in two ways, using _setState or onLoading
    onLoaderLoading() {

        if (this._setState) {

            this._setState({
                ...this.state, // Keep previous loaded data
                loading: true,
                loadingError: null
            });
        }

        if (this.onLoading) {

            this.onLoading();
        }
    }

    // Handles the loaded data in two ways, using _setState or onLoadData
    onLoaderData(data) {

        this.metadata = getMetadata(data);

        if (this._setState) {

            this._setState({
                ...this.state,
                data: data.payload,
                loading: false,
                loadingError: null,
                ...this.metadata.pagination
            });
        }

        this._onLoadActions.forEach(onLoadAction => onLoadAction(data));

        if (this.onLoadData) {

            this.onLoadData(data);
        }
    }

    // Handles the error loading in two ways, using _setState or onLoadError
    onLoaderError(error) {

        error = error.message ? error.message : error;

        if (this._setState) {

            this._setState({
                ...this.state,
                loading: false,
                loadingError: error
            });
        }

        if (this.onLoadError) {

            this.onLoadError(error);
        }
    }
};

export default AsyncLoadable;