import LocalLoadable from './LocalLoadable';
import SingleItemFetchLoader from '../../data/loaders/SingleItemFetchLoader';
import MetadataHeaderMetadataMapper from '../../data/mappers/MetadataHeaderMetadataMapper';

const LocalLoadableSingleItem = (Base) => class extends LocalLoadable(Base) {

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
};

export default LocalLoadableSingleItem;