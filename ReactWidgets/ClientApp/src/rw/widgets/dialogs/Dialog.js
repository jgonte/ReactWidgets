import React from 'react';
import ComponentBase from '../../ComponentBase';
import { Modal } from 'antd';

export default class Dialog extends ComponentBase {

    initiallyVisible = false;

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

        this.onOk = (props.onOk || this.onOk).bind(this); // Required

        this.okText = props.okText || this.okText;

        this.okType = props.okType || this.okType;

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

    renderChildren() {

        return this.props.children;
    }

    render() {

        const {
            title,
            initiallyVisible,
            okText,
            okType,
            handleOk,
            handleCancel
        } = this;

        // Hack to allow the modal to mount even when is initially invisible
        let maskStyle = !initiallyVisible ? { display: 'none' } : undefined;

        let wrapProps = !initiallyVisible ? { style: { display: 'none' } } : undefined;

        let visible = !initiallyVisible ? true : this.state.visible;

        if (!initiallyVisible) {

            this.initiallyVisible = true;
        }

        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                okType={okType}
                onOk={handleOk}
                onCancel={handleCancel}
                maskStyle={maskStyle}
                wrapProps={wrapProps}
            >
                {this.renderChildren()}
            </Modal>
        );
    }
}