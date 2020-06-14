import React from 'react';
import {
    Row,
    Col,
    Button
} from 'antd';

export default class DualListBox extends React.Component {

    state = this.state || {};

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

    componentDidMount() {

        //super.componentDidMount();

        this.leftList.children[0].onSelectionChanged = sel => {

            this.setState({
                ...this.state,
                addSelectedButtonEnabled: sel.length
            });
        };

        this.rightList.children[0].onSelectionChanged = sel => {

            this.setState({
                ...this.state,
                removeSelectedButtonEnabled: sel.length
            });
        };
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

    renderRightList() {

        return React.cloneElement(
            this.props.rightList,
            {
                parent: this,
                itemId: 'rightList'
            }
        );
    }

    renderButtons() {

        return (
            <div>
                {this.renderAddAllSelectedButton()}
                {this.renderAddSelectedButton()}
                {this.renderRemoveSelectedButton()}
                {this.renderRemoveAllSelectedButton()}
            </div>
        );
    }

    renderAddAllSelectedButton() {

        if (!this.props.onAddAllSelectedButtonClicked) {

            return null;
        }

        return (
            <Button
                type="primary"
                ghost
                icon="double-right"
                disabled={false} // TODO: Disable it when there is no data on the left list
                onClick={() => this.addAllSelected()}
            >
            </Button>
        );
    }

    renderAddSelectedButton() {

        if (!this.props.onAddSelectedButtonClicked) {

            return null;
        }

        return (
            <Button
                type="primary"
                ghost
                icon="right"
                disabled={!this.state.addSelectedButtonEnabled}
                onClick={() => this.addSelected()}
            >
            </Button>
        );
    }

    renderRemoveSelectedButton() {

        if (!this.props.onRemoveSelectedButtonClicked) {

            return null;
        }

        return (
            <Button
                type="primary"
                ghost
                icon="left"
                disabled={!this.state.removeSelectedButtonEnabled}
                onClick={() => this.removeSelected()}
            >
            </Button>
        );
    }

    renderRemoveAllSelectedButton() {

        if (!this.props.onRemoveAllSelectedButtonClicked) {

            return null;
        }

        return (
            <Button
                type="primary"
                ghost
                icon="double-left"
                disabled={false} // TODO: Disable it when there is no data on the right list
                onClick={() => this.removeAllSelected()}
            >
            </Button>
        );
    }

    addSelected() {

        const leftList = this.leftList.children[0];

        const selection = leftList.getSelection();

        this.props.onAddSelectedButtonClicked(selection);

        //leftList._recordSet.remove(selection.map(item => item.id));

        //const rightList = this.rightList.children[0];

        //rightList.mergeRecords(selection.map(item => {
        //    return {
        //        organizationId: 1,
        //        studentId: item.id,
        //        fullName: item.fullName
        //    };
        //}));
    }

    removeSelected() {

        const rightList = this.rightList.children[0];

        const selection = rightList.getSelection();

        this.props.onRemoveSelectedButtonClicked(selection);
    }
}