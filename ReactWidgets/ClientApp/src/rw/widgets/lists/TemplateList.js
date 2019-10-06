import React from 'react';
import ComponentBase from '../../ComponentBase';
import CollectionDataHandler from '../mixins/CollectionDataHandler';
import './TemplateList.css';

export default class TemplateList extends CollectionDataHandler(ComponentBase) {

    renderComponent(data) {
        
        return (
            <ul className="nxt-list">
                {this.renderChildren(data)}
            </ul>
        );
    }

    renderChildren(data) {

        if (!data) {

            return;
        }

        const {
            template
        } = this.props;

        const {
            itemIdProperty
        } = this;

        return data.map(record => {
            return React.cloneElement(template, {
                key: record[itemIdProperty],
                data: record
            });
        });
    }
}