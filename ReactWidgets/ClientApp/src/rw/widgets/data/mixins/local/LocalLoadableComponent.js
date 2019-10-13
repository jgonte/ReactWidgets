import React from 'react';
import LocalLoadable from '../../../../data/mixins/local/LocalLoadable';

// Adapts the LocalLoadable to use with ReactJs components
const LocalLoadableComponent = (Base) => class extends LocalLoadable(Base) {

    constructor(props) {

        super(props);

        this._setState = this.setState.bind(this);
    }
};

export default LocalLoadableComponent;