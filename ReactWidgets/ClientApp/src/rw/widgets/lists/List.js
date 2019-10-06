import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';

export default class List extends Container(ComponentBase) {

    render() {

        const {
            style
        } = this.props;

        return (
            <ul
                style={style}
            >
                {this.renderChildren()}
            </ul>);
    }
}