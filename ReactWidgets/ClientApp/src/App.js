import React from 'react';
import { Route } from 'react-router';
import AppLayout from './components/AppLayout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { SendData } from './components/SendData';

const App = () => (
    <AppLayout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/senddata' component={SendData} />
    </AppLayout>
);

export default App;

