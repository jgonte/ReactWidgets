import React from 'react';
import AsyncComponent from './AsyncComponent';
import AsyncLoadableSingleItem from '../../../../data/mixins/async/AsyncLoadableSingleItem';

// Adapts the AsyncLoadableSingleItem to use with ReactJs components
const AsyncLoadableSingleItemComponent = Base => class extends AsyncLoadableSingleItem(AsyncComponent(Base)) {

    componentDidMount() {

        super.componentDidMount();

        if (this.props.autoLoad !== false) {

            this.load();
        }
    }
};

export default AsyncLoadableSingleItemComponent;
