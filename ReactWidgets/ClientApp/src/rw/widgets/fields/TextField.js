import React from 'react';
import Field from './Field';
import { Input } from 'antd';

export default class TextField extends Field {

    render() {

        const {
            name,
            placeholder,
            disabled,
            style
        } = this.props;

        return (
            <Input
                name={name}
                disabled={disabled}
                value={this.getValue()}
                placeholder={placeholder}
                style={style}
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}