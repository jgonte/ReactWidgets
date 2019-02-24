import React from 'react';
import ComponentBase from '../../ComponentBase';
import { Input } from 'antd';

export default class HiddenField extends ComponentBase {

    componentWillMount() {

        if (!this.onChangeHandler) {

            this.onChangeHandler = this.findParent(p => p.handleChange);
        }
    }

    render() {

        const {
            name,
            value
        } = this.props;

        const data = this.onChangeHandler.state.data;

        data[name] = value || ''; // Set it on the data of the handler so it can post the initial value

        return (
            <Input
                name={name}
                type="hidden"
                value={data[name]}
            />
        );
    }
}