import Form from './Form';
import AsyncLoadableSingleItem from '../../data/mixins/AsyncLoadableSingleItem';
import AsyncSubmittable from '../../data/mixins/AsyncSubmittable';
import CrudField from '../fields/CrudField';

export default class AsyncForm extends AsyncSubmittable(AsyncLoadableSingleItem(Form)) {

    constructor(props) {

        super(props);

        // Overwrite the render component method if provided in the props
        if (props.renderComponent) {

            this.renderComponent = props.renderComponent.bind(this);
        }

        this._onLoadActions.push(this.loadCrudFields.bind(this));
    }

    loadCrudFields() {

        const crudFields = this.fields.filter(child => child instanceof CrudField);

        crudFields.forEach(crudField => {

            crudField.loadableComponent.load();
        });
    }

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

