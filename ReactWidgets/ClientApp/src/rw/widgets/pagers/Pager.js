import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class Pager extends Component {

    constructor(props) {

        super(props);

        this.onPageIndexChanged = this.onPageIndexChanged.bind(this);

        this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
    }

    onPageIndexChanged(pageIndex) {
        
        const {
            pagedView,
            pageSize
        } = this.props;

        pagedView.paginate(pageIndex, pageSize);
    }

    onPageSizeChanged(pageIndex, pageSize) {

        const {
            pagedView
        } = this.props;

        pagedView.paginate(1, pageSize); // Reset to the first page
    }

    render() {

        const {
            pageIndex,
            pageSize,
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
                pageSizeOptions={['10', '25', '50']}
                onChange={this.onPageIndexChanged}
                onShowSizeChange={this.onPageSizeChanged}
            />
        );
    }
}