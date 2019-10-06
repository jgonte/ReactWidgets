import React from 'react';
import Dialog from './Dialog';
import { Alert } from 'antd';

export default class DeleteDialog extends Dialog {

    title = 'Please confirm';

    method = 'delete';

    okText = 'Delete';

    okType = 'danger';

    renderConfirm() {

        const { confirm } = this.props;

        const params = this.params;

        if (params && confirm.indexOf('{{params}}') > -1) { // Replace with the value

            const keys = Object.keys(params);

            return confirm.replace(/{{params}}/g,
                keys.length === 1 ? params[keys[0]] : JSON.stringify(params)
            );
        }

        return confirm;
    }

    renderChildren() {

        return (
            <Alert
                message={this.renderConfirm()}
                type="warning"
            />
        );
    }

    validate() {

        if (!this.params) {

            throw new Error("Delete dialog must have params set");
        }
    }
}