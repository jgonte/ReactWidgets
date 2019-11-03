// A component that gets built from data
const DataHandler = (Base) => class extends Base {

    // Sets the data programmatically
    setData(data) {

        this.setState({
            ...this.state,
            data
        });
    }

    render() {

        return this.renderComponent(this.props.data || this.state.data);
    }
};

export default DataHandler;