// Add functionality to the component to load local data
const LocalLoadable = (Base) => class extends Base {

    state = {}

    constructor(props) {

        super(props);

        if (props.onLoad) {

            this.onLoad = props.onLoad.bind(this);
        }
    }

    load() {

        this.setState({ ...this.state, data: this.props.parent.getValue() });

        if (this.onLoad) {

            this.onLoad();
        }
    }
};

export default LocalLoadable;