import DeleteDialog from './DeleteDialog';
import AsyncSubmittableComponent from '../data/mixins/async/AsyncSubmittableComponent';
import { Modal } from 'antd';

export default class AsyncDeleteDialog extends AsyncSubmittableComponent(DeleteDialog) {

    onOk() {

        this.submit();
    }

    onSubmitData(data) {

        this.getParent().loadableComponent.load();

        this.displayMessage();
    }

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
}