class ComponentManager {

    components = {};

    add(id, component) {

        if (this.components[id]) {

            throw new Error(`There is already a component with id: ${id}`);
        }

        this.components[id] = component;

        return () => {

            delete this.components[id];
        };
    }

    get(id) {

        if (!Object.keys(this.components).some(k => k === id)) {

            throw new Error(`There is no component with id: ${id}`);
        }

        return this.components[id];
    }

    remove(id) {

        if (!Object.keys(this.components).some(k => k === id)) {

            throw new Error(`There is no component with id: ${id}`);
        }

        delete this.components[id];
    }

}

let componentManager = new ComponentManager();

export default componentManager;