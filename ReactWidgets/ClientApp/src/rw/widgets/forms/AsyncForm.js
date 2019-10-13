import Form from './Form';
import AsyncLoadableSingleItemComponent from '../data/mixins/async/AsyncLoadableSingleItemComponent';
import AsyncSubmittable from '../../data/mixins/async/AsyncSubmittable';
import CrudField from '../fields/CrudField';

export default class AsyncForm extends AsyncSubmittable(AsyncLoadableSingleItemComponent(Form)) {

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

    onAfterSubmit() {

        this.reset();
    }
}

