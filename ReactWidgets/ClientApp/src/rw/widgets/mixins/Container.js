import React from 'react';

const Container = Base => class extends Base {

    children = [];

    renderChildren() {

        let {
            children
        } = this.props;

        if (Array.isArray(children)) {

            children = children.filter(child => !!child); // Remove null or undefined children
        }

        return React.Children.map(children, child => {

            return React.cloneElement(child, {
                parent: this // Set this as the parent
            });
        });
    }

    findChildren(predicate, container) {

        container = container || [];

        this.children.forEach(child => {

            if (predicate(child)) {

                container.push(child);

                if (child.findChildren) {

                    child.findChildren(predicate, container);
                }
            }
        });

        return container;
    }
};

export default Container;