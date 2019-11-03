import React from 'react';
import { AsyncForm } from '../../../rw';
import { NumberField } from '../../../rw';
import { LabelledField } from '../../../rw';
import { TextField } from '../../../rw';
import { DateTimeField } from '../../../rw';
import { CheckBox } from '../../../rw';

const CreateTaskForm = props => (
    <AsyncForm
        {...props}
        id="createTaskForm"
        autoLoad={false}
        submitUrl={'api/tasks'}
    >

        <LabelledField label="Title">

            <TextField
                name="title"
                validators={[
                    {
                        type: 'required'
                    },
                    {
                        type: 'maxLength',
                        value: 500
                    }
                ]}
            />

        </LabelledField>

        <LabelledField label="Completed">

            <CheckBox name="completed" />

        </LabelledField>

        <LabelledField label="Schedule">

            <DateTimeField
                name="schedule"
                validators={[
                    {
                        type: 'required'
                    }
                ]}
            />

        </LabelledField>

        <LabelledField label="Order">

            <NumberField name="order" />

        </LabelledField>

    </AsyncForm>
);

export default CreateTaskForm;
