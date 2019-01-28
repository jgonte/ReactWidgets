import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

export default class RoutedContent extends Component {

    render() {

        const routes = this.props.routes.map((route, index) =>
            <Route
                key={index}
                exact={route.isExact}
                path={route.path}
                component={route.component}
            />
        );

        return (
            <Content>
                <Switch>
                    {routes}
                </Switch>
            </Content>
        );
    }
}