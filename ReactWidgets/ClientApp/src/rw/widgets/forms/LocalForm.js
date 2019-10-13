import Form from './Form';
import LocalLoadableComponent from '../data/mixins/local/LocalLoadableComponent';
import LocalSubmittable from '../../data/mixins/local/LocalSubmittable';

// Form that when loading and submitting, it manipulates local data, it does not post to the server
export default class LocalForm extends LocalSubmittable(LocalLoadableComponent(Form)) {

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

