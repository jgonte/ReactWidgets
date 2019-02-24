import ComponentBase from '../../ComponentBase';
import LabelledField from './LabelledField';
import Form from '../forms/Form';
import validatorFactory from '../validators/ValidatorFactory';

export default class Field extends ComponentBase {

    validators = [];

    validateOnChange = true;

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.validateOnChange = this.validateOnChange || props.validateOnChange;
    }

    componentWillMount() {

        if (!this.onChangeHandler) {

            this.onChangeHandler = this.findParent(p => p.handleChange);

            // Register this field with the parent
            this.onChangeHandler.fields = this.onChangeHandler.fields || [];

            this.onChangeHandler.fields.push(this);
        }
    }

    componentDidMount() {

        super.componentDidMount();

        // Create the validators from the props
        if (this.props.validators &&
            this.props.validators.length) {

            this.props.validators.forEach(v => this.validators.push(validatorFactory.get(v.type, v)));
        }
    }

    handleChange(evt) {

        if (this.validateOnChange) {

            this.validate(evt.target);
        }

        this.onChangeHandler.handleChange(evt);

        if (this.onChange) {

            this.onChange(evt);
        }
    }

    getValue() {

        const data = this.onChangeHandler.state.data;

        const value = data ? data[this.props.name] || '' : '';

        return value.toString();
    }

    getForm() {

        return this.findParent(p => p instanceof Form);
    }

    validate(target) {

        const validators = this.validators;

        if (!validators &&
            !validators.length) {

            return;
        }

        const labelledField = this.findParent(p => p instanceof LabelledField);

        if (labelledField) { // Reset any error

            labelledField.setValidation('', '', false);
        }

        const value = target ? target.value : this.getValue();

        for (let i = 0; i < validators.length; ++i) {

            const validator = validators[i];

            validator.field = this; // Set the field to allow the validator to go up the hierarchy in some cases (such as the CompareValidator)

            let message = validator.validate(value);

            if (message) {

                if (labelledField) { // Set error message

                    labelledField.setValidation(message, 'error', false);
                }

                return message; // One failed validation only per field, if a message exists, then the validation has field
            }
        }
    }
}