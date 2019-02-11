import React from 'react';
import Field from './Field';
import { Input } from 'antd';

export default class PasswordField extends Field {

    render() {

        const {
            name,
            placeholder,
            style
        } = this.props;

        return (
            <Input
                type="password"
                name={name}
                value={this.getValue()}
                placeholder={placeholder}
                style={style}
                onChange={this.onChangeHandler.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}