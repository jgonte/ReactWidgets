import React from 'react';
import ComponentBase from '../../ComponentBase';
import CollectionDataHandler from '../mixins/CollectionDataHandler';
import { Table } from 'antd';

export default class DataTable extends CollectionDataHandler(ComponentBase) {

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
                                render: column.render
                            };
                        })
                    }
                    dataSource={data}
                    size="middle"
                    pagination={false}
                    scroll={scroll}
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