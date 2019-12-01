import React from 'react';
import ComponentBase from '../../ComponentBase';
import Selectable from '../mixins/Selectable';

export default class ListItem extends Selectable(ComponentBase) {

    constructor(props) {

        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _setState(state) {

        this.setState(state);
    }

    getData() {

        return this.props.data;
    }

    render() {

        var style = this.isSelected() ? { backgroundColor: '#e6f7ff' } : null;

        return (
            <li className="ant-list-item ant-list-item-no-flex"
                style={style}
                onClick={this._handleClick}
                {...this.props}
            >
                {this.props.children}
            </li>
        );
    }
}