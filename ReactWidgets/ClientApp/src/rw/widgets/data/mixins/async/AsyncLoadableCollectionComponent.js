﻿import React from 'react';
import AsyncComponent from './AsyncComponent';
import AsyncLoadableCollection from '../../../../data/mixins/async/AsyncLoadableCollection';

// Adapts the AsyncLoadableCollection to use with ReactJs components
const AsyncLoadableCollectionComponent = Base => class extends AsyncLoadableCollection(AsyncComponent(Base)) {

    componentDidMount() {

        super.componentDidMount();

        if (this.props.autoLoad !== false) {

            this.load();
        }
    }

    setFilter(filter) {

        this.setState({
            ...this.state,
            filter
        });
    }
};

export default AsyncLoadableCollectionComponent;
