import DataTable from './DataTable';
import AsyncLoadableCollectionComponent from '../data/mixins/async/AsyncLoadableCollectionComponent';

export default class AsyncLoadableDataTable extends AsyncLoadableCollectionComponent(DataTable) {
}