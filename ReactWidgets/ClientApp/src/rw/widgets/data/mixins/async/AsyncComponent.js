import React from 'react';
import { Spin, notification } from 'antd';

// Handles the update of the UI for all the asynchronous operations
const AsyncComponent = Base => class extends Base {

    constructor(props) {

        super(props);

        // Hook to ReactJs setState
        this._setState = this.setState.bind(this);
    }

    render() {

        const {
            loading,
            data,
            loadingError,
            submitting,
            submittingError
        } = this.state;

        if (loading) {

            return this.renderLoading(data);
        }

        if (loadingError) {

            return this.renderLoadingError(loadingError);
        }

        if (submitting) {

            return this.renderSubmitting(data);
        }

        if (submittingError) {

            return this.renderSubmittingError(submittingError);
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

    renderLoadingError(error) {

        notification.error({
            message: 'Error loading component',
            description: error.message
        });

        return (
            <div>{error.message}</div>
        );
    }

    renderSubmitting(data) {

        return (
            <Spin tip="Submitting...">
                {this.renderComponent(data)}
            </Spin>
        );
    }

    renderSubmittingError(error) {

        notification.error({
            message: 'Error submitting data',
            description: error
        });

        // Do not change the component view
        return this.renderComponent();
    }
};

export default AsyncComponent;