import React from 'react';
import AsyncComponent from './AsyncComponent';
import AsyncLoadableCollection from '../../../../data/mixins/async/AsyncLoadableCollection';

// Adapts the AsyncLoadableCollection to use with ReactJs components
const AsyncLoadableCollectionComponent = Base => class extends AsyncLoadableCollection(AsyncComponent(Base)) {

    componentDidMount() {

        super.componentDidMount();

        if (this.props.autoLoad != false) {

            this.load();
        }
    }

    updateFilters(field, operator, value) {

        if (!field) {

            throw new Error('Field name is required.');
        }

        let { filters } = this;

        let selectedFilters = filters.filter(f => f.field === field && f.operator === operator);

        switch (selectedFilters.length) {
            case 0: { // Filter does not exist

                if (value) {

                    this.filters.push({
                        field: field,
                        operator: operator,
                        value: value
                    });
                }

            }
                break;
            case 1: { // Update value of existing filter

                if (!value) { // Remove the filter when the value is empty

                    this.filters = filters.filter(f => f.field !== field && f.operator !== operator);
                }
                else {

                    let filter = selectedFilters[0];

                    filter.value = value;
                }
            }
                break;
            default: // Duplicate filter
                throw new Error(`Duplicate filters for field: '${field}' and operator: '${operator}'.`);
        }
    }
};

export default AsyncLoadableCollectionComponent;
