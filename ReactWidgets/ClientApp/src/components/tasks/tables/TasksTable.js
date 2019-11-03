import React from 'react';
import { AsyncLoadableDataTable } from '../../../rw';

const columns = [
    {
        name: 'id',
        key: 'id',
        title: 'Id'
    },
    {
        name: 'title',
        key: 'title',
        title: 'Title',
        sortable: true
    },
    {
        name: 'completed',
        key: 'completed',
        title: 'Completed',
        render: value => value === true ? 'Yes' : 'No'
    },
    {
        name: 'schedule',
        key: 'schedule',
        title: 'Schedule',
        render: value => value.substring(0, value.indexOf('T')),
        sortable: true
    },
    {
        name: 'order',
        key: 'order',
        title: 'Order'
    }
];

export default function TasksTable(props) {

    return (
        <AsyncLoadableDataTable
            {...props}
            columns={columns}
            loadUrl={'api/tasks'}
            id="tasksTable"
            recordKey={[
                "id"
            ]}
        />
    );
};
