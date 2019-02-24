import React from 'react';
import Dialog from './Dialog';
import AsyncSubmittable from '../../data/mixins/AsyncSubmittable';
import { Alert } from 'antd';

export default class DeleteDialog extends AsyncSubmittable(Dialog) {

    title = 'Please confirm';

    method = 'delete';

    okText = 'Delete';

    okType = 'danger';

    renderMessage() {

        const { message } = this.props;

        if (message.indexOf('{{params}}') > -1) { // Replace with the value

            return message.replace(/{{params}}/g, this.params);
        }

        return message;
    }

    renderChildren() {

        return (
            <Alert
                message={this.renderMessage()}
                type="warning"
            />
        );
    }

    onOk() {

        this.submit();
    }
}