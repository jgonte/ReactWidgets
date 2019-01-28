import ComponentBase from '../../ComponentBase';
import LabelledField from './LabelledField';
import validatorFactory from '../validators/ValidatorFactory';

export default class Field extends ComponentBase {

    validators =  [];

    componentWillMount() {

        if (!this.onChangeHandler) {

            this.onChangeHandler = this.findParent(this, p => p.onChange);

            // Register this field with the parent
            this.onChangeHandler.fields = this.onChangeHandler.fields || [];

            this.onChangeHandler.fields.push(this);

            // Create the validators from the props
            if (this.props.validators &&
                this.props.validators.length) {

                this.props.validators.forEach(v => this.validators.push(validatorFactory.get(v.type, v)));
            }
        }
    }

    getValue() {

        const data = this.onChangeHandler.state.data;

        const value = data ? data[this.props.name] || '' : '';

        return value.toString();
    }

    validate() {

        const validators = this.validators;

        if (validators &&
            validators.length) {

            const labelledField = this.findParent(this, p => p instanceof LabelledField);

            if (labelledField) { // Reset any error

                labelledField.setValidation('', '', false);
            }

            const value = this.getValue();

            for (let i = 0; i < validators.length; ++i) {

                const validator = validators[i];

                let message = validator.validate(value);

                if (message) {

                    if (labelledField) { // Set error message

                        labelledField.setValidation(message, 'error', false);
                    }

                    return message; // One failed validation only per field
                }

            }
        }
    }
}