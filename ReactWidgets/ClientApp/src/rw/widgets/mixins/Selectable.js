const Selectable = Base => class extends Base {

    selectable = true;

    state = this.state || {};

    constructor(props) {

        super(props);

        if (typeof props.selectable !== 'undefined') {

            this.selectable = props.selectable;
        }

        this._selectionHandler = props.selectionhandler ? props.selectionhandler() : null;

        if (!this._selectionHandler) {

            this._selectionHandler = this.findParent(p => p.addSelection, false);
        }
    }

    componentDidMount() {

        super.componentDidMount();

        const { selected } = this.props;

        if (selected) {

            this.select(selected);
        }
    }

    select(selected) {

        if (!this.selectable) {

            return;
        }

        this._setState({
            ...this.state,
            selected
        });

        if (this._selectionHandler) {

            selected ?
                this._selectionHandler.addSelection(this.getData()) :
                this._selectionHandler.removeSelection(this.getData());
        }
    }

    isSelected() {

        return this.state.selected;
    }

    // Toogle selection
    _handleClick() {

        var selected = !this.isSelected();

        this.select(selected);
    }
};

export default Selectable;