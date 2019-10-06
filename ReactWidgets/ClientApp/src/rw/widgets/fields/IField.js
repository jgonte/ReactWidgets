import LabelledField from './LabelledField';
import Form from '../forms/Form';
import validatorFactory from '../validators/ValidatorFactory';

const IField = (Base) => class extends Base {

    validators = [];

    validateOnChange = true;

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this); // We are passing it to a different component

        this.validateOnChange = this.validateOnChange || props.validateOnChange;

        this.onChangeHandler = this.findParent(p => p.handleChange);
    }

    componentDidMount() {

        super.componentDidMount();

        console.log(`Adding field ${this.constructor.name} to change handler ${this.onChangeHandler.constructor.name}`);

        // Add this field to the handler
        this.onChangeHandler.fields.push(this);

        // Create the validators from the props
        if (this.props.validators &&
            this.props.validators.length) {

            this.props.validators.forEach(v => this.validators.push(validatorFactory.get(v.type, v)));
        }
    }

    componentWillUnmount() {

        super.componentWillUnmount();

        // Remove this field to the handler
        const index = this.onChangeHandler.fields.indexOf(this);

        this.onChangeHandler.fields.splice(index, 1);

        console.log(`Removed field ${this.constructor.name} to change chandler ${this.onChangeHandler.constructor.name}`);
    }

    handleChange(evt) {

        if (this.validateOnChange) {

            this.validate(evt.target);
        }

        this.notifyChangeHandler(evt);

        if (this.onChange) {

            this.onChange(evt);
        }
    }

    notifyChangeHandler(evt) {

        this.onChangeHandler.handleChange(evt);
    }

    getValue() {

        const data = this.onChangeHandler.state.data;

        return data ? data[this.props.name] : null;
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

        const labelledField = this.findParent(p => p instanceof LabelledField, false); // Do not throw if not found

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
};

export default IField;