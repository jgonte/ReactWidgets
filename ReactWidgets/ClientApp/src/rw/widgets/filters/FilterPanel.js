import React from 'react';
import Container from '../mixins/Container';
import TargetViewHolder from '../mixins/TargetViewHolder';

const { Component } = React;

let timeout;

export default class FilterPanel extends TargetViewHolder(Container(Component)) {

    filters = [];

    fields = [];

    state = {
        ...this.state,
        data: {} // The data contains a dictionary of field name - value of the filter fields
    };

    render() {

        return (
            <div>
                {this.renderChildren()}
            </div>
        );
    }

    // We use handle change to update the raw value in the filter panel and then on change to get the value we send to the server
    handleChange(field, rawValue) {

        const {
            name
        } = field.props;

        const data = {
            ...this.state.data,
            [name]: rawValue
        };

        this.setState({ // Display the value in the input field
            ...this.state,
            data
        });
    }

    updateFilter(fieldName, operator, value) {

        const targetView = this.getTargetView();

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            const filter = this.getFilter(fieldName, operator, value);

            targetView.setFilter(filter);

            targetView.updateData();
        }, 1000);
    }

    // Retrieves a new field when a value is updated
    getFilter(fieldName, operator, value) {

        if (!fieldName) {

            throw new Error('Field name is required.');
        }

        // Unique filters by field name for this component
        let selectedFilters = this.filters.filter(f => f.fieldName === fieldName);

        switch (selectedFilters.length) {
            case 0: { // Filter does not exist

                if (value) {

                    this.filters.push({
                        fieldName: fieldName,
                        operator: operator,
                        value: value
                    });
                }
            }
                break;
            case 1: { 

                if (!value) { // Remove the filter by field name when the value is empty

                    const item = this.filters.find(f => f.fieldName === fieldName);

                    const index = this.filters.indexOf(item);

                    this.filters.splice(index, 1);
                }
                else { // Update the operator and value of existing filter

                    let filter = selectedFilters[0];

                    filter.operator = operator;

                    filter.value = value;
                }
            }
                break;
            default: // Duplicate filter
                throw new Error(`Duplicate filters for field: '${fieldName}'`);
        }

        // Update the filter to send to the server
        switch (this.filters.length) {
            case 0: return null;
            case 1: return this.filters[0];
            default: 
                return {
                    operator: 'and',
                    filters: this.filters
                };
        }
    }
};