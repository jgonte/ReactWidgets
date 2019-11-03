import React from 'react';
import Field from './Field';
import DataHandler from '../mixins/DataHandler';
import { Select } from 'antd';

const Option = Select.Option;

export default class ComboBox extends DataHandler(Field) {

    valueProperty = 'value';

    textProperty = 'text';

    constructor(props) {

        super(props);

        const {
            valueProperty,
            textProperty
        } = props;

        this.valueProperty = valueProperty || this.valueProperty;

        this.textProperty = textProperty || this.textProperty;
    }

    renderComponent(data) {

        const {
            name,
            placeholder,
            disabled,
            defaultValue,
            allowClear,
            style
        } = this.props;

        return (
            <Select
                name={name}
                value={this.getValue()}
                placeholder={placeholder}
                style={style}
                disabled={disabled}
                defaultValue={defaultValue}
                optionFilterProp="children"
                onChange={value => this.handleChange({
                    target: {
                        name: name,
                        type: 'select',
                        value: value
                    }
                })}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                allowClear={allowClear}
            >
                {this.renderChildren(data)}
            </Select>
        );
    }

    renderChildren(data) {

        const {
            children,
            blankOption
        } = this.props;

        if (!data) {

            return children;
        }

        const {
            valueProperty,
            textProperty
        } = this;

        if (blankOption) { // Prepend the blank option

            let blankRecord = {};

            blankRecord[valueProperty] = blankOption.value;

            blankRecord[textProperty] = blankOption.text;

            data.unshift(blankRecord);
        }

        return data.map(record =>
            <Option key={record[valueProperty]} value={record[valueProperty].toString()}>
                {record[textProperty]}
            </Option>
        );
    }
}