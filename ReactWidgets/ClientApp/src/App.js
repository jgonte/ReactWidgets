import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { SendData } from './components/SendData';
import TasksPage from './components/tasks/TasksPage';
import NotFoundPage from './components/NotFoundPage';

const App = () => (
    <AppLayout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/senddata' component={SendData} />
            <Route path='/tasks' component={TasksPage} exact />
            <Route component={NotFoundPage} />
        </Switch>
    </AppLayout>
);

export default App;

