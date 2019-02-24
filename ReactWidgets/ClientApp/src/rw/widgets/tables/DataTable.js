import React from 'react';
import ComponentBase from '../../ComponentBase';
import CollectionDataHandler from '../mixins/CollectionDataHandler';
import { Table } from 'antd';

export default class DataTable extends CollectionDataHandler(ComponentBase) {

    renderComponent(data) {

        const {
            columns,
            rowKey,
            minWidth,
            minHeight
        } = this.props;

        let scroll = {
            x: minWidth,
            y: minHeight
        };

        return (
            <div>
                <Table
                    rowKey={rowKey}
                    columns={ // Map the columns to the format the antd table understands
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
}