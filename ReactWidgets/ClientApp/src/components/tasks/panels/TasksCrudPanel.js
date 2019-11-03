import React from 'react';
import TasksTable from '../tables/TasksTable';
import CreateTaskDialog from '../dialogs/CreateTaskDialog';
import UpdateTaskDialog from '../dialogs/UpdateTaskDialog';
//import DeleteTaskDialog from '../dialogs/DeleteTaskDialog';
import { CrudPanel } from '../../../rw';

export default function TasksCrudPanel() {

    return (
        <CrudPanel
            addItemButton={{
                "label": "Add Task"
            }}
            loadableComponent={
                <TasksTable />
            }
            createItemDialog={
                <CreateTaskDialog />
            }
            updateItemDialog={
                <UpdateTaskDialog />
            }
            
        />
    );
}