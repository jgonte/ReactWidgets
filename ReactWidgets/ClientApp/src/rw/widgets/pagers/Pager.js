import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class Pager extends Component {

    constructor(props) {

        super(props);

        const {
            pageIndex,
            pageSize
        } = props;

        this.state = {
            pageIndex,
            pageSize
        };

        this.onPageIndexChanged = this.onPageIndexChanged.bind(this);

        this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
    }

    onPageIndexChanged(pageIndex) {
        
        const {
            pagedView
        } = this.props;

        const {
            pageSize
        } = this.state;

        pagedView.paginate(pageIndex, pageSize);

        this.setState({ ...this.state, pageIndex});
    }

    onPageSizeChanged(pageSize) {

        const {
            pagedView
        } = this.props;

        pagedView.paginate(1, pageSize); // Reset to the first page

        this.setState({ ...this.state, pageIndex: 1, pageSize});
    }

    render() {

        const {
            pageIndex,
            pageSize
        } = this.state;

        const {
            totalRecords
        } = this.props;

        return (
            <Pagination
                className="ant-table-pagination"
                current={pageIndex}
                pageSize={pageSize}
                total={totalRecords}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                showSizeChanger
                onChange={this.onPageIndexChanged}
                onShowSizeChange={this.onPageSizeChanged}
            />
        );
    }
}