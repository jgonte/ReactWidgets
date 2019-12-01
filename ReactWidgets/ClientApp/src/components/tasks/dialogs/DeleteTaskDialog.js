import React from 'react';
import { AsyncDeleteDialog } from '../../../rw';

const DeleteTaskDialog = props => (
    <AsyncDeleteDialog
        {...props}
        id="deleteTaskDialog"
        submitUrl="api/tasks/{{id}}"
        title="Delete Task"
        confirm="Delete task with id: '{{id}}'?"
        message="Task with id: '{{id}}' was successfully deleted"
    />
);

export default DeleteTaskDialog;