import React from 'react';
import ComboBox from '../fields/ComboBox';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const { Component } = React;

const InputGroup = Input.Group;

const texts = {
    // Comparison operators
    'eq': 'Equals',
    'ne': 'Not equals',
    'gt': 'Greater than',
    'ge': 'Greater than or equals',
    'lt': 'Less than',
    'le': 'Less than or equals',
    // Logical operators
    'not': 'Not',
    'and': 'And',
    'or': 'Or',
    // String functions
    'contains': 'Contains',
    'startswith': 'Starts with',
    'endswith': 'Ends with'
};

const getText = operator => {
    const text = texts[operator];

    if (!text) {

        throw new Error(`Text not found for operator: '${operator}'`)
    }

    return text;
};

export default class FilterField extends Component {

    children = [];

    fields = [];

    constructor(props) {

        super(props);

        const {
            operators // The operators to choose from in the combo box
        } = props;

        let {
            selectedOperator // The selected operator
        } = props;

        if (operators && operators.length && !selectedOperator) { // Select the first if none was selected

            selectedOperator = operators[0];
        }

        this.state = {
            ...this.state,
            data: {
                operator: selectedOperator
            }
        };
    }

    renderOperators() {

        const {
            operators
        } = this.props;

        let {
            operator
        } = this.state.data;

        if (operators) {

            let disabled = false;

            if (operators.length === 1) {

                disabled = true;
            }

            const data = this.operatorsToOptions(operators);

            return (
                <ComboBox
                    name="operator"
                    style={{ width: '50%' }}
                    defaultValue={operator}
                    data={data}
                    placeholder="Select an operator"
                    disabled={disabled}
                    parent={this}
                />
            );
        }
    }

    operatorsToOptions(operators) {

        return operators.map(operator => {

            return {
                value: operator,
                text: getText(operator)
            };
        });
    }

    renderField() {

        const {
            parent: filterPanel,
            field
        } = this.props;

        return React.cloneElement(field, {
            name: field.props.name, // Set the same name as the parent
            style: { width: '50%' },
            parent: this,
            onChangeHandler: filterPanel,
            onChange: this.onChange
        });
    }

    // Handles the change of value of the operator
    handleChange(field, rawValue) {

        const data = {
            ...this.state.data,
            operator: rawValue
        };

        this.setState({
            ...this.state,
            data
        });

        // Trigger onChange only if the value of the filter field is not empty, since changing operatos with empty values should not change the filter
        const valueField = this.children[1];

        const value = valueField.getValue();

        if (value) { // The first child is the operator combo box

            const {
                name,
                parent: filterField
            } = valueField.props;

            var filterPanel = filterField.props.parent;

            filterPanel.updateFilter(name, data.operator, value);
        }
    }

    onChange(field) {

        const {
            name,
            parent: filterField
        } = field.props;

        var filterPanel = filterField.props.parent;

        var operator = filterField.state.data.operator;

        var value = field.getValue();

        filterPanel.updateFilter(name, operator, value);
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            },
        };

        return (
            <FormItem
                {...formItemLayout}
                label={this.props.label}
            >
                <InputGroup
                    compact
                    style={{ width: '100%' }}
                >
                    {this.renderOperators()}
                    {this.renderField()}
                </InputGroup>
            </FormItem>
        );
    }
}
