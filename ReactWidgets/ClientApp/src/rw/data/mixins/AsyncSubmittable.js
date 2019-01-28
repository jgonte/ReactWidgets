import FetchSubmitter from '../../data/submitters/FetchSubmitter';

const AsyncSubmittable = (Base) => class extends Base {

    submitter = null;

    submitUrl = null;

    constructor(props) {

        super(props);

        if (!props.submitter) {

            this.submitter = new FetchSubmitter();
        }

        if (props.onWrite) {

            this.onWrite = props.onWrite.bind(this);
        }

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {

        super.componentWillMount();

        let {
            submitter,
            submitUrl,
            metadataMapper
        } = this.props;

        this.submitter = submitter || this.submitter;

        if (!this.submitter) {

            throw new Error('Submitter is required.');
        }

        this.submitter.onData = this.onWriteData.bind(this);

        this.submitter.onFailure = this.onWriteFailure.bind(this);

        this.submitUrl = submitUrl || this.submitUrl;

        if (!this.submitUrl) {

            throw new Error('Submit URL is required.');
        }

        this.metadataMapper = metadataMapper || this.metadataMapper;
    }

    submit() {

        if (this.onBeforeSubmit &&
            !this.onBeforeSubmit()) {

            return;
        }

        const {
            submitter,
            submitUrl,
            loaded,
            state
        } = this;

        let url, method;

        if (this.id) {

            method = 'delete';

            url = `${submitUrl}/${this.id}`;
        }
        else {

            method = loaded ? 'put' : 'post';

            url = submitUrl;
        }

        this.setState({ ...state, submitting: true, error: null });

        const { data } = state;

        submitter.write({
            submitUrl: url,
            method: method,
            data
        });
    }

    onWriteData(data) {

        const {
            state,
            metadataMapper
        } = this;

        this.metadata = metadataMapper ? metadataMapper.getMetadata(data) : {};

        this.setState({ ...state, submitting: false, error: null });

        if (this.onWrite) {

            this.onWrite();
        }
    }

    onWriteFailure(error) {

        const { state } = this;

        this.setState({ ...state, submitting: false, error: error });
    }
};

export default AsyncSubmittable;