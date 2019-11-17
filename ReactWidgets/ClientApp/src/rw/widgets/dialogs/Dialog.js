import React from 'react';
import ComponentBase from '../../ComponentBase';
import Container from '../mixins/Container';
import { Modal, Icon } from 'antd';
import utils from '../../utils';

export default class Dialog extends Container(ComponentBase) {

    constructor(props) {

        super(props);

        this.state = {
            visible: false
        };

        this.title = props.title || this.title;

        this.type = props.type || this.type;

        this.icon = props.icon || this.icon;

        this.iconColor = props.iconColor || this.iconColor;

        this.iconTheme = props.iconTheme || this.iconTheme;

        this.width = props.width || this.width;

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

    displayMessage(data) {

        let { message } = this.props;

        if (!message) {

            return;
        }

        data = data || this.params;

        message = utils.template(message, data).text;

        Modal.success({
            title: 'Success',
            content: message
        });
    }

    render() {

        const {
            okText,
            okType,
            handleOk,
            handleCancel
        } = this;

        return (
            <Modal
                visible={this.state.visible}
                title={this.renderTitle()}
                okText={okText}
                okType={okType}
                onOk={handleOk}
                onCancel={handleCancel}
                width={this.width || 820}
            >
                {this.renderChildren()}
            </Modal>
        );
    }

    renderTitle() {

        const {
            title,
            type,
            icon,
            iconTheme
        } = this;

        let iconColor = this.iconColor || '#faad14';

        if (icon) {

            return (

                <div>
                    <Icon
                        type={icon}
                        style={{
                            fontSize: '22px',
                            marginRight: '16px',
                            color: iconColor
                        }}
                    />
                    <span>
                        {title}
                    </span>
                </div>
            );
        }
        else if (type) {

            const props = this.getIconPropsFromType(type);

            return (
                <div>
                    <Icon
                        theme={iconTheme || 'filled'}
                        {...props}
                    />
                    <span>
                        {title}
                    </span>
                </div>
            );
        }
        else {

            return title;
        }
    }

    getIconPropsFromType(type) {

        var iconStyle = {
            fontSize: '22px',
            marginRight: '16px',
            theme: 'filled'
        };

        switch (type) {
            case 'info': return {
                type: 'info-circle',
                style: {
                    ...iconStyle,
                    color: '#1890ff'
                }
            }
            case 'success': return {
                type: 'check-circle',
                style: {
                    ...iconStyle,
                    color: '#52c41a'
                }
            }
            case 'error': return {
                type: 'close-circle',
                style: {
                    ...iconStyle,
                    color: '#f5222d'
                }
            }
            case 'warning': return {
                type: 'warning',
                style: {
                    ...iconStyle,
                    color: '#faad14'
                }
            }
            case 'confirm': return {
                type: 'question-circle',
                style: {
                    ...iconStyle,
                    color: '#faad14'
                }
            }
            default: return null;
        }
    }
}