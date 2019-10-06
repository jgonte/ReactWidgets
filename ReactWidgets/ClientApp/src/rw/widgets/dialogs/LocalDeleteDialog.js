import DeleteDialog from './DeleteDialog';
import LocalSubmittable from '../../data/mixins/LocalSubmittable';

export default class LocalDeleteDialog extends LocalSubmittable(DeleteDialog) {

    constructor(props) {

        super(props);

        if (!props.onSubmit) {

            const defaultOnSubmit = () => {

                const parentForm = this.getParent(3);

                parentForm.removeValue(props.dataProperty, this.params);

                const field = parentForm.fields.filter(field => field.props.name === props.dataProperty)[0];

                field.loadableComponent.load();
            };

            this.onSubmit = defaultOnSubmit.bind(this);
        }
    }

    onOk() {

        this.submit();
    }
}