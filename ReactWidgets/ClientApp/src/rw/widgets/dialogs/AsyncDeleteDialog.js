import DeleteDialog from './DeleteDialog';
import AsyncSubmittable from '../../data/mixins/async/AsyncSubmittable';

export default class AsyncDeleteDialog extends AsyncSubmittable(DeleteDialog) {

    onOk() {

        this.submit();
    }

    onSubmitData(data) {

        this.getParent().loadableComponent.load();

        this.displayMessage();
    }

}