import React from 'react';
import ComponentBase from '../../ComponentBase';
import { Modal, Button } from 'antd';

export default class Dialog extends ComponentBase {

    initiallyVisible = false;

    constructor(props) {

        super(props);

        this.state = {
            visible: false
        };

        const onBeforeShow = props.onBeforeShow || this.onBeforeShow;
        
        if (onBeforeShow) {

            this.onBeforeShow = onBeforeShow.bind(this); 
        }

        const onShow = props.onShow || this.onShow;

        if (onShow) {

            this.onShow = onShow.bind(this); 
        }

        this.handleOk = this.handleOk.bind(this);

        this.onOk = (props.onOk || this.onOk).bind(this); // Required

        this.handleCancel = this.handleCancel.bind(this);

        if (props.onCancel) {

            this.onCancel = props.onCancel.bind(this);
        }
    }
    
    setParams(params) {

        this.params = params;
    }

    show() {

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

        this.onOk();

        this.hide();
    }

    handleCancel(evt) {

        if (this.onCancel) {

            this.onCancel();
        }

        this.hide();
    }

    renderChildren() {
        return this.props.children;
    }

    render() {

        const { title } = this.props;

        // Hack to allow the modal to mount even when is initially invisible
        if (!this.initiallyVisible) {

            this.initiallyVisible = true;

            return (
                <Modal
                    visible={true}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskStyle={{display: 'none'}}
                    wrapProps={{ style: {display: 'none'}}}
                >
                    {this.renderChildren()}
                </Modal>
            );
        }
        else {

            const {
                visible,
                loading
            } = this.state;
    
            return (
                <Modal
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.renderChildren()}
                </Modal>
            );
        }
        
    }
};