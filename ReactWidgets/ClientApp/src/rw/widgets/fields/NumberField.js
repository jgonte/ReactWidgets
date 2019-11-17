import React from 'react';
import Field from './Field';
import { InputNumber } from 'antd';

export default class NumberField extends Field {

    render() {

        const {
            name,
            disabled,
            placeholder
        } = this.props;

        return (
            <InputNumber
                name={name}
                disabled={disabled}
                value={this.getValue()}
                placeholder={placeholder}
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}