import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';
import { Modal } from 'antd';

export default class Dialog extends Container(ComponentBase) {

    constructor(props) {

        super(props);

        this.state = {
            visible: false
        };

        this.title = props.title || this.title;

        const onBeforeShow = props.onBeforeShow || this.onBeforeShow;
        
        if (onBeforeShow) {

            this.onBeforeShow = onBeforeShow.bind(this); 
        }

        const onShow = props.onShow || this.onShow;

        if (onShow) {

            this.onShow = onShow.bind(this); 
        }

        this.handleOk = this.handleOk.bind(this);

        this.okText = props.okText || this.okText;

        this.okType = props.okType || this.okType;

        this.handleCancel = this.handleCancel.bind(this);

        if (props.onCancel) {

            this.onCancel = props.onCancel.bind(this);
        }
    }

    componentDidMount() {

        super.componentDidMount();

        this.onOk = (this.props.onOk || this.onOk).bind(this); // Required, it might be set by derived classes, that's why we put it here and not in the constructor
    }

    setParams(params) {

        this.params = params;
    }

    show() {

        if (this.validate) {

            this.validate();
        }

        if (this.onBeforeShow &&
            this.onBeforeShow() === false) {

            return;
        }

        this.setState({
            visible: true
        });

        if (this.onShow) {

            this.onShow();
        }
    }

    hide() {

        this.setState({
            visible: false
        });
    }

    handleOk(evt) {

        if (this.onOk() === false) {

            return; // Do not hide
        }

        this.hide();
    }

    handleCancel(evt) {

        if (this.onCancel) {

            this.onCancel();
        }

        this.hide();
    }

    render() {

        const {
            title,
            okText,
            okType,
            handleOk,
            handleCancel
        } = this;

        return (
            <Modal
                visible={this.state.visible}
                title={title}
                okText={okText}
                okType={okType}
                onOk={handleOk}
                onCancel={handleCancel}
                width={this.props.width || 820}
            >
                {this.renderChildren()}
            </Modal>
        );
    }
}