import React from 'react';
import Field from './Field';
import { InputNumber } from 'antd';

export default class NumberField extends Field {

    render() {

        const {
            name,
            placeholder
        } = this.props;

        return (
            <InputNumber
                name={name}
                value={this.getValue()}
                placeholder={placeholder}
                onChange={this.onChangeHandler.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}