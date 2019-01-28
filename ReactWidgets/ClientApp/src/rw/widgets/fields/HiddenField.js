import React from 'react';
import ComponentBase from '../../ComponentBase';
import { Input } from 'antd';

export default class HiddenField extends ComponentBase {

    componentWillMount() {

        if (!this.onChangeHandler) {

            this.onChangeHandler = this.findParent(this, p => p.onChange);
        }
    }

    render() {

        const {
            name
        } = this.props;

        const data = this.onChangeHandler.state.data;

        const value = data ? data[name] : '';

        return (
            <Input
                name={name}
                type="hidden"
                value={value}
            />
        );
    }
}