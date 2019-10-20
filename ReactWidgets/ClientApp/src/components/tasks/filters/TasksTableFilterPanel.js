import React from 'react';
import { FilterPanel, FilterField } from '../../../rw';
import { NumberField } from '../../../rw';
import { TextField } from '../../../rw';
import { DateTimeField } from '../../../rw';

export default function TasksTableFilterPanel() {

    return (
        <FilterPanel targetViewId="tasksTable">

            <FilterField
                label="Task Id"
                field={
                    <NumberField name="id" />
                }
                operators={['equal']}
            />

            <FilterField
                label="Title"
                field={
                    <TextField name="title" />
                }
                operators={['contains']}
            />

            <FilterField
                label="Completed"
                field={
                    <TextField name="completed" />
                }
                operators={['contains']}
            />

            <FilterField
                label="Schedule"
                field={
                    <DateTimeField name="schedule" />
                }
            />

            <FilterField
                label="Order"
                field={
                    <NumberField name="order" />
                }
                operators={['equal']}
            />

        </FilterPanel>
    );
}
