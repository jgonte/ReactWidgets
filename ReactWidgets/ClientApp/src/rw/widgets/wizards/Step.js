import React from 'react';

export default class Step extends React.Component {

    render() {
        const Component = this.props.component;

        return (
            <Component
                {...this.props}
            />
        );
    }
}