import React from 'react';
import Field from './Field';
import CheckBoxGroup from './CheckBoxGroup';
import { Checkbox } from 'antd';

export default class CheckBox extends Field {

    render() {

        const {
            name,
            checked,
            disabled,
            style
        } = this.props;

        // If it is initially checked, then set the value
        if (checked) {

            this.check();
        }

        return (
            <Checkbox
                name={name}
                checked={this.isChecked()}
                disabled={disabled}
                style={style}
                onChange={this.handleChange}
            />
        );
    }

    check() {

        const {
            value
        } = this.props;

        const checkBoxGroup = this.findParent(p => p instanceof CheckBoxGroup, false); // Do not throw if not found

        if (checkBoxGroup) {

            checkBoxGroup.addValue(value);
        }
        else {

            this.setValue(value);
        }
    }

    isChecked() {

        const {
            value
        } = this.props;

        const checkBoxGroup = this.findParent(p => p instanceof CheckBoxGroup, false); // Do not throw if not found

        if (checkBoxGroup) {

            return checkBoxGroup.hasValue(value);
        }
        else {

            return this.getValue();
        }
    }

}