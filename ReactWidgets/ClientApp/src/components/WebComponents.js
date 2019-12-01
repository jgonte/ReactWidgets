import React, { Component } from 'react';
import '../rw/wc/widgets/wc-label.js';
import '../rw/wc/widgets/wc-button.js';
import '../rw/wc/widgets/wc-list-item';

export class WebComponents extends Component {
    displayName = WebComponents.name

    //constructor(props) {
    //    super(props);
    //    this.state = { currentCount: 0 };
    //    this.incrementCounter = this.incrementCounter.bind(this);
    //}

    //incrementCounter() {
    //    this.setState({
    //        currentCount: this.state.currentCount + 1
    //    });
    //}

    render() {
        return (
            <div>

                <h1>Web Components</h1>

                <h2>Label</h2>
                
                <wc-label text="My label" />

                <h2>Button</h2>

                <wc-button text="My button" />

                <h2>List Item</h2>

                <wc-list-item
                    template={
`<template id="myListItemTemplate">
    <style>
        p {
            color: red;
        }
    </style>
    <p>My list item</p>
</template>`
}
                />
            </div>
        );
    }
}