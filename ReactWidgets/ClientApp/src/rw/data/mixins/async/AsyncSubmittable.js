import Submitter from '../../submitters/Submitter';
import getMetadata from '../../getMetadata';

const AsyncSubmittable = Base => class extends Base {

    state = {
        data: {}
    };

    constructor(cfg) {

        super(cfg);

        if (!cfg.submitter) {

            this.submitter = new Submitter({
                url: cfg.submitUrl
            });
        }

        if (cfg.onSubmitResponse) {

            this.onSubmitResponse = cfg.onSubmitResponse.bind(this);
        }

        if (cfg.onSubmitData) {

            this.onSubmitData = cfg.onSubmitData.bind(this);
        }

        this.submitter.onResponse = this.onSubmitResponse.bind(this);

        this.submitter.onData = this.onSubmitData.bind(this);

        this.submitter.onError = this.onSubmitError.bind(this);
    }

    async submit() {

        if (this.onBeforeSubmit &&
            !this.onBeforeSubmit()) {

            return false; // Submit cancelled
        }

        if (this._setState) {

            this._setState({
                ...this.state,
                submitting: true,
                submittingError: null
            });
        }

        await this.submitter.submit({
            method: this.getMethod(),
            data: this.state.data
        });

        return true; // In this case for example you can dismiss a dialog, etcetera
    }

    getMethod() {

        const method = this.props.method || this.method;

        if (method) { // Explicitly configured

            return method;
        }

        // If the method is not provided, guess it from the loaded flag
        return this.loaded ? 'put' : 'post';
    }

    // Handles a response from the server
    onSubmitResponse(response) {

        if (this.onAfterSubmit) {

            this.onAfterSubmit(response);
        }

        if (this.onSubmitResponse) {

            this.onSubmitResponse(response);
        }
    }

    // Handles data received from the server
    onSubmitData(data) {

        this.metadata = getMetadata(data);

        if (this._setState) {

            this._setState({
                ...this.state,
                data: data || {},
                submitting: false,
                submittingError: null
            });
        }

        if (this.onSubmitData) {

            this.onSubmitData(data);
        }

        this.loaded = true;
    }

    onSubmitError(error) {

        error = error.message ? error.message : error;

        if (this._setState) {

            this._setState({
                ...this.state,
                submitting: false,
                submittingError: error
            });
        }
    }
};

export default AsyncSubmittable;