import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';
import { Card } from 'antd';

export default class Panel extends Container(ComponentBase) {

    render() {

        const {
            title,
            style
        } = this.props;

        return (
            <Card
                title={title}
                style={style}
            >
                {this.renderChildren()}
            </Card>
        );
    }
}