import React from 'react';
import ComponentBase from '../../ComponentBase';
import DataHandler from '../mixins/DataHandler';
import { Table } from 'antd';

export default class DataTable extends DataHandler(ComponentBase) {

    renderData(data) {

        const {
            columns
        } = this.props;

        return (
            <Table
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
            />
        );
    }
}