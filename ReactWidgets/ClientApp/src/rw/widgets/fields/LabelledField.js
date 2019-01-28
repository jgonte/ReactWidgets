import React from 'react';
import { Form } from 'antd';
import Container from '../mixins/Container';

const { Component } = React;

export default class LabelledField extends Container(Component) {

    constructor(props) {

        super(props);

        this.state = {
            message: '',
            validationStatus: '',
            hasFeedback: false
        };
    }

    render() {

        const {
            props,
            state
        } = this;

        const formItemLayout = {
            width: '100%',
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }
        };

        return (
            <Form.Item 
                {...formItemLayout}
                label={props.label}
                help={state.message}
                hasFeedback={state.hasFeedback}
                validateStatus={state.validationStatus}
            >
                {this.renderChildren()}
            </Form.Item>
        );
    }

    setValidation(message, validationStatus, hasFeedback) {

        this.setState({ ...this.state, message, validationStatus, hasFeedback });
    }

}