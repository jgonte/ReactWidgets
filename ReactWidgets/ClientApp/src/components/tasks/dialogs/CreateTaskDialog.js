import React from 'react';
import { CreateFormDialog } from '../../../rw';
import CreateTaskForm from '../forms/CreateTaskForm';

const CreateTaskDialog = props => (
    <CreateFormDialog
        {...props}
        id="createTaskDialog"
        title="Create Task"
        form={
            <CreateTaskForm />
        }
        message="Task with id: '{{id}}' was successfully created"
    />
);

export default CreateTaskDialog;
