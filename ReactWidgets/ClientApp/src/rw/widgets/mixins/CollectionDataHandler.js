import DataHandler from './DataHandler';

// A component that gets built from data and holds the name of the property of the identifier of the item
const CollectionDataHandler = (Base) => class extends DataHandler(Base) {

    idProperty = 'id';

    constructor(props) {

        super(props);

        const {
            idProperty
        } = props;

        this.idProperty = idProperty || this.idProperty;
    }

};

export default CollectionDataHandler;