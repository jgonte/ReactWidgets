import React from 'react';
import FetchSubmitter from '../../data/submitters/FetchSubmitter';
import RestUrlBuilder from '../helpers/builders/url/RestUrlBuilder';
import { Spin } from 'antd';

const AsyncSubmittable = (Base) => class extends Base {

    submitter = null;

    submitUrl = null;

    params = null;

    urlBuilder = null; // The URL builder to use if queryParams is not null

    constructor(props) {

        super(props);

        if (!props.submitter) {

            this.submitter = new FetchSubmitter();
        }

        if (props.onSubmitResponse) {

            this.onSubmitResponse = props.onSubmitResponse.bind(this);
        }

        if (props.onSubmitData) {

            this.onSubmitData = props.onSubmitData.bind(this);
        }

        this.submit = this.submit.bind(this);

        this.urlBuilder = props.urlBuilder || this.urlBuilder;
    }

    componentDidMount() {

        super.componentDidMount();

        let {
            submitter,
            submitUrl,
            metadataMapper
        } = this.props;

        this.submitter = submitter || this.submitter;

        if (!this.submitter) {

            throw new Error('Submitter is required.');
        }

        this.submitter.onResponse = this._onSubmitResponse.bind(this);

        this.submitter.onData = this._onSubmitData.bind(this);

        this.submitter.onFailure = this._onSubmitFailure.bind(this);

        this.submitUrl = submitUrl || this.submitUrl;

        if (!this.submitUrl) {

            throw new Error('Submit URL is required.');
        }

        this.metadataMapper = metadataMapper || this.metadataMapper;
    }

    getMethod(loaded) {

        const method = this.props.method || this.method;

        if (method) { // Explicitly configured

            return method;
        }

        // If the method is not provided, guess it from the loaded flag
        return loaded ? 'put' : 'post';
    }

    // The parameters to be sent in the query URL
    setParams(params) {

        this.params = params;
    }

    submit() {

        if (this.onBeforeSubmit &&
            !this.onBeforeSubmit()) {

            return false; // Submit cancelled
        }

        const {
            submitter,
            loaded,
            state
        } = this;

        this.setState({ ...state, submitting: true, error: null });

        const { data } = state;

        submitter.submit({
            submitUrl: this.buildUrl(),
            method: this.getMethod(loaded),
            data
        });

        return true; // In this case for example you can dismiss a dialog, etcetera
    }

    buildUrl () {

        const {
            submitUrl,
            params
        } = this;

        if (!params) {

            return submitUrl;
        }

        // If there are query parameters, then build the submit URL with those
        if (!this.urlBuilder) {

            this.urlBuilder = new RestUrlBuilder();
        }

        // Unwrap the parameters if it has a single attribute
        const keys = Object.keys(params);

        return this.urlBuilder.build({
            url: submitUrl,
            queryParams: keys.length === 1 ? params[keys[0]] : params
        });
    }

    _onSubmitResponse(response) {

        if (this.onAfterSubmit) {

            this.onAfterSubmit(response);
        }

        if (this.onSubmitResponse) {

            this.onSubmitResponse(response);
        }
    }

    _onSubmitData(data) {

        const {
            state,
            metadataMapper
        } = this;

        this.metadata = metadataMapper ? metadataMapper.getMetadata(data) : {};

        this.setState({ ...state, submitting: false, error: null });

        if (this.onSubmitData) {

            this.onSubmitData(data);
        }
    }

    _onSubmitFailure(error) {

        const { state } = this;

        this.setState({ ...state, submitting: false, error: error });
    }

    renderSubmitting() {

        return (
            <Spin tip="Submitting...">
                {this.renderComponent()}
            </Spin>
        );
    }
};

export default AsyncSubmittable;