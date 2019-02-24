import AsyncLoadable from './AsyncLoadable';
import SingleItemFetchLoader from '../../data/loaders/SingleItemFetchLoader';
import MetadataHeaderMetadataMapper from '../../data/mappers/MetadataHeaderMetadataMapper';

const AsyncLoadableSingleItem = (Base) => class extends AsyncLoadable(Base) {

    constructor(props) {

        super(props);

        this.state = this.state || {};

        if (!props.loader) {

            this.loader = new SingleItemFetchLoader();
        }

        if (!props.metadataMapper) {

            this.metadataMapper = new MetadataHeaderMetadataMapper();
        }
    }

    createReaderParams() {

        //const {
        //    state
        //} = this;

        let params = {
            url: this.url
        };

        return params;
    }

    // Called when a new data needs to be fetched or refreshed
    updateData() {

        if (this.requiresRefresh) {

            this.load();
        }
        else {

            const {
                state
            } = this;

            const data = this.updateDataLocally(this.cachedData); // Process the data locally

            this.setState({ ...state, data: data, loading: false, error: null }); // Update state
        }
    }

    // Called when the server is returning cached data or 304 response so we process the cached data locally
    updateDataLocally(cachedData) {

        return cachedData;
    }

};

export default AsyncLoadableSingleItem;