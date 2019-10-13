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

        let fmt = format || 'YYYY-MM-DD HH:mm:ss';

        return (
            <DatePicker 
                name={name}
                defaultValue={this.getValue() ? moment(this.getValue(), format) : null}
                format={fmt}
                placeholder={placeholder}
                style={style}
                onChange={value => this.handleChange({
                    target: {
                        name: name,
                        type: 'datefield',
                        value: value,
                        format: fmt
                    }
                })}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}