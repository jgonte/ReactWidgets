import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';

export default class Form extends Container(ComponentBase) {

    constructor(props) {

        super(props);

        this.state = {
            data: {}
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {

        return (

            <form>
                {this.renderChildren()}
            </form>
        );
    }

    onChange(event) {

        const value = this.getTargetValue(event.target);

        const data = { ...this.state.data, [event.target.name]: value };

        this.setState({ ...this.state, data });
    }

    getTargetValue(target) {

        switch (target.type) {
            case 'checkbox': return target.checked;
            case 'datefield': return target.format ? target.value.format(target.format) : target.value._d; // Is a momentjs object
            default: return target.value;
        }
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