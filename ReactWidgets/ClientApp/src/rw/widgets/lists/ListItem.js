import React from 'react';
import ComponentBase from '../../ComponentBase';
import Selectable from '../mixins/Selectable';

export default class ListItem extends Selectable(ComponentBase) {

    constructor(props) {

        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {

        super.componentDidMount();

        if (this.props.onRecordChanged) {

            this.onRecordChanged = this.props.onRecordChanged.bind(this);

            this.props.record.onChange = this.onRecordChanged;
        }
    }

    _setState(state) {

        this.setState(state);
    }

    getData() {

        return this.props.data;
    }

    render() {

        const {
            selectable,
            selected
        } = this.state;

        if (selectable) {

            const style = {
                cursor: 'hand'
            };

            if (selected) {

                style.backgroundColor = '#e6f7ff';
            }

            return (
                <li className="ant-list-item ant-list-item-no-flex"
                    style={style}
                    onClick={this._handleClick}
                >
                    {this.props.children}
                </li>
            );
        }
        else {

            return (
                <li className="ant-list-item ant-list-item-no-flex"
                    style={{
                        backgroundColor: '#d9d9d9',
                        cursor: 'not-allowed'
                    }}
                >
                    {this.props.children}
                </li>
            );
        }
        
    }
}