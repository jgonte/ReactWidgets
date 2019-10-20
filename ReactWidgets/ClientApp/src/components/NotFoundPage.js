import React from 'react';
import { Card } from '../rw';
import { ContentView } from '../rw';

const NotFoundPage = props => (
    <Card title="Page Not Found" style={{ width: '100%' }}>

        <ContentView content={<h2>Page was not found. Make sure you typed the correct URL.</h2>} />

    </Card>
);

export default NotFoundPage;
