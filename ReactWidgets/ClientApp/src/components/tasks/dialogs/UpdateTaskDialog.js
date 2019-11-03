import React from 'react';
import { UpdateFormDialog } from '../../../rw';
import UpdateTaskForm from '../forms/UpdateTaskForm';

const UpdateTaskDialog = props => (
    <UpdateFormDialog
        {...props}
        id="updateTaskDialog"
        title="Update Task"
        form={
            <UpdateTaskForm />
        }
        message="Task with id: '{{params}}' was successfully updated"
    />
);

export default UpdateTaskDialog;