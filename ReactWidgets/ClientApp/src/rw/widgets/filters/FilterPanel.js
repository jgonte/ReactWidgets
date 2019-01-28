import React from 'react';
import Container from '../mixins/Container';
import TargetViewHolder from '../mixins/TargetViewHolder';

const { Component } = React;

export default class FilterPanel extends TargetViewHolder(Container(Component)) {

    render() {

        return (
            <div>
                {this.renderChildren()}
            </div>
        );
    }
};