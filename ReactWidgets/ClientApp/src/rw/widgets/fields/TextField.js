import React from 'react';
import Field from './Field';
import { Input } from 'antd';

export default class TextField extends Field {

    render() {

        const {
            name,
            placeholder,
            style
        } = this.props;

        return (
            <Input
                name={name}
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