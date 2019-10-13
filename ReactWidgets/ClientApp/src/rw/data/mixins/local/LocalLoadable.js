// Add functionality to the component to load local data
const LocalLoadable = (Base) => class extends Base {

    state = {
        data: {}
    };

    constructor(cfg) {

        super(cfg);

        if (cfg.onLoadData) {

            this.onLoadData = cfg.onLoadData.bind(this);
        }
    }

    load() {

        const data = this.data;

        if (this._setState) {

            this._setState({
                ...this.state,
                data: data || {}
            });
        }

        if (this.onLoadData) {

            this.onLoadData(data);
        }
    }
};

export default LocalLoadable;