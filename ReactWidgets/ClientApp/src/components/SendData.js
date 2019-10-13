import React from 'react';
import {
    AsyncForm,
    HiddenField,
    TextField,
    DateField,
    LabelledField,
    AsyncLoadableComboBox,
    CheckBox
} from '../rw';

export class SendData extends React.Component {

    createForm() {

        return (
            <AsyncForm
                autoLoad={false}
                submitUrl="api/SampleData/WeatherForecasts"
                submitButton={{
                    label: "Submit Forecast",
                    type: "primary"
                }}
            >

                <HiddenField name="id" />

                <LabelledField
                    labelKey="dateFormatted"
                    label="Date"
                >

                    <DateField
                        name="dateFormatted"
                        format="YYYY/MM/DD"
                        placeholder="YYYY/MM/DD"
                        validators={[
                            {
                                type: 'required',
                                message: 'Date is required'
                            }
                        ]}
                    />

                </LabelledField>

                <LabelledField
                    labelKey="temperatureC"
                    label="Temp. (C)"
                >

                    <TextField
                        name="temperatureC"
                        style={{ width: 200 }}
                        validators={[
                            {
                                type: 'maxLength',
                                value: 3,
                                message: 'Temp. is too high! It should be {0} digits not {1}'
                            }
                        ]}
                    />

                </LabelledField>

                <LabelledField
                    labelKey="checkMe"
                    label="Check Me"
                >

                    <CheckBox
                        name="checkMe"
                    />

                </LabelledField>
                
                <LabelledField
                    labelKey="Category"
                    label="Category"
                >

                    <AsyncLoadableComboBox
                        valueProperty="id"
                        textProperty="name"
                        loadUrl="api/categories"
                        name="categoryId"
                        placeholder="Select a category"
                        style={{ width: 200 }}
                    />

                </LabelledField>

            </AsyncForm>
        );
    }

    render() {
        let contents = this.createForm();

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates sending data to the server.</p>
                {contents}
            </div>
        );
    }
}
