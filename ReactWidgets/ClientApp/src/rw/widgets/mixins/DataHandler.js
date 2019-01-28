// A component that gets built from data
const DataHandler = (Base) => class extends Base {

    render() {

        return this.renderData(this.props.data);
    }
}

export default DataHandler;