import { Component } from 'react';
import componentManager from './componentManager';

export default class ComponentBase extends Component {

    itemIdProperty = 'id';

    constructor(props) {

        super(props);

        const {
            itemIdProperty
        } = props;

        this.itemIdProperty = itemIdProperty || this.itemIdProperty;
    }

    //renderComponent() Abstract method to be implemented by the derived objects

    componentDidMount() {

        const { id } = this.props;

        if (id) { // If the component id is provided, then add it to the manager

            componentManager.add(id, this);

            console.log(`Registered component with id: ${id}`);
        }
    }

    componentWillUnmount() {

        const { id } = this.props;

        if (id) { // If the component id is provided, then remove it from the manager

            componentManager.remove(id);

            console.log(`Unregistered component with id: ${id}`);
        }
    }

    // Finds a parent of the parent implements the Container mixin
    findParent(predicate, throwIfNotFound = true) {

        let parent = this.parent || this.props.parent;

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
