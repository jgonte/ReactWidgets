import React from 'react';
import Dialog from './Dialog';
import { Modal } from 'antd';

// Dialog that connects a single form
export default class UpdateFormDialog extends Dialog {

    icon = 'database';

    iconColor = '#1890ff';

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

                    this.params = this.props.parent.params;

                    this.load();
                }
            }
        );

        const {
            okText,
            okType,
            handleOk,
            handleCancel
        } = this;

        return (
            <Modal
                visible={this.state.visible}
                title={this.renderTitle()}
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

            form.params = this.params;

            form.load();
        }
    }

    onOk = () => this.children[0].submit();
}