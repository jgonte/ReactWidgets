import React, { Component } from 'react';
import { AsyncLoadableDataTable, Button } from "../rw";

export class FetchData extends Component {

    createTable() {
        const columns = [
            {
                name: 'id',
                key: 'id',
                title: 'Id'
            },
            {
                name: 'dateFormatted',
                key: 'dateFormatted',
                title: 'Date'
            },
            {
                name: 'temperatureC',
                key: 'temperatureC',
                title: 'Temp. (C)'
            },
            {
                name: 'temperatureF',
                key: 'temperatureF',
                title: 'Temp. (F)'
            },
            {
                name: 'summary',
                key: 'summary',
                title: 'Summary'
            },
            {
                name: 'edit',
                key: 'edit',
                render: (text, record) => (
                    <Button icon="edit" onClick={() => {

                        //const dialog = componentManager.get('editQuestionWithAnswerDialog');

                        //dialog.setParams(record.id);

                        //dialog.show();

                        alert('Edit button clicked');

                    }}>Edit</Button>
                )
            },
            {
                name: 'delete',
                key: 'delete',
                render: (text, record) => (
                    <Button icon="delete" onClick={() => {

                        //const dialog = componentManager.get('deleteQuestionWithAnswerDialog');

                        //dialog.setParams(record.id);

                        //dialog.show();

                        alert('Delete button clicked');

                    }}>Delete</Button>
                )
            }
        ];

        return (
            <AsyncLoadableDataTable
                columns={columns}
                loadUrl="api/SampleData/WeatherForecasts"
                rowKey="id"
            />
        );
    }

    render() {
        let contents = this.createTable();

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
