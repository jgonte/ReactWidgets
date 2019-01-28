import React from 'react';
import Form from './Form';
import AsyncLoadableSingleItem from '../../data/mixins/AsyncLoadableSingleItem';
import AsyncSubmittable from '../../data/mixins/AsyncSubmittable';
import { Button } from 'antd';

export default class AsyncForm extends AsyncSubmittable(AsyncLoadableSingleItem(Form)) {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    render() {

        return (

            <form>
                {this.renderChildren()}
                {this.renderSubmitButton()}
            </form>
        );
    }

    renderSubmitButton() {
        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.submit}
                >
                    Submit
                    </Button>
            </div>
        );
    }
};

