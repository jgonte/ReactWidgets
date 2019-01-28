import React from 'react';

const AsyncLoadable = (Base) => class extends Base {

    loader = null;

    loadUrl = null;

    autoLoad = true;

    metadataMapper = null;

    requiresRefresh = true;

    loadParams = null;

    setLoadParams(params) {

        this.loadParams = params;
    }

    componentWillMount() {

        super.componentWillMount();

        let {
            loader,
            loadUrl,
            metadataMapper
        } = this.props;

        this.loader = loader || this.loader;

        if (!this.loader) {

            throw new Error('Loader is required.');
        }

        this.loader.onData = this.onReadData.bind(this);

        this.loader.onFailure = this.onReadFailure.bind(this);

        this.loadUrl = loadUrl || this.loadUrl;

        this.metadataMapper = metadataMapper || this.metadataMapper;

        if (typeof this.props.autoLoad !== 'undefined') {

            this.autoLoad = this.props.autoLoad;
        }
    }

    componentDidMount() {

        super.componentDidMount();

        if (this.autoLoad) {

            this.load();
        }
    }

    load() {

        const {
            loader,
            loadUrl,
            state
        } = this;

        if (!loadUrl) {

            throw new Error('Load URL is required.');
        }

        let url;

        if (this.loadParams) {

            url = `${loadUrl}/${this.loadParams}`; // TODO: Create an extension method for this
        }
        else {

            url = loadUrl;
        }

        this.setState({ ...state, data: null, loading: true, error: null });

        const params = this.createReaderParams();

        loader.read({ ...params, loadUrl: url, headers: this.createHeadersFromMetadata() });
    }

    createHeadersFromMetadata() {

        let headers = [];

        const metadata = this.metadata;

        if (!metadata) {

            return headers;
        }

        const { cacheData } = this.props;

        if (cacheData && metadata.eTag) { // Do not send it if not cached

            headers.push({
                key: 'If-None-Match',
                value: metadata.eTag
            });
        }

        return headers;
    }


    onReadData(data) {

        const {
            state,
            metadataMapper
        } = this;

        this.metadata = metadataMapper ? metadataMapper.getMetadata(data) : {};

        const { cacheData } = this.props;

        const payload = data.payload;

        if (cacheData) {

            this.cachedData = payload; // Cache the fetched data

            this.updateStateFromCachedData();
        }
        else {

            this.setState({ ...state, data: data.payload, loading: false, error: null });
        }

        this.loaded = true;
    }

    updateStateFromCachedData() {

        const { state } = this;

        const { cacheDataAge } = this.props;

        if (cacheDataAge) {

            this.requiresRefresh = false;

            setTimeout(() => this.requiresRefresh = true, cacheDataAge);
        }

        const data = this.updateDataLocally(this.cachedData); // Process the data locally

        this.setState({ ...state, data: data, loading: false, error: null }); // Update state
    }

    onReadFailure(error) {

        const { state } = this;

        const { cacheData } = this.props;

        if (error.status === 304) { // Not modified

            if (!cacheData) {

                throw new Error(`Component has cached data in the server`);
            }

            this.updateStateFromCachedData();
        }
        else {

            this.setState({ ...state, data: null, loading: false, error: error });
        }
    }

    renderMounting() {

        return (<div></div>);
    }

    renderLoading() {

        return (<div>Loading...</div>);
    }

    renderError(error) {

        return (<div>{error.message}</div>);
    }
};

export default AsyncLoadable;