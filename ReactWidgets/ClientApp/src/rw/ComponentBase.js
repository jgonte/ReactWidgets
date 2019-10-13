import { Component } from 'react';
import componentManager from './componentManager';

const _getParent = item => item.props.parent || item.parent;

const _getName = item => `[${item.constructor.name}: ${(item.props.id || item.props.itemId || item.props.name)}]`;

export default class ComponentBase extends Component {

    //renderComponent() Abstract method to be implemented by the derived objects

    constructor(props) {

        super(props);

        if (props.onMount) {

            this.onMount = props.onMount.bind(this);
        }
    }

    componentDidMount() {

        const {
            parent,
            itemId, // Unique id within the parent
            id // The global id
        } = this.props;

        // If the parent is provided, then add this as a child to the parent
        if (parent) {

            if (itemId) {

                console.log(`Adding child: '${_getName(this)}' to parent: '${_getName(parent)}' as member: '${itemId}'`);

                parent[itemId] = this;
            }
            else {

                console.log(`Adding child: '${_getName(this)}' to parent: '${_getName(parent)}'`);

                parent.children.push(this);
            }
        }

        // If the component global id is provided, then add it to the manager
        if (id) {

            componentManager.add(id, this);

            console.log(`Registered component with global id: ${id}`);
        }

        if (this.onMount) {

            this.onMount();
        }
    }

    componentWillUnmount() {

        const {
            parent,
            itemId,
            id
        } = this.props;

        // If the parent is provided, then remove this child from the parent
        if (parent) {

            if (itemId) {

                parent[itemId] = undefined;
            }
            else {

                const index = parent.children.indexOf(this);

                parent.children.splice(index, 1);

                console.log(`Removed child '${_getName(this)}' from parent '${_getName(parent)}'`);
            }

            if (id) { // If the component id is provided, then remove it from the manager

                componentManager.remove(id);

                console.log(`Unregistered component with global id: ${id}`);
            }
        }
    }

    getParent(backTimes = 1, throwIfNotFound = true) {

        let times = 1;

        let parent = _getParent(this);

        while (times < backTimes) {

            parent = _getParent(parent);

            if (!parent && throwIfNotFound) {

                throw new Error('Component not found');
            }

            ++times;
        }

        return parent;
    }

    // Finds a parent of the component that matches the predicate
    findParent(predicate, throwIfNotFound = true) {

        let parent = _getParent(this);

        while (parent) {

            if (predicate(parent)) {

                return parent;
            }

            parent = _getParent(parent);
        }

        if (!parent && throwIfNotFound) {

            throw new Error('Component not found');
        }
    }
}
