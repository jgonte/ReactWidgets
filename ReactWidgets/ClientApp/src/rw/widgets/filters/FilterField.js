import React from 'react';
import ComboBox from '../fields/ComboBox';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const { Component } = React;

const InputGroup = Input.Group;

let timeout;

export default class FilterField extends Component {

    constructor(props) {

        super(props);

        let operator = 'equals';

        const {
            operators
        } = props;

        if (operators && operators.length === 1) {

            operator = operators[0];
        }

        this.state = {
            data: {
                operator: operator,
                operators: operators
            }
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
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

    renderOperators() {

        let {
            operator,
            operators
        } = this.state.data;

        if (operators) {

            let disabled = false;

            if (operators.length === 1) {

                disabled = true;

                operator = operators[0];
            }

            return (
                <ComboBox
                    name="operator"
                    style={{ width: '50%' }}
                    defaultValue={operator}
                    data={this.operatorsToOptions(operators)}
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
                text: operator
            };
        });
    }

    renderField() {

        const {
            field
        } = this.props;

        return React.cloneElement(field, {
            name: 'value',
            style: { width: '50%' },
            parent: this,
            onChange: this.onChange
        });
    }

    onChange(event) { // The scope of this function is the nested field

        const target = event.target;

        const name = target.name;

        const value = target.type === 'checkbox' ? target.checked : target.value;

        const data = { ...this.state.data, [name]: value };

        this.setState({ ...this.state, data });

        const {
            parent
        } = this.props;

        const fieldName = this.props.name;

        const view = parent.getTargetView();

        const {
            operator
        } = this.state.data;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            view.updateFilters(fieldName, operator, value);

            view.updateData();
        }, 1500);
    }
};
