import React from 'react';
import Dialog from './Dialog';
import { Modal } from 'antd';

// Dialog that connects a single form
export default class UpdateFormDialog extends Dialog {

    displayMessage() {

        let { message } = this.props;

        if (!message) {

            return;
        }

        if (message.indexOf('{{params}}') > -1) { // Replace with the value

            const params = this.params;

            const keys = Object.keys(params);

            message = message.replace(/{{params}}/g,
                keys.length === 1 ? params[keys[0]] : JSON.stringify(params)
            );
        }

        Modal.success({
            title: 'Success',
            content: message
        });
    }

    render() {

        const form = React.cloneElement(
            this.props.form,
            {
                parent: this,
                onSubmitData: function (data) {

                    this.getParent(2).loadableComponent.load();

                    this.getParent().displayMessage();
                },
                onMount: function () {

                    this.setLoadParams(this.props.parent.params);

                    this.load();
                }
            }
        );

        const {
            title,
            okText,
            okType,
            handleOk,
            handleCancel
        } = this;

        return (
            <Modal
                visible={this.state.visible}
                title={title}
                okText={okText}
                okType={okType}
                onOk={handleOk}
                onCancel={handleCancel}
                width={this.props.width || 820}
            >
                {form}
            </Modal>
        );
    }


    onShow = () => {

        const form = this.children[0];

        if (form && this.params) { // The form was mounted and the the params were passed

            form.setLoadParams(this.params);

            form.load();
        }
    }

    onOk = () => this.children[0].submit();
}