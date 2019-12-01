import React from 'react';
import Dialog from './Dialog';
import { Modal } from 'antd';

// Dialog that connects a single form for insert
export default class CreateFormDialog extends Dialog {

    icon = 'database';

    iconColor = '#1890ff';

    render() {

        const form = React.cloneElement(
            this.props.form,
            {
                parent: this,
                onSubmitData: function (data) {

                    this.getParent(2).loadableComponent.load();

                    this.getParent().displayMessage(data.payload);
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

    onOk = () => this.children[0].submit();

    onCancel = () => this.children[0].reset();
}