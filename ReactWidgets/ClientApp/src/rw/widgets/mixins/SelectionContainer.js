// A component that contains selected items from its children
const SelectionContainer = Base => class extends Base {

    _selection = [];

    getSelection() {

        return this._selection;
    }

    addSelection(selection) {

        this._selection.push(selection);
    }

    removeSelection(selection) {

        const index = this._selection.indexOf(selection);

        this._selection.splice(index, 1);
    }

    isSelected(item, predicate) {

        return this._selection.filter(i => predicate(i, item)).length > 0;
    }
};

export default SelectionContainer;