import React from 'react';

const Container = (Base) => class extends Base {

    renderChildren() {

        return React.Children.map(this.props.children, child => {

            return React.cloneElement(child, {
                parent: this // It sets a reference to a parent
            });
        });
    }
};

export default Container;