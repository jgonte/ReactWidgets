import React from 'react';

export default class ContentView extends React.Component {

    render() {

        const {
            content
        } = this.props;

        return (
            <React.Fragment>{content}</React.Fragment>
        );
    }
}