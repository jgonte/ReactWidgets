import Form from './Form';
import AsyncLoadableSingleItem from '../../data/mixins/AsyncLoadableSingleItem';
import AsyncSubmittable from '../../data/mixins/AsyncSubmittable';

export default class AsyncForm extends AsyncSubmittable(AsyncLoadableSingleItem(Form)) {

    render() {

        const {
            loading,
            data,
            error,
            submitting
        } = this.state;

        if (loading) {

            return this.renderLoading();
        }

        if (error) {

            return this.renderError(error);
        }

        if (submitting) {

            return this.renderSubmitting();
        }

        return this.renderComponent(data);
    }

    onAfterSubmit() {

        this.reset();
    }
}

