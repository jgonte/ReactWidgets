import React from 'react';
import ComponentBase from '../../ComponentBase';
import CollectionDataHandler from '../mixins/CollectionDataHandler';
import { Table } from 'antd';

export default class DataTable extends CollectionDataHandler(ComponentBase) {

    handleTableChange = (pagination, filters, sorter) => {

        console.log('Various parameters', pagination, filters, sorter);

        this.updatingData = true;

        const filter = Object.keys(filters).length ?
            filters : // TODO: Process this one into AND if more than one
            null;

        const sorters = Object.keys(sorter).length ?
            [{
                fieldName: sorter.field,
                order: sorter.order
            }] :
            null;

        this.setState({
            filter,
            sorters
        });
    };

    getSortOrder = (sorters, column) => {

        if (!sorters) {

            return null;
        }

        const columns = sorters.filter(s => s.fieldName === column.name);

        switch (columns.length) {

            case 0: return null;
            case 1: return columns[0].order;
            default: throw new Error(`Multiple columns with same field name: '${column.name}'`);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.updatingData) {

            this.updatingData = false;

            this.updateData();
        }
    }

    renderComponent(data) {

        const {
            recordKey,
            minWidth,
            minHeight
        } = this.props;

        let scroll = {
            x: minWidth,
            y: minHeight
        };

        const {
            sorters
        } = this.state;

        let columns = this.getColumns();

        return (
            <div>
                <Table
                    rowKey={recordKey.toString()}
                    columns={
                        // Map the columns to the format the antd table understands
                        columns.map(column => {
                            return {
                                key: column.name,
                                title: column.title,
                                dataIndex: column.name,
                                render: column.render,
                                sorter: column.sortable,
                                sortOrder: this.getSortOrder(sorters, column)
                            };
                        })
                    }
                    dataSource={data}
                    size="middle"
                    pagination={false}
                    scroll={scroll}
                    onChange={this.handleTableChange}
                />
                {this.renderPager()}
            </div>
        );
    }

    getColumns() {

        const {
            columns,
            actionColumns
        } = this.props;

        if (actionColumns) {

            return [...columns, ...actionColumns];
        }
        else {

            return columns;
        }
    }
}