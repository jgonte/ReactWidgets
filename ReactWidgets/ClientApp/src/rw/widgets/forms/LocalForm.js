import Form from './Form';
import LocalLoadableSingleItem from '../../data/mixins/LocalLoadableSingleItem';
import LocalSubmittable from '../../data/mixins/LocalSubmittable';

// Form that when loading and submitting, it manipulates local data, it does not post to the server
export default class LocalForm extends LocalSubmittable(LocalLoadableSingleItem(Form)) {

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

}

