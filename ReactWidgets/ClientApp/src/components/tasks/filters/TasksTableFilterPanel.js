import React from 'react';
import { FilterPanel, FilterField } from '../../../rw';
import { NumberField } from '../../../rw';
import { TextField } from '../../../rw';
import { DateField } from '../../../rw';
import { ComparisonOperators } from '../../../rw';
import { StringFunctions } from '../../../rw';
import ComboBox from '../../../rw/widgets/fields/ComboBox';

export default function TasksTableFilterPanel() {

    return (
        <FilterPanel targetViewId="tasksTable">

            <FilterField
                label="Id"
                field={
                    <NumberField name="taskId" />
                }
                operators={[ComparisonOperators.IsEqual]}
            />

            <FilterField
                label="Title"
                field={
                    <TextField name="title" />
                }
                operators={[
                    StringFunctions.Contains,
                    ComparisonOperators.IsEqual
                ]}
            />

            <FilterField
                label="Completed"
                field={
                    <ComboBox
                        name="completed"
                        data={[
                            {
                                text: 'Yes',
                                value: true
                            },
                            {
                                text: 'No',
                                value: false
                            }
                        ]}
                        placeholder="Please select"
                        allowClear
                    />
                }
                operators={[ComparisonOperators.IsEqual]}
            />

            <FilterField
                label="Schedule"
                field={
                    <DateField name="schedule" />
                }
                operators={[ComparisonOperators.IsEqual]}
            />

            <FilterField
                label="Order"
                field={
                    <NumberField name="order" />
                }
                operators={[ComparisonOperators.IsEqual]}
            />

        </FilterPanel>
    );
}
