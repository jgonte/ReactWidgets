import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';

export default class ListItem extends Container(ComponentBase) {

    render() {

        const {
            style
        } = this.props;

        return (
            <li className="ant-list-item"
                style={style}
            >
                {this.renderChildren()}
            </li>);
    }
}