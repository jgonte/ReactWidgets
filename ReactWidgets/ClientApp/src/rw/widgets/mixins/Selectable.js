const Selectable = Base => class extends Base {

    state = this.state || {};

    constructor(props) {

        super(props);

        this.state.selectable = true;

        if (typeof props.selectable !== 'undefined') {

            this.state.selectable = props.selectable;
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

    setSelectable(selectable) {

        this._setState({
            ...this.state,
            selectable
        })
    }

    select(selected) {

        if (!this.state.selectable) {

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

    // Toogle selection
    _handleClick() {

        var selected = !this.state.selected;

        this.select(selected);
    }
};

export default Selectable;