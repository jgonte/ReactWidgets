import DataHandler from './DataHandler';
import Pageable from './Pageable';

// A component that gets built from data and holds the name of the property of the identifier of the item
const CollectionDataHandler = (Base) => class extends Pageable(DataHandler(Base)) {

    idProperty = 'id'; // The id property of the record

    constructor(props) {

        super(props);

        const {
            idProperty
        } = props;

        this.idProperty = idProperty || this.idProperty;
    }

};

export default CollectionDataHandler;