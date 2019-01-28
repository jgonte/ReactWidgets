import React from 'react';
import Field from './Field';
import { DatePicker } from 'antd';
import moment from 'moment';

export default class DateField extends Field {

    render() {

        const {
            name,
            placeholder,
            format,
            style
        } = this.props;

        return (
            <DatePicker 
                name={name}
                defaultValue={this.getValue() ? moment(this.getValue(), format) : null}
                format={format}
                placeholder={placeholder}
                style={style}
                onChange={value => this.onChangeHandler.onChange({
                    target: {
                        name: name,
                        type: 'datefield',
                        value: value,
                        format: format
                    }
                })}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}