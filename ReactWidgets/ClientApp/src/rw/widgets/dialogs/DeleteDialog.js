import React from 'react';
import Dialog from './Dialog';
import AsyncSubmittable from '../../data/mixins/AsyncSubmittable';
import { Alert } from 'antd';

export default class DeleteDialog extends AsyncSubmittable(Dialog) {

    setId(id) {

        this.id = id;
    }

    renderChildren() {

        return <Alert message={this.props.message} type="warning" />
    }

    onOk() {

        this.submit();
    }
};