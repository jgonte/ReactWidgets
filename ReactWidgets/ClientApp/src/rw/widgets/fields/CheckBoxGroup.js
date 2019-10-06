import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';
import IField from './IField';

export default class CheckBoxGroup extends IField(Container(ComponentBase)) {

    fields = [];

    render() {

        const {
            name,
            options,
            values, // Used for setting the currently selected value string[]
            disabled, // Disable all checkboxes
            style
        } = this.props;

        return (
            <div
                name={name}
                options={options}
                value={values}
                disabled={disabled}
                style={style}
            >
                {this.renderChildren()}
            </div>
        );
    }

    hasValue(value) {

        const data = this.onChangeHandler.state.data;

        const values = data[this.props.name] || [];

        return values.includes(value);
    }

    addValue(value) {

        const data = this.onChangeHandler.state.data;

        const values = data[this.props.name] || [];

        if (!values.includes(value)) {

            values.push(value);
        }
    }
}