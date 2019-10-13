import LocalForm from './LocalForm';

// Form that when loading and submitting, it manipulates local data, it does not post to the server
export default class AddItemLocalForm extends LocalForm {

    constructor(props) {

        super(props);

        if (!props.onSubmit) {

            const defaultOnSubmit = () => {

                const parentForm = this.getParent(4);

                parentForm.addValue(props.dataProperty, this.state.data);

                const field = parentForm.fields.filter(field => field.props.name === props.dataProperty)[0];

                field.loadableComponent.load();

                this.reset();
            };

            this.onSubmit = defaultOnSubmit.bind(this);
        }
    }
}

