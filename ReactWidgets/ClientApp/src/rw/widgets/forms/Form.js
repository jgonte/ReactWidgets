import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';
import { Button } from 'antd';

const getTargetValue = target => {

    switch (target.type) {
        case 'checkbox': return target.checked;
        case 'datefield': return target.format ? target.value.format(target.format) : target.value._d; // Is a momentjs object
        default: return target.value;
    }
};

export default class Form extends Container(ComponentBase) {

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

        const value = getTargetValue(event.target);

        const data = { ...this.state.data, [event.target.name]: value };

        this.setState({ ...this.state, data });

        if (this.onChange) {

            this.onChange(data);
        }
    }

    getValue(name) {

        const data = this.state.data;

        const value = data ? data[name] || '' : '';

        return value.toString();
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