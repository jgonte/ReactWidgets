import React from 'react';
import { Spin, notification } from 'antd';

const AsyncLoadable = (Base) => class extends Base {

    loader = null;

    autoLoad = true;

    metadataMapper = null;

    requiresRefresh = true;

    loadParams = null;

    _onLoadActions = []; // Private actions to be implemented by the components when loaded so we leave the onLoad method free for the user to extend

    setLoadParams(params) {

        this.loadParams = params;
    }

    componentDidMount() {

        super.componentDidMount();

        let {
            loader,
            metadataMapper
        } = this.props;

        this.loader = loader || this.loader;

        if (!this.loader) {

            throw new Error('Loader is required.');
        }

        this.loader.onData = this._onLoad.bind(this);

        this.loader.onFailure = this._onLoadFailure.bind(this);

        this.metadataMapper = metadataMapper || this.metadataMapper;

        if (this.props.onLoad) {

            this.onLoad = this.props.onLoad.bind(this);
        }

        if (typeof this.props.autoLoad !== 'undefined') {

            this.autoLoad = this.props.autoLoad;
        }

        if (this.autoLoad) {

            this.load();
        }
    }

    load() {

        const {
            loader,
            state
        } = this;

        this.setState({
            ...state, // Keep previous loaded data
            loading: true,
            error: null
        });

        const params = this.createReaderParams();

        loader.load({
            ...params,
            loadUrl: this.buildLoadUrl(),
            headers: this.createHeadersFromMetadata()
        });
    }

    buildLoadUrl() {

        const {
            loadUrl
        } = this.props;

        if (!loadUrl) {

            throw new Error('Load URL is required.');
        }

        const {
            loadParams
        } = this;

        if (loadParams) {

            const keys = Object.keys(loadParams);

            // Unwrap if the parameter is a single value
            return `${loadUrl}/${keys.length === 1 ? loadParams[keys[0]] : loadParams}`;
        }
        else {

            return loadUrl;
        }
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

    _onLoad(data) {

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

        this._onLoadActions.forEach(onLoadAction => onLoadAction(data));

        if (this.onLoad) {

            this.onLoad(data);
        }
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

    _onLoadFailure(error) {

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

    render() {

        const {
            loading,
            data,
            error
        } = this.state;

        if (loading) {

            return this.renderLoading(data);
        }

        if (error) {

            return this.renderError(error);
        }

        return this.renderComponent(data);
    }

    renderLoading(data) {

        return (
            <Spin tip="Loading...">
                {this.renderComponent(data)}
            </Spin>
        );
    }

    renderError(error) {

        notification.error({
            message: 'Error loading component',
            description: error.message
        });

        return (
            <div>{error.message}</div>
        );
    }
};

export default AsyncLoadable;