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

        this.state = {
            data: {}
        };

        this.handleChange = this.handleChange.bind(this);

        const onChange = props.onChange || this.onChange;

        if (onChange) {

            this.onChange = onChange.bind(this);
        }
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

    handleChange(event) {

        // If a value was provided in the event then get that value
        const value = event.value || getTargetValue(event.target);

        const name = event.name || event.target.name;

        let f = this.state.data[name];

        let data;

        if (Array.isArray(f)) { // Multiple values field

            if (getTargetValue(event.target)) { // Is checked, add the value

                f.push(value);
            }
            else { // Is unchecked, remove value

                const i = f.indexOf(value);

                if (i > -1) {

                    f.splice(i, 1);
                }
            }
            
            data = { ...this.state.data, [name]: f };
        }
        else { // Single value field

            data = { ...this.state.data, [name]: value };
        }

        this.setState({ ...this.state, data });

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

        this.state.data[dataProperty] = this.state.data[dataProperty].filter(v => !utils.areEqual(v, value));
    }

    reset() {

        const data = Object.keys(this.state.data).map(key => {

            return { [key]: '' };
        });

        this.setState({ ...this.state, data });
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
}