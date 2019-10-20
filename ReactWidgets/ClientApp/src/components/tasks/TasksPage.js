import React from 'react';
import { Card } from '../../rw';
import TasksTableFilterPanel from './filters/TasksTableFilterPanel';
import TasksCrudPanel from './panels/TasksCrudPanel';

const TasksPage = props => (
    <Card title="Manage Tasks"
        style={{
            width: '100%'
        }}
    >

        <TasksTableFilterPanel />

        <TasksCrudPanel />

    </Card>
);

export default TasksPage;