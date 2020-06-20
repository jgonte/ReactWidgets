import LabelledField from './LabelledField';
import Form from '../forms/Form';
import validatorFactory from '../validators/ValidatorFactory';

const InputField = Base => class extends Base {

    validators = [];

    validateOnChange = true;

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this); // We are passing it to a different component

        this.validateOnChange = this.validateOnChange || props.validateOnChange;

        this.onChangeHandler = props.onChangeHandler || this.findParent(p => p.handleChange, false) || 
        { 
            fields:[], 
            state: {
                data: []
            }
        };
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

        // Remove this field from the handler
        const index = this.onChangeHandler.fields.indexOf(this);

        this.onChangeHandler.fields.splice(index, 1);

        console.log(`Removed field ${this.constructor.name} to change chandler ${this.onChangeHandler.constructor.name}`);
    }

    handleChange(event) {

        let rawValue;

        this.isChanging = true; // Flag to avoid calling on change when the component has not changed

        if (event && event.target) { // It should be an event

            const target = event.target;

            rawValue = target.type === 'checkbox' ? target.checked : target.value;
        }
        else { // Assume the event has a value as some of the Antd fields do

            rawValue = event;
        }

        if (this.validateOnChange) {

            this.validate(rawValue);
        }

        this.notifyChangeHandler(rawValue);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.isChanging && this.props.onChange) {

            this.props.onChange(this);

            this.isChanging = false;
        }
    }

    notifyChangeHandler(rawValue) {

        if (this.onChangeHandler.handleChange) {

            this.onChangeHandler.handleChange(this, rawValue);
        }
    }

    getRawValue() {

        const data = this.onChangeHandler.state.data;

        return data ? data[this.props.name] : null;
    }

    // Gets the value to send to the server
    getValue() {

        return this.getRawValue();
    }

    getForm() {

        return this.findParent(p => p instanceof Form);
    }

    validate(value) {

        const validators = this.validators;

        if (!validators &&
            !validators.length) {

            return;
        }

        this.resetValidation();

        value = value || this.getRawValue();

        const labelledField = this.findParent(p => p instanceof LabelledField, false); // Do not throw if not found

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

    // Clears the error messages from the input
    resetValidation() {

        const labelledField = this.findParent(p => p instanceof LabelledField, false); // Do not throw if not found

        if (labelledField) {

            labelledField.setValidation('', '', false);
        }
    }
};

export default InputField;