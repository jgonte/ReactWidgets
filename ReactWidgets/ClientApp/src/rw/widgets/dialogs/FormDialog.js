import React from 'react';
import Dialog from './Dialog';
import { Modal } from 'antd';

// Dialog that connects a single form
export default class FormDialog extends Dialog {

    render() {

        const form = React.cloneElement(
            this.props.form,
            {
                parent: this,
                onSubmitData: function (data) {

                    this.getParent(2).loadableComponent.load();

                    Modal.success({
                        title: 'Success',
                        content: `Client with id: '${data.payload.id}' was successfully created.`
                    });
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