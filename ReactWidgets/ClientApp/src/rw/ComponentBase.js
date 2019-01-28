import { Component } from 'react';
import componentManager from './componentManager';

export default class ComponentBase extends Component {

    mounting = false;

    itemIdProperty = 'id';

    constructor(props) {

        super(props);

        const {
            itemIdProperty
        } = props;

        this.itemIdProperty = itemIdProperty || this.itemIdProperty;
    }

    componentWillMount() {

        const { id } = this.props;

        if (id) { // If the component id is provided, then add it to the manager

            componentManager.add(id, this);
        }

        this.mounting = true;
    }

    componentDidMount() {

        this.mounting = false;
    }

    componentWillUnmount() {

        const { id } = this.props;

        if (id) { // If the component id is provided, then remove it from the manager

            componentManager.remove(id);
        }
    }

    // Finds a parent of the parent implements the Container mixin
    findParent(component, predicate, throwIfNotFound = true) {

        let parent = component.parent || component.props.parent;

        while (parent) {

            if (predicate(parent)) {

                return parent;
            }

            parent = parent.parent || parent.props.parent;
        }

        if (!parent && throwIfNotFound) {

            throw new Error('Component not found');
        }
    }
}
