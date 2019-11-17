import Dialog from './Dialog';
import utils from '../../utils';

export default class DeleteDialog extends Dialog {

    title = 'Please confirm';

    method = 'delete';

    okText = 'Delete';

    okType = 'danger';

    type = 'warning';

    width = 416;

    renderConfirm() {

        return utils.template(this.props.confirm, this.params).text;
    }

    renderChildren() {

        return this.renderConfirm();
    }

    validate() {

        if (!this.params) {

            throw new Error("Delete dialog must have params set");
        }
    }
}