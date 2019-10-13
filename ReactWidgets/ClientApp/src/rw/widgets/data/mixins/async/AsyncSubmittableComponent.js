import React from 'react';
import AsyncComponent from './AsyncComponent';
import AsyncSubmittable from '../../../../data/mixins/async/AsyncSubmittable';

// Adapts the AsyncSubmittable to use with ReactJs components
const AsyncSubmittableComponent = Base => class extends AsyncSubmittable(AsyncComponent(Base)) { 
};

export default AsyncSubmittableComponent;