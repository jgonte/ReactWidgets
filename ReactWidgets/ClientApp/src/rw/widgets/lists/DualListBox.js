import React from 'react';
import {
    Row,
    Col,
    Button
} from 'antd';

export default class DualListBox extends React.Component {

    render() {
        return (
            <div>
                <Row gutter={16} type="flex" justify="space-between" align="middle">
                    <Col span={11}>
                        {this.renderLeftList()}
                    </Col>
                    <Col span={2}>
                        <Row>
                            <Col span={2}>
                                {this.renderButtons()}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                        {this.renderRightList()}
                    </Col>
                </Row>
            </div>
        );
    }

    renderLeftList() {

        return React.cloneElement(
            this.props.leftList,
            {
                parent: this,
                itemId: 'leftList'
            }
        );
    }

    renderButtons() {
        return (
            <div>
                <Button
                    type="primary"
                    ghost
                    icon="double-right"
                    onClick={() => this.addAllSelected()}
                >
                </Button>
                <Button
                    type="primary"
                    ghost
                    icon="right"
                    onClick={() => this.addSelected()}
                >
                </Button>
                <Button
                    type="primary"
                    ghost
                    icon="left"
                    onClick={() => this.removeSelected()}
                >
                </Button>
                <Button
                    type="primary"
                    ghost
                    icon="double-left"
                    onClick={() => this.removeAllSelected()}
                >
                </Button>
            </div>
        );
    }

    renderRightList() {

        return React.cloneElement(
            this.props.rightList,
            {
                parent: this,
                itemId: 'rightList'
            }
        );
    }

    addSelected() {

        const selection = this.leftList.children[0].getSelection();

        const rightList = this.rightList.children[0];

        rightList.mergeRecords(selection.map(item => {
            return {
                organizationId: 1,
                studentId: item.id,
                fullName: item.fullName
            };
        }));
    }
}