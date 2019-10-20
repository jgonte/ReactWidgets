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
        title: 'Title'
    },
    {
        name: 'completed',
        key: 'completed',
        title: 'Completed'
    },
    {
        name: 'schedule',
        key: 'schedule',
        title: 'Schedule'
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
