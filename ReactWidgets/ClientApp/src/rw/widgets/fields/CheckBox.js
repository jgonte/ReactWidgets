import React from 'react';
import Field from './Field';
import { Checkbox  } from 'antd';

export default class CheckBox extends Field {

    render() {

        const {
            name,
            style
        } = this.props;

        return (
            <Checkbox
                name={name}
                checked={this.getValue()}
                style={style}
                onChange={this.handleChange}
            />
        );
    }
}