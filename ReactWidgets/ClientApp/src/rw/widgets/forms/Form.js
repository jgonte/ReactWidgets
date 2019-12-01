import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';
import { Button } from 'antd';
import utils from '../../utils';

const getTargetValue = target => {

    switch (target.type) {
        case 'checkbox': return target.checked;
        case 'datefield':
        case 'datetimefield': {

            const value = target.value;

            if (!value) {

                return null;
            }

            return target.format ? value.format(target.format) : value._d; // It is a momentjs object
        }
        default: return target.value;
    }
};

export default class Form extends Container(ComponentBase) {

    fields = [];

    constructor(props) {

        super(props);

        const onChange = props.onChange || this.onChange;

        if (onChange) {

            this.onChange = onChange.bind(this);
        }

        this.submit = this.submit.bind(this);
    }

    render() {

        return this.renderComponent();
    }

    renderComponent() {

        return (

            <form>
                {this.renderChildren()}
                {this.renderButtons()}
            </form>
        );
    }

    renderButtons() {

        const {
            submitButton,
            resetButton
        } = this.props;

        if (submitButton || resetButton) {

            return (
                <div>
                    {this.renderButton(submitButton, "Submit")}
                    {this.renderButton(resetButton, "Reset")}
                </div>
            );
        }
    }

    renderButton(btn, label) {

        if (btn) {

            return (
                <Button
                    type={btn.type || 'primary'}
                    onClick={this.submit}
                >
                    {btn.label || label}
                </Button>
            );
        }
    }

    handleChange(field, rawValue) {

        // const value = event.value || getTargetValue(event.target);

        // const name = event.name || event.target.name;

        let data = this.state.data || {};

        // let field = data[name];

        // if (Array.isArray(field)) { // Multiple values field

        //     if (getTargetValue(event.target)) { // Is checked, add the value

        //         field.push(value);
        //     }
        //     else { // Is unchecked, remove value

        //         const i = field.indexOf(value);

        //         if (i > -1) {

        //             field.splice(i, 1);
        //         }
        //     }
            
        //     data = { ...data, [name]: field };
        // }
        // else { // Single value field

        //     data = { ...data, [name]: value };
        // }

        data = { 
            ...data, 
            [field.props.name]: rawValue 
        };

        this.setState({ 
            ...this.state, 
            data 
        });

        if (this.onChange) {

            this.onChange(data);
        }
    }

    // Adds a record to the array indexed by name
    addValue(name, record) {

        let value = this.getValue(name);

        if (!value) {

            this.state.data[name] = []; // Create the array

            value = this.getValue(name); // Get the array
        }

        value.push(record);
    }

    getValue(name) {

        const data = this.state.data;

        return data ? data[name] : null;
    }

    removeValue(dataProperty, value) {

        this.state.data[dataProperty] = this.state.data[dataProperty].filter(v => !utils.areEquivalent(v, value));
    }

    reset() {

        this.fields.forEach(f => f.resetValidation());

        const data = Object.keys(this.state.data).map(key => {

            return { [key]: '' };
        });

        this.setState({
            ...this.state,
            submitting: false,
            data
        });
    }

    validate() {

        const messages = [];

        this.fields.forEach(field => {
            const message = field.validate();

            if (message) {

                messages.push(message);
            }
        });

        if (messages.length) {

            return false;
        }

        return true;
    }

    onBeforeSubmit() {

        return this.validate();
    }

    onAfterSubmit() {

        return this.reset();
    }
}